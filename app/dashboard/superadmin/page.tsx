'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Globe,
  Server,
  Database,
  Zap
} from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="superadmin" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Super Admin Dashboard" role="superadmin" userName="Super Admin" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Global Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Institutions</p>
                      <p className="text-2xl font-bold text-blue-600">156</p>
                      <p className="text-xs text-green-600 mt-1">+12 this month</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-green-600">48,392</p>
                      <p className="text-xs text-green-600 mt-1">+1,247 this month</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-purple-600">$1.2M</p>
                      <p className="text-xs text-green-600 mt-1">+18% vs last month</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                      <p className="text-2xl font-bold text-orange-600">3,847</p>
                      <p className="text-xs text-gray-500 mt-1">Real-time</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Activity className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card className="ai-gradient text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Platform Health Overview
                </CardTitle>
                <CardDescription className="text-white/80">
                  Real-time system monitoring and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Server className="h-5 w-5 text-green-300" />
                      <h4 className="font-medium">API Servers</h4>
                    </div>
                    <p className="text-2xl font-bold">99.9%</p>
                    <p className="text-sm text-white/70">Uptime</p>
                  </div>
                  
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Database className="h-5 w-5 text-blue-300" />
                      <h4 className="font-medium">Database</h4>
                    </div>
                    <p className="text-2xl font-bold">45ms</p>
                    <p className="text-sm text-white/70">Avg Response</p>
                  </div>
                  
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-5 w-5 text-yellow-300" />
                      <h4 className="font-medium">CDN</h4>
                    </div>
                    <p className="text-2xl font-bold">12ms</p>
                    <p className="text-sm text-white/70">Latency</p>
                  </div>
                  
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <ShieldCheck className="h-5 w-5 text-green-300" />
                      <h4 className="font-medium">Security</h4>
                    </div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-sm text-white/70">Active Threats</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Institutions */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Institution Registrations</CardTitle>
                  <CardDescription>New schools joining the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Springfield High School', location: 'California, USA', students: 1250, status: 'active' },
                    { name: 'Oak Valley Academy', location: 'Texas, USA', students: 890, status: 'pending' },
                    { name: 'Riverside International', location: 'Florida, USA', students: 2100, status: 'active' },
                    { name: 'Maple Grove School', location: 'New York, USA', students: 650, status: 'review' },
                  ].map((school, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{school.name}</div>
                          <div className="text-sm text-gray-500">{school.location} • {school.students} students</div>
                        </div>
                      </div>
                      <Badge variant={
                        school.status === 'active' ? 'default' :
                        school.status === 'pending' ? 'destructive' : 'secondary'
                      }>
                        {school.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Alerts & Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Storage Warning</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">Storage at 85% capacity</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Backup Complete</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">Daily backup successful</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Growth Alert</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">12 new institutions this week</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subscription Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { plan: 'Enterprise', count: 45, percentage: 29, color: 'bg-purple-500' },
                    { plan: 'Professional', count: 68, percentage: 44, color: 'bg-blue-500' },
                    { plan: 'Basic', count: 32, percentage: 20, color: 'bg-green-500' },
                    { plan: 'Trial', count: 11, percentage: 7, color: 'bg-gray-500' },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.plan}</span>
                        <span className="text-gray-500">{item.count} institutions ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$1.2M</div>
                      <div className="text-sm text-gray-600">This Month</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">$12.4M</div>
                      <div className="text-sm text-gray-600">YTD Revenue</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>MRR Growth</span>
                      <span className="text-green-600 font-medium">+18.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Churn Rate</span>
                      <span className="text-gray-600 font-medium">2.3%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ARPU</span>
                      <span className="text-gray-600 font-medium">$7,692</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
