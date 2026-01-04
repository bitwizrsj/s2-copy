'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Key, 
  Plus,
  Edit,
  Trash2,
  Shield,
  Users,
  BookOpen,
  CreditCard,
  Settings,
  BarChart3,
  MessageSquare,
  FileText,
  CheckCircle2
} from 'lucide-react';

export default function SuperAdminRoles() {
  const roles = [
    { 
      id: 1, 
      name: 'Super Admin', 
      description: 'Full system access with all permissions', 
      users: 13, 
      color: 'bg-red-500',
      permissions: ['all']
    },
    { 
      id: 2, 
      name: 'School Admin', 
      description: 'Institution-level administrative access', 
      users: 232, 
      color: 'bg-orange-500',
      permissions: ['users', 'classes', 'fees', 'reports', 'settings']
    },
    { 
      id: 3, 
      name: 'Teacher', 
      description: 'Teaching and grading permissions', 
      users: 4850, 
      color: 'bg-blue-500',
      permissions: ['classes', 'grades', 'attendance', 'messages']
    },
    { 
      id: 4, 
      name: 'Student', 
      description: 'Student access to learning materials', 
      users: 35420, 
      color: 'bg-green-500',
      permissions: ['classes', 'grades', 'attendance', 'messages']
    },
    { 
      id: 5, 
      name: 'Parent', 
      description: 'Parent access to monitor children', 
      users: 7122, 
      color: 'bg-purple-500',
      permissions: ['grades', 'attendance', 'fees', 'messages']
    },
  ];

  const permissionGroups = [
    {
      name: 'User Management',
      icon: Users,
      permissions: [
        { id: 'users.view', name: 'View Users', description: 'View user profiles and lists' },
        { id: 'users.create', name: 'Create Users', description: 'Add new users to the system' },
        { id: 'users.edit', name: 'Edit Users', description: 'Modify user information' },
        { id: 'users.delete', name: 'Delete Users', description: 'Remove users from the system' },
      ]
    },
    {
      name: 'Academic Management',
      icon: BookOpen,
      permissions: [
        { id: 'classes.view', name: 'View Classes', description: 'View class schedules and information' },
        { id: 'classes.manage', name: 'Manage Classes', description: 'Create and modify classes' },
        { id: 'grades.view', name: 'View Grades', description: 'View student grades' },
        { id: 'grades.edit', name: 'Edit Grades', description: 'Modify student grades' },
      ]
    },
    {
      name: 'Financial Management',
      icon: CreditCard,
      permissions: [
        { id: 'fees.view', name: 'View Fees', description: 'View fee structures and payments' },
        { id: 'fees.manage', name: 'Manage Fees', description: 'Create and modify fee structures' },
        { id: 'payments.process', name: 'Process Payments', description: 'Handle payment transactions' },
      ]
    },
    {
      name: 'Reports & Analytics',
      icon: BarChart3,
      permissions: [
        { id: 'reports.view', name: 'View Reports', description: 'Access system reports' },
        { id: 'reports.export', name: 'Export Reports', description: 'Download reports and data' },
        { id: 'analytics.view', name: 'View Analytics', description: 'Access analytics dashboard' },
      ]
    },
    {
      name: 'System Settings',
      icon: Settings,
      permissions: [
        { id: 'settings.view', name: 'View Settings', description: 'View system configuration' },
        { id: 'settings.edit', name: 'Edit Settings', description: 'Modify system configuration' },
        { id: 'integrations.manage', name: 'Manage Integrations', description: 'Configure third-party integrations' },
      ]
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="superadmin" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Roles & Permissions" role="superadmin" userName="Super Admin" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Tabs defaultValue="roles" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="roles">Roles</TabsTrigger>
                  <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
                </TabsList>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </div>

              <TabsContent value="roles" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roles.map((role) => (
                    <Card key={role.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${role.color}`} />
                            <CardTitle className="text-lg">{role.name}</CardTitle>
                          </div>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardDescription>{role.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{role.users.toLocaleString()} users</span>
                          </div>
                          <Badge variant="outline">
                            {role.permissions.includes('all') ? 'Full Access' : `${role.permissions.length} modules`}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-6">
                {permissionGroups.map((group, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <group.icon className="h-5 w-5 mr-2" />
                        {group.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Permission</th>
                              {roles.map((role) => (
                                <th key={role.id} className="text-center py-3 px-4 font-medium">
                                  <div className="flex items-center justify-center space-x-1">
                                    <div className={`w-2 h-2 rounded-full ${role.color}`} />
                                    <span className="text-sm">{role.name}</span>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {group.permissions.map((permission) => (
                              <tr key={permission.id} className="border-b last:border-0">
                                <td className="py-3 px-4">
                                  <div className="font-medium text-sm">{permission.name}</div>
                                  <div className="text-xs text-gray-500">{permission.description}</div>
                                </td>
                                {roles.map((role) => (
                                  <td key={role.id} className="text-center py-3 px-4">
                                    <Switch 
                                      defaultChecked={role.permissions.includes('all') || role.name !== 'Student'}
                                      disabled={role.name === 'Super Admin'}
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
