import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Barber {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  languages: string[];
  price?: string;
  availability?: string;
  coordinates?: { lat: number; lng: number };
  distance?: number;
}

interface BarberCardProps {
  barber: Barber;
  compact?: boolean;
}

const BarberCard = ({ barber, compact = false }: BarberCardProps) => {
  return (
    <div className="card-custom">
      <div className={`relative ${compact ? 'h-40 md:h-48' : 'h-64'} overflow-hidden`}>
        <img 
          src={barber.image} 
          alt={barber.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {barber.price && (
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md text-barber-primary font-semibold text-sm">
            {barber.price}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{barber.name}</h3>
          <div className="flex items-center text-barber-accent">
            <Star size={18} className="fill-current" />
            <span className="font-medium ml-1">{barber.rating}</span>
            <span className="text-gray-500 text-sm ml-1">({barber.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{barber.location}</span>
        </div>
        
        {!compact && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {barber.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-barber-primary border-blue-200">
                  {specialty}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {barber.languages.map((language, index) => (
                <span key={index} className="text-xs text-gray-500">
                  {language}{index < barber.languages.length - 1 ? " • " : ""}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {barber.availability && (
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>Next Available:</span>
            </div>
            <div className="flex items-center ml-2 font-medium">
              <Clock size={14} className="mr-1 text-green-500" />
              <span>{barber.availability}</span>
            </div>
          </div>
        )}
        
        <Link to={`/barbers/${barber.id}`}>
          <Button className="w-full bg-barber-primary hover:bg-blue-800">
            {compact ? "View Profile" : "Book Appointment"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BarberCard;
