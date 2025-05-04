import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BarberCard, { Barber } from '@/components/barbers/BarberCard';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  MapPin, 
  Locate,
  Loader2,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

// Sample data - in a real app this would come from an API
const barberData: Barber[] = [
  {
    id: 1,
    name: "Michael Johnson",
    image: "https://images.unsplash.com/photo-1618223752950-9482d8c845f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Cologne, Germany",
    rating: 4.9,
    reviewCount: 124,
    specialties: ["Afro", "Fades", "Curly"],
    languages: ["English", "German"],
    price: "€30+",
    availability: "Today, 3:00 PM",
    coordinates: { lat: 50.9375, lng: 6.9603 } // Cologne coordinates
  },
  {
    id: 2,
    name: "Sofia Rodriguez",
    image: "https://images.unsplash.com/photo-1595701797747-818f8fbdf90e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80", 
    location: "Berlin, Germany",
    rating: 4.8,
    reviewCount: 98,
    specialties: ["Curly", "Women's Styles", "Coloring"],
    languages: ["Spanish", "English", "German"],
    price: "€45+",
    availability: "Tomorrow, 11:00 AM",
    coordinates: { lat: 52.5200, lng: 13.4050 } // Berlin coordinates
  },
  {
    id: 3,
    name: "David Chen",
    image: "https://images.unsplash.com/photo-1519345274080-68e52d09786a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Munich, Germany",
    rating: 4.7,
    reviewCount: 87,
    specialties: ["Asian Hair", "Fades", "Straightening"],
    languages: ["Mandarin", "English", "German"],
    price: "€28+",
    availability: "Thursday, 2:00 PM",
    coordinates: { lat: 48.1351, lng: 11.5820 } // Munich coordinates
  },
  {
    id: 4,
    name: "Amina Osei",
    image: "https://images.unsplash.com/photo-1611709936899-c7a9e3cf1afc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Hamburg, Germany",
    rating: 4.9,
    reviewCount: 142,
    specialties: ["Afro", "Braiding", "Natural Hair"],
    languages: ["English", "German", "Twi"],
    price: "€40+",
    availability: "Friday, 10:00 AM",
    coordinates: { lat: 53.5511, lng: 9.9937 } // Hamburg coordinates
  },
  {
    id: 5,
    name: "Jamal Wilson",
    image: "https://images.unsplash.com/photo-1504447910097-8ebaa0f82ece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Cologne, Germany",
    rating: 4.6,
    reviewCount: 78,
    specialties: ["Wavy", "Beard Trim", "Fades"],
    languages: ["English", "German"],
    price: "€25+",
    availability: "Today, 5:30 PM",
    coordinates: { lat: 50.9375, lng: 6.9603 } // Cologne coordinates
  },
  {
    id: 6,
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1603585931234-a3b87ecc9fcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Berlin, Germany",
    rating: 4.8,
    reviewCount: 113,
    specialties: ["South Asian", "Long Hair", "Styling"],
    languages: ["Hindi", "English", "German"],
    price: "€35+",
    availability: "Thursday, 1:00 PM",
    coordinates: { lat: 52.5200, lng: 13.4050 } // Berlin coordinates
  }
];

