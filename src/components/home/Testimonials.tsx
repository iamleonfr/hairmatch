
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: "Marcus Williams",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    hairType: "Afro",
    location: "Berlin",
    content: "After moving to Germany, finding a barber who knew how to cut my afro hair was nearly impossible. HairMatch connected me with an amazing barber who understood my hair type. Couldn't be happier!",
    rating: 5
  },
  {
    id: 2,
    name: "Sophia Chen",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    hairType: "Straight Asian",
    location: "Munich",
    content: "I was always nervous about getting haircuts because most stylists don't understand Asian hair texture. HairMatch helped me find a barber who knows exactly how to work with my hair type. Fantastic service!",
    rating: 5
  },
  {
    id: 3,
    name: "Aisha Okafor",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    hairType: "Natural Curly",
    location: "Hamburg",
    content: "HairMatch is a game-changer for immigrants like me. Found a stylist who knows how to care for my natural curls and offers styles that honor my heritage. So grateful!",
    rating: 4
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <section className="py-16 bg-barber-primary text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Hear from people who found the perfect barber for their unique hair type and cultural needs.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white text-barber-dark rounded-xl shadow-xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex text-barber-accent mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={20} 
                      className={`${i < testimonials[activeIndex].rating ? "fill-current" : "stroke-current fill-none"}`} 
                    />
                  ))}
                </div>
                
                <p className="text-lg mb-6 italic text-gray-700">
                  "{testimonials[activeIndex].content}"
                </p>
                
                <div>
                  <h4 className="font-semibold text-lg">{testimonials[activeIndex].name}</h4>
                  <div className="text-gray-500 text-sm mt-1">
                    <span className="font-medium">{testimonials[activeIndex].hairType} Hair</span>
                    <span className="mx-2">•</span>
                    <span>{testimonials[activeIndex].location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-barber-primary hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-barber-primary hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-white" : "bg-blue-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
