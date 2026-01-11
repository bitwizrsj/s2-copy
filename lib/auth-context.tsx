'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: 'superadmin' | 'admin' | 'teacher' | 'parent' | 'student';
  institutionId: number | null;
  isPasswordChanged: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateProfile: (data: { firstName?: string; lastName?: string }) => Promise<void>;
  isAuthenticated: boolean;
  refreshUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper functions for cookies
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getUserFromCookie = (): User | null => {
    const userCookie = getCookie('user');
    if (!userCookie) return null;
    
    try {
      return JSON.parse(decodeURIComponent(userCookie));
    } catch {
      return null;
    }
  };

  const refreshUser = () => {
    const userData = getUserFromCookie();
    setUser(userData);
  };

  useEffect(() => {
    refreshUser();
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Login failed');
    }

    const { token, user: userData } = data.data;

    setCookie('token', token);
    setCookie('user', encodeURIComponent(JSON.stringify(userData)));
    setUser(userData);

    if (data.data.requiresPasswordChange || !userData.isPasswordChanged) {
      router.push('/change-password');
      return;
    }

    router.push(`/dashboard/${role}`);
  };

  const logout = () => {
    deleteCookie('token');
    deleteCookie('user');
    setUser(null);
    router.push('/');
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const token = getCookie('token');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to change password');
    }

    if (data.data.token) {
      setCookie('token', data.data.token);
    }

    if (user) {
      const updatedUser = { ...user, isPasswordChanged: true };
      setCookie('user', encodeURIComponent(JSON.stringify(updatedUser)));
      setUser(updatedUser);
    }
  };

  const updateProfile = async (data: { firstName?: string; lastName?: string }) => {
    const token = getCookie('token');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users/${user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update profile');
    }

    if (user) {
      const updatedUser = { ...user, ...data };
      setCookie('user', encodeURIComponent(JSON.stringify(updatedUser)));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    changePassword,
    updateProfile,
    isAuthenticated: !!user,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
