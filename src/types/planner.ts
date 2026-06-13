export interface PlannerInput {
  people: number;
  budget: number;
  diet: string;
  allergies: string[];
  healthGoal: string;
  cookingTime: number;
  energyLevel: string;
  cuisine: string;
  ingredientsAvailable: string[];
}

export interface MealDetails {
  meal: string;
  prepTime: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  reason: string;
}

export interface MealPlan {
  breakfast: MealDetails;
  lunch: MealDetails;
  dinner: MealDetails;
}

export interface GroceryItem {
  item: string;
  quantity: string;
  estimatedCost: number;
}

export interface GroceryList {
  mustBuy: GroceryItem[];
  optional: GroceryItem[];
  premium: GroceryItem[];
}

export interface Substitution {
  ingredient: string;
  alternatives: string[];
}

export interface BudgetAnalysis {
  budget: number;
  estimatedCost: number;
  difference: number;
  status: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  score: number;
}

export interface TimelineTask {
  duration: string;
  priority: "High" | "Medium" | "Low";
  instructions: string;
}

export interface CookingTimeline {
  morning: TimelineTask[];
  afternoon: TimelineTask[];
  evening: TimelineTask[];
}

export interface LeftoverNextDayMeal {
  meal: string;
  ingredientsUsed: string[];
  prepTime: string;
}

export interface LeftoverPlan {
  remainingIngredients: string[];
  nextDayMeals: LeftoverNextDayMeal[];
}

export interface DecisionEngine {
  reasons: string[];
}

export type PlannerSuccessOutput = {
  status: "success";
  userSummary: {
    people: number;
    budget: number;
    diet: string;
    goal: string;
  };
  mealPlan: MealPlan;
  groceryList: GroceryList;
  substitutions: Substitution[];
  budgetAnalysis: BudgetAnalysis;
  nutrition: NutritionInfo;
  timeline: CookingTimeline;
  leftoverPlan: LeftoverPlan;
  decisionEngine: DecisionEngine;
  recommendations: string[];
};

export type PlannerOutput = 
  | PlannerSuccessOutput
  | {
      status: "error";
      reason: string;
    };

// Database schemas matching Supabase tables
export interface UserRecord {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface MealPlanRecord {
  id: string;
  userId: string;
  inputJson: PlannerInput;
  outputJson: PlannerOutput;
  createdAt: string;
}

export interface GroceryListRecord {
  id: string;
  mealPlanId: string;
  groceryJson: GroceryList;
}

export interface AnalyticsRecord {
  id: string;
  userId: string;
  nutritionScore: number;
  wasteScore: number;
  budgetScore: number;
}
