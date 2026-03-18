import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeJsonParse } from '../lib/storage';
import { loginWithEmail, logoutSession, signupWithEmail, type AuthUser } from '../services/authService';

type User = AuthUser;

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user_profile');
    return safeJsonParse<User | null>(saved, null);
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('user_profile');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const nextUser = await loginWithEmail(email, password);
    setUser(nextUser);
  };

  const signup = async (email: string, password: string, name: string) => {
    const nextUser = await signupWithEmail(email, password, name);
    setUser(nextUser);
  };

  const logout = () => {
    void logoutSession().catch(() => {
      // Local logout still succeeds even if backend session cleanup fails.
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
