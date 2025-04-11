
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { SubscriptionButton } from '@/components/payments/SubscriptionButton';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const PricingPlans = () => {
  const { user } = useAuth();

  return (
    <section className="bg-gray-50 py-10">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing Plans</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your hairstyling needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <Card className="border-2 border-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>For occasional haircut needs</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">Free</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Browse available barbers</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Basic hair type quiz</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Limited matches per month</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <SubscriptionButton 
                priceId="price_free" 
                buttonText="Current Plan" 
                variant="outline" 
              />
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-barber-primary relative">
            <div className="absolute top-0 right-0 bg-barber-primary text-white py-1 px-3 text-sm font-medium rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For regular haircut enthusiasts</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>All Basic features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Advanced hair type matching</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Priority booking</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Unlimited matches</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <SubscriptionButton 
                priceId="price_1OBAU2B9DhNiqyqPVbKvljFv" 
                buttonText="Subscribe Now" 
              />
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-gray-100">
            <CardHeader>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription>For true hair style aficionados</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$19.99</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>All Pro features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>AI-powered style recommendations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>VIP appointment slots</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Exclusive discounts</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <SubscriptionButton 
                priceId="price_1OBAU2B9DhNiqyqPVbKvljFv" 
                buttonText="Subscribe Now" 
                variant="outline" 
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
