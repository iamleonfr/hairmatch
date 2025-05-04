
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { X } from 'lucide-react';

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="h-8 w-8 text-red-600" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment Canceled</h1>
            <p className="text-gray-600 mb-8">
              Your subscription payment was canceled. No charges were made to your account.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold mb-4">What happens now?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-gray-700 mr-2">•</span>
                  <span>You can try subscribing again whenever you're ready.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-700 mr-2">•</span>
                  <span>You still have access to all free features of HairMatch.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-700 mr-2">•</span>
                  <span>If you encountered any issues during checkout, please contact our support team.</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-barber-primary">
                <Link to="/pricing">Try Again</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentCanceled;
