import { useState, useEffect } from 'react';
import { AppState, Goal, Streak, ProgressEntry } from '@shared/types';

const STORAGE_KEY = 'worktracker-state';

const initialState: AppState = {
  goals: [
    {
      id: '1',
      title: 'Morning Meditation',
      description: 'Start day with 10 min meditation',
      effort: 'light',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completed: false,
      completedDates: [],
    },
    {
      id: '2',
      title: 'Write 500 words',
      description: 'Daily writing practice',
      effort: 'medium',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completed: false,
      completedDates: [],
    },
  ],
  streaks: {
    '1': { goalId: '1', currentStreak: 0, longestStreak: 0 },
    '2': { goalId: '2', currentStreak: 0, longestStreak: 0 },
  },
  progress: [],
  hasSeenOnboarding: false,
};

export const useWorkTrackerState = () => {
  const [state, setState] = useState<AppState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch {
        console.error('Failed to load state from localStorage');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'completed' | 'completedDates'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
      completedDates: [],
    };
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal],
      streaks: {
        ...prev.streaks,
        [newGoal.id]: { goalId: newGoal.id, currentStreak: 0, longestStreak: 0 },
      },
    }));
    return newGoal;
  };

  const completeGoal = (goalId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => {
      const goal = prev.goals.find(g => g.id === goalId);
      
      // Check if already completed today
      if (goal && goal.completedDates.includes(today)) {
        return prev; // Already completed today, no changes
      }

      const updatedGoals = prev.goals.map(g => {
        if (g.id === goalId) {
          return {
            ...g,
            completed: true,
            completedDates: [...new Set([...g.completedDates, today])],
          };
        }
        return g;
      });

      const updatedStreaks = { ...prev.streaks };
      const streak = updatedStreaks[goalId];
      if (streak) {
        // Only update streak if not already updated today
        if (streak.lastCompletedDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          // Continue streak if completed yesterday, otherwise reset to 1
          if (streak.lastCompletedDate === yesterday) {
            streak.currentStreak = (streak.currentStreak || 0) + 1;
          } else {
            streak.currentStreak = 1;
          }
          if (streak.currentStreak > (streak.longestStreak || 0)) {
            streak.longestStreak = streak.currentStreak;
          }
          streak.lastCompletedDate = today;
        }
      }

      return {
        ...prev,
        goals: updatedGoals,
        streaks: updatedStreaks,
      };
    });
  };

  const resetGoalDaily = (goalId: string) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.map(g => (g.id === goalId ? { ...g, completed: false } : g)),
    }));
  };

  const deleteGoal = (goalId: string) => {
    setState(prev => {
      const { [goalId]: _, ...remainingStreaks } = prev.streaks;
      return {
        ...prev,
        goals: prev.goals.filter(g => g.id !== goalId),
        streaks: remainingStreaks,
      };
    });
  };

  const markOnboardingComplete = () => {
    setState(prev => ({
      ...prev,
      hasSeenOnboarding: true,
    }));
  };

  const getStreakForGoal = (goalId: string): Streak | undefined => {
    return state.streaks[goalId];
  };

  return {
    state,
    isLoaded,
    addGoal,
    completeGoal,
    resetGoalDaily,
    deleteGoal,
    markOnboardingComplete,
    getStreakForGoal,
  };
};
