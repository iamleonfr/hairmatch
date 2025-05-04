
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MultiSelect } from '@/components/ui/multi-select';
import { Separator } from '@/components/ui/separator';
import { Camera, Upload, Clock } from 'lucide-react';
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
];

// Sample barber data for demonstration
const sampleBarber = {
  name: 'Michael Johnson',
  email: 'michael@example.com',
  phone: '+49 123 4567890',
  address: 'Mainstrasse 123',
  city: 'Cologne',
  about: 'Experienced barber specializing in fades, curly hair, and beard styling. Over 10 years of experience working with diverse hair types.',
  price: '30',
  specialties: [
    { value: 'afro', label: 'Afro' },
    { value: 'fades', label: 'Fades' },
    { value: 'curly', label: 'Curly' }
  ],
  languages: [
    { value: 'english', label: 'English' },
    { value: 'german', label: 'German' }
  ],
  availableHours: {
    monday: { isOpen: true, start: '09:00', end: '18:00' },
    tuesday: { isOpen: true, start: '09:00', end: '18:00' },
    wednesday: { isOpen: true, start: '09:00', end: '18:00' },
    thursday: { isOpen: true, start: '09:00', end: '20:00' },
    friday: { isOpen: true, start: '09:00', end: '20:00' },
    saturday: { isOpen: true, start: '10:00', end: '16:00' },
    sunday: { isOpen: false, start: '10:00', end: '16:00' }
  },
  profileImage: 'https://images.unsplash.com/photo-1618223752950-9482d8c845f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
};

export const ProfileSettings = () => {
  const { toast } = useToast();
  const [barber, setBarber] = useState(sampleBarber);
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBarber({ ...barber, [name]: value });
  };
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNewProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const toggleDayAvailability = (day: string) => {
    setBarber({
      ...barber,
      availableHours: {
        ...barber.availableHours,
        [day]: {
          ...barber.availableHours[day as keyof typeof barber.availableHours],
          isOpen: !barber.availableHours[day as keyof typeof barber.availableHours].isOpen
        }
      }
    });
  };
  
  const handleHoursChange = (day: string, field: 'start' | 'end', value: string) => {
    setBarber({
      ...barber,
      availableHours: {
        ...barber.availableHours,
        [day]: {
          ...barber.availableHours[day as keyof typeof barber.availableHours],
          [field]: value
        }
      }
    });
  };
  
  const saveChanges = () => {
    // save changes to an API
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
    });
    
    if (newProfileImage) {
      setBarber({ ...barber, profileImage: newProfileImage });
      setNewProfileImage(null);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Information</h3>
        
        <div className="flex items-center space-x-6">
          <div className="relative w-24 h-24">
            <img 
              src={newProfileImage || barber.profileImage}
              alt={barber.name}
              className="w-full h-full object-cover rounded-full border"
            />
            <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-barber-primary text-white p-1 rounded-full cursor-pointer">
              <Camera size={16} />
            </label>
            <Input 
              id="profile-image" 
              type="file" 
              className="hidden"
              onChange={handleProfileImageChange}
              accept="image/*"
            />
          </div>
          
          <div>
            <h4 className="font-semibold">{barber.name}</h4>
            <p className="text-sm text-gray-600">Barber ID: #10234</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              value={barber.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email"
              value={barber.email}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              name="phone" 
              value={barber.phone}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Starting Price (€)</Label>
            <Input 
              id="price" 
              name="price" 
              value={barber.price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Shop Address</Label>
          <Input 
            id="address" 
            name="address" 
            value={barber.address}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            name="city" 
            value={barber.city}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="about">About</Label>
          <Textarea 
            id="about" 
            name="about" 
            value={barber.about}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Specialties & Languages</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Hair Type Specialties</Label>
            <MultiSelect 
              options={hairSpecialties}
              value={barber.specialties}
              onChange={(newValue) => setBarber({...barber, specialties: newValue})}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Languages Spoken</Label>
            <MultiSelect 
              options={languageOptions}
              value={barber.languages}
              onChange={(newValue) => setBarber({...barber, languages: newValue})}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Availability</h3>
        <div className="flex items-center mb-2">
          <Clock className="mr-2 text-barber-primary" size={20} />
          <span className="text-sm text-gray-600">Set your working hours</span>
        </div>
        
        <div className="space-y-4">
          {Object.entries(barber.availableHours).map(([day, hours]) => (
            <div key={day} className="flex items-center gap-4">
              <div className="w-28 flex items-center">
                <Checkbox 
                  id={`${day}-available`}
                  checked={hours.isOpen}
                  onCheckedChange={() => toggleDayAvailability(day)}
                />
                <Label htmlFor={`${day}-available`} className="ml-2 capitalize">
                  {day}
                </Label>
              </div>
              
              <div className="flex gap-2 items-center flex-1">
                <Input 
                  type="time"
                  value={hours.start}
                  onChange={(e) => handleHoursChange(day, 'start', e.target.value)}
                  disabled={!hours.isOpen}
                  className="w-36"
                />
                <span>to</span>
                <Input 
                  type="time"
                  value={hours.end}
                  onChange={(e) => handleHoursChange(day, 'end', e.target.value)}
                  disabled={!hours.isOpen}
                  className="w-36"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Portfolio</h3>
        
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <Upload className="mx-auto h-10 w-10 text-gray-400" />
          <h4 className="mt-2">Upload your work photos</h4>
          <p className="text-sm text-gray-500 mt-1">Drag and drop or click to upload</p>
          <Input 
            type="file" 
            className="mt-4 mx-auto max-w-sm"
            multiple
            accept="image/*"
          />
        </div>
      </div>
      
      <Button onClick={saveChanges} className="w-full md:w-auto">
        Save Changes
      </Button>
    </div>
  );
};
