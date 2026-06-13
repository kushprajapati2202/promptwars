'use client';

import React from 'react';
import { LeftoverPlan } from '@/types/planner';
import { Trash2, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeftoverDashboardProps {
  leftoverPlan: LeftoverPlan;
  recommendations: string[];
}

export default function LeftoverDashboard({ leftoverPlan, recommendations }: LeftoverDashboardProps) {
  const { remainingIngredients, nextDayMeals } = leftoverPlan;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold font-display">Leftover & Waste Optimizer</h3>
        <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
          Zero Waste Mode Enabled
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Remaining ingredients and tomorrow's suggestions */}
        <div className="space-y-6">
          
          {/* Remaining ingredients box */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/5 rounded-full blur-[30px]" />
            <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-amber-400" />
              Predicted Surplus Ingredients
            </h4>

            {remainingIngredients.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">No remaining ingredients predicted. Maximum efficiency achieved!</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {remainingIngredients.map((ing, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 border border-white/5 text-zinc-300"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[10px] text-zinc-500 mt-4">These items will remain after completing today's dinner recipe.</p>
          </div>

          {/* Tomorrow's meals preview */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              Tomorrow's Meal Recommendations
            </h4>

            {nextDayMeals.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">No suggestions needed</p>
            ) : (
              <div className="space-y-3">
                {nextDayMeals.map((meal, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between border border-white/5 p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] transition-colors gap-2">
                    <div>
                      <span className="text-xs font-bold text-white block">{meal.meal}</span>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">
                        Reuses: {meal.ingredientsUsed.join(', ')}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg w-max sm:h-max">
                      Prep: {meal.prepTime}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Waste Reduction Tips */}
        <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-[30px]" />
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              AI Waste Reduction Recommendations
            </h4>
            
            <div className="space-y-3">
              {recommendations.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-400 font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl text-[11px] text-amber-300/80 leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              By following these tips, you reduce household food waste by up to 25% and decrease shopping expenses on secondary kitchen items.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
