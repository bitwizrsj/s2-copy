'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ClipboardCheck, 
  Calendar,
  Clock,
  BookOpen,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function StudentExams() {
  const upcomingExams = [
    { id: 1, subject: 'Mathematics', type: 'Mid-Term', date: '2024-04-15', time: '09:00 AM', duration: '2 hours', syllabus: 'Chapters 1-5', room: 'Hall A' },
    { id: 2, subject: 'Physics', type: 'Mid-Term', date: '2024-04-17', time: '09:00 AM', duration: '2 hours', syllabus: 'Chapters 1-4', room: 'Hall B' },
    { id: 3, subject: 'Chemistry', type: 'Lab Practical', date: '2024-04-19', time: '10:00 AM', duration: '1.5 hours', syllabus: 'All Labs', room: 'Lab A' },
    { id: 4, subject: 'English', type: 'Mid-Term', date: '2024-04-22', time: '09:00 AM', duration: '2 hours', syllabus: 'Literature Units 1-3', room: 'Hall A' },
  ];

  const pastExams = [
    { id: 1, subject: 'Mathematics', type: 'Unit Test', date: '2024-03-10', score: 88, maxScore: 100, grade: 'A-', rank: 5 },
    { id: 2, subject: 'Physics', type: 'Quiz', date: '2024-03-08', score: 42, maxScore: 50, grade: 'A', rank: 3 },
    { id: 3, subject: 'Chemistry', type: 'Unit Test', date: '2024-03-05', score: 78, maxScore: 100, grade: 'B+', rank: 12 },
    { id: 4, subject: 'English', type: 'Essay', date: '2024-03-01', score: 45, maxScore: 50, grade: 'A', rank: 2 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="student" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Exams" role="student" userName="Emma Wilson" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-700">Upcoming</p>
                      <p className="text-2xl font-bold text-yellow-900">4</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Completed</p>
                      <p className="text-2xl font-bold text-green-900">12</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Avg Score</p>
                      <p className="text-2xl font-bold text-blue-900">85%</p>
                    </div>
                    <ClipboardCheck className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Best Rank</p>
                      <p className="text-2xl font-bold text-purple-900">#2</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
                <TabsTrigger value="past">Past Results</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingExams.map((exam) => (
                  <Card key={exam.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-yellow-100 rounded-lg">
                            <ClipboardCheck className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <div className="font-medium">{exam.subject}</div>
                            <div className="text-sm text-gray-500">{exam.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {exam.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {exam.time} ({exam.duration})
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{exam.room}</Badge>
                            <div className="text-xs text-gray-500 mt-1">Syllabus: {exam.syllabus}</div>
                          </div>
                          <Button variant="outline">View Syllabus</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="past" className="space-y-4">
                {pastExams.map((exam) => (
                  <Card key={exam.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">{exam.subject}</div>
                            <div className="text-sm text-gray-500">{exam.type} • {exam.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="w-32">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{exam.score}/{exam.maxScore}</span>
                              <span>{Math.round((exam.score/exam.maxScore)*100)}%</span>
                            </div>
                            <Progress value={(exam.score/exam.maxScore)*100} className="h-2" />
                          </div>
                          <Badge variant="default">{exam.grade}</Badge>
                          <div className="text-center">
                            <div className="font-bold text-lg">#{exam.rank}</div>
                            <div className="text-xs text-gray-500">Rank</div>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
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
