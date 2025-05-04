
import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface TermsAgreementProps {
  agreeToTerms: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const TermsAgreement = ({ agreeToTerms, onCheckedChange }: TermsAgreementProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="agreeToTerms" 
          checked={agreeToTerms}
          onCheckedChange={onCheckedChange}
        />
        <label
          htmlFor="agreeToTerms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the terms and conditions and privacy policy
        </label>
      </div>
    </Card>
  );
};

export default TermsAgreement;
