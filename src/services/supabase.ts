import { createClient } from '@supabase/supabase-js';
import { PlannerInput, PlannerOutput, GroceryList, AnalyticsRecord } from '@/types/planner';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create actual client if configured, otherwise create a placeholder
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Mock database storage for demo mode
interface MockDB {
  users: Array<{ id: string; name: string; email: string; createdAt: string }>;
  meal_plans: Array<{ id: string; userId: string; inputJson: string; outputJson: string; createdAt: string }>;
  grocery_lists: Array<{ id: string; mealPlanId: string; groceryJson: string }>;
  analytics: Array<{ id: string; userId: string; nutritionScore: number; wasteScore: number; budgetScore: number }>;
}

const mockDBKey = 'cookpilot_mock_db';

const getMockDB = (): MockDB => {
  if (typeof window === 'undefined') {
    return { users: [], meal_plans: [], grocery_lists: [], analytics: [] };
  }
  const data = localStorage.getItem(mockDBKey);
  if (!data) {
    const initial: MockDB = { users: [], meal_plans: [], grocery_lists: [], analytics: [] };
    localStorage.setItem(mockDBKey, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return { users: [], meal_plans: [], grocery_lists: [], analytics: [] };
  }
};

const saveMockDB = (db: MockDB) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(mockDBKey, JSON.stringify(db));
};

export const saveMealPlan = async (
  userId: string,
  userName: string,
  userEmail: string,
  input: PlannerInput,
  output: PlannerOutput
) => {
  if (!output || output.status === 'error') return null;

  const planId = `plan_${Math.random().toString(36).substring(2, 11)}`;
  const groceryId = `groc_${Math.random().toString(36).substring(2, 11)}`;
  const analyticsId = `anal_${Math.random().toString(36).substring(2, 11)}`;
  const createdAt = new Date().toISOString();

  // 1. Calculate scores for analytics
  const nutritionScore = output.nutrition.score;
  // budget score: higher means we spent less of our budget. e.g. (budget - estimatedCost) / budget
  const budgetRatio = output.budgetAnalysis.estimatedCost / (input.budget || 1);
  const budgetScore = Math.max(0, Math.min(100, Math.round((1 - Math.max(0, budgetRatio - 1)) * 100)));
  // waste score: based on ingredient reuse and leftover predictions
  const wasteScore = Math.min(100, Math.max(30, 100 - (output.leftoverPlan.remainingIngredients.length * 10)));

  if (isSupabaseConfigured && supabase) {
    try {
      // Check if user exists, upsert
      await supabase.from('users').upsert([
        { id: userId, name: userName, email: userEmail, createdAt }
      ], { onConflict: 'id' });

      // Save meal plan
      const { data: planData, error: planError } = await supabase.from('meal_plans').insert([
        { 
          id: planId, 
          userId, 
          inputJson: JSON.stringify(input), 
          outputJson: JSON.stringify(output), 
          createdAt 
        }
      ]).select();

      if (planError) throw planError;

      // Save grocery list
      await supabase.from('grocery_lists').insert([
        { 
          id: groceryId, 
          mealPlanId: planId, 
          groceryJson: JSON.stringify(output.groceryList) 
        }
      ]);

      // Save analytics
      await supabase.from('analytics').insert([
        { 
          id: analyticsId, 
          userId, 
          nutritionScore, 
          wasteScore, 
          budgetScore 
        }
      ]);

      console.log('Saved to Supabase database successfully');
      return planId;
    } catch (err) {
      console.error('Failed to write to Supabase, falling back to Local Storage DB', err);
    }
  }

  // Fallback to Local Storage DB mock
  const db = getMockDB();

  // Upsert user
  if (!db.users.some(u => u.id === userId)) {
    db.users.push({ id: userId, name: userName, email: userEmail, createdAt });
  }

  // Insert plan
  db.meal_plans.push({
    id: planId,
    userId,
    inputJson: JSON.stringify(input),
    outputJson: JSON.stringify(output),
    createdAt,
  });

  // Insert grocery list
  db.grocery_lists.push({
    id: groceryId,
    mealPlanId: planId,
    groceryJson: JSON.stringify(output.groceryList),
  });

  // Insert analytics
  db.analytics.push({
    id: analyticsId,
    userId,
    nutritionScore,
    wasteScore,
    budgetScore,
  });

  saveMockDB(db);
  console.log('Saved to LocalStorage Mock DB successfully');
  return planId;
};

export const getUserAnalytics = async (userId: string): Promise<AnalyticsRecord[]> => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('userId', userId);
      
      if (!error && data) {
        return data as AnalyticsRecord[];
      }
    } catch (err) {
      console.error('Supabase fetch failed, falling back to local DB', err);
    }
  }

  // Fallback mock fetch
  const db = getMockDB();
  const records = db.analytics.filter(a => a.userId === userId);
  
  if (records.length === 0) {
    // Return some seed analytics so charts don't look completely empty for the demo
    return [
      { id: 'anal_seed_1', userId, nutritionScore: 78, wasteScore: 82, budgetScore: 88 },
      { id: 'anal_seed_2', userId, nutritionScore: 84, wasteScore: 90, budgetScore: 92 },
      { id: 'anal_seed_3', userId, nutritionScore: 88, wasteScore: 85, budgetScore: 95 },
    ];
  }
  return records;
};
