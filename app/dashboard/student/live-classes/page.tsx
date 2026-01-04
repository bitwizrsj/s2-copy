'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Calendar,
  Clock,
  Users,
  Play,
  ExternalLink
} from 'lucide-react';

export default function StudentLiveClasses() {
  const upcomingClasses = [
    { id: 1, subject: 'Mathematics', topic: 'Calculus - Derivatives', teacher: 'Dr. Smith', date: 'Today', time: '10:00 AM', duration: '45 min', status: 'live' },
    { id: 2, subject: 'Physics', topic: 'Quantum Mechanics Intro', teacher: 'Dr. Johnson', date: 'Today', time: '2:00 PM', duration: '45 min', status: 'upcoming' },
    { id: 3, subject: 'Chemistry', topic: 'Organic Chemistry - Alkanes', teacher: 'Dr. Wilson', date: 'Tomorrow', time: '9:00 AM', duration: '45 min', status: 'scheduled' },
    { id: 4, subject: 'English', topic: 'Shakespeare Analysis', teacher: 'Ms. Davis', date: 'Tomorrow', time: '11:00 AM', duration: '45 min', status: 'scheduled' },
  ];

  const recordings = [
    { id: 1, subject: 'Mathematics', topic: 'Integration Techniques', teacher: 'Dr. Smith', date: '2024-03-18', duration: '42 min', views: 156 },
    { id: 2, subject: 'Physics', topic: 'Wave Motion', teacher: 'Dr. Johnson', date: '2024-03-15', duration: '48 min', views: 89 },
    { id: 3, subject: 'Chemistry', topic: 'Chemical Bonding', teacher: 'Dr. Wilson', date: '2024-03-12', duration: '44 min', views: 124 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="student" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Online Classes" role="student" userName="Emma Wilson" />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Today's Classes</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <Video className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Week</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Attended</p>
                      <p className="text-2xl font-bold">45</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Recordings</p>
                      <p className="text-2xl font-bold">32</p>
                    </div>
                    <Play className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live/Upcoming Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming & Live Classes</CardTitle>
                <CardDescription>Join your scheduled online sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className={`flex items-center justify-between p-4 border rounded-lg ${
                      cls.status === 'live' ? 'border-red-500 bg-red-50' : ''
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          cls.status === 'live' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <Video className={`h-5 w-5 ${
                            cls.status === 'live' ? 'text-red-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{cls.subject}</span>
                            {cls.status === 'live' && (
                              <Badge variant="destructive" className="animate-pulse">LIVE</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">{cls.topic}</div>
                          <div className="text-xs text-gray-500">{cls.teacher}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {cls.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {cls.time} ({cls.duration})
                          </div>
                        </div>
                        <Button variant={cls.status === 'live' ? 'default' : 'outline'}>
                          {cls.status === 'live' ? (
                            <>Join Now <ExternalLink className="h-4 w-4 ml-2" /></>
                          ) : (
                            'Remind Me'
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recordings */}
            <Card>
              <CardHeader>
                <CardTitle>Class Recordings</CardTitle>
                <CardDescription>Watch previous class recordings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recordings.map((rec) => (
                    <Card key={rec.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                          <Play className="h-12 w-12 text-gray-400" />
                        </div>
                        <h4 className="font-medium">{rec.subject}</h4>
                        <p className="text-sm text-gray-600">{rec.topic}</p>
                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                          <span>{rec.date}</span>
                          <span>{rec.duration} • {rec.views} views</span>
                        </div>
                      </CardContent>
                    </Card>
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
