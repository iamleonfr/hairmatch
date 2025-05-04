
import { useEffect, useRef } from 'react';
import { Camera, Search, Calendar, Star } from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';

const steps = [
  {
    icon: Camera,
    title: "Upload Your Photo",
    description: "Optionally share a photo of your hair for AI analysis, or manually select your hair type and preferences."
  },
  {
    icon: Search,
    title: "Get Matched",
    description: "Our AI matches you with barbers who specialize in your hair type, cultural style, and are available in your area."
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description: "Choose a convenient time slot, and book directly through our platform. Easy and hassle-free."
  },
  {
    icon: Star,
    title: "Enjoy & Review",
    description: "After your haircut, share your experience to help others find the right barber for their needs."
  }
];

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const iconVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3
    }
  }
};

const circleVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

const HowItWorks = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section ref={ref} className="py-16 bg-barber-light overflow-hidden">
      <motion.div 
        className="container-custom"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={controls}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={controls}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Finding the perfect barber for your unique hair type has never been easier. 
            Our AI-powered platform connects you with skilled professionals who understand your needs.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-lg p-6 shadow-md text-center relative"
            >
              <motion.div 
                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                variants={circleVariants}
                initial="hidden"
                animate={controls}
              >
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate={controls}
                  whileHover="hover"
                >
                  <step.icon size={28} className="text-barber-primary" />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="bg-barber-primary text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto -mt-20 mb-4"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.3 }}
              >
                {index + 1}
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.3 }}
              >
                {step.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.2, duration: 0.3 }}
              >
                {step.description}
              </motion.p>
              
              {/* Decorative connector between cards (only on desktop) */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 border-t-2 border-dashed border-blue-300"
                  initial={{ width: 0 }}
                  animate={{ width: "2rem" }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
