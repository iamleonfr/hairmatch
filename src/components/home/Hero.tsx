
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Scissors } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState('');
  
  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setUserLocation('Berlin');
          }, 1500);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);
  
  useEffect(() => {
    if (userLocation) {
      setLocation(userLocation);
    }
  }, [userLocation]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const scissorsAnimation = {
    rotate: [0, 15, 0, -15, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="relative bg-gradient-to-r from-barber-primary to-blue-900 text-white py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover mix-blend-overlay opacity-20"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400 rounded-full opacity-20 mix-blend-multiply blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full opacity-20 mix-blend-multiply blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            custom={0}
            variants={fadeIn}
          >
            Find the Perfect Barber for Your Unique Hair
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl opacity-90 mb-8"
            custom={1}
            variants={fadeIn}
          >
            Connect with barbers who understand your hair type, style preferences, and cultural needs.
          </motion.p>
          
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4"
            custom={2}
            variants={fadeIn}
          >
            <div className="relative flex-grow">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Your location (e.g., Berlin, Cologne)"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-barber-primary text-gray-800"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {userLocation && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600">
                  ✓ Using your location
                </span>
              )}
            </div>
            <Link to="/preferences">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-barber-primary hover:bg-blue-800 w-full md:w-auto whitespace-nowrap">
                  <Search size={18} className="mr-2" />
                  Find Barbers
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-4 text-sm opacity-80"
            custom={3}
            variants={fadeIn}
          >
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1, color: "#4ade80" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
              <span>100+ Verified Barbers</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1, color: "#4ade80" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
              <span>AI-Powered Matching</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1, color: "#4ade80" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
              <span>Cultural Hair Expertise</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 flex items-center gap-2"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <motion.div animate={scissorsAnimation}>
                <Scissors size={24} className="text-white" />
              </motion.div>
              <span className="font-medium">Ready for a new style?</span>
              <Link to="/barber-registration">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
                  Are you a barber?
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
