'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  institutionId: number | null;
  isPasswordChanged: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: string) => Promise<any>;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<any>;
  isAuthenticated: boolean;
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
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Parse user from cookie
  const getUserFromCookie = (): User | null => {
    const userCookie = getCookie('user');
    if (!userCookie) return null;
    
    try {
      return JSON.parse(decodeURIComponent(userCookie));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const userData = getUserFromCookie();
    if (userData) {
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      const { token, user: userData } = data.data;

      // Set auth cookies
      setCookie('token', token);
      setCookie('user', encodeURIComponent(JSON.stringify(userData)));
      
      // Update state
      setUser(userData);

      // Check if password needs to be changed
      if (data.data.requiresPasswordChange || !userData.isPasswordChanged) {
        router.push('/change-password');
        return;
      }

      // Redirect based on role
      router.push(`/dashboard/${role}`);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Clear cookies
    deleteCookie('token');
    deleteCookie('user');
    
    // Update state
    setUser(null);
    
    // Redirect to login (root page)
    router.push('/');
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
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

      // Update token if provided
      if (data.data.token) {
        setCookie('token', data.data.token);
      }

      // Update user's password changed status
      if (user) {
        const updatedUser = { ...user, isPasswordChanged: true };
        setCookie('user', encodeURIComponent(JSON.stringify(updatedUser)));
        setUser(updatedUser);
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    changePassword,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};