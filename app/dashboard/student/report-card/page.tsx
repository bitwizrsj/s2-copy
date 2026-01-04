'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileBarChart, 
  Download,
  Printer,
  Award,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function StudentReportCard() {
  const studentInfo = {
    name: 'Emma Wilson',
    class: 'Grade 10A',
    rollNo: 'STU-2024-001',
    term: 'Mid-Term 2024',
    attendance: 94,
    totalDays: 120,
    presentDays: 113
  };

  const subjects = [
    { name: 'Mathematics', midterm: 88, assignments: 92, practical: '-', total: 90, grade: 'A-', credits: 4, remarks: 'Excellent' },
    { name: 'Physics', midterm: 85, assignments: 88, practical: 90, total: 87, grade: 'B+', credits: 4, remarks: 'Good' },
    { name: 'Chemistry', midterm: 78, assignments: 82, practical: 85, total: 81, grade: 'B', credits: 4, remarks: 'Good' },
    { name: 'English', midterm: 92, assignments: 95, practical: '-', total: 93, grade: 'A', credits: 3, remarks: 'Outstanding' },
    { name: 'History', midterm: 80, assignments: 85, practical: '-', total: 82, grade: 'B+', credits: 2, remarks: 'Good' },
    { name: 'Computer Science', midterm: 95, assignments: 98, practical: 92, total: 95, grade: 'A', credits: 3, remarks: 'Outstanding' },
  ];

  const overallStats = {
    gpa: 3.8,
    percentage: 88.2,
    rank: 5,
    totalStudents: 30
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="student" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Report Card" role="student" userName="Emma Wilson" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>

            {/* Report Card */}
            <Card>
              <CardHeader className="text-center border-b">
                <CardTitle className="text-2xl">Academic Report Card</CardTitle>
                <CardDescription>{studentInfo.term}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Student Info */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Student Name</p>
                    <p className="font-medium">{studentInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">{studentInfo.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Roll Number</p>
                    <p className="font-medium">{studentInfo.rollNo}</p>
                  </div>
                </div>

                {/* Grades Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left py-3 px-4 font-medium">Subject</th>
                        <th className="text-center py-3 px-4 font-medium">Mid-Term</th>
                        <th className="text-center py-3 px-4 font-medium">Assignments</th>
                        <th className="text-center py-3 px-4 font-medium">Practical</th>
                        <th className="text-center py-3 px-4 font-medium">Total</th>
                        <th className="text-center py-3 px-4 font-medium">Grade</th>
                        <th className="text-center py-3 px-4 font-medium">Credits</th>
                        <th className="text-left py-3 px-4 font-medium">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-medium">{subject.name}</td>
                          <td className="text-center py-3 px-4">{subject.midterm}</td>
                          <td className="text-center py-3 px-4">{subject.assignments}</td>
                          <td className="text-center py-3 px-4">{subject.practical}</td>
                          <td className="text-center py-3 px-4 font-bold">{subject.total}</td>
                          <td className="text-center py-3 px-4">
                            <Badge variant={subject.grade.startsWith('A') ? 'default' : 'secondary'}>
                              {subject.grade}
                            </Badge>
                          </td>
                          <td className="text-center py-3 px-4">{subject.credits}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{subject.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Overall Performance */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-blue-700">GPA</p>
                      <p className="text-2xl font-bold text-blue-900">{overallStats.gpa}</p>
                      <p className="text-xs text-blue-600">out of 4.0</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-green-700">Percentage</p>
                      <p className="text-2xl font-bold text-green-900">{overallStats.percentage}%</p>
                      <p className="text-xs text-green-600">Overall</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-purple-700">Class Rank</p>
                      <p className="text-2xl font-bold text-purple-900">#{overallStats.rank}</p>
                      <p className="text-xs text-purple-600">of {overallStats.totalStudents}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-orange-700">Attendance</p>
                      <p className="text-2xl font-bold text-orange-900">{studentInfo.attendance}%</p>
                      <p className="text-xs text-orange-600">{studentInfo.presentDays}/{studentInfo.totalDays} days</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
