'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Calendar,
  User,
  BookOpen,
  AlertCircle,
  Info,
  CheckCircle2
} from 'lucide-react';

export default function StudentAnnouncements() {
  const announcements = [
    { id: 1, title: 'Mid-Term Exam Schedule Released', content: 'The mid-term examination schedule has been published. Exams will begin on April 15th. Please review the timetable carefully.', date: '2024-03-20', author: 'Admin Office', type: 'exam', important: true },
    { id: 2, title: 'Science Fair Registration Open', content: 'Registration for the annual Science Fair is now open. Deadline for registration is April 1st. Submit your project proposals to your class teacher.', date: '2024-03-18', author: 'Science Department', type: 'event', important: false },
    { id: 3, title: 'Library Extended Hours', content: 'The school library will remain open until 7 PM during the exam period (April 10-25). Make use of this opportunity for quiet study.', date: '2024-03-15', author: 'Library', type: 'info', important: false },
    { id: 4, title: 'Parent-Teacher Meeting', content: 'PTM scheduled for March 30th from 9 AM to 1 PM. Parents are requested to attend to discuss student progress.', date: '2024-03-12', author: 'Admin Office', type: 'meeting', important: true },
    { id: 5, title: 'Sports Day Postponed', content: 'Due to weather conditions, the Annual Sports Day has been postponed to April 5th. All practice sessions will continue as scheduled.', date: '2024-03-10', author: 'Sports Department', type: 'event', important: false },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam': return <BookOpen className="h-5 w-5 text-red-600" />;
      case 'event': return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'meeting': return <User className="h-5 w-5 text-purple-600" />;
      case 'info': return <Info className="h-5 w-5 text-gray-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100';
      case 'event': return 'bg-blue-100';
      case 'meeting': return 'bg-purple-100';
      case 'info': return 'bg-gray-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="student" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Announcements" role="student" userName="Emma Wilson" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total</p>
                      <p className="text-2xl font-bold">15</p>
                    </div>
                    <Bell className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Unread</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Important</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Announcements List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Announcements</CardTitle>
                <CardDescription>Stay updated with school news and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${
                      announcement.important ? 'border-l-4 border-l-red-500' : ''
                    }`}>
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${getTypeColor(announcement.type)}`}>
                          {getTypeIcon(announcement.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{announcement.title}</h3>
                            {announcement.important && (
                              <Badge variant="destructive">Important</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {announcement.author}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {announcement.date}
                            </span>
                          </div>
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
