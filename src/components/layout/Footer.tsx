
import { Link } from 'react-router-dom';
import { Scissors, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-barber-primary text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scissors size={24} />
              <span className="text-xl font-bold">HairMatch</span>
            </div>
            <p className="text-blue-100 text-sm">
              Finding the perfect barber for your unique hair type and cultural style.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Clients</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/barbers" className="hover:text-white transition-colors">Find Barbers</Link></li>
              <li><Link to="/preferences" className="hover:text-white transition-colors">Hair Quiz</Link></li>
              <li><Link to="/hair-analysis" className="hover:text-white transition-colors">Hair Analysis</Link></li>
              <li><Link to="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Barbers</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/barber-registration" className="hover:text-white transition-colors">Join as a Barber</Link></li>
              <li><Link to="/barber-dashboard" className="hover:text-white transition-colors">Barber Dashboard</Link></li>
              <li><a href="mailto:support@hairmatch.com" className="hover:text-white transition-colors">Get Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><a href="mailto:contact@hairmatch.com" className="hover:text-white transition-colors">Contact</a></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-6 text-sm text-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} HairMatch. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <a href="mailto:support@hairmatch.com" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
