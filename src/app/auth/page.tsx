'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlannerStore } from '@/store/usePlannerStore';
import { ChefHat, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const router = useRouter();
  const { login, isAuthenticated } = usePlannerStore();
  const [loading, setLoading] = useState(false);

  // Redirect to planner if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/planner');
    }
  }, [isAuthenticated, router]);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate OAuth handshake
    setTimeout(() => {
      login("Alex Mercer", "alex.mercer@gmail.com", "user_google_99812");
      setLoading(false);
      router.push('/planner');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative bg-background text-foreground">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
            <ChefHat className="w-6 h-6 text-emerald-950 stroke-[2.5]" />
          </div>
          <h2 className="text-3xl font-display font-extrabold tracking-tight">Welcome to CookPilot</h2>
          <p className="text-sm text-zinc-400 mt-2">Intelligent meal planning and cost optimization</p>
        </div>

        <div className="glass-panel p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />
          
          <h3 className="text-xl font-bold mb-6 text-center">Sign In</h3>

          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 px-5 py-4 bg-white text-zinc-900 rounded-2xl hover:bg-zinc-100 active:scale-98 transition-all font-semibold shadow-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.69c-.29 1.5-.1.8-1.95 2.04v2.53h3.15c1.84-1.7 2.9-4.2 2.9-7.1h-.095z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.15-2.53c-.88.6-2 .95-3.15.95-3.13 0-5.78-2.11-6.73-4.96H.72v2.61C2.7 21.09 7.02 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27 14.55A7.16 7.16 0 0 1 4.8 12c0-.9.16-1.76.47-2.55V6.84H.72A11.94 11.94 0 0 0 0 12c0 1.92.45 3.74 1.25 5.37l4.02-2.82z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.02 0 2.7 2.91.72 6.84l4.55 3.55c.95-2.85 3.6-4.96 6.73-4.96z"
                  />
                </svg>
              )}
              {loading ? "Connecting to Google..." : "Continue with Google"}
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-xs text-zinc-500 uppercase tracking-wider">Investor Demo Note</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <div className="text-xs text-zinc-400 space-y-2 bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed">
              <p className="flex items-start gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Google OAuth is configured with mock credentials for immediate local testing.</span>
              </p>
              <p>Clicking the button will instantly log you in as a verified member and grant access to the dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
