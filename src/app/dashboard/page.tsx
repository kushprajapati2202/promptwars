'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePlannerStore } from '@/store/usePlannerStore';
import OverviewCard from '@/components/dashboard/OverviewCard';
import MealPlanSection from '@/components/meal/MealPlanSection';
import GroceryDashboard from '@/components/grocery/GroceryDashboard';
import BudgetDashboard from '@/components/dashboard/BudgetDashboard';
import NutritionDashboard from '@/components/nutrition/NutritionDashboard';
import TimelineDashboard from '@/components/timeline/TimelineDashboard';
import LeftoverDashboard from '@/components/leftover/LeftoverDashboard';
import ExplainDashboard from '@/components/explain/ExplainDashboard';
import { 
  ChefHat, 
  ShoppingCart, 
  Coins, 
  Scale, 
  Clock, 
  Trash2, 
  ShieldCheck, 
  LogOut, 
  User, 
  Plus 
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { 
    user, 
    logout, 
    plannerInput, 
    plannerOutput, 
    clearPlan, 
    activeTab, 
    setActiveTab,
    isAuthenticated
  } = usePlannerStore();

  // Redirect if not logged in or no plan exists
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    } else if (!plannerOutput) {
      router.push('/planner');
    }
  }, [isAuthenticated, plannerOutput, router]);

  if (!isAuthenticated || !user || !plannerOutput || !plannerInput) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (plannerOutput.status === 'error') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="glass-panel p-6 rounded-2xl border border-red-500/20 text-red-400 text-xs text-center">
          Error loading meal plan: {plannerOutput.reason}
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'meals', label: 'Meal Plan', icon: ChefHat },
    { id: 'grocery', label: 'Grocery List', icon: ShoppingCart },
    { id: 'budget', label: 'Budget Analysis', icon: Coins },
    { id: 'nutrition', label: 'Nutrition & Macros', icon: Scale },
    { id: 'timeline', label: 'Prep Timeline', icon: Clock },
    { id: 'leftovers', label: 'Leftover Planner', icon: Trash2 },
    { id: 'explain', label: 'Decision explain', icon: ShieldCheck },
  ];

  const handleReset = () => {
    clearPlan();
    router.push('/planner');
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'meals':
        return <MealPlanSection mealPlan={plannerOutput.mealPlan} />;
      case 'grocery':
        return <GroceryDashboard groceryList={plannerOutput.groceryList} />;
      case 'budget':
        return <BudgetDashboard analysis={plannerOutput.budgetAnalysis} />;
      case 'nutrition':
        return <NutritionDashboard nutrition={plannerOutput.nutrition} />;
      case 'timeline':
        return <TimelineDashboard timeline={plannerOutput.timeline} />;
      case 'leftovers':
        return (
          <LeftoverDashboard 
            leftoverPlan={plannerOutput.leftoverPlan} 
            recommendations={plannerOutput.recommendations} 
          />
        );
      case 'explain':
        return <ExplainDashboard decision={plannerOutput.decisionEngine} />;
      default:
        return <MealPlanSection mealPlan={plannerOutput.mealPlan} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 active:scale-98 transition-transform">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
            <ChefHat className="w-4.5 h-4.5 text-emerald-950 stroke-[2.5]" />
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight">
            CookPilot<span className="text-emerald-400">.AI</span>
          </span>
        </Link>

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

      {/* Main Grid content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-8 relative">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Top Overview banner */}
        <OverviewCard input={plannerInput} output={plannerOutput} onReset={handleReset} />

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Side Navbar tabs */}
          <nav className="glass-panel p-4 rounded-3xl border border-white/5 space-y-1 lg:col-span-1">
            <div className="px-3 py-2 text-zinc-500 font-bold uppercase tracking-wider text-[10px] mb-2">
              Dashboard Viewports
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full inline-flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all text-left cursor-pointer active:scale-98 ${
                    isActive 
                      ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400' 
                      : 'text-zinc-400 border border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
            <div className="border-t border-white/5 my-3 pt-3">
              <button
                onClick={handleReset}
                className="w-full inline-flex items-center gap-3 px-4 py-3 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                Plan Another Day
              </button>
            </div>
          </nav>

          {/* Details viewport display */}
          <div className="lg:col-span-3 space-y-6">
            {renderActiveContent()}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/5 py-6 text-center text-xs text-zinc-600">
        <p>© 2026 CookPilot AI. Built for PromptWars. All rights reserved.</p>
      </footer>
    </div>
  );
}
