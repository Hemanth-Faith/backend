import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const clearUserData = () => {
    // Clear all user-specific data but keep auth credentials
    const keysToKeep = ['user_email', 'user_password', 'theme', 'work_mode', 'sound_enabled', 'notifications_enabled'];
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !keysToKeep.includes(key)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  const initializeDummyData = () => {
    // Set up fresh dummy goals for new user
    const dummyGoals = JSON.stringify([
      {
        id: 'dummy-1',
        title: 'Morning Exercise',
        description: 'Start your day with a 20-minute workout',
        effort: 'medium',
        frequency: 'daily',
        completedDates: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 'dummy-2',
        title: 'Read for 30 minutes',
        description: 'Expand your knowledge through reading',
        effort: 'light',
        frequency: 'daily',
        completedDates: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 'dummy-3',
        title: 'Work on side project',
        description: 'Make progress on your personal projects',
        effort: 'heavy',
        frequency: 'weekly',
        completedDates: [],
        createdAt: new Date().toISOString()
      }
    ]);
    
    localStorage.setItem('goals', dummyGoals);
    localStorage.setItem('streaks', '{}');
  };

  const login = (email: string, password: string): boolean => {
    // Check for hardcoded admin credentials
    if (email === 'admin@1234' && password === '1234') {
      clearUserData();
      initializeDummyData();
      
      const newUser = {
        email: 'admin@1234',
        name: 'Admin User',
        avatar: '👤',
      };
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      return true;
    }

    // Check for registered user credentials
    const savedEmail = localStorage.getItem('user_email');
    const savedPassword = localStorage.getItem('user_password');
    
    if (email === savedEmail && password === savedPassword) {
      // Check if this is first login for this user
      const userDataKey = `user_data_${email}`;
      const hasExistingData = localStorage.getItem(userDataKey);
      
      if (!hasExistingData) {
        // New user - clear old data and initialize fresh
        clearUserData();
        initializeDummyData();
        localStorage.setItem(userDataKey, 'initialized');
      }
      
      const newUser = {
        email: email,
        name: email.split('@')[0],
        avatar: '👤',
      };
      setUser(newUser);
      localStorage.setItem('auth_user', JSON.stringify(newUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    // Note: We keep user data so they can resume when logging back in
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
