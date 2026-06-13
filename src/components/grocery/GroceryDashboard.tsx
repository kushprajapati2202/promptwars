'use client';

import React, { useState } from 'react';
import { GroceryList, GroceryItem } from '@/types/planner';
import { Check, ShoppingBag, Plus, Sparkles, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface GroceryDashboardProps {
  groceryList: GroceryList;
}

export default function GroceryDashboard({ groceryList }: GroceryDashboardProps) {
  // Client state to track checked off items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const sections: { key: keyof GroceryList; title: string; subtitle: string; themeColor: string; bgBadge: string }[] = [
    { 
      key: 'mustBuy', 
      title: 'Must Buy Ingredients', 
      subtitle: 'Staples required for primary meal preparations', 
      themeColor: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
      bgBadge: 'bg-emerald-500/20 text-emerald-400'
    },
    { 
      key: 'optional', 
      title: 'Optional Add-ons', 
      subtitle: 'Optional toppings and garnishes for flavor boosts', 
      themeColor: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
      bgBadge: 'bg-amber-500/20 text-amber-400'
    },
    { 
      key: 'premium', 
      title: 'Premium Upgrades', 
      subtitle: 'Organic variations or luxury ingredient upgrades', 
      themeColor: 'border-indigo-500/20 text-indigo-400 bg-indigo-500/5',
      bgBadge: 'bg-indigo-500/20 text-indigo-400'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-display">Shopping List</h3>
        <span className="text-xs text-zinc-500">Tap items to mark as gathered</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sections.map(({ key, title, subtitle, themeColor, bgBadge }) => {
          const items = groceryList[key] || [];

          return (
            <motion.div
              key={key}
              className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                {/* Header */}
                <div className={`p-4 rounded-2xl border ${themeColor} mb-4`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold tracking-tight font-display">{title}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider">{items.length} items</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block mt-1 leading-relaxed">{subtitle}</span>
                </div>

                {/* Items list */}
                {items.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic py-4 text-center">No items listed in this tier</p>
                ) : (
                  <div className="space-y-2.5">
                    {items.map((item, idx) => {
                      const itemKey = `${key}_${idx}_${item.item}`;
                      const isChecked = !!checkedItems[itemKey];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleItem(itemKey)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border border-white/5 cursor-pointer transition-all hover:bg-white/5 ${
                            isChecked ? 'opacity-40 line-through text-zinc-500' : 'text-zinc-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Custom Checkbox */}
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                              isChecked 
                                ? 'bg-emerald-500 border-emerald-500 text-emerald-950' 
                                : 'border-zinc-700'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold">{item.item}</span>
                              <span className="text-[10px] text-zinc-500 font-semibold">{item.quantity}</span>
                            </div>
                          </div>
                          
                          <div className={`text-xs font-bold px-2 py-1 rounded-lg ${bgBadge}`}>
                            ${item.estimatedCost.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Cost summary */}
              {items.length > 0 && (
                <div className="border-t border-white/5 mt-6 pt-4 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-semibold">Tier Total Cost</span>
                  <span className="font-extrabold text-white">
                    ${items.reduce((sum, item) => sum + item.estimatedCost, 0).toFixed(2)} USD
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
