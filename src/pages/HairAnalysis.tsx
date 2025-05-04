
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import UploadPhotoCard from '@/components/common/UploadPhotoCard';
import { ArrowRight } from 'lucide-react';
import { initModel } from '@/services/hairTypeDetection';
import { useToast } from '@/hooks/use-toast';

const HairAnalysis = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [detectedHairTypes, setDetectedHairTypes] = useState<string[]>([]);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Preload the model when the component mounts
  useEffect(() => {
    const prepareModel = async () => {
      try {
        setIsModelLoading(true);
        await initModel();
        setIsModelReady(true);
        console.log("AI model initialized successfully");
      } catch (error) {
        console.error("Failed to initialize AI model:", error);
        toast({
          title: "AI Model Error",
          description: "Could not initialize the hair detection model. You can still upload photos but detection may not work.",
          variant: "destructive"
        });
      } finally {
        setIsModelLoading(false);
      }
    };
    
    prepareModel();
  }, [toast]);
  
  const handleHairTypeDetected = (hairTypes: string[]) => {
    setDetectedHairTypes(hairTypes);
  };
  
  const handleFindBarbers = () => {
    const queryParams = new URLSearchParams();
    detectedHairTypes.forEach(type => queryParams.append('hairType', type));
    navigate(`/barbers?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Barber</h1>
              <p className="text-gray-600 text-lg">
                Upload a photo of your hair and our AI will match you with barbers who specialize in your hair type
              </p>
            </div>
            
            <UploadPhotoCard 
              onPhotoUploaded={setPhoto} 
              onHairTypeDetected={handleHairTypeDetected}
            />
            
            {detectedHairTypes.length > 0 && (
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleFindBarbers}
                  className="bg-barber-primary hover:bg-blue-800 text-lg px-8 py-6"
                >
                  Find Matching Barbers <ArrowRight className="ml-2" />
                </Button>
              </div>
            )}
            
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-barber-primary font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Upload a Photo</h3>
                  <p className="text-gray-600">Take or upload a clear photo of your hair</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-barber-primary font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">AI Analysis</h3>
                  <p className="text-gray-600">Our AI detects your hair type and texture</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-barber-primary font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Find Barbers</h3>
                  <p className="text-gray-600">Get matched with barbers who specialize in your hair type</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HairAnalysis;
