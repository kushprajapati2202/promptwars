'use client';

import React from 'react';
import { MealPlan } from '@/types/planner';
import { Clock, Flame, ShieldAlert, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface MealPlanSectionProps {
  mealPlan: MealPlan;
}

export default function MealPlanSection({ mealPlan }: MealPlanSectionProps) {
  const meals: { key: keyof MealPlan; title: string; imageGrad: string; accentColor: string }[] = [
    { key: 'breakfast', title: 'Breakfast', imageGrad: 'from-amber-500/20 to-orange-500/10', accentColor: 'text-amber-400' },
    { key: 'lunch', title: 'Lunch', imageGrad: 'from-emerald-500/20 to-teal-500/10', accentColor: 'text-emerald-400' },
    { key: 'dinner', title: 'Dinner', imageGrad: 'from-indigo-500/20 to-blue-500/10', accentColor: 'text-indigo-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold font-display">Generated Meals</h3>
        <span className="text-xs text-zinc-500">Macro calculations calculated for individual servings</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {meals.map(({ key, title, imageGrad, accentColor }) => {
          const meal = mealPlan[key];
          if (!meal || !meal.meal) return null;

          return (
            <motion.div
              key={key}
              className="glass-panel rounded-3xl border border-white/5 flex flex-col overflow-hidden relative"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Top Gradient Header */}
              <div className={`h-24 bg-gradient-to-br ${imageGrad} p-6 flex flex-col justify-end relative border-b border-white/5`}>
                <div className="absolute top-4 right-4 bg-black/40 border border-white/10 px-2 py-1 rounded-md text-[10px] text-zinc-300 font-semibold tracking-wider uppercase">
                  {title}
                </div>
                <h4 className="text-lg font-bold text-white leading-tight font-display">{meal.meal}</h4>
              </div>

              {/* Meal Specs */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                
                {/* Preparation Time & Calories */}
                <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className={`w-4 h-4 ${accentColor}`} />
                    <span>Prep: {meal.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>{meal.calories} kcal</span>
                  </div>
                </div>

                {/* Ingredients Bullet */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Ingredients</span>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                    {meal.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 truncate" title={ing}>
                        <div className={`w-1 h-1 rounded-full ${accentColor} bg-current flex-shrink-0`} />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Macro splits */}
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Macronutrients</span>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-emerald-500/10 border border-emerald-500/15 py-1.5 rounded-lg">
                      <span className="text-[10px] text-zinc-400 block">Protein</span>
                      <span className="font-extrabold text-emerald-400">{meal.protein}g</span>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/15 py-1.5 rounded-lg">
                      <span className="text-[10px] text-zinc-400 block">Carbs</span>
                      <span className="font-extrabold text-amber-400">{meal.carbs}g</span>
                    </div>
                    <div className="bg-indigo-500/10 border border-indigo-500/15 py-1.5 rounded-lg">
                      <span className="text-[10px] text-zinc-400 block">Fat</span>
                      <span className="font-extrabold text-indigo-400">{meal.fat}g</span>
                    </div>
                  </div>
                </div>

                {/* Explanation text */}
                <div className="border-t border-white/5 pt-4">
                  <p className="text-[11px] text-zinc-400 leading-relaxed italic flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">ℹ</span>
                    {meal.reason}
                  </p>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
