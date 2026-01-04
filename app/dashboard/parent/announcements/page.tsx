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
  Info
} from 'lucide-react';

export default function ParentAnnouncements() {
  const announcements = [
    { id: 1, title: 'Parent-Teacher Meeting', content: 'PTM scheduled for March 30th from 9 AM to 1 PM. Please attend to discuss your child\'s progress.', date: '2024-03-20', author: 'Admin Office', type: 'meeting', important: true },
    { id: 2, title: 'Mid-Term Exam Schedule', content: 'Mid-term examinations will begin on April 15th. Exam timetable has been shared with students.', date: '2024-03-18', author: 'Examination Cell', type: 'exam', important: true },
    { id: 3, title: 'Annual Day Celebration', content: 'Annual Day will be celebrated on April 10th. Your child is participating in the cultural program.', date: '2024-03-15', author: 'Cultural Committee', type: 'event', important: false },
    { id: 4, title: 'Fee Payment Reminder', content: 'Q4 fees are due by April 15th. Please ensure timely payment to avoid late fees.', date: '2024-03-12', author: 'Accounts Office', type: 'payment', important: true },
    { id: 5, title: 'Summer Camp Registration', content: 'Summer camp registration is now open. Early bird discount available until March 31st.', date: '2024-03-10', author: 'Admin Office', type: 'info', important: false },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <User className="h-5 w-5 text-purple-600" />;
      case 'exam': return <BookOpen className="h-5 w-5 text-red-600" />;
      case 'event': return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'payment': return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default: return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-purple-100';
      case 'exam': return 'bg-red-100';
      case 'event': return 'bg-blue-100';
      case 'payment': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="parent" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Announcements" role="parent" userName="Michael Thompson" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total</p>
                      <p className="text-2xl font-bold">12</p>
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
                      <p className="text-2xl font-bold">4</p>
                    </div>
                    <Bell className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle>School Announcements</CardTitle>
                <CardDescription>Stay updated with school news</CardDescription>
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
