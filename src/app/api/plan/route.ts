import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateMealPlanAI } from '@/services/gemini';
import { saveMealPlan } from '@/services/supabase';

// Define the Zod schema matching the AI input model requirements
const plannerInputSchema = z.object({
  people: z.coerce.number()
    .int("People count must be a whole number")
    .min(1, "At least 1 person is required"),
  budget: z.coerce.number()
    .positive("Budget must be greater than 0"),
  diet: z.string()
    .min(1, "Diet preference cannot be empty"),
  allergies: z.array(z.string()).default([]),
  healthGoal: z.string()
    .min(1, "Health goal cannot be empty"),
  cookingTime: z.coerce.number()
    .positive("Cooking time must be greater than 0"),
  energyLevel: z.string()
    .min(1, "Energy level cannot be empty"),
  cuisine: z.string()
    .min(1, "Cuisine preference cannot be empty"),
  ingredientsAvailable: z.array(z.string()).default([]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request inputs using Zod
    const validation = plannerInputSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          status: 'error', 
          reason: 'validation failure',
          errors: validation.error.format()
        },
        { status: 400 }
      );
    }

    const inputData = validation.data;

    // Call Gemini AI Generation service (with mock fallback)
    const result = await generateMealPlanAI(inputData);

    if (result.status === 'error') {
      return NextResponse.json(result, { status: 422 });
    }

    // Try to parse authorization details or save as guest user
    // We can extract authorization user from headers if present,
    // or we can expect client-side store code to call saveMealPlan.
    // However, to keep it simple, robust and automatic in the API,
    // we can save it using a default user if none is specified,
    // or let the client-side state trigger the save once it receives the plan.
    // Let's do it directly in the route handler if user details are passed in header/body,
    // or let the client side trigger it. Let's support an optional 'user' field in body
    // to write directly to DB.
    const user = body.user || { id: 'guest_chef_123', name: 'Guest Chef', email: 'chef@cookpilot.ai' };
    
    if (user && user.id) {
      await saveMealPlan(
        user.id,
        user.name || 'Guest Chef',
        user.email || 'chef@cookpilot.ai',
        inputData,
        result
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error in /api/plan:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        reason: error.message || 'An internal server error occurred during plan generation' 
      },
      { status: 500 }
    );
  }
}
