'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ChefHat, 
  ShoppingCart, 
  Coins, 
  Scale, 
  Calendar, 
  Trash2, 
  FileCheck, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ChefHat className="w-5 h-5 text-emerald-950 stroke-[2.5]" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            CookPilot<span className="text-emerald-400">.AI</span>
          </span>
        </div>

        <Link 
          href="/planner"
          className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 overflow-hidden group"
        >
          <span className="relative z-10">Start Planning</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          className="max-w-4xl text-center flex flex-col items-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/10 mb-8 animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">Next-Gen Multi-Agent Planner</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-6">
            Intelligent Meal Planning. <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Optimized for Your Budget.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
            Generate personalized diets, smart shopping lists, ingredient upgrades, and budget guides based on your day. Zero food waste, maximum nutritional output.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
            <Link 
              href="/planner"
              className="w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-xl shadow-emerald-500/20 active:scale-98 transition-all group"
            >
              Start Planning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-zinc-300 glass-panel glass-panel-hover border-white/5 active:scale-98 transition-all"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Feature Grid Section */}
        <section id="features" className="w-full max-w-6xl mt-32 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Designed as a Coordinated AI Ecosystem
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Behind the scenes, 8 specialized agents collaborate to create a kitchen strategy optimized for your wallet and body.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Feature 1 */}
            <motion.div className="glass-panel glass-panel-hover p-8 rounded-3xl" variants={itemVariants}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                <ShoppingCart className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Grocery Optimizer</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Categorizes items into Must Buy, Optional, and Premium tiers. Stays strictly inside your limits by swapping expensive items with smart nutritional alternatives.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div className="glass-panel glass-panel-hover p-8 rounded-3xl" variants={itemVariants}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
                <Coins className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Budget Self-Regeneration</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                If the generated meal plan exceeds your set budget, the optimizer automatically swaps high-cost components, recalculates the pricing, and returns a fully optimized plan.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div className="glass-panel glass-panel-hover p-8 rounded-3xl" variants={itemVariants}>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
                <Trash2 className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Leftover Predictor</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Calculates remaining ingredients from dinner to forecast tomorrow's breakfast and lunch suggestions, reducing food waste and grocery expenses.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div className="glass-panel glass-panel-hover p-8 rounded-3xl" variants={itemVariants}>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6 border border-teal-500/20">
                <Scale className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Macro Scoring Engine</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Computes a multi-dimensional Nutrition Score (0-100) using overall ratios: 40% personalization, 20% budget efficiency, 15% macro balance, and 10% waste reduction.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div className="glass-panel glass-panel-hover p-8 rounded-3xl" variants={itemVariants}>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-500/20">
                <Calendar className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cooking Timeline</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Divides preparation tasks into Morning, Afternoon, and Evening, optimized to match your energy level (Low/Busy under 20 mins, Normal 40 mins, Relaxed 90 mins).
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div className="glass-panel glass-panel-hover p-8 rounded-3xl" variants={itemVariants}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                <FileCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Explainable Decisions</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Not a black box. CookPilot explains why each meal was selected: ingredient reuse metrics, allergen exclusions, budget checks, and energy matching.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Benefits banner */}
        <section className="w-full max-w-5xl mt-32 mb-12 glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[80px]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 block">Premium Standard</span>
              <h3 className="text-2xl md:text-3xl font-display font-extrabold mb-4">
                Win Your Day With Seamless Cooking Automation
              </h3>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Take the guesswork out of meal planning, grocery spending, and diet compliance. CookPilot AI optimizes your nutrition and leftovers automatically.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-zinc-300 text-sm">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                  <span>Secure Local and Database Session Logging</span>
                </div>
                <div className="flex items-center gap-2.5 text-zinc-300 text-sm">
                  <Award className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                  <span>Structured Response Engine with Zero Halucinations</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
              <h4 className="font-bold text-lg mb-3">Explainability Index</h4>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Aligns with <b>Paleo, Vegan, Keto, standard</b> diet options.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Excludes custom ingredients or <b>allergies</b> automatically.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Minimizes food waste by <b>re-using greens</b>.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Compares <b>3+ substitution alternatives</b> per major food component.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/5 py-8 text-center text-sm text-zinc-500">
        <p>© 2026 CookPilot AI. Developed for PromptWars. All rights reserved.</p>
      </footer>
    </div>
  );
}
