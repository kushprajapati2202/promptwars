'use client';

import React from 'react';
import { DecisionEngine } from '@/types/planner';
import { CheckCircle2, Cpu, HelpCircle, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExplainDashboardProps {
  decision: DecisionEngine;
}

export default function ExplainDashboard({ decision }: ExplainDashboardProps) {
  const { reasons } = decision;

  // The 8 agents representing the pipeline
  const agents = [
    { id: 1, name: 'Profiler', role: 'User Goals' },
    { id: 2, name: 'Planner', role: 'Recipes' },
    { id: 3, name: 'Budgeter', role: 'Cost Limit' },
    { id: 4, name: 'Nutrition', role: 'Macro Ratios' },
    { id: 5, name: 'Grocery', role: 'Categorise' },
    { id: 6, name: 'Substitutes', role: 'Swaps' },
    { id: 7, name: 'Leftover', role: 'Zero Waste' },
    { id: 8, name: 'Explainer', role: 'Checks' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold font-display">AI Decision & Explanations</h3>
        <span className="text-xs text-zinc-500">Explainable AI (XAI) verification dashboard</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Verified Checklist */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Satisfied Constraints
          </h4>
          
          <div className="space-y-3">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: 8-Agent reasoning process pipeline */}
        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-[30px]" />

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-400 mb-6 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Collaborative 8-Agent Execution Pipeline
            </h4>

            {/* horizontal scroll container for responsive pipeline */}
            <div className="overflow-x-auto pb-4 scrollbar-thin">
              <div className="flex items-center gap-2 min-w-[600px] py-2">
                {agents.map((agent, idx) => (
                  <React.Fragment key={agent.id}>
                    {/* Agent Node */}
                    <div className="bg-white/5 border border-white/5 px-3.5 py-3 rounded-2xl flex-1 text-center hover:bg-white/[0.08] transition-colors">
                      <span className="text-[10px] text-emerald-400 font-bold block">Agent {agent.id}</span>
                      <span className="text-xs font-bold text-white block mt-0.5">{agent.name}</span>
                      <span className="text-[9px] text-zinc-500 block leading-tight mt-1">{agent.role}</span>
                    </div>

                    {/* Arrow between nodes */}
                    {idx < agents.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2.5 bg-white/5 p-4 rounded-xl border border-white/5 text-[11px] text-zinc-400 leading-relaxed">
            <HeartPulse className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">XAI Pipeline Proof:</span>
              Before returning the final meal plan, the planner simulates a sequence of evaluations, recalculating grocery selections against budget limits, filtering out configured allergies, and verifying protein adequacy metrics.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
