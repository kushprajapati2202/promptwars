'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { usePlannerStore } from '@/store/usePlannerStore';
import { PlannerInput } from '@/types/planner';
import { 
  Users, 
  Coins, 
  Clock, 
  Flame, 
  Heart, 
  ChefHat, 
  Sparkles, 
  Plus, 
  X, 
  Loader2, 
  CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Form validation schema using Zod
const formSchema = z.object({
  people: z.string()
    .refine((val) => !isNaN(Number(val)) && Number.isInteger(Number(val)) && Number(val) >= 1, {
      message: "Must be a whole number of at least 1 person"
    }),
  budget: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Budget must be greater than 0"
    }),
  diet: z.string().min(1, "Dietary preference is required"),
  cookingTime: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Cooking time must be greater than 0"
    }),
  healthGoal: z.string().min(1, "Health goal is required"),
  energyLevel: z.string().min(1, "Energy level is required"),
  cuisine: z.string().min(1, "Preferred cuisine is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function PlannerForm() {
  const router = useRouter();
  const { generatePlan, loading, error, user } = usePlannerStore();
  
  // Local state for allergies and ingredients arrays
  const [allergiesList, setAllergiesList] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState('');
  
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      people: "2",
      budget: "50",
      diet: 'vegetarian',
      cookingTime: "30",
      healthGoal: 'balanced diet',
      energyLevel: 'medium',
      cuisine: 'indian',
    }
  });

  const onSubmit = async (data: FormData) => {
    // Merge standard form fields with dynamic array states and parse numbers
    const fullInput: PlannerInput = {
      ...data,
      people: Number(data.people),
      budget: Number(data.budget),
      cookingTime: Number(data.cookingTime),
      allergies: allergiesList,
      ingredientsAvailable: ingredientsList,
    };

    const success = await generatePlan(fullInput);
    if (success) {
      router.push('/dashboard');
    }
  };

  const addAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (allergyInput.trim() && !allergiesList.includes(allergyInput.trim().toLowerCase())) {
      setAllergiesList([...allergiesList, allergyInput.trim().toLowerCase()]);
      setAllergyInput('');
    }
  };

  const removeAllergy = (index: number) => {
    setAllergiesList(allergiesList.filter((_, i) => i !== index));
  };

  const addIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredientInput.trim() && !ingredientsList.includes(ingredientInput.trim().toLowerCase())) {
      setIngredientsList([...ingredientsList, ingredientInput.trim().toLowerCase()]);
      setIngredientInput('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index));
  };

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-2xl flex items-start gap-2">
          <span className="font-bold">Error:</span>
          <span>{error}</span>
        </div>
      )}

      {/* Basic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* People */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            Number of People
          </label>
          <input
            type="number"
            {...register('people')}
            className="w-full p-4 glass-input text-white text-sm"
            placeholder="e.g. 2"
          />
          {errors.people && (
            <p className="text-xs text-red-400 mt-1">{errors.people.message}</p>
          )}
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-400" />
            Budget (USD)
          </label>
          <input
            type="number"
            {...register('budget')}
            className="w-full p-4 glass-input text-white text-sm"
            placeholder="e.g. 50"
          />
          {errors.budget && (
            <p className="text-xs text-red-400 mt-1">{errors.budget.message}</p>
          )}
        </div>

        {/* Diet Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-emerald-400" />
            Dietary Preference
          </label>
          <select
            {...register('diet')}
            className="w-full p-4 glass-input text-white text-sm appearance-none cursor-pointer"
          >
            <option value="vegetarian" className="bg-zinc-900">Vegetarian</option>
            <option value="vegan" className="bg-zinc-900">Vegan</option>
            <option value="keto" className="bg-zinc-900">Keto</option>
            <option value="paleo" className="bg-zinc-900">Paleo</option>
            <option value="gluten-free" className="bg-zinc-900">Gluten-Free</option>
            <option value="standard" className="bg-zinc-900">Any / Standard</option>
          </select>
          {errors.diet && (
            <p className="text-xs text-red-400 mt-1">{errors.diet.message}</p>
          )}
        </div>

        {/* Cooking Time */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            Max Cooking Time (mins)
          </label>
          <input
            type="number"
            {...register('cookingTime')}
            className="w-full p-4 glass-input text-white text-sm"
            placeholder="e.g. 45"
          />
          {errors.cookingTime && (
            <p className="text-xs text-red-400 mt-1">{errors.cookingTime.message}</p>
          )}
        </div>

        {/* Health Goal */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-400" />
            Health Goal
          </label>
          <select
            {...register('healthGoal')}
            className="w-full p-4 glass-input text-white text-sm appearance-none cursor-pointer"
          >
            <option value="balanced diet" className="bg-zinc-900">Balanced Diet</option>
            <option value="weight loss" className="bg-zinc-900">Weight Loss</option>
            <option value="muscle gain" className="bg-zinc-900">Muscle Recovery / Gain</option>
            <option value="energy boost" className="bg-zinc-900">Higher Energy Boost</option>
            <option value="low waste" className="bg-zinc-900">Minimize Waste</option>
          </select>
          {errors.healthGoal && (
            <p className="text-xs text-red-400 mt-1">{errors.healthGoal.message}</p>
          )}
        </div>

        {/* Energy Level */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
            <Flame className="w-4 h-4 text-emerald-400" />
            Day energy level
          </label>
          <select
            {...register('energyLevel')}
            className="w-full p-4 glass-input text-white text-sm appearance-none cursor-pointer"
          >
            <option value="medium" className="bg-zinc-900">Medium (Standard Day)</option>
            <option value="low" className="bg-zinc-900">Low (Busy Day — under 20 mins meals)</option>
            <option value="high" className="bg-zinc-900">High (Relaxed Day — gourmet cooking)</option>
          </select>
          {errors.energyLevel && (
            <p className="text-xs text-red-400 mt-1">{errors.energyLevel.message}</p>
          )}
        </div>
      </div>

      {/* Preferred Cuisine */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-emerald-400" />
          Preferred Cuisine
        </label>
        <select
          {...register('cuisine')}
          className="w-full p-4 glass-input text-white text-sm appearance-none cursor-pointer"
        >
          <option value="indian" className="bg-zinc-900">Indian Cuisine</option>
          <option value="italian" className="bg-zinc-900">Italian Cuisine</option>
          <option value="mexican" className="bg-zinc-900">Mexican Cuisine</option>
          <option value="mediterranean" className="bg-zinc-900">Mediterranean Cuisine</option>
          <option value="asian" className="bg-zinc-900">Asian Cuisine</option>
          <option value="american" className="bg-zinc-900">American Cuisine</option>
          <option value="any" className="bg-zinc-900">No preference</option>
        </select>
        {errors.cuisine && (
          <p className="text-xs text-red-400 mt-1">{errors.cuisine.message}</p>
        )}
      </div>

      {/* Dynamic Tag Arrays (Allergies) */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-zinc-300 block">
          Allergies (Optional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            className="flex-1 p-4 glass-input text-white text-sm"
            placeholder="e.g. peanuts, dairy, gluten"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAllergy(e); } }}
          />
          <button
            type="button"
            onClick={addAllergy}
            className="p-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {allergiesList.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {allergiesList.map((allergy, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400"
              >
                {allergy}
                <button type="button" onClick={() => removeAllergy(idx)} className="hover:text-red-200">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Tag Arrays (Existing Ingredients) */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-zinc-300 block">
          Ingredients in pantry (Optional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            className="flex-1 p-4 glass-input text-white text-sm"
            placeholder="e.g. eggs, onions, spinach, milk"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addIngredient(e); } }}
          />
          <button
            type="button"
            onClick={addIngredient}
            className="p-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {ingredientsList.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {ingredientsList.map((ing, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              >
                {ing}
                <button type="button" onClick={() => removeIngredient(idx)} className="hover:text-emerald-200">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 text-white rounded-2xl active:scale-98 transition-all font-bold text-base shadow-xl shadow-emerald-500/20 disabled:pointer-events-none group"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Coordinating AI Agents...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform" />
              Generate Intelligent Meal Plan
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
