'use client';

import React, { useState } from 'react';
import { CookingTimeline, TimelineTask } from '@/types/planner';
import { Sun, SunMoon, Moon, Clock, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineDashboardProps {
  timeline: CookingTimeline;
}

export default function TimelineDashboard({ timeline }: TimelineDashboardProps) {
  const [activeSegment, setActiveSegment] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  const segments = [
    { id: 'morning' as const, label: 'Morning Prep', icon: Sun, text: 'Breakfast preparation & meal planning setup', color: 'text-amber-400 bg-amber-500/10' },
    { id: 'afternoon' as const, label: 'Afternoon Prep', icon: SunMoon, text: 'Midday meal assembly & advance dinner prep', color: 'text-emerald-400 bg-emerald-500/10' },
    { id: 'evening' as const, label: 'Evening Cook', icon: Moon, text: 'Dinner preparation and leftover storage', color: 'text-indigo-400 bg-indigo-500/10' },
  ];

  // Helper to determine priority styles
  const getPriorityStyle = (priority: TimelineTask['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'Medium':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'Low':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      default:
        return 'bg-zinc-800 border-zinc-700 text-zinc-400';
    }
  };

  const currentTasks = timeline[activeSegment] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold font-display">Kitchen Cook Timeline</h3>
        <span className="text-xs text-zinc-500">Chronological preparations designed for efficiency</span>
      </div>

      {/* Selector buttons */}
      <div className="grid grid-cols-3 gap-3">
        {segments.map(({ id, label, icon: Icon, color }) => {
          const isActive = activeSegment === id;

          return (
            <button
              key={id}
              onClick={() => setActiveSegment(id)}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all active:scale-95 cursor-pointer ${
                isActive 
                  ? 'bg-white/5 border-emerald-500/30 text-white shadow-lg' 
                  : 'bg-transparent border-white/5 text-zinc-400 hover:bg-white/5'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? color : 'bg-white/5 text-zinc-400'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold font-display">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Timeline tasks rendering */}
      <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="space-y-1 mb-6 text-center md:text-left">
          <h4 className="font-bold text-base capitalize">{activeSegment} Workflow</h4>
          <span className="text-xs text-zinc-400">
            {segments.find(s => s.id === activeSegment)?.text}
          </span>
        </div>

        {currentTasks.length === 0 ? (
          <p className="text-xs text-zinc-500 italic py-8 text-center">No tasks generated for this segment</p>
        ) : (
          <div className="relative border-l-2 border-zinc-800 ml-4 pl-6 space-y-6">
            {currentTasks.map((task, idx) => (
              <div key={idx} className="relative group">
                
                {/* Visual timeline node */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-zinc-900 border-2 border-emerald-400 flex items-center justify-center transition-all group-hover:scale-125">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Task card */}
                <div className="glass-panel-hover border border-white/5 p-4 rounded-2xl bg-white/[0.02]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      Duration: {task.duration}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border w-max ${getPriorityStyle(task.priority)}`}>
                      {task.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                    {task.instructions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
