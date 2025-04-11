
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Scissors, Star, DollarSign, Settings } from 'lucide-react';
import { BarChartComponent } from '@/components/barbers/BarChartComponent';
import { AppointmentsList } from '@/components/barbers/AppointmentsList';
import { ProfileSettings } from '@/components/barbers/ProfileSettings';

const BarberDashboard = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  // Sample data - in a real app this would come from an API
  const statsData = {
    appointmentsToday: 8,
    totalClients: 127,
    averageRating: 4.8,
    totalEarnings: '€1,250',
    upcomingAppointments: 12,
    completedThisMonth: 58
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Barber Dashboard</h1>
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsData.appointmentsToday}</div>
                    <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsData.totalClients}</div>
                    <p className="text-xs text-muted-foreground">+14 this month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsData.averageRating}</div>
                    <p className="text-xs text-muted-foreground">Based on 87 reviews</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsData.totalEarnings}</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsData.upcomingAppointments}</div>
                    <p className="text-xs text-muted-foreground">Next 7 days</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <Scissors className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statsData.completedThisMonth}</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>Your earnings for the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChartComponent />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>Your appointments for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AppointmentsList 
                      appointments={[
                        { id: 1, clientName: "Michael Brown", time: "10:00 AM", service: "Haircut & Beard Trim", status: "confirmed" },
                        { id: 2, clientName: "Sara Johnson", time: "11:30 AM", service: "Women's Cut", status: "confirmed" },
                        { id: 3, clientName: "David Lee", time: "1:00 PM", service: "Fade & Line Up", status: "confirmed" },
                        { id: 4, clientName: "Emma Wilson", time: "2:30 PM", service: "Color & Cut", status: "confirmed" },
                        { id: 5, clientName: "James Martinez", time: "4:00 PM", service: "Beard Trim", status: "pending" }
                      ]} 
                      type="today"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your next appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AppointmentsList 
                      appointments={[
                        { id: 6, clientName: "Jessica Taylor", time: "Tomorrow, 9:30 AM", service: "Haircut", status: "confirmed" },
                        { id: 7, clientName: "Robert Garcia", time: "Tomorrow, 3:00 PM", service: "Full Service", status: "confirmed" },
                        { id: 8, clientName: "Maria Rodriguez", time: "Dec 12, 11:00 AM", service: "Women's Cut", status: "pending" },
                        { id: 9, clientName: "John Smith", time: "Dec 12, 2:00 PM", service: "Fade", status: "confirmed" },
                        { id: 10, clientName: "Lisa Chen", time: "Dec 13, 10:30 AM", service: "Color Touch-up", status: "confirmed" }
                      ]} 
                      type="upcoming"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Appointments</CardTitle>
                  <CardDescription>View and manage all your upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <AppointmentsList 
                    appointments={[
                      { id: 1, clientName: "Michael Brown", time: "Today, 10:00 AM", service: "Haircut & Beard Trim", status: "confirmed" },
                      { id: 2, clientName: "Sara Johnson", time: "Today, 11:30 AM", service: "Women's Cut", status: "confirmed" },
                      { id: 3, clientName: "David Lee", time: "Today, 1:00 PM", service: "Fade & Line Up", status: "confirmed" },
                      { id: 4, clientName: "Emma Wilson", time: "Today, 2:30 PM", service: "Color & Cut", status: "confirmed" },
                      { id: 5, clientName: "James Martinez", time: "Today, 4:00 PM", service: "Beard Trim", status: "pending" },
                      { id: 6, clientName: "Jessica Taylor", time: "Tomorrow, 9:30 AM", service: "Haircut", status: "confirmed" },
                      { id: 7, clientName: "Robert Garcia", time: "Tomorrow, 3:00 PM", service: "Full Service", status: "confirmed" },
                      { id: 8, clientName: "Maria Rodriguez", time: "Dec 12, 11:00 AM", service: "Women's Cut", status: "pending" },
                      { id: 9, clientName: "John Smith", time: "Dec 12, 2:00 PM", service: "Fade", status: "confirmed" },
                      { id: 10, clientName: "Lisa Chen", time: "Dec 13, 10:30 AM", service: "Color Touch-up", status: "confirmed" }
                    ]} 
                    type="all"
                    showFilters={true}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your barber profile and services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileSettings />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BarberDashboard;
