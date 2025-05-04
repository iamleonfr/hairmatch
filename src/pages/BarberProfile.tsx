
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail, Globe, Clock, ChevronRight, Calendar, ChevronLeft, ChevronDown, Check } from 'lucide-react';

// Sample barber data - in a real app, this would be fetched based on the ID
const barber = {
  id: 1,
  name: "Michael Johnson",
  image: "https://images.unsplash.com/photo-1618223752950-9482d8c845f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  coverImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  location: "Cologne, Germany",
  address: "123 Barber Street, 50667 Cologne",
  phone: "+49 123 456789",
  email: "michael@hairmatch.com",
  website: "michaelsbarbershop.de",
  rating: 4.9,
  reviewCount: 124,
  about: "With over 10 years of experience, I specialize in cutting and styling all types of hair, with particular expertise in Afro and curly textures. Originally from New York, I've been in Germany for 5 years and understand the challenges of finding barbers who know how to work with diverse hair types.",
  specialties: ["Afro", "Fades", "Curly", "Beard Trim", "Styling"],
  languages: ["English", "German"],
  hours: {
    Monday: "10:00 AM - 7:00 PM",
    Tuesday: "10:00 AM - 7:00 PM",
    Wednesday: "10:00 AM - 7:00 PM",
    Thursday: "10:00 AM - 7:00 PM",
    Friday: "10:00 AM - 8:00 PM",
    Saturday: "9:00 AM - 6:00 PM",
    Sunday: "Closed"
  },
  services: [
    { name: "Haircut", price: "€30", duration: "45 min" },
    { name: "Beard Trim", price: "€15", duration: "20 min" },
    { name: "Haircut & Beard", price: "€40", duration: "60 min" },
    { name: "Kid's Haircut", price: "€20", duration: "30 min" },
    { name: "Head Shave", price: "€25", duration: "30 min" },
    { name: "Design", price: "€10+", duration: "15+ min" }
  ],
  portfolio: [
    "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1599351431613-058a9486e795?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1593702288056-f9fe0a5c9651?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1625794084867-8ddd239946b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  ],
  reviews: [
    {
      id: 1,
      user: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      date: "2 weeks ago",
      content: "Michael really understands how to work with my afro hair. Best haircut I've had since moving to Germany!",
      hairType: "Afro"
    },
    {
      id: 2,
      user: "David Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      rating: 5,
      date: "1 month ago",
      content: "Great fade and very precise work. Michael took his time to understand exactly what I wanted.",
      hairType: "Wavy"
    },
    {
      id: 3,
      user: "Liam Chen",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      rating: 4,
      date: "3 months ago",
      content: "Really good with Asian hair, which can be difficult to cut properly. Highly recommended.",
      hairType: "Straight"
    }
  ]
};

// Sample available time slots
const timeSlots = {
  "2023-06-15": ["10:00 AM", "11:00 AM", "2:00 PM", "4:30 PM"],
  "2023-06-16": ["9:30 AM", "12:00 PM", "3:00 PM", "5:30 PM"],
  "2023-06-17": ["10:00 AM", "1:00 PM", "3:30 PM"],
  "2023-06-18": ["11:30 AM", "2:30 PM", "4:00 PM", "6:00 PM"],
  "2023-06-19": ["10:00 AM", "12:30 PM", "3:00 PM", "5:00 PM"],
};

const BarberProfile = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // In a real app, we would fetch the barber data based on the ID
  
  // Available dates - in a real app, this would be dynamically generated
  const availableDates = Object.keys(timeSlots);
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };
  
  const handleNextStep = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      // Submit booking
      console.log("Booking submitted:", {
        barberId: id,
        service: selectedService,
        date: selectedDate,
        time: selectedTime
      });
      // In a real app, we would submit this to an API
      alert("Booking confirmed! You'll receive a confirmation email shortly.");
      setIsBookingOpen(false);
    }
  };
  
  const handlePrevStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Cover Image */}
        <div className="h-64 relative overflow-hidden">
          <img 
            src={barber.coverImage} 
            alt={`${barber.name}'s barbershop`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container-custom">
              <Link to="/barbers" className="flex items-center text-blue-100 hover:text-white mb-4">
                <ChevronLeft size={16} className="mr-1" />
                Back to barbers
              </Link>
            </div>
          </div>
        </div>
        
        <div className="container-custom pt-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Barber info */}
            <div className="md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-end mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden -mt-20 z-10 bg-white flex-shrink-0">
                  <img 
                    src={barber.image} 
                    alt={barber.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:ml-6 mt-4 md:mt-0">
                  <h1 className="text-3xl font-bold mb-2">{barber.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{barber.location}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="flex text-barber-accent">
                      <Star size={18} className="fill-current" />
                      <span className="font-medium ml-1">{barber.rating}</span>
                    </div>
                    <span className="text-gray-500 mx-2">•</span>
                    <span className="text-gray-500">{barber.reviewCount} reviews</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {barber.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-barber-primary border-blue-200">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="about">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">About {barber.name}</h3>
                    <p className="text-gray-700 mb-6">{barber.about}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-3">Specialties</h4>
                        <ul className="space-y-2">
                          {barber.specialties.map((specialty, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <Check size={16} className="text-green-500 mr-2" />
                              {specialty}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-3">Languages</h4>
                        <ul className="space-y-2">
                          {barber.languages.map((language, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <Globe size={16} className="text-barber-primary mr-2" />
                              {language}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Contact & Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <MapPin size={18} className="text-barber-primary mt-1 mr-3" />
                            <div>
                              <h4 className="font-medium">Address</h4>
                              <p className="text-gray-600">{barber.address}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Phone size={18} className="text-barber-primary mt-1 mr-3" />
                            <div>
                              <h4 className="font-medium">Phone</h4>
                              <p className="text-gray-600">{barber.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Mail size={18} className="text-barber-primary mt-1 mr-3" />
                            <div>
                              <h4 className="font-medium">Email</h4>
                              <p className="text-gray-600">{barber.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Globe size={18} className="text-barber-primary mt-1 mr-3" />
                            <div>
                              <h4 className="font-medium">Website</h4>
                              <p className="text-gray-600">{barber.website}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Business Hours</h4>
                        <ul className="space-y-2">
                          {Object.entries(barber.hours).map(([day, hours], index) => (
                            <li key={index} className="flex justify-between text-gray-700">
                              <span className="font-medium">{day}</span>
                              <span>{hours}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="services">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-6">Services & Pricing</h3>
                    <div className="space-y-6">
                      {barber.services.map((service, index) => (
                        <div 
                          key={index}
                          className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <h4 className="font-semibold text-lg">{service.name}</h4>
                            <p className="text-gray-500 text-sm">{service.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{service.price}</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-barber-primary"
                              onClick={() => {
                                handleServiceSelect(service.name);
                                setIsBookingOpen(true);
                                setBookingStep(1);
                              }}
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="portfolio">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-6">Portfolio</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {barber.portfolio.map((image, index) => (
                        <div key={index} className="overflow-hidden rounded-md shadow-md aspect-square">
                          <img 
                            src={image} 
                            alt={`Portfolio ${index + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Client Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex text-barber-accent">
                          <Star size={18} className="fill-current" />
                          <span className="font-medium ml-1">{barber.rating}</span>
                        </div>
                        <span className="text-gray-500 mx-2">•</span>
                        <span className="text-gray-500">{barber.reviewCount} reviews</span>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      {barber.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={review.avatar} 
                                  alt={review.user} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{review.user}</h4>
                                <p className="text-xs text-gray-500">{review.hairType} Hair</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex text-barber-accent mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    size={16} 
                                    className={`${i < review.rating ? "fill-current" : "stroke-current fill-none"}`} 
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <Button variant="outline">Load More Reviews</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right column - Booking card */}
            <div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-6">
                <div className="bg-barber-primary text-white py-4 px-6">
                  <h3 className="text-xl font-semibold">Book an Appointment</h3>
                </div>
                
                {!isBookingOpen ? (
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">
                      Ready for a haircut with {barber.name}? Book your appointment now.
                    </p>
                    
                    <div className="space-y-4">
                      <Button 
                        className="w-full bg-barber-primary"
                        onClick={() => setIsBookingOpen(true)}
                      >
                        Book Now
                      </Button>
                      
                      <div className="text-center text-sm text-gray-500">
                        <p>Powered by HairMatch</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex mb-6">
                      <div className="flex-1 text-center pb-2 border-b-2 border-barber-primary font-semibold text-sm">
                        <span className={bookingStep >= 1 ? "text-barber-primary" : "text-gray-400"}>
                          1. Service
                        </span>
                      </div>
                      <div className="flex-1 text-center pb-2 border-b-2 border-barber-primary font-semibold text-sm">
                        <span className={bookingStep >= 2 ? "text-barber-primary" : "text-gray-400"}>
                          2. Date & Time
                        </span>
                      </div>
                      <div className="flex-1 text-center pb-2 border-b-2 border-barber-primary font-semibold text-sm">
                        <span className={bookingStep >= 3 ? "text-barber-primary" : "text-gray-400"}>
                          3. Confirm
                        </span>
                      </div>
                    </div>
                    
                    {bookingStep === 1 && (
                      <div>
                        <h4 className="font-semibold mb-4">Select Service</h4>
                        <div className="space-y-3">
                          {barber.services.map((service, index) => (
                            <div 
                              key={index}
                              onClick={() => handleServiceSelect(service.name)}
                              className={`
                                p-4 border rounded-md cursor-pointer transition-colors
                                ${selectedService === service.name 
                                  ? 'border-barber-primary bg-blue-50' 
                                  : 'border-gray-200 hover:border-gray-300'}
                              `}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <h5 className="font-medium">{service.name}</h5>
                                  <p className="text-sm text-gray-500">{service.duration}</p>
                                </div>
                                <p className="font-bold">{service.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {bookingStep === 2 && (
                      <div>
                        <h4 className="font-semibold mb-4">Select Date & Time</h4>
                        
                        <div className="mb-4">
                          <h5 className="text-sm font-medium mb-2">Available Dates</h5>
                          <div className="flex overflow-x-auto pb-2 -mx-1">
                            {availableDates.map((date, index) => (
                              <div
                                key={index}
                                className="px-1 flex-shrink-0 w-1/4"
                              >
                                <div
                                  onClick={() => handleDateSelect(date)}
                                  className={`
                                    p-2 text-center cursor-pointer rounded-md transition-colors
                                    ${selectedDate === date 
                                      ? 'bg-barber-primary text-white' 
                                      : 'bg-gray-100 hover:bg-gray-200'}
                                  `}
                                >
                                  <div className="text-xs font-medium">
                                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                                  </div>
                                  <div className="text-sm font-bold">
                                    {new Date(date).getDate()}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {selectedDate && (
                          <div>
                            <h5 className="text-sm font-medium mb-2">Available Times</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {timeSlots[selectedDate].map((time, index) => (
                                <div
                                  key={index}
                                  onClick={() => handleTimeSelect(time)}
                                  className={`
                                    p-2 text-center cursor-pointer rounded-md transition-colors
                                    ${selectedTime === time 
                                      ? 'bg-barber-primary text-white' 
                                      : 'bg-gray-100 hover:bg-gray-200'}
                                  `}
                                >
                                  {time}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {bookingStep === 3 && (
                      <div>
                        <h4 className="font-semibold mb-4">Confirm Booking</h4>
                        
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Service:</span>
                            <span className="font-medium">{selectedService}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Date:</span>
                            <span className="font-medium">
                              {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Time:</span>
                            <span className="font-medium">{selectedTime}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                            <span className="font-medium">Price:</span>
                            <span className="font-bold">
                              {barber.services.find(s => s.name === selectedService)?.price}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="text-sm font-medium mb-2">Contact Information</h5>
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Full Name"
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                              type="email"
                              placeholder="Email Address"
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <input
                              type="tel"
                              placeholder="Phone Number"
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span className="text-sm text-gray-600">
                              I agree to the terms and conditions
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between mt-6">
                      {bookingStep > 1 ? (
                        <Button 
                          variant="outline" 
                          onClick={handlePrevStep}
                        >
                          Back
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          onClick={() => setIsBookingOpen(false)}
                        >
                          Cancel
                        </Button>
                      )}
                      
                      <Button 
                        className="bg-barber-primary"
                        onClick={handleNextStep}
                        disabled={
                          (bookingStep === 1 && !selectedService) ||
                          (bookingStep === 2 && (!selectedDate || !selectedTime))
                        }
                      >
                        {bookingStep === 3 ? "Confirm Booking" : "Continue"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BarberProfile;
