
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '../contexts/AuthContext';



import { supabase } from '@/integrations/supabase/client';
import { Check, Calendar } from 'lucide-react';

const PaymentSuccess = () => {
  const { user } = useAuth();
  interface SubscriptionDetails {
    current_period_start: string;
    current_period_end: string;
    status: string;
    // Add any other properties as needed
  }
  
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) return;
      
      try {
        const { data } = await supabase.functions.invoke('check-subscription');
        if (data.subscribed) {
          setSubscriptionDetails(data.subscription || data.stripeSubscription);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [user]);

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container py-12 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your subscription. Your premium access has been activated.
          </p>
          
          {loading ? (
            <div className="text-center py-8">Loading subscription details...</div>
          ) : subscriptionDetails ? (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Subscription Details</h3>
              <div className="space-y-2 text-left">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-barber-primary" />
                  <p className="text-gray-700">
                    <span className="font-medium">Current period: </span>
                    {formatDate(subscriptionDetails.current_period_start)} - {formatDate(subscriptionDetails.current_period_end)}
                  </p>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">Status: </span>
                  <span className="text-green-600 capitalize">{subscriptionDetails.status}</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-yellow-600 mb-6">
              Your subscription is being processed. It may take a few moments to appear.
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-barber-primary">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/barbers">Browse Barbers</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
