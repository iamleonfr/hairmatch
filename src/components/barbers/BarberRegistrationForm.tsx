
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { OptionType } from '@/components/ui/multi-select';

// Import our new components
import ProfileImageUploader from './ProfileImageUploader';
import PersonalInfoForm from './PersonalInfoForm';
import ShopInfoForm from './ShopInfoForm';
import SpecialtiesForm from './SpecialtiesForm';
import TermsAgreement from './TermsAgreement';

export const BarberRegistrationForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
    email: user?.emailAddresses[0]?.emailAddress || '',
    phone: '',
    about: '',
    shopName: '',
    address: '',
    city: '',
    startingPrice: '',
    specialties: [],
    languages: [],
    agreeToTerms: false
  });
  
  const [profileImage, setProfileImage] = useState<string | null>(user?.imageUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      return;
    }
    
    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to register as a barber.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update user profile in Supabase, changing role to 'barber'
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          role: 'barber',
          first_name: formData.name.split(' ')[0] || '',
          last_name: formData.name.split(' ').slice(1).join(' ') || '',
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (profileError) throw new Error(profileError.message);
      
      // Here you would save the rest of the barber data to your database
      // For now, we're just handling the role change
      
      toast({
        title: "Registration Successful",
        description: "Your barber profile has been created successfully!"
      });
      
      // Redirect to barber dashboard
      navigate('/barber-dashboard');
      
    } catch (error) {
      console.error('Error registering barber:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle specialty changes
  const handleSpecialtiesChange = (newValue: OptionType[]) => {
    setFormData({...formData, specialties: newValue});
  };

  // Handle language changes
  const handleLanguagesChange = (newValue: OptionType[]) => {
    setFormData({...formData, languages: newValue});
  };

  // Handle terms agreement change
  const handleTermsChange = (checked: boolean) => {
    setFormData({...formData, agreeToTerms: checked});
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <ProfileImageUploader 
          profileImage={profileImage} 
          handleImageChange={handleImageChange}
        />
        
        <PersonalInfoForm 
          formData={formData} 
          handleInputChange={handleInputChange}
        />
        
        <ShopInfoForm 
          formData={formData} 
          handleInputChange={handleInputChange}
        />
        
        <SpecialtiesForm 
          specialties={formData.specialties as OptionType[]}
          languages={formData.languages as OptionType[]}
          onChange={{
            specialties: handleSpecialtiesChange,
            languages: handleLanguagesChange
          }}
        />
        
        <TermsAgreement 
          agreeToTerms={formData.agreeToTerms}
          onCheckedChange={handleTermsChange}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full md:w-auto bg-barber-primary hover:bg-blue-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Register as a Barber"}
      </Button>
    </form>
  );
};
