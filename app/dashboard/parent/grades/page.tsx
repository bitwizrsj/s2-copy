'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Award, 
  Download,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react';

export default function ParentGrades() {
  const subjects = [
    { name: 'Mathematics', midterm: 88, assignments: 92, total: 90, grade: 'A-', trend: 'up' },
    { name: 'Physics', midterm: 85, assignments: 88, total: 87, grade: 'B+', trend: 'up' },
    { name: 'Chemistry', midterm: 78, assignments: 82, total: 80, grade: 'B', trend: 'down' },
    { name: 'English', midterm: 92, assignments: 95, total: 93, grade: 'A', trend: 'stable' },
    { name: 'History', midterm: 80, assignments: 85, total: 82, grade: 'B+', trend: 'up' },
    { name: 'Computer Science', midterm: 95, assignments: 98, total: 96, grade: 'A', trend: 'up' },
  ];

  const overallStats = {
    gpa: 3.8,
    percentage: 88,
    rank: 5,
    totalStudents: 30
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="parent" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Grades & Report Card" role="parent" userName="Michael Thompson" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Child Selector */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">Viewing grades for:</span>
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
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report Card
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">GPA</p>
                      <p className="text-2xl font-bold text-blue-900">{overallStats.gpa}</p>
                      <p className="text-xs text-blue-600">out of 4.0</p>
                    </div>
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Overall %</p>
                      <p className="text-2xl font-bold text-green-900">{overallStats.percentage}%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Class Rank</p>
                      <p className="text-2xl font-bold text-purple-900">#{overallStats.rank}</p>
                      <p className="text-xs text-purple-600">of {overallStats.totalStudents}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Term</p>
                      <p className="text-2xl font-bold text-orange-900">Mid-Term</p>
                      <p className="text-xs text-orange-600">2023-2024</p>
                    </div>
                    <Award className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subject-wise Grades */}
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>Detailed breakdown by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{subject.name}</span>
                          {subject.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                          {subject.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <span className="text-2xl font-bold">{subject.total}%</span>
                          </div>
                          <Badge variant={subject.grade.startsWith('A') ? 'default' : 'secondary'}>
                            {subject.grade}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={subject.total} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Mid-term: {subject.midterm}%</span>
                        <span>Assignments: {subject.assignments}%</span>
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
