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
  Building2, 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Users,
  Calendar,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function SuperAdminInstitutions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const institutions = [
    { id: 1, name: 'Springfield High School', location: 'California, USA', students: 1250, teachers: 85, plan: 'Enterprise', status: 'active', joined: '2023-01-15' },
    { id: 2, name: 'Oak Valley Academy', location: 'Texas, USA', students: 890, teachers: 52, plan: 'Professional', status: 'active', joined: '2023-03-22' },
    { id: 3, name: 'Riverside International', location: 'Florida, USA', students: 2100, teachers: 120, plan: 'Enterprise', status: 'active', joined: '2022-09-10' },
    { id: 4, name: 'Maple Grove School', location: 'New York, USA', students: 650, teachers: 38, plan: 'Basic', status: 'pending', joined: '2024-01-05' },
    { id: 5, name: 'Sunset Academy', location: 'Arizona, USA', students: 1500, teachers: 95, plan: 'Professional', status: 'suspended', joined: '2023-06-18' },
    { id: 6, name: 'Mountain View High', location: 'Colorado, USA', students: 980, teachers: 62, plan: 'Professional', status: 'active', joined: '2023-08-25' },
  ];

  const stats = {
    total: 156,
    active: 142,
    pending: 8,
    suspended: 6
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="superadmin" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Institution Management" role="superadmin" userName="Super Admin" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Total Institutions</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                    </div>
                    <Building2 className="h-8 w-8 text-blue-600" />
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
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-700">Pending</p>
                      <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700">Suspended</p>
                      <p className="text-2xl font-bold text-red-900">{stats.suspended}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search institutions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Institution
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Institutions List */}
            <Card>
              <CardHeader>
                <CardTitle>All Institutions</CardTitle>
                <CardDescription>Manage all registered educational institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {institutions.map((institution) => (
                    <div key={institution.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            <Building2 className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-lg">{institution.name}</div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {institution.location}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {institution.students} students • {institution.teachers} teachers
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">{institution.plan}</Badge>
                          <div>
                            <Badge variant={
                              institution.status === 'active' ? 'default' :
                              institution.status === 'pending' ? 'secondary' : 'destructive'
                            }>
                              {institution.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
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
