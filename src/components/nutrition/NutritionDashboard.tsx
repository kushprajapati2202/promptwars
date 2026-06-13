'use client';

import React, { useEffect, useState } from 'react';
import { NutritionInfo } from '@/types/planner';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Scale, Heart, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface NutritionDashboardProps {
  nutrition: NutritionInfo;
}

export default function NutritionDashboard({ nutrition }: NutritionDashboardProps) {
  const { calories, protein, carbs, fat, score } = nutrition;
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute percentage of calories contributed by each macro
  const proteinKcal = protein * 4;
  const carbsKcal = carbs * 4;
  const fatKcal = fat * 9;
  const computedTotal = proteinKcal + carbsKcal + fatKcal || 1;

  const proteinPct = Math.round((proteinKcal / computedTotal) * 100);
  const carbsPct = Math.round((carbsKcal / computedTotal) * 100);
  const fatPct = Math.round((fatKcal / computedTotal) * 100);

  // Prepare chart data
  const chartData = [
    { name: 'Protein', value: proteinKcal, percentage: proteinPct, color: '#10b981' }, // Emerald
    { name: 'Carbohydrates', value: carbsKcal, percentage: carbsPct, color: '#f59e0b' }, // Amber
    { name: 'Healthy Fats', value: fatKcal, percentage: fatPct, color: '#6366f1' }, // Indigo
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold font-display">Nutrition Profile & Macros</h3>
        <span className="text-xs text-zinc-500">Calculated based on average serving guidelines</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: macro stats cards */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Nutrition Score */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-[30px]" />
            <span className="text-zinc-500 text-xs font-semibold block mb-1">Nutrition Grade Score</span>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-display font-extrabold text-emerald-400">{score}</span>
              <div className="space-y-0.5">
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">A Grade</span>
                <span className="text-[9px] text-zinc-500 block">Balanced Macronutrient distribution</span>
              </div>
            </div>
            <p className="text-[10px] text-zinc-400 mt-3 leading-relaxed">
              Based on protein ratios, variety of whole foods, and minimal processed ingredients.
            </p>
          </div>

          {/* Caloric Intake */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-[30px]" />
            <span className="text-zinc-500 text-xs font-semibold block mb-1">Total Daily Intake</span>
            <div className="text-3xl font-display font-extrabold text-white flex items-baseline gap-1">
              {calories}
              <span className="text-xs text-zinc-500 font-semibold">kcal / day</span>
            </div>
            <p className="text-[10px] text-zinc-400 mt-2">Distributed across breakfast, lunch, and dinner</p>
          </div>
        </div>

        {/* Center/Right column: pie chart graphic */}
        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex-1 space-y-4 w-full">
            <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Caloric Energy Split</h4>
            
            <div className="space-y-3">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-zinc-300 font-bold">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-500 font-semibold">{item.value / 4}g</span>
                    <span className="text-white font-extrabold">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Perfectly meets daily target macronutrient splits for your goal!</span>
            </div>
          </div>

          {/* Recharts Pie Chart visualizer */}
          <div className="w-full md:w-52 h-52 flex items-center justify-center relative flex-shrink-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-32 h-32 rounded-full border-2 border-white/5 animate-pulse" />
            )}
            <div className="absolute text-center pointer-events-none">
              <span className="text-xs text-zinc-500 block">Macros</span>
              <span className="text-sm font-bold text-white">100% Split</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
