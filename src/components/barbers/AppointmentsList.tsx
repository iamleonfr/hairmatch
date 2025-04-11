
import { useState } from 'react';
import { Check, X, Clock, Calendar, Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Appointment {
  id: number;
  clientName: string;
  time: string;
  service: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

interface AppointmentsListProps {
  appointments: Appointment[];
  type: 'today' | 'upcoming' | 'all';
  showFilters?: boolean;
}

export const AppointmentsList = ({ appointments, type, showFilters = false }: AppointmentsListProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ? true : appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleStatusChange = (appointmentId: number, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    // update the appointment status 
    toast({
      title: "Status updated",
      description: `Appointment ${appointmentId} is now ${newStatus}`,
    });
  };
  
  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search clients or services"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div 
              key={appointment.id}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{appointment.clientName}</h4>
                    <Badge 
                      variant={
                        appointment.status === 'confirmed' ? "default" : 
                        appointment.status === 'pending' ? "outline" :
                        appointment.status === 'completed' ? "secondary" : "destructive"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{appointment.service}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {appointment.status === 'pending' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                      >
                        <Check size={14} className="mr-1" /> Confirm
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                      >
                        <X size={14} className="mr-1" /> Decline
                      </Button>
                    </>
                  )}
                  
                  {appointment.status === 'confirmed' && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="h-8 bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(appointment.id, 'completed')}
                    >
                      <Check size={14} className="mr-1" /> Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No appointments found</p>
          </div>
        )}
      </div>
    </div>
  );
};
