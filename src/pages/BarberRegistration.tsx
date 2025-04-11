
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MultiSelect } from '@/components/ui/multi-select';
import { Label } from '@/components/ui/label';
import { Upload, MapPin, Scissors, Languages, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const hairSpecialties = [
  { value: 'afro', label: 'Afro' },
  { value: 'curly', label: 'Curly' },
  { value: 'straight', label: 'Straight' },
  { value: 'wavy', label: 'Wavy' },
  { value: 'coily', label: 'Coily' },
  { value: 'asian', label: 'Asian Hair' },
  { value: 'fades', label: 'Fades' },
  { value: 'braiding', label: 'Braiding' },
  { value: 'dreads', label: 'Dreadlocks' },
  { value: 'coloring', label: 'Coloring' },
  { value: 'beard', label: 'Beard Trim' },
  { value: 'kids', label: 'Kids Cuts' }
];

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'german', label: 'German' },
  { value: 'turkish', label: 'Turkish' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'italian', label: 'Italian' },
  { value: 'russian', label: 'Russian' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'twi', label: 'Twi' }
];

const BarberRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    about: '',
    specialties: [] as {value: string, label: string}[],
    languages: [] as {value: string, label: string}[],
    price: '',
    experience: '',
    acceptsTerms: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  const handlePortfolioImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages: string[] = [];
      const fileArray = Array.from(e.target.files);
      
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === fileArray.length) {
              setPortfolioImages([...portfolioImages, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const submitForm = () => {
    // Here we would typically send the data to an API
    // For now, we'll just show a success toast and redirect
    
    console.log('Form submitted:', {
      ...formData,
      profileImage,
      portfolioImages,
      specialties: formData.specialties.map(s => s.value),
      languages: formData.languages.map(l => l.value)
    });
    
    toast({
      title: "Registration successful!",
      description: "Your barber profile has been created. You can now manage your profile and bookings.",
    });
    
    // Redirect to barber dashboard
    navigate('/barber-dashboard');
  };
  
  const nextStep = () => {
    setFormStep(formStep + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Barber Registration</h1>
            
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step} 
                    className={`flex flex-col items-center ${formStep >= step ? 'text-barber-primary' : 'text-gray-400'}`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                      ${formStep === step ? 'bg-barber-primary text-white' : 
                        formStep > step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                    >
                      {formStep > step ? '✓' : step}
                    </div>
                    <span className="text-sm">
                      {step === 1 ? 'Basic Info' : step === 2 ? 'Specialties' : 'Portfolio'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full h-1 bg-gray-200 mt-4 relative">
                <div 
                  className="h-full bg-barber-primary transition-all duration-300" 
                  style={{ width: `${((formStep - 1) / 2) * 100}%` }}
                />
              </div>
            </div>
            
            <Card className="border-none shadow-lg animate-fade-in">
              {formStep === 1 && (
                <>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Tell us about yourself and your barbershop</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="profileImage">Profile Image</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                          ) : (
                            <Upload className="text-gray-400" />
                          )}
                        </div>
                        <Input 
                          id="profileImage" 
                          type="file" 
                          accept="image/*"
                          onChange={handleProfileImageChange}
                          className="max-w-xs"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          placeholder="Your contact number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Shop Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        placeholder="Street address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          placeholder="City name"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Starting Price (€)</Label>
                        <Input 
                          id="price" 
                          name="price" 
                          placeholder="e.g. 25"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="about">About Your Services</Label>
                      <Textarea 
                        id="about" 
                        name="about" 
                        placeholder="Tell us about your barbering style and services"
                        value={formData.about}
                        onChange={handleInputChange}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      className="w-full"
                      onClick={nextStep}
                    >
                      Continue
                    </Button>
                  </CardContent>
                </>
              )}
              
              {formStep === 2 && (
                <>
                  <CardHeader>
                    <CardTitle>Specialties & Languages</CardTitle>
                    <CardDescription>Tell us what makes your services unique</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Hair Type Specialties</Label>
                      <div className="flex items-center mb-2">
                        <Scissors className="mr-2 text-barber-primary" size={20} />
                        <span className="text-sm text-gray-600">Select all hair types you specialize in</span>
                      </div>
                      <MultiSelect 
                        options={hairSpecialties}
                        value={formData.specialties}
                        onChange={(newValue) => setFormData({...formData, specialties: newValue})}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Languages Spoken</Label>
                      <div className="flex items-center mb-2">
                        <Languages className="mr-2 text-barber-primary" size={20} />
                        <span className="text-sm text-gray-600">Select all languages you speak</span>
                      </div>
                      <MultiSelect 
                        options={languageOptions}
                        value={formData.languages}
                        onChange={(newValue) => setFormData({...formData, languages: newValue})}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input 
                        id="experience" 
                        name="experience" 
                        placeholder="e.g. 5"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={prevStep}
                      >
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        onClick={nextStep}
                      >
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
              
              {formStep === 3 && (
                <>
                  <CardHeader>
                    <CardTitle>Portfolio & Final Steps</CardTitle>
                    <CardDescription>Upload photos of your work and complete your registration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="portfolioImages">Portfolio Images</Label>
                      <div className="flex items-center mb-2">
                        <Clock className="mr-2 text-barber-primary" size={20} />
                        <span className="text-sm text-gray-600">Upload photos of your best haircuts (max 5)</span>
                      </div>
                      <Input 
                        id="portfolioImages" 
                        type="file" 
                        accept="image/*"
                        onChange={handlePortfolioImagesChange}
                        multiple
                        className="mb-4"
                      />
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {portfolioImages.map((img, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                            <img src={img} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 pt-4">
                      <Checkbox 
                        id="terms" 
                        checked={formData.acceptsTerms}
                        onCheckedChange={(checked) => 
                          setFormData({...formData, acceptsTerms: checked as boolean})
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms of service and privacy policy
                      </label>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={prevStep}
                      >
                        Back
                      </Button>
                      <Button 
                        type="button" 
                        onClick={submitForm}
                        disabled={!formData.acceptsTerms}
                      >
                        Complete Registration
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BarberRegistration;
