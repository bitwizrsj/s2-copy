'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  User,
  ShieldCheck,
  Building2,
} from 'lucide-react';

type Role = 'student' | 'parent' | 'teacher' | 'admin' | 'superadmin';

interface SidebarProps {
  role: Role;
  onLogout?: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navigationItems: Record<Role, NavItem[]> = {
  student: [
    { name: 'Dashboard', href: '/dashboard/student', icon: LayoutDashboard },
    { name: 'Profile', href: '/dashboard/student/profile', icon: User },
    { name: 'Settings', href: '/dashboard/student/settings', icon: Settings },
  ],
  parent: [
    { name: 'Dashboard', href: '/dashboard/parent', icon: LayoutDashboard },
    { name: 'Profile', href: '/dashboard/parent/profile', icon: User },
    { name: 'Settings', href: '/dashboard/parent/settings', icon: Settings },
  ],
  teacher: [
    { name: 'Dashboard', href: '/dashboard/teacher', icon: LayoutDashboard },
    { name: 'Profile', href: '/dashboard/teacher/profile', icon: User },
    { name: 'Settings', href: '/dashboard/teacher/settings', icon: Settings },
  ],
  admin: [
    { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/dashboard/admin/users', icon: Users },
    { name: 'Profile', href: '/dashboard/admin/profile', icon: User },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ],
  superadmin: [
    { name: 'Dashboard', href: '/dashboard/superadmin', icon: LayoutDashboard },
    { name: 'Admins', href: '/dashboard/superadmin/admins', icon: ShieldCheck },
    { name: 'Users', href: '/dashboard/superadmin/users', icon: Users },
    { name: 'Institutions', href: '/dashboard/superadmin/institutions', icon: Building2 },
    { name: 'Profile', href: '/dashboard/superadmin/profile', icon: User },
    { name: 'Settings', href: '/dashboard/superadmin/settings', icon: Settings },
  ],
};

export function Sidebar({ role, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const items = navigationItems[role];

  const roleLabels: Record<Role, string> = {
    superadmin: 'Super Admin',
    admin: 'Admin',
    teacher: 'Teacher',
    parent: 'Parent',
    student: 'Student',
  };

  return (
    <div
      className={cn(
        'relative flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">EduSmart</h2>
              <p className="text-xs text-gray-500">{roleLabels[role]} Portal</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
          data-testid="sidebar-toggle"
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform',
              collapsed && 'rotate-180'
            )}
          />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href}>
                <div
                  data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 group',
                    isActive &&
                      'bg-primary text-primary-foreground hover:bg-primary/90',
                    collapsed && 'justify-center'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 flex-shrink-0',
                      !collapsed && 'mr-3',
                      isActive
                        ? 'text-primary-foreground'
                        : 'text-gray-500 group-hover:text-gray-700'
                    )}
                  />
                  {!collapsed && (
                    <span
                      className={cn(
                        isActive
                          ? 'text-primary-foreground'
                          : 'text-gray-700'
                      )}
                    >
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-3 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          data-testid="sidebar-logout"
          className={cn(
            'w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className={cn('h-4 w-4', !collapsed && 'mr-3')} />
          {!collapsed && 'Sign Out'}
        </Button>
      </div>
    </div>
  );
}
