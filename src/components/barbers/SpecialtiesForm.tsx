
import React from 'react';
import { Label } from '@/components/ui/label';
import { MultiSelect, OptionType } from '@/components/ui/multi-select';

// Constants for select options
export const hairSpecialties = [
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
];

export const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'german', label: 'German' },
  { value: 'turkish', label: 'Turkish' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'italian', label: 'Italian' },
];

interface SpecialtiesFormProps {
  specialties: OptionType[];
  languages: OptionType[];
  onChange: {
    specialties: (newValue: OptionType[]) => void;
    languages: (newValue: OptionType[]) => void;
  };
}

const SpecialtiesForm = ({ specialties, languages, onChange }: SpecialtiesFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Hair Type Specialties</Label>
        <MultiSelect 
          options={hairSpecialties}
          value={specialties}
          onChange={onChange.specialties}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Languages Spoken</Label>
        <MultiSelect 
          options={languageOptions}
          value={languages}
          onChange={onChange.languages}
          className="w-full"
        />
      </div>
    </>
  );
};

export default SpecialtiesForm;
