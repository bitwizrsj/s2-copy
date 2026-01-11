'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { Users, GraduationCap, UserCheck, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Students', value: '1,247', icon: GraduationCap, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Teachers', value: '87', icon: UserCheck, color: 'bg-green-100 text-green-600' },
    { title: 'Total Parents', value: '892', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { title: 'Classes Today', value: '24', icon: Calendar, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold">Welcome, Administrator!</h2>
          <p className="text-orange-100 mt-1">Manage your institution&apos;s users and settings.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/dashboard/admin/users" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-semibold">Manage Users</h3>
                <p className="text-sm text-gray-500">Create teachers, parents, and students</p>
              </a>
              <a href="/dashboard/admin/profile" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <UserCheck className="h-8 w-8 text-green-500 mb-2" />
                <h3 className="font-semibold">My Profile</h3>
                <p className="text-sm text-gray-500">View and edit your profile</p>
              </a>
              <a href="/dashboard/admin/settings" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="h-8 w-8 text-purple-500 mb-2" />
                <h3 className="font-semibold">Settings</h3>
                <p className="text-sm text-gray-500">Update password and preferences</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
