
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X } from 'lucide-react';

interface UploadPhotoCardProps {
  onPhotoUploaded: (photo: File | null) => void;
}

const UploadPhotoCard = ({ onPhotoUploaded }: UploadPhotoCardProps) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }
  };
  
  const clearPhoto = () => {
    setPhoto(null);
    setPreview(null);
    onPhotoUploaded(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
        <p className="text-gray-600">
          Our AI will analyze your hair type to find the best barber matches.
        </p>
      </div>
      
      {!preview ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-barber-primary transition-colors">
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Camera className="text-barber-primary" size={24} />
            </div>
            <p className="text-gray-600 mb-4">
              Drag & drop your photo here or click to browse
            </p>
            <label htmlFor="photo-upload">
              <Button className="bg-barber-primary hover:bg-blue-800">
                <Upload size={18} className="mr-2" />
                Upload Photo
              </Button>
            </label>
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
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          Don't want to upload a photo? <a href="#" className="text-barber-primary underline">
            Skip this step
          </a> and tell us about your hair type manually.
        </p>
      </div>
    </div>
  );
};

export default UploadPhotoCard;
