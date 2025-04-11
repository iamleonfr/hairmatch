
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SubscriptionButton } from '@/components/payments/SubscriptionButton';

const PremiumSection = () => {
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
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unlimited bookings
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Exclusive barber access
              </li>
            </ul>
            <SubscriptionButton 
              priceId="price_123" 
              buttonText="Subscribe Now" 
              className="w-full bg-barber-primary hover:bg-blue-800" 
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 flex-1 max-w-md mx-auto lg:mx-0 border-2 border-blue-500">
            <div className="absolute -mt-12 ml-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">BEST VALUE</div>
            <h3 className="text-xl font-bold mb-2">Annual Subscription</h3>
            <p className="text-4xl font-bold mb-6">$99.99<span className="text-lg text-gray-500">/year</span></p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save 17% compared to monthly
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                All monthly benefits
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Bonus style consultations
              </li>
            </ul>
            <SubscriptionButton 
              priceId="price_456" 
              buttonText="Subscribe Yearly" 
              className="w-full bg-barber-primary hover:bg-blue-800" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumSection;
