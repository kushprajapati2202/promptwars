'use client';

import React from 'react';
import { PlannerInput, PlannerSuccessOutput } from '@/types/planner';
import { Users, Coins, Heart, ChefHat, Award, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface OverviewCardProps {
  input: PlannerInput;
  output: PlannerSuccessOutput;
  onReset: () => void;
}

export default function OverviewCard({ input, output, onReset }: OverviewCardProps) {
  const { userSummary, nutrition } = output;
  const score = nutrition.score || 85;

  // Circle properties for overall score SVG
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <motion.div 
      className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-white/5 shadow-xl relative overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        
        {/* Left Side: Summary & Actions */}
        <div className="space-y-4 flex-1 w-full text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-max mx-auto md:mx-0">
              Plan Generated Successfully
            </span>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors w-max mx-auto md:mx-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Configure New Plan
            </button>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight">
            Today's Cooking Strategy
          </h2>
          
          {/* Tag Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-left">
            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
              <span className="text-zinc-500 text-xs font-semibold block mb-1">Serving Size</span>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Users className="w-4 h-4 text-emerald-400" />
                {userSummary.people} {userSummary.people === 1 ? 'Person' : 'People'}
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
              <span className="text-zinc-500 text-xs font-semibold block mb-1">Budget Limit</span>
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Coins className="w-4 h-4 text-emerald-400" />
                ${userSummary.budget} USD
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
              <span className="text-zinc-500 text-xs font-semibold block mb-1">Diet Preference</span>
              <div className="flex items-center gap-2 text-white font-bold text-sm capitalize">
                <ChefHat className="w-4 h-4 text-emerald-400" />
                {userSummary.diet}
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
              <span className="text-zinc-500 text-xs font-semibold block mb-1">Health Target</span>
              <div className="flex items-center gap-2 text-white font-bold text-sm capitalize">
                <Heart className="w-4 h-4 text-emerald-400" />
                {userSummary.goal}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Score Widget */}
        <div className="flex items-center gap-6 bg-white/5 border border-white/5 px-6 py-5 rounded-[2rem] w-full md:w-auto justify-center md:justify-start">
          <div className="relative flex items-center justify-center">
            {/* SVG Circle Gauge */}
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-zinc-800"
                strokeWidth="7"
                fill="transparent"
              />
              <motion.circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-emerald-400"
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-display font-extrabold text-white">{score}</span>
              <span className="text-[10px] text-zinc-500 block -mt-1">/100</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Overall Plan Score
            </span>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[150px]">
              Computed based on nutrition, leftovers, budget efficiency, and time.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
