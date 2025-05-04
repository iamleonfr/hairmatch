
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PersonalInfoFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    about: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoForm = ({ formData, handleInputChange }: PersonalInfoFormProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
          />
          <p className="text-xs text-gray-500">Email cannot be changed</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          name="phone" 
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="about">About Yourself</Label>
        <Textarea 
          id="about" 
          name="about" 
          value={formData.about}
          onChange={handleInputChange}
          rows={4}
          placeholder="Tell clients about your experience and specialties"
          required
        />
      </div>
    </>
  );
};

export default PersonalInfoForm;
