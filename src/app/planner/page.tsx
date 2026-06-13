'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePlannerStore } from '@/store/usePlannerStore';
import PlannerForm from '@/components/forms/PlannerForm';
import { ChefHat, LogOut, Sparkles, User } from 'lucide-react';
import Link from 'next/link';

export default function PlannerPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = usePlannerStore();

  // If not authenticated, redirect to login
  React.useEffect(() => {
    // If store initialization finishes and user is not authenticated, send to auth
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 active:scale-98 transition-transform">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
            <ChefHat className="w-4.5 h-4.5 text-emerald-950 stroke-[2.5]" />
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight">
            CookPilot<span className="text-emerald-400">.AI</span>
          </span>
        </Link>

        {/* User profile dropdown/display */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full text-xs text-zinc-300">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">{user.name}</span>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="p-2 bg-white/5 border border-white/5 rounded-full hover:bg-red-500/10 hover:border-red-500/20 text-zinc-400 hover:text-red-400 transition-all active:scale-95"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-16 relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight mb-3">
              Configure Your Meal Plan
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              Specify your party size, budget limit, and diet preferences. Our multi-agent AI pipeline will design a synchronized plan.
            </p>
          </div>

          <div className="glass-panel p-6 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-[80px]" />
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px]" />
            
            {/* Planner Form */}
            <PlannerForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        <p>© 2026 CookPilot AI. Built with Gemini 2.5 Flash.</p>
      </footer>
    </div>
  );
}
