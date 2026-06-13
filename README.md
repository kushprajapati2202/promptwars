# CookPilot AI — Intelligent Meal Planner, Grocery Optimizer & Budget Assistant

CookPilot AI is a production-ready, premium AI-powered meal planner, grocery list compiler, budget assistant, and leftover manager. The application simulates an advanced **8-Agent reasoning pipeline** powered by **Gemini 2.5 Flash** using structured JSON output, paired with **Supabase** logs, **Zustand** state, and **Recharts** visualizations.

---

## 🚀 Key Features

* **Multi-Agent Reasoning Pipeline**: Orchestrates a 8-step simulation flow:
  `Profiler ➔ Planner ➔ Budgeter ➔ Nutrition ➔ Grocery ➔ Substitutes ➔ Leftover ➔ Explainer`
* **Budget Self-Correction**: If the plan exceeds your budget, the engine automatically replaces premium ingredients with staples, recalculates pricing, and returns a fully optimized plan.
* **Leftover & Waste Predictor**: Predicts ingredients left after dinner and suggests next-day meal creations to achieve zero waste.
* **XAI Explainability**: Highlights why each meal was chosen (allergy alignment, budget fitting, and energy-level constraints).
* **Multi-dimensional Scoring**: Generates an overall rating based on personalization (40%), budget (20%), macros (15%), leftovers (10%), and time (10%).

---

## 🛠 Tech Stack

* **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons
* **Backend**: Next.js Route Handlers
* **State Management**: Zustand
* **Form & Validation**: React Hook Form, Zod
* **AI Model**: Gemini 2.5 Flash (Structured Response Engine)
* **Database**: Supabase (PostgreSQL)

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── api/
│   │   └── plan/
│   │       └── route.ts        # Input validation (Zod) and Gemini API call
│   ├── auth/
│   │   └── page.tsx            # Premium Google Login landing screen
│   ├── dashboard/
│   │   └── page.tsx            # Master viewport managing dashboard tabs
│   ├── planner/
│   │   └── page.tsx            # Form router mounting PlannerForm
│   ├── globals.css             # Tailwind v4 theme, animations, glassmorphism CSS
│   └── layout.tsx              # SEO titles, meta descriptions, and hydration wrapper
├── components/
│   ├── dashboard/
│   │   ├── BudgetDashboard.tsx # Progress indicators and spent surplus details
│   │   └── OverviewCard.tsx    # Circular SVG gauge displaying overall score
│   ├── explain/
│   │   └── ExplainDashboard.tsx# SAT checklist and 8-Agent pipeline nodes map
│   ├── forms/
│   │   └── PlannerForm.tsx     # Hook Form with dropdowns and tag lists
│   ├── grocery/
│   │   └── GroceryDashboard.tsx# Must Buy, Optional, and Premium list checkboxes
│   ├── leftover/
│   │   └── LeftoverDashboard.tsx# Remaining items, tomorrow's ideas, and waste tips
│   ├── meal/
│   │   └── MealPlanSection.tsx # Breakfast, Lunch, and Dinner macro cards
│   ├── nutrition/
│   │   └── NutritionDashboard.tsx# Calorie calculations and Recharts visualizer
│   └── shared/
│       └── StoreInitializer.tsx# Hydrates localStorage client data on load
├── services/
│   ├── gemini.ts               # Gemini client connection and Mock fallback builder
│   └── supabase.ts             # Supabase client credentials and localStorage DB fallback
├── store/
│   └── usePlannerStore.ts      # Zustand central store managing data states
└── types/
    └── planner.ts              # TypeScript interface contracts
```

---

## 🗄 Database Schema (Supabase SQL)

Copy and run the following queries inside the **Supabase SQL Editor** to bootstrap the required tables:

```sql
-- 1. Create Users Table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Meal Plans Table
CREATE TABLE meal_plans (
  id TEXT PRIMARY KEY,
  "userId" TEXT REFERENCES users(id) ON DELETE CASCADE,
  "inputJson" TEXT NOT NULL,
  "outputJson" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Grocery Lists Table
CREATE TABLE grocery_lists (
  id TEXT PRIMARY KEY,
  "mealPlanId" TEXT REFERENCES meal_plans(id) ON DELETE CASCADE,
  "groceryJson" TEXT NOT NULL
);

-- 4. Create Analytics Table
CREATE TABLE analytics (
  id TEXT PRIMARY KEY,
  "userId" TEXT REFERENCES users(id) ON DELETE CASCADE,
  "nutritionScore" INTEGER NOT NULL,
  "wasteScore" INTEGER NOT NULL,
  "budgetScore" INTEGER NOT NULL
);
```

---

## ⚙️ Environment Variables

Create a `.env` or `.env.local` file in the project root:

```env
# Gemini AI Configuration (Sign up at https://aistudio.google.com to get your API key)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Credentials (Optional: falls back to LocalStorage DB if left blank)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## 💻 Local Setup Instructions

1. Clone or navigate into the workspace:
   ```bash
   cd promptwars
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Run the development server:
   ```bash
   npx next dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Deployment Guide (Vercel)

1. Push your code repository to GitHub/GitLab.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the repository.
4. Expand **Environment Variables** and add:
   * `GEMINI_API_KEY`
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**. Vercel will build and serve your CookPilot AI application in seconds!
