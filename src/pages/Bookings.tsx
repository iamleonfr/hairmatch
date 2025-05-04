
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Scissors } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data for demonstration - in a real app, this would come from your backend
const mockAppointments = [
  {
    id: 'appt-1',
    barberName: 'John Smith',
    barberImage: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=200&auto=format&fit=crop',
    service: 'Haircut & Beard Trim',
    date: '2025-05-15T10:00:00',
    address: '123 Main St, New York, NY',
    price: '$35',
    status: 'upcoming'
  },
  {
    id: 'appt-2',
    barberName: 'Maria Rodriguez',
    barberImage: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=200&auto=format&fit=crop',
    service: 'Fade & Line Up',
    date: '2025-05-20T14:30:00',
    address: '456 Barber Ave, New York, NY',
    price: '$25',
    status: 'upcoming'
  },
  {
    id: 'appt-3',
    barberName: 'David Johnson',
    barberImage: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=200&auto=format&fit=crop',
    service: 'Full Service',
    date: '2025-04-01T11:00:00',
    address: '789 Style St, New York, NY',
    price: '$45',
    status: 'past'
  }
];

const AppointmentCard = ({ appointment }) => {
  const appointmentDate = new Date(appointment.date);
  const isPast = appointment.status === 'past';
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <Card className={`mb-4 ${isPast ? 'opacity-75' : ''}`}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-28 h-28">
            <img 
              src={appointment.barberImage} 
              alt={appointment.barberName}
              className="w-full h-full object-cover rounded-lg"
            />
            {isPast && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <Badge variant="outline" className="bg-white text-gray-900">Completed</Badge>
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <h3 className="font-medium text-lg">{appointment.barberName}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <Scissors className="w-4 h-4" />
                  <span>{appointment.service}</span>
                </div>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <span className="font-semibold">{appointment.price}</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{formatDate(appointmentDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{formatTime(appointmentDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{appointment.address}</span>
              </div>
            </div>
            
            {!isPast && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="mr-2">Reschedule</Button>
                <Button variant="destructive">Cancel</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Bookings = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const upcomingAppointments = mockAppointments.filter(a => a.status === 'upcoming');
  const pastAppointments = mockAppointments.filter(a => a.status === 'past');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-gray-600 mb-6">Manage your appointments with barbers</p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">
                Upcoming
                {upcomingAppointments.length > 0 && (
                  <Badge className="ml-2 bg-barber-primary">{upcomingAppointments.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Upcoming Appointments</CardTitle>
                    <CardDescription>
                      You don't have any upcoming appointments scheduled.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center pb-6">
                    <Button
                      onClick={() => window.location.href = '/barbers'}
                      className="bg-barber-primary hover:bg-blue-800"
                    >
                      Find a Barber
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastAppointments.length > 0 ? (
                pastAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Past Appointments</CardTitle>
                    <CardDescription>
                      You don't have any past appointment history.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center pb-6">
                    <Button
                      onClick={() => window.location.href = '/barbers'}
                      className="bg-barber-primary hover:bg-blue-800"
                    >
                      Find a Barber
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bookings;
