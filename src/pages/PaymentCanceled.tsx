
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { XCircle } from 'lucide-react';

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container py-12 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment Canceled</h1>
          <p className="text-gray-600 mb-8">
            Your payment process was canceled. No charges have been made.
          </p>
          
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

export default PaymentCanceled;
