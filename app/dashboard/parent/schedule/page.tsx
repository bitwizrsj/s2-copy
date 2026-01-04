'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Clock,
  BookOpen,
  MapPin
} from 'lucide-react';

export default function ParentSchedule() {
  const schedule = [
    { time: '08:00 - 08:45', monday: 'Mathematics', tuesday: 'Physics', wednesday: 'Mathematics', thursday: 'Chemistry', friday: 'English' },
    { time: '08:50 - 09:35', monday: 'English', tuesday: 'Mathematics', wednesday: 'Physics', thursday: 'Mathematics', friday: 'Physics' },
    { time: '09:40 - 10:25', monday: 'Physics', tuesday: 'English', wednesday: 'Chemistry', thursday: 'English', friday: 'Chemistry' },
    { time: '10:30 - 11:15', monday: 'Break', tuesday: 'Break', wednesday: 'Break', thursday: 'Break', friday: 'Break' },
    { time: '11:20 - 12:05', monday: 'Chemistry', tuesday: 'Chemistry', wednesday: 'English', thursday: 'Physics', friday: 'Mathematics' },
    { time: '12:10 - 12:55', monday: 'History', tuesday: 'Geography', wednesday: 'History', thursday: 'Geography', friday: 'History' },
    { time: '13:00 - 13:45', monday: 'Lunch', tuesday: 'Lunch', wednesday: 'Lunch', thursday: 'Lunch', friday: 'Lunch' },
    { time: '13:50 - 14:35', monday: 'Computer', tuesday: 'Art', wednesday: 'Computer', thursday: 'PE', friday: 'Art' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="parent" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Child's Timetable" role="parent" userName="Michael Thompson" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Child Selector */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Viewing schedule for:</span>
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
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Classes/Day</p>
                      <p className="text-2xl font-bold">6</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Hours</p>
                      <p className="text-2xl font-bold">30/week</p>
                    </div>
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Subjects</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Class Room</p>
                      <p className="text-2xl font-bold">10A</p>
                    </div>
                    <MapPin className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timetable */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Timetable</CardTitle>
                <CardDescription>Emma Thompson - Grade 10A</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-3 text-left font-medium">Time</th>
                        <th className="border p-3 text-center font-medium">Monday</th>
                        <th className="border p-3 text-center font-medium">Tuesday</th>
                        <th className="border p-3 text-center font-medium">Wednesday</th>
                        <th className="border p-3 text-center font-medium">Thursday</th>
                        <th className="border p-3 text-center font-medium">Friday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((row, index) => (
                        <tr key={index} className={row.monday === 'Break' || row.monday === 'Lunch' ? 'bg-gray-50' : ''}>
                          <td className="border p-3 font-medium text-sm">{row.time}</td>
                          <td className="border p-3 text-center">
                            <Badge variant={row.monday === 'Break' || row.monday === 'Lunch' ? 'secondary' : 'outline'}>
                              {row.monday}
                            </Badge>
                          </td>
                          <td className="border p-3 text-center">
                            <Badge variant={row.tuesday === 'Break' || row.tuesday === 'Lunch' ? 'secondary' : 'outline'}>
                              {row.tuesday}
                            </Badge>
                          </td>
                          <td className="border p-3 text-center">
                            <Badge variant={row.wednesday === 'Break' || row.wednesday === 'Lunch' ? 'secondary' : 'outline'}>
                              {row.wednesday}
                            </Badge>
                          </td>
                          <td className="border p-3 text-center">
                            <Badge variant={row.thursday === 'Break' || row.thursday === 'Lunch' ? 'secondary' : 'outline'}>
                              {row.thursday}
                            </Badge>
                          </td>
                          <td className="border p-3 text-center">
                            <Badge variant={row.friday === 'Break' || row.friday === 'Lunch' ? 'secondary' : 'outline'}>
                              {row.friday}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
