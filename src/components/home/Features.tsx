
import { Check, Camera, Globe, Scissors, MessageCircle } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose HairMatch?</h2>
            <p className="text-gray-600 mb-8 text-lg">
              We understand the struggle of finding barbers who know how to work with your specific hair type and style preferences, especially for immigrants and minorities.
            </p>

            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Camera className="text-barber-primary" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Hair Type Recognition</h3>
                  <p className="text-gray-600">
                    Upload your photo and our AI will identify your hair type to match you with specialized barbers.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Globe className="text-barber-primary" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cultural Understanding</h3>
                  <p className="text-gray-600">
                    Connect with barbers who understand your cultural hair needs and styling preferences.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Scissors className="text-barber-primary" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Specialized Expertise</h3>
                  <p className="text-gray-600">
                    Browse barbers who specialize in afro, curly, straight, or wavy hair types.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-barber-primary" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
                  <p className="text-gray-600">
                    Read authentic reviews from people with similar hair types before booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                alt="Barber cutting hair" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-1">
                  <Check className="text-green-600" size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    "Finally found a barber who knows how to cut my hair properly. This app is a game-changer!"
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Marcus, Berlin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
