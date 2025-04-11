
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scissors } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-barber-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <Scissors className="text-barber-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">For Clients</h3>
            <p className="text-gray-600 mb-6">
              Looking for a barber who understands your unique hair type and cultural style preferences? 
              Join HairMatch today to find your perfect match.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="text-gray-700">AI-powered hair type matching</p>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="text-gray-700">Find barbers who speak your language</p>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="text-gray-700">Easy online booking system</p>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/signup">
                <Button className="w-full bg-barber-primary hover:bg-blue-800">
                  Sign Up as a Client
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-barber-primary p-8 rounded-lg shadow-md text-white">
            <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center mb-6">
              <Scissors className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">For Barbers</h3>
            <p className="text-blue-100 mb-6">
              Showcase your skills with specific hair types and cultural styles. 
              Connect with clients looking for your expertise and grow your business.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <p className="text-blue-100">Highlight your cultural hair expertise</p>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <p className="text-blue-100">Attract clients who value your specialty</p>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center mt-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <p className="text-blue-100">Manage your schedule efficiently</p>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/barber-signup">
                <Button variant="outline" className="w-full border-white text-white hover:bg-blue-800">
                  Join as a Barber
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
