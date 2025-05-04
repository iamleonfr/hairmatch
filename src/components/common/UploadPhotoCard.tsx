
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X, Loader2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initModel, processHairImage } from '@/services/hairTypeDetection';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface UploadPhotoCardProps {
  onPhotoUploaded: (photo: File | null) => void;
  onHairTypeDetected?: (hairTypes: string[]) => void;
}

const UploadPhotoCard = ({ onPhotoUploaded, onHairTypeDetected }: UploadPhotoCardProps) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedHairTypes, setDetectedHairTypes] = useState<string[]>([]);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Hair type descriptions for tooltips
  const hairTypeInfo: Record<string, string> = {
    '4a': 'Dense S-pattern coils with clearly defined curls',
    '4b': 'Z-pattern curls that are tighter with less definition',
    '4c': 'Tightly coiled hair with minimal curl definition, very dense',
    '3a': 'Loose, well-defined curls about the size of a piece of chalk',
    '3b': 'Springy curls with the circumference of a Sharpie marker',
    '3c': 'Tight, densely packed curls the size of a pencil',
    '2a': 'Loose, barely noticeable S-shaped waves',
    '2b': 'Defined S-shaped waves that are more pronounced',
    '2c': 'Defined waves that are thicker and coarser in texture',
    '1': 'Straight hair with no curls or waves',
    'afro': 'Natural, voluminous hair texture that grows outward',
    'coily': 'Tight, springy curls that contract when dry',
    'curly': 'Hair that forms defined, bouncy ringlets',
    'wavy': 'Hair with a gentle, undulating pattern',
    'straight': 'Hair with no natural curl pattern',
    'braids': 'Hair styled in various braided patterns',
    'locs': 'Matted ropes of hair created by knotting or braiding',
    'twists': 'Hair styled in twisted sections',
    'fades': 'Short tapered cut with gradual change in length',
    'short': 'Short haircut, typically under 2 inches',
    'long': 'Hair extending beyond the shoulders',
    'dyed': 'Hair colored with dye or other coloring agents'
  };
  
  // Initialize the AI model when the component mounts
  useEffect(() => {
    // Load model in background but don't block rendering
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        await initModel();
        setIsModelLoading(false);
        console.log('AI model preloaded successfully');
      } catch (err) {
        console.error("Failed to preload AI model:", err);
        setIsModelLoading(false);
      }
    };
    
    loadModel();
  }, []); 
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      onPhotoUploaded(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Start AI analysis
      setIsAnalyzing(true);
      setDetectedHairTypes([]);
      
      try {
        const hairTypes = await processHairImage(file);
        setDetectedHairTypes(hairTypes);
        if (onHairTypeDetected) {
          onHairTypeDetected(hairTypes);
        }
        
        toast({
          title: "Hair type detected!",
          description: `We detected your hair type: ${hairTypes.join(', ')}`,
        });
      } catch (error) {
        console.error("Hair detection error:", error);
        toast({
          title: "Detection failed",
          description: "We couldn't analyze your hair type. Please try another photo or select manually.",
          variant: "destructive"
        });
      } finally {
        setIsAnalyzing(false);
      }
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const clearPhoto = () => {
    setPhoto(null);
    setPreview(null);
    setDetectedHairTypes([]);
    onPhotoUploaded(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Function to get badge color based on hair type
  const getHairTypeBadgeColor = (type: string): string => {
    // Type 4 hair (darker blue shades)
    if (type.startsWith('4')) return 'bg-blue-800 hover:bg-blue-700';
    // Type 3 hair (medium blue shades)
    if (type.startsWith('3')) return 'bg-blue-600 hover:bg-blue-500';
    // Type 2 hair (lighter blue shades)
    if (type.startsWith('2')) return 'bg-blue-400 hover:bg-blue-300 text-gray-800';
    // Type 1 hair
    if (type === '1') return 'bg-blue-300 hover:bg-blue-200 text-gray-800';
    
    // Specific styles
    if (['braids', 'locs', 'twists'].includes(type)) return 'bg-purple-600 hover:bg-purple-500';
    if (['fades', 'short'].includes(type)) return 'bg-gray-700 hover:bg-gray-600';
    
    // Default
    return 'bg-barber-primary hover:bg-blue-700';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
        <p className="text-gray-600">
          Our AI will analyze your hair type to find the best barber matches.
        </p>
        {isModelLoading && (
          <div className="text-sm text-gray-500 mt-2 flex items-center justify-center">
            <Loader2 size={16} className="animate-spin mr-2" />
            Preparing AI model...
          </div>
        )}
      </div>
      
      {!preview ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-barber-primary transition-colors cursor-pointer"
          onClick={triggerFileInput}
        >
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Camera className="text-barber-primary" size={24} />
            </div>
            <p className="text-gray-600 mb-4">
              Tap here to upload your photo
            </p>
            <Button 
              className="bg-barber-primary hover:bg-blue-800" 
              disabled={isModelLoading}
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              <Upload size={18} className="mr-2" />
              Browse Photos
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Hair preview"
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            onClick={clearPhoto}
            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-gray-600 hover:text-red-500 transition-colors"
            aria-label="Remove photo"
          >
            <X size={20} />
          </button>
          
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-center text-white">
                <Loader2 size={40} className="mx-auto animate-spin mb-2" />
                <p>Analyzing hair type...</p>
              </div>
            </div>
          )}
          
          {detectedHairTypes.length > 0 && !isAnalyzing && (
            <div className="mt-4">
              <p className="font-semibold">Detected hair type:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {detectedHairTypes.map((type, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span 
                          className={`${getHairTypeBadgeColor(type)} text-white px-3 py-1 rounded-full text-sm flex items-center cursor-help`}
                        >
                          {type}
                          <Info size={14} className="ml-1" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs">
                        <p>{hairTypeInfo[type] || `Hair type: ${type}`}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <p>Not right? You can select your hair type manually in the next step.</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Don't want to upload a photo? <a href="/barbers" className="text-barber-primary underline">
            Skip this step
          </a> and tell us about your hair type manually.
        </p>
      </div>
    </div>
  );
};

export default UploadPhotoCard;
