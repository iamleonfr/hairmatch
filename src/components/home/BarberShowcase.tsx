
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data
const barbers = [
  {
    id: 1,
    name: "Michael Johnson",
    image: "https://images.unsplash.com/photo-1618223752950-9482d8c845f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Cologne, Germany",
    rating: 4.9,
    reviewCount: 124,
    specialties: ["Afro", "Fades", "Curly"],
    languages: ["English", "German"]
  },
  {
    id: 2,
    name: "Sofia Rodriguez",
    image: "https://images.unsplash.com/photo-1595701797747-818f8fbdf90e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80", 
    location: "Berlin, Germany",
    rating: 4.8,
    reviewCount: 98,
    specialties: ["Curly", "Women's Styles", "Coloring"],
    languages: ["Spanish", "English", "German"]
  },
  {
    id: 3,
    name: "David Chen",
    image: "https://images.unsplash.com/photo-1519345274080-68e52d09786a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Munich, Germany",
    rating: 4.7,
    reviewCount: 87,
    specialties: ["Asian Hair", "Fades", "Straightening"],
    languages: ["Mandarin", "English", "German"]
  },
  {
    id: 4,
    name: "Amina Osei",
    image: "https://images.unsplash.com/photo-1611709936899-c7a9e3cf1afc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Hamburg, Germany",
    rating: 4.9,
    reviewCount: 142,
    specialties: ["Afro", "Braiding", "Natural Hair"],
    languages: ["English", "German", "Twi"]
  }
];

const BarberShowcase = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobile = useIsMobile();
  
  const slidesToShow = isMobile ? 1 : 3;
  const maxSlides = Math.ceil(barbers.length / slidesToShow) - 1;
  
  const nextSlide = () => {
    setActiveSlide(prev => prev < maxSlides ? prev + 1 : 0);
  };
  
  const prevSlide = () => {
    setActiveSlide(prev => prev > 0 ? prev - 1 : maxSlides);
  };
  
  const visibleBarbers = isMobile 
    ? [barbers[activeSlide % barbers.length]]
    : barbers.slice(activeSlide * slidesToShow, (activeSlide * slidesToShow) + slidesToShow);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-barber-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Barbers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover skilled barbers who specialize in various hair types and cultural styles,
            ready to give you the perfect cut.
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleBarbers.map((barber) => (
              <div key={barber.id} className="card-custom">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={barber.image} 
                    alt={barber.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
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
                  
                  <Button className="w-full bg-barber-primary hover:bg-blue-800">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 gap-3">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-barber-primary hover:bg-barber-light transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-barber-primary hover:bg-barber-light transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="border-barber-primary text-barber-primary hover:bg-blue-50">
            View All Barbers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BarberShowcase;
