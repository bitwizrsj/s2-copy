'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Search,
  Plus,
  Edit,
  Trash2,
  GraduationCap,
  UserCheck,
  User,
  Shield,
  Filter,
  Download,
  Upload
} from 'lucide-react';

export default function SuperAdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [institutionFilter, setInstitutionFilter] = useState('all');

  const users = {
    students: [
      { id: 1, name: 'Emma Wilson', email: 'emma.wilson@school.edu', institution: 'Springfield High', grade: 'Grade 10', status: 'active', lastLogin: '2 hours ago' },
      { id: 2, name: 'Alex Chen', email: 'alex.chen@school.edu', institution: 'Oak Valley Academy', grade: 'Grade 11', status: 'active', lastLogin: '1 day ago' },
      { id: 3, name: 'Sarah Johnson', email: 'sarah.j@school.edu', institution: 'Riverside International', grade: 'Grade 9', status: 'inactive', lastLogin: '1 week ago' },
      { id: 4, name: 'Michael Brown', email: 'michael.b@school.edu', institution: 'Springfield High', grade: 'Grade 12', status: 'active', lastLogin: '3 hours ago' }
    ],
    teachers: [
      { id: 1, name: 'Dr. Smith', email: 'dr.smith@school.edu', institution: 'Springfield High', subject: 'Mathematics', status: 'active', lastLogin: '1 hour ago' },
      { id: 2, name: 'Dr. Johnson', email: 'dr.johnson@school.edu', institution: 'Oak Valley Academy', subject: 'Physics', status: 'active', lastLogin: '30 minutes ago' },
      { id: 3, name: 'Ms. Davis', email: 'ms.davis@school.edu', institution: 'Riverside International', subject: 'English', status: 'active', lastLogin: '2 hours ago' },
    ],
    parents: [
      { id: 1, name: 'Michael Thompson', email: 'michael.t@email.com', institution: 'Springfield High', children: 2, status: 'active', lastLogin: '1 day ago' },
      { id: 2, name: 'Lisa Chen', email: 'lisa.c@email.com', institution: 'Oak Valley Academy', children: 1, status: 'active', lastLogin: '2 days ago' },
    ]
  };

  const stats = {
    totalUsers: 48392,
    students: 35420,
    teachers: 4850,
    parents: 7122,
    admins: 1000
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="superadmin" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Global User Management" role="superadmin" userName="Super Admin" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600">Total Users</p>
                      <p className="text-xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-blue-700">Students</p>
                      <p className="text-xl font-bold text-blue-900">{stats.students.toLocaleString()}</p>
                    </div>
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-green-700">Teachers</p>
                      <p className="text-xl font-bold text-green-900">{stats.teachers.toLocaleString()}</p>
                    </div>
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-purple-700">Parents</p>
                      <p className="text-xl font-bold text-purple-900">{stats.parents.toLocaleString()}</p>
                    </div>
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-orange-700">Admins</p>
                      <p className="text-xl font-bold text-orange-900">{stats.admins.toLocaleString()}</p>
                    </div>
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="students" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="teachers">Teachers</TabsTrigger>
                  <TabsTrigger value="parents">Parents</TabsTrigger>
                </TabsList>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Search and Filter */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search across all institutions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={institutionFilter} onValueChange={setInstitutionFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Institution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Institutions</SelectItem>
                        <SelectItem value="springfield">Springfield High</SelectItem>
                        <SelectItem value="oakvalley">Oak Valley Academy</SelectItem>
                        <SelectItem value="riverside">Riverside International</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>All Students</CardTitle>
                    <CardDescription>View and manage students across all institutions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.students.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                              <div className="text-xs text-gray-400">{student.institution} • {student.grade}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                              {student.status}
                            </Badge>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                              <Button size="sm" variant="outline"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teachers">
                <Card>
                  <CardHeader>
                    <CardTitle>All Teachers</CardTitle>
                    <CardDescription>View and manage teachers across all institutions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.teachers.map((teacher) => (
                        <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback className="bg-green-100 text-green-600">
                                {teacher.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{teacher.name}</div>
                              <div className="text-sm text-gray-500">{teacher.email}</div>
                              <div className="text-xs text-gray-400">{teacher.institution} • {teacher.subject}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                              {teacher.status}
                            </Badge>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                              <Button size="sm" variant="outline"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="parents">
                <Card>
                  <CardHeader>
                    <CardTitle>All Parents</CardTitle>
                    <CardDescription>View and manage parents across all institutions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.parents.map((parent) => (
                        <div key={parent.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                {parent.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{parent.name}</div>
                              <div className="text-sm text-gray-500">{parent.email}</div>
                              <div className="text-xs text-gray-400">{parent.institution} • {parent.children} children</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant={parent.status === 'active' ? 'default' : 'secondary'}>
                              {parent.status}
                            </Badge>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                              <Button size="sm" variant="outline"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
