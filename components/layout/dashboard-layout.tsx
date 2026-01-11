'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, User } from '@/lib/auth-context';
import { Sidebar } from './sidebar';
import { Header } from './header';

type Role = 'superadmin' | 'admin' | 'teacher' | 'parent' | 'student';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: Role;
  title: string;
}

export function DashboardLayout({ children, role, title }: DashboardLayoutProps) {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/');
        return;
      }
      
      if (user && user.role !== role) {
        router.push(`/dashboard/${user.role}`);
        return;
      }

      if (user && !user.isPasswordChanged) {
        router.push('/change-password');
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, role, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || user.role !== role) {
    return null;
  }

  const userName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user.email.split('@')[0];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={role} onLogout={logout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} role={role} userName={userName} onLogout={logout} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
