'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ShieldCheck, 
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  MoreVertical,
  UserCog
} from 'lucide-react';

export default function SuperAdminAdmins() {
  const [searchTerm, setSearchTerm] = useState('');

  const admins = [
    { id: 1, name: 'John Smith', email: 'john.smith@springfield.edu', phone: '+1 234 567 8901', institution: 'Springfield High School', role: 'School Admin', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@oakvalley.edu', phone: '+1 234 567 8902', institution: 'Oak Valley Academy', role: 'School Admin', status: 'active', lastLogin: '1 day ago' },
    { id: 3, name: 'Michael Chen', email: 'mchen@riverside.edu', phone: '+1 234 567 8903', institution: 'Riverside International', role: 'Super Admin', status: 'active', lastLogin: '30 minutes ago' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@maplegrove.edu', phone: '+1 234 567 8904', institution: 'Maple Grove School', role: 'School Admin', status: 'inactive', lastLogin: '1 week ago' },
    { id: 5, name: 'Robert Wilson', email: 'rwilson@sunset.edu', phone: '+1 234 567 8905', institution: 'Sunset Academy', role: 'School Admin', status: 'active', lastLogin: '5 hours ago' },
  ];

  const stats = {
    total: 245,
    schoolAdmins: 232,
    superAdmins: 13,
    active: 238
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="superadmin" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Admin Management" role="superadmin" userName="Super Admin" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Total Admins</p>
                      <p className="text-2xl font-bold text-purple-900">{stats.total}</p>
                    </div>
                    <UserCog className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">School Admins</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.schoolAdmins}</p>
                    </div>
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Super Admins</p>
                      <p className="text-2xl font-bold text-orange-900">{stats.superAdmins}</p>
                    </div>
                    <ShieldCheck className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Active</p>
                      <p className="text-2xl font-bold text-green-900">{stats.active}</p>
                    </div>
                    <ShieldCheck className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search admins..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Admin
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Admins List */}
            <Card>
              <CardHeader>
                <CardTitle>All Administrators</CardTitle>
                <CardDescription>Manage institution administrators and super admins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {admins.map((admin) => (
                    <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className={admin.role === 'Super Admin' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}>
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-lg">{admin.name}</div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {admin.email}
                            </span>
                            <span className="flex items-center">
                              <Building2 className="h-3 w-3 mr-1" />
                              {admin.institution}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant={admin.role === 'Super Admin' ? 'default' : 'secondary'} className="mb-1">
                            {admin.role}
                          </Badge>
                          <div className="text-xs text-gray-500">Last login: {admin.lastLogin}</div>
                        </div>
                        <Badge variant={admin.status === 'active' ? 'default' : 'secondary'}>
                          {admin.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
