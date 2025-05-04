import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth, useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { Check, Calendar } from 'lucide-react';

const PaymentSuccess = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  
  interface SubscriptionDetails {
    id: string;
    current_period_start: string;
    current_period_end: string;
    status: string;
  }
  
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!userId || !user?.primaryEmailAddress?.emailAddress) return;
      
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription', {
          body: {
            userId,
            userEmail: user.primaryEmailAddress.emailAddress
          }
        });
        
        if (error) {
          console.error('Error checking subscription:', error);
          return;
        }
        
        if (data.subscribed) {
          setSubscriptionDetails(data.subscription);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [userId, user]);

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your subscription. Your premium access has been activated.
            </p>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-pulse flex justify-center">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="mt-4 animate-pulse flex justify-center">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
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
                  <p className="text-gray-700">
                    <span className="font-medium">Subscription ID: </span>
                    <span className="text-gray-500">{subscriptionDetails.id}</span>
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
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
