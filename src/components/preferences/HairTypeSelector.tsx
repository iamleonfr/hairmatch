
import { useState } from 'react';

type HairType = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const hairTypes: HairType[] = [
  {
    id: 'straight',
    name: 'Straight',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    description: 'Smooth, sleek hair that reflects light and lies flat against the head.'
  },
  {
    id: 'wavy',
    name: 'Wavy',
    image: 'https://images.unsplash.com/photo-1621262410589-31e95e31dd87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    description: 'Texture between straight and curly with S-shaped waves.'
  },
  {
    id: 'curly',
    name: 'Curly',
    image: 'https://images.unsplash.com/photo-1605980625600-88c7825de389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    description: 'Springy ringlets that form an "S" pattern and have volume.'
  },
  {
    id: 'coily',
    name: 'Coily/Afro',
    image: 'https://images.unsplash.com/photo-1578033718797-dbc42088016d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    description: 'Tightly coiled strands forming a "Z" pattern, typically more fragile.'
  },
];

interface HairTypeSelectorProps {
  onSelect: (hairType: string) => void;
}

const HairTypeSelector = ({ onSelect }: HairTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const handleSelect = (hairTypeId: string) => {
    setSelectedType(hairTypeId);
    onSelect(hairTypeId);
  };
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Select Your Hair Type</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {hairTypes.map((type) => (
          <div 
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`
              cursor-pointer rounded-lg overflow-hidden border-2 transition-all
              ${selectedType === type.id 
                ? 'border-barber-primary shadow-lg scale-105 transform' 
                : 'border-transparent hover:border-gray-300'}
            `}
          >
            <div className="relative h-48">
              <img 
                src={type.image} 
                alt={type.name} 
                className="w-full h-full object-cover"
              />
              <div className={`
                absolute inset-0 flex items-center justify-center
                ${selectedType === type.id 
                  ? 'bg-barber-primary bg-opacity-70' 
                  : 'bg-black bg-opacity-40 hover:bg-opacity-50'}
              `}>
                <h4 className="text-white text-xl font-bold">{type.name}</h4>
              </div>
            </div>
            <div className="p-4 bg-white">
              <p className="text-sm text-gray-600">
                {type.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HairTypeSelector;
