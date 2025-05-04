
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UploadPhotoCard from '@/components/common/UploadPhotoCard';
import HairTypeSelector from '@/components/preferences/HairTypeSelector';
import { Button } from '@/components/ui/button';

const Preferences = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<File | null>(null);
  const [hairType, setHairType] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('');
  
  const handlePhotoUploaded = (photo: File | null) => {
    setPhoto(photo);
    if (photo) {
      // In a real app, we would analyze the photo with AI here
      // For now, we'll just move to the next step
      setTimeout(() => {
        setStep(2);
      }, 1000);
    }
  };
  
  const handleHairTypeSelected = (type: string) => {
    setHairType(type);
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  
  const handleSubmit = () => {
    // In a real app, we would save preferences and then navigate
    navigate('/barbers');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container-custom max-w-5xl">
          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Tell Us About Your Hair</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Help us match you with barbers who specialize in your hair type and understand your preferences.
              </p>
            </div>
            
            <div className="flex mb-8">
              <div className="flex-1 border-t-2 border-barber-primary"></div>
              <div className="flex -mt-3 justify-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-barber-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-barber-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-barber-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
              </div>
              <div className="flex-1 border-t-2 border-gray-200"></div>
            </div>
            
            {step === 1 && (
              <div className="max-w-md mx-auto">
                <UploadPhotoCard onPhotoUploaded={handlePhotoUploaded} />
                
                <div className="text-center mt-6">
                  <Button 
                    variant="outline" 
                    className="border-barber-primary text-barber-primary"
                    onClick={() => setStep(2)}
                  >
                    Skip Photo Upload
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div>
                <HairTypeSelector onSelect={handleHairTypeSelected} />
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    className="border-gray-300"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="bg-barber-primary"
                    onClick={() => setStep(3)}
                    disabled={!hairType}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="max-w-xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Additional Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="language">
                      Preferred Language
                    </label>
                    <select
                      id="language"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-barber-primary"
                      value={language}
                      onChange={handleLanguageChange}
                    >
                      <option value="">Select a language...</option>
                      <option value="english">English</option>
                      <option value="german">German</option>
                      <option value="turkish">Turkish</option>
                      <option value="arabic">Arabic</option>
                      <option value="french">French</option>
                      <option value="spanish">Spanish</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Gender Preference</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input type="radio" name="gender" className="mr-2" />
                        <span>Male Barber</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="gender" className="mr-2" />
                        <span>Female Barber</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="gender" className="mr-2" defaultChecked />
                        <span>No Preference</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Service Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Haircut</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Beard Trim</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Styling</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Braiding</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Color</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>Treatment</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    className="border-gray-300"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="bg-barber-primary"
                    onClick={handleSubmit}
                  >
                    Find Barbers
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Preferences;
