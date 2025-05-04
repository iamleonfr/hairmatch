
import React from 'react';
import { Input } from '@/components/ui/input';
import { Camera } from 'lucide-react';

interface ProfileImageUploaderProps {
  profileImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageUploader = ({ profileImage, handleImageChange }: ProfileImageUploaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-24 h-24">
        <img 
          src={profileImage || 'https://via.placeholder.com/100?text=Photo'}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border"
        />
        <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-barber-primary text-white p-1 rounded-full cursor-pointer">
          <Camera size={16} />
        </label>
        <Input 
          id="profile-image" 
          type="file" 
          className="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div>
        <h3 className="text-lg font-medium">Your Profile Photo</h3>
        <p className="text-sm text-gray-500">Upload a professional photo</p>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
