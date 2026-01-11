'use client';

import { Bell, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

type Role = 'student' | 'parent' | 'teacher' | 'admin' | 'superadmin';

interface HeaderProps {
  title: string;
  role: Role;
  userName?: string;
  onLogout?: () => void;
}

export function Header({ title, role, userName = 'User', onLogout }: HeaderProps) {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const roleLabels: Record<Role, string> = {
    superadmin: 'Super Admin',
    admin: 'Administrator',
    teacher: 'Teacher',
    parent: 'Parent',
    student: 'Student',
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">
          Welcome back, {userName}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            0
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full" data-testid="user-menu-trigger">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {roleLabels[role]}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/${role}/profile`}>
              <DropdownMenuItem className="cursor-pointer" data-testid="profile-menu-item">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/${role}/settings`}>
              <DropdownMenuItem className="cursor-pointer" data-testid="settings-menu-item">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600" data-testid="logout-menu-item">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
