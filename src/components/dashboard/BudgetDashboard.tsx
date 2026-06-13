'use client';

import React from 'react';
import { BudgetAnalysis } from '@/types/planner';
import { Coins, CheckCircle, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface BudgetDashboardProps {
  analysis: BudgetAnalysis;
}

export default function BudgetDashboard({ analysis }: BudgetDashboardProps) {
  const { budget, estimatedCost, difference, status } = analysis;
  
  // Calculate percentage spent
  const percentage = Math.min(100, Math.round((estimatedCost / budget) * 100));

  // Determine status styling
  let statusTheme = 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
  let barColor = 'bg-emerald-400';
  let Icon = CheckCircle;

  if (percentage > 90) {
    statusTheme = 'bg-amber-500/10 border-amber-500/20 text-amber-400';
    barColor = 'bg-amber-400';
    Icon = AlertTriangle;
  } else if (percentage > 100) {
    statusTheme = 'bg-red-500/10 border-red-500/20 text-red-400';
    barColor = 'bg-red-400';
    Icon = AlertTriangle;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold font-display">Budget Optimizer Analysis</h3>
        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${statusTheme}`}>
          <Icon className="w-3.5 h-3.5" />
          {status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Budget */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-[30px]" />
          <span className="text-zinc-500 text-xs font-semibold block mb-1">Your Stated Limit</span>
          <div className="text-3xl font-display font-extrabold text-white flex items-baseline gap-1">
            ${budget.toFixed(2)}
            <span className="text-xs text-zinc-500 font-semibold">USD</span>
          </div>
          <p className="text-[10px] text-zinc-400 mt-2">Maximum cap configured in settings</p>
        </div>

        {/* Estimated Spend */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-[30px]" />
          <span className="text-zinc-500 text-xs font-semibold block mb-1">Estimated Grocery Spend</span>
          <div className="text-3xl font-display font-extrabold text-white flex items-baseline gap-1">
            ${estimatedCost.toFixed(2)}
            <span className="text-xs text-zinc-500 font-semibold">USD</span>
          </div>
          <p className="text-[10px] text-zinc-400 mt-2">Based on current Must-Buy grocery items</p>
        </div>

        {/* Remaining Budget */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-[30px]" />
          <span className="text-zinc-500 text-xs font-semibold block mb-1">Remaining Surplus</span>
          <div className="text-3xl font-display font-extrabold text-emerald-400 flex items-baseline gap-1">
            ${difference.toFixed(2)}
            <span className="text-xs text-zinc-500 font-semibold">USD</span>
          </div>
          <p className="text-[10px] text-emerald-500/60 mt-2 font-semibold">Available for premium upgrades</p>
        </div>
      </div>

      {/* Progress visualizer */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/5 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400 font-semibold flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-emerald-400" />
            Budget Consumption Bar
          </span>
          <span className="text-white font-extrabold">{percentage}% Spent</span>
        </div>

        {/* Progress tracks */}
        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5">
          <motion.div
            className={`h-full rounded-full ${barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <div className="flex items-start gap-2.5 bg-white/5 p-4 rounded-2xl border border-white/5 text-xs text-zinc-400 leading-relaxed">
          <Info className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">Budget Optimization Insights:</span>
            We maximized vegetable reuse and swapped premium ingredients (such as bulk organic nuts or high-end fillets) with nutrition-equivalent staples where appropriate to ensure your costs remain strictly within boundaries.
          </div>
        </div>
      </div>
    </div>
  );
}
