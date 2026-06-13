import type { Metadata } from "next";
import "./globals.css";
import StoreInitializer from "@/components/shared/StoreInitializer";

export const metadata: Metadata = {
  title: "CookPilot AI — Intelligent Meal Planner, Grocery Optimizer & Budget Assistant",
  description: "Generate personalized daily meal plans, optimized grocery shopping lists, ingredient substitutions, nutrition metrics, and leftover strategies powered by Gemini 2.5 Flash.",
  keywords: ["meal planner", "ai chef", "budget cooking", "grocery list", "nutrition calculator", "leftover recipes", "food waste reduction"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <StoreInitializer />
        {children}
      </body>
    </html>
  );
}
