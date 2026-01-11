'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { Users, ShieldCheck, Building2, Activity } from 'lucide-react';

export default function SuperAdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'Total Admins', value: '12', icon: ShieldCheck, color: 'bg-orange-100 text-orange-600' },
    { title: 'Total Users', value: '1,456', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Institutions', value: '8', icon: Building2, color: 'bg-purple-100 text-purple-600' },
    { title: 'Active Sessions', value: '234', icon: Activity, color: 'bg-green-100 text-green-600' },
  ];

  return (
    <DashboardLayout role="superadmin" title="Super Admin Dashboard">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold">Welcome, Super Admin!</h2>
          <p className="text-red-100 mt-1">You have full system access and control.</p>
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
              <a href="/dashboard/superadmin/admins" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <ShieldCheck className="h-8 w-8 text-orange-500 mb-2" />
                <h3 className="font-semibold">Manage Admins</h3>
                <p className="text-sm text-gray-500">Create and manage admin accounts</p>
              </a>
              <a href="/dashboard/superadmin/users" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-8 w-8 text-blue-500 mb-2" />
                <h3 className="font-semibold">Manage Users</h3>
                <p className="text-sm text-gray-500">View and manage all users</p>
              </a>
              <a href="/dashboard/superadmin/institutions" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Building2 className="h-8 w-8 text-purple-500 mb-2" />
                <h3 className="font-semibold">Institutions</h3>
                <p className="text-sm text-gray-500">Manage educational institutions</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
