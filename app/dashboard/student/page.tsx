'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { BookOpen, Calendar, Award, FileText } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();

  const stats = [
    { title: 'My Classes', value: '6', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { title: 'Upcoming Tests', value: '2', icon: Calendar, color: 'bg-orange-100 text-orange-600' },
    { title: 'Current GPA', value: '3.8', icon: Award, color: 'bg-green-100 text-green-600' },
    { title: 'Assignments Due', value: '4', icon: FileText, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <DashboardLayout role="student" title="Student Dashboard">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold">Welcome, Student!</h2>
          <p className="text-blue-100 mt-1">Track your progress and stay on top of your studies.</p>
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

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Student Portal</CardTitle>
            <CardDescription>Access your academic resources</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Welcome to the EduSmart Student Portal. Use the sidebar to navigate to your profile and settings.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