// Simple function to calculate distance between two points using the Haversine formula
const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const Barbers = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [locationLoadingState, setLocationLoadingState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [userCity, setUserCity] = useState('');
  const [sortOrder, setSortOrder] = useState('recommended');
  const [barbers, setBarbers] = useState<Barber[]>(barberData);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter states
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [maxDistance, setMaxDistance] = useState(50); // in km
  
  // Parse query parameters (for AI-detected hair types)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const hairTypes = queryParams.getAll('hairType');
    
    if (hairTypes.length > 0) {
      setSelectedSpecialties(hairTypes);
      toast({
        title: "Hair type detected",
        description: `Showing barbers specialized in: ${hairTypes.join(', ')}`,
      });
    }
  }, [location.search]);
  
  // Fetch barbers data from sample data since the barbers table doesn't exist in Supabase
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setIsLoading(true);
        
        // Using sample data instead of trying to query a non-existent table
        setBarbers(barberData);
        
        // In a real app with proper Supabase table setup, we would use:
        // const { data, error } = await supabase
        //   .from('profiles')  // Use existing table instead of 'barbers'
        //   .select('*')
        //   .eq('role', 'barber');  // Filter by role if applicable
        
      } catch (error) {
        console.error('Error in barber fetch process:', error);
        setBarbers(barberData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBarbers();
  }, []);
  
  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty) 
        ? prev.filter(s => s !== specialty) 
        : [...prev, specialty]
    );
  };
  
  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language) 
        : [...prev, language]
    );
  };
  
  const detectLocation = () => {
    setLocationLoadingState('loading');
    setShowLocationDialog(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // In a real app, you would use a reverse geocoding service here
          // For demo purposes, we'll simulate getting the city name
          setTimeout(() => {
            // Detect the closest city based on coordinates
            const cities = [
              { name: "Berlin", coords: { lat: 52.5200, lng: 13.4050 } },
              { name: "Munich", coords: { lat: 48.1351, lng: 11.5820 } },
              { name: "Hamburg", coords: { lat: 53.5511, lng: 9.9937 } },
              { name: "Cologne", coords: { lat: 50.9375, lng: 6.9603 } }
            ];
            
            let closestCity = cities[0];
            let minDistance = calculateDistance(
              latitude, longitude, 
              closestCity.coords.lat, closestCity.coords.lng
            );
            
            cities.forEach(city => {
              const distance = calculateDistance(
                latitude, longitude, 
                city.coords.lat, city.coords.lng
              );
              
              if (distance < minDistance) {
                minDistance = distance;
                closestCity = city;
              }
            });
            
            setUserCity(closestCity.name);
            setLocationLoadingState('success');
            
            toast({
              title: "Location detected",
              description: `We detected you're in or near ${closestCity.name}`,
            });
            
            // Auto close dialog after a short delay
            setTimeout(() => {
              setShowLocationDialog(false);
              setNearbyOnly(true);
            }, 1500);
          }, 2000);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationLoadingState('error');
          
          toast({
            title: "Location error",
            description: "We couldn't access your location. Please check your browser permissions.",
            variant: "destructive"
          });
        }
      );
    } else {
      setLocationLoadingState('error');
      
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive"
      });
    }
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([20, 80]);
    setSelectedSpecialties([]);
    setSelectedLanguages([]);
    setNearbyOnly(false);
    setSortOrder('recommended');
  };
  
  // Collect all unique specialties and languages
  const allSpecialties = Array.from(
    new Set(barberData.flatMap(barber => barber.specialties))
  );
  
  const allLanguages = Array.from(
    new Set(barberData.flatMap(barber => barber.languages))
  );
  
  // Calculate distances if user location is available
  const barbersWithDistance = barbers.map(barber => {
    let distance = null;
    
    if (userLocation && barber.coordinates) {
      distance = calculateDistance(
        userLocation.lat, userLocation.lng,
        barber.coordinates.lat, barber.coordinates.lng
      );
    }
    
    return { ...barber, distance };
  });
  
  // Filter barbers based on search term, filters, and location
  const filteredBarbers = barbersWithDistance.filter(barber => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      barber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barber.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barber.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Specialty filter
    const matchesSpecialty = selectedSpecialties.length === 0 || 
      barber.specialties.some(s => selectedSpecialties.includes(s));
    
    // Language filter
    const matchesLanguage = selectedLanguages.length === 0 || 
      barber.languages.some(l => selectedLanguages.includes(l));
    
    // Location filter (if nearbyOnly is true)
    const matchesLocation = !nearbyOnly || 
      (barber.distance !== null && barber.distance <= maxDistance) ||
      (userCity && barber.location.includes(userCity));
    
    // Combine all filters
    return matchesSearch && matchesSpecialty && matchesLanguage && matchesLocation;
  });
  
  // Sort barbers based on selected sort order
  const sortedBarbers = [...filteredBarbers].sort((a, b) => {
    if (sortOrder === 'distance' && a.distance !== null && b.distance !== null) {
      return a.distance - b.distance;
    } else if (sortOrder === 'price-low') {
      const aPrice = parseInt(a.price?.replace(/[^\d]/g, '') || '0');
      const bPrice = parseInt(b.price?.replace(/[^\d]/g, '') || '0');
      return aPrice - bPrice;
    } else if (sortOrder === 'price-high') {
      const aPrice = parseInt(a.price?.replace(/[^\d]/g, '') || '0');
      const bPrice = parseInt(b.price?.replace(/[^\d]/g, '') || '0');
      return bPrice - aPrice;
    } else if (sortOrder === 'rating') {
      return b.rating - a.rating;
    } else if (sortOrder === 'reviews') {
      return b.reviewCount - a.reviewCount;
    }
    // Default: recommended
    return 0;
  });
  
  // Effect to set location-based sort when user location is detected
  useEffect(() => {
    if (userLocation) {
      setSortOrder('distance');
    }
  }, [userLocation]);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Barbers for Your Hair Type</h1>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={detectLocation}
              >
                <Locate size={18} />
                Find Nearby
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} />
                Filters
              </Button>
            </div>
          </div>
          
          {selectedSpecialties.length > 0 && (
            <motion.div 
              className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p className="text-blue-800">
                  <span className="font-semibold">AI detected hair type:</span> {selectedSpecialties.join(', ')}
                </p>
                <p className="text-sm text-blue-600">
                  Showing barbers specialized in your hair type
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto text-blue-700"
                onClick={() => setSelectedSpecialties([])}
              >
                Clear
              </Button>
            </motion.div>
          )}
          
          {/* Display user location if detected */}
          {userLocation && (
            <motion.div 
              className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <MapPin className="text-green-600" size={20} />
              <div>
                <p className="text-green-800">
                  <span className="font-semibold">Using your location:</span> Near {userCity}
                </p>
                <p className="text-sm text-green-600">
                  Showing barbers within {maxDistance}km of your location
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto text-green-700"
                onClick={() => {
                  setNearbyOnly(false);
                  setUserLocation(null);
                  setUserCity('');
                }}
              >
                Clear
              </Button>
            </motion.div>
          )}
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className={`w-full md:w-72 bg-white p-6 rounded-lg shadow-md ${
              isFilterOpen ? 'block' : 'hidden md:block'
            }`}>
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search barbers..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Location</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      placeholder="City, neighborhood..."
                      className="pl-10"
                      value={userCity}
                      onChange={(e) => setUserCity(e.target.value)}
                    />
                  </div>
                  
                  {userLocation && (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Checkbox 
                          id="nearby-only"
                          checked={nearbyOnly}
                          onCheckedChange={(checked) => setNearbyOnly(checked as boolean)}
                        />
                        <label htmlFor="nearby-only" className="ml-2 text-sm text-gray-700">
                          Show only nearby barbers
                        </label>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Max distance: {maxDistance}km</span>
                        </div>
                        <Slider
                          defaultValue={[maxDistance]}
                          max={100}
                          step={5}
                          value={[maxDistance]}
                          onValueChange={(value) => setMaxDistance(value[0])}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={detectLocation}
                  >
                    <Locate size={16} />
                    Detect My Location
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    defaultValue={[20, 80]}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                  />
                  <div className="flex justify-between">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Specialties</h3>
                <div className="space-y-2">
                  {allSpecialties.map((specialty, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox 
                        id={`specialty-${index}`} 
                        checked={selectedSpecialties.includes(specialty)}
                        onCheckedChange={() => toggleSpecialty(specialty)}
                      />
                      <label htmlFor={`specialty-${index}`} className="ml-2 text-gray-700">
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Languages</h3>
                <div className="space-y-2">
                  {allLanguages.map((language, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox 
                        id={`language-${index}`} 
                        checked={selectedLanguages.includes(language)}
                        onCheckedChange={() => toggleLanguage(language)}
                      />
                      <label htmlFor={`language-${index}`} className="ml-2 text-gray-700">
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* Barber Listings */}
            <div className="flex-1">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    <span className="font-semibold text-black">{sortedBarbers.length}</span> barbers found
                  </p>
                  <select 
                    className="border rounded-md py-1 px-2 text-sm text-gray-700"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="recommended">Sort by: Recommended</option>
                    {userLocation && (
                      <option value="distance">Distance: Nearest first</option>
                    )}
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-12 w-12 text-barber-primary animate-spin" />
                </div>
              ) : sortedBarbers.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {sortedBarbers.map((barber, index) => (
                      <motion.div
                        key={barber.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: 20 }}
                        layout
                      >
                        <BarberCard 
                          barber={{
                            ...barber,
                            // Add distance info if available
                            ...(barber.distance !== null && {
                              location: `${barber.location} (${barber.distance.toFixed(1)}km away)`
                            })
                          }} 
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-2">No barbers found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search term to find more barbers.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Location Detection Dialog */}
      <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detecting Your Location</DialogTitle>
            <DialogDescription>
              Finding barbers near you...
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-6">
            {locationLoadingState === 'loading' && (
              <div className="flex flex-col items-center">
                <Loader2 className="h-12 w-12 text-barber-primary animate-spin mb-4" />
                <p className="text-gray-600">Getting your location...</p>
              </div>
            )}
            
            {locationLoadingState === 'success' && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-gray-600">
                  Found you in <span className="font-semibold">{userCity}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  We'll show you barbers nearby
                </p>
              </div>
            )}
            
            {locationLoadingState === 'error' && (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-gray-600">
                  We couldn't detect your location
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Please check your browser permissions or enter your location manually
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Barbers;
