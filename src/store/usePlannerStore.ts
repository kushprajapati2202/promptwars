import { create } from 'zustand';
import { PlannerInput, PlannerOutput, UserRecord } from '@/types/planner';

interface PlannerStore {
  user: UserRecord | null;
  isAuthenticated: boolean;
  plannerInput: PlannerInput | null;
  plannerOutput: PlannerOutput | null;
  loading: boolean;
  error: string | null;
  activeTab: string;
  login: (name: string, email: string, id?: string) => void;
  logout: () => void;
  setPlannerInput: (input: PlannerInput) => void;
  setPlannerOutput: (output: PlannerOutput) => void;
  setActiveTab: (tab: string) => void;
  generatePlan: (input: PlannerInput) => Promise<boolean>;
  clearPlan: () => void;
}

const DEFAULT_USER: UserRecord = {
  id: 'guest_chef_123',
  name: 'Guest Chef',
  email: 'chef@cookpilot.ai',
  createdAt: new Date().toISOString(),
};

export const usePlannerStore = create<PlannerStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  plannerInput: null,
  plannerOutput: null,
  loading: false,
  error: null,
  activeTab: 'meals',

  login: (name: string, email: string, id?: string) => {
    const newUser: UserRecord = {
      id: id || `user_${Math.random().toString(36).substring(2, 11)}`,
      name,
      email,
      createdAt: new Date().toISOString(),
    };
    set({ user: newUser, isAuthenticated: true });
    // Save to local storage for persistence
    localStorage.setItem('cookpilot_user', JSON.stringify(newUser));
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, plannerInput: null, plannerOutput: null });
    localStorage.removeItem('cookpilot_user');
    localStorage.removeItem('cookpilot_plan_input');
    localStorage.removeItem('cookpilot_plan_output');
  },

  setPlannerInput: (input: PlannerInput) => {
    set({ plannerInput: input });
    localStorage.setItem('cookpilot_plan_input', JSON.stringify(input));
  },

  setPlannerOutput: (output: PlannerOutput) => {
    set({ plannerOutput: output });
    localStorage.setItem('cookpilot_plan_output', JSON.stringify(output));
  },

  setActiveTab: (tab: string) => set({ activeTab: tab }),

  generatePlan: async (input: PlannerInput) => {
    set({ loading: true, error: null });
    get().setPlannerInput(input);

    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok || data.status === 'error') {
        throw new Error(data.reason || 'Failed to generate meal plan. Please check budget constraints and try again.');
      }

      get().setPlannerOutput(data);
      set({ loading: false });
      return true;
    } catch (err: any) {
      set({ error: err.message || 'An unexpected error occurred.', loading: false });
      return false;
    }
  },

  clearPlan: () => {
    set({ plannerInput: null, plannerOutput: null, error: null });
    localStorage.removeItem('cookpilot_plan_input');
    localStorage.removeItem('cookpilot_plan_output');
  },
}));

// Client-side initialization helper
export const initializeStore = () => {
  if (typeof window === 'undefined') return;

  const storedUser = localStorage.getItem('cookpilot_user');
  const storedInput = localStorage.getItem('cookpilot_plan_input');
  const storedOutput = localStorage.getItem('cookpilot_plan_output');

  if (storedUser) {
    try {
      usePlannerStore.setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    } catch (e) {
      localStorage.removeItem('cookpilot_user');
    }
  } else {
    // Standard auto-auth for easy demo
    usePlannerStore.setState({
      user: DEFAULT_USER,
      isAuthenticated: true,
    });
    localStorage.setItem('cookpilot_user', JSON.stringify(DEFAULT_USER));
  }

  if (storedInput) {
    try {
      usePlannerStore.setState({ plannerInput: JSON.parse(storedInput) });
    } catch (e) {
      localStorage.removeItem('cookpilot_plan_input');
    }
  }

  if (storedOutput) {
    try {
      usePlannerStore.setState({ plannerOutput: JSON.parse(storedOutput) });
    } catch (e) {
      localStorage.removeItem('cookpilot_plan_output');
    }
  }
};
