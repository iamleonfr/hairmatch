
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ShopInfoFormProps {
  formData: {
    shopName: string;
    address: string;
    city: string;
    startingPrice: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ShopInfoForm = ({ formData, handleInputChange }: ShopInfoFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="shopName">Shop Name</Label>
        <Input 
          id="shopName" 
          name="shopName" 
          value={formData.shopName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Shop Address</Label>
          <Input 
            id="address" 
            name="address" 
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            name="city" 
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="startingPrice">Starting Price (€)</Label>
        <Input 
          id="startingPrice" 
          name="startingPrice" 
          type="number"
          min="0"
          value={formData.startingPrice}
          onChange={handleInputChange}
          required
        />
      </div>
    </>
  );
};

export default ShopInfoForm;
