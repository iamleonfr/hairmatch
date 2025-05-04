
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StripeCheckoutButton } from '@/components/payments/StripeCheckoutButton';
import { useAuth } from '@clerk/clerk-react';
import { Check } from 'lucide-react';

const PremiumSection = () => {
  const { isSignedIn } = useAuth();

  // Handle non-authenticated users
  const handleAuthRequired = () => {
    window.location.href = "/auth?tab=signup";
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Upgrade to Premium</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get unlimited bookings, priority support, and exclusive access to top-rated barbers.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 flex-1 max-w-md mx-auto lg:mx-0">
            <h3 className="text-xl font-bold mb-2">Monthly Subscription</h3>
            <p className="text-4xl font-bold mb-6">$9.99<span className="text-lg text-gray-500">/month</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Unlimited bookings</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Exclusive barber access</span>
              </li>
            </ul>
            {isSignedIn ? (
              <StripeCheckoutButton
                priceId="price_1PBsS3RgpFmETojRNObjIMWC"
                buttonText="Subscribe Now"
                className="w-full bg-barber-primary hover:bg-blue-800"
              />
            ) : (
              <Button
                className="w-full bg-barber-primary hover:bg-blue-800"
                onClick={handleAuthRequired}
              >
                Sign Up to Subscribe
              </Button>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 flex-1 max-w-md mx-auto lg:mx-0 border-2 border-blue-500 relative">
            <div className="absolute -top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">BEST VALUE</div>
            <h3 className="text-xl font-bold mb-2">Annual Subscription</h3>
            <p className="text-4xl font-bold mb-6">$99.99<span className="text-lg text-gray-500">/year</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Save 17% compared to monthly</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>All monthly benefits</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>Bonus style consultations</span>
              </li>
            </ul>
            {isSignedIn ? (
              <StripeCheckoutButton
                priceId="price_1PBsTxRgpFmETojRgmpO2trC"
                buttonText="Subscribe Yearly"
                className="w-full bg-barber-primary hover:bg-blue-800"
              />
            ) : (
              <Button
                className="w-full bg-barber-primary hover:bg-blue-800"
                onClick={handleAuthRequired}
              >
                Sign Up to Subscribe
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSection;
