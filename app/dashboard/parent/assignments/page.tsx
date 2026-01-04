'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye
} from 'lucide-react';

export default function ParentAssignments() {
  const assignments = [
    { id: 1, subject: 'Mathematics', title: 'Calculus Problem Set', dueDate: '2024-03-25', status: 'pending', submitted: false },
    { id: 2, subject: 'Physics', title: 'Lab Report - Wave Motion', dueDate: '2024-03-23', status: 'submitted', submitted: true, grade: 'A-' },
    { id: 3, subject: 'English', title: 'Shakespeare Essay', dueDate: '2024-03-28', status: 'in_progress', submitted: false, progress: 60 },
    { id: 4, subject: 'Chemistry', title: 'Organic Chemistry Notes', dueDate: '2024-03-22', status: 'graded', submitted: true, grade: 'B+' },
    { id: 5, subject: 'History', title: 'World War II Research', dueDate: '2024-03-30', status: 'pending', submitted: false },
  ];

  const stats = {
    total: 15,
    completed: 10,
    pending: 3,
    overdue: 2
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="parent" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Child's Assignments" role="parent" userName="Michael Thompson" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Child Selector */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Viewing assignments for:</span>
                  <Select defaultValue="emma">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emma">Emma Thompson (Grade 10A)</SelectItem>
                      <SelectItem value="james">James Thompson (Grade 7B)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Total</p>
                      <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Completed</p>
                      <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
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
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700">Overdue</p>
                      <p className="text-2xl font-bold text-red-900">{stats.overdue}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assignments List */}
            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>Track your child's assignment progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          assignment.status === 'graded' ? 'bg-green-100' :
                          assignment.status === 'submitted' ? 'bg-blue-100' :
                          assignment.status === 'in_progress' ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          <FileText className={`h-5 w-5 ${
                            assignment.status === 'graded' ? 'text-green-600' :
                            assignment.status === 'submitted' ? 'text-blue-600' :
                            assignment.status === 'in_progress' ? 'text-yellow-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-gray-500">{assignment.subject}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {assignment.progress && (
                          <div className="w-24">
                            <Progress value={assignment.progress} className="h-2" />
                            <span className="text-xs text-gray-500">{assignment.progress}%</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {assignment.dueDate}
                        </div>
                        {assignment.grade && (
                          <Badge variant="default">{assignment.grade}</Badge>
                        )}
                        <Badge variant={
                          assignment.status === 'graded' ? 'default' :
                          assignment.status === 'submitted' ? 'secondary' :
                          assignment.status === 'in_progress' ? 'outline' : 'destructive'
                        }>
                          {assignment.status.replace('_', ' ')}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
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
