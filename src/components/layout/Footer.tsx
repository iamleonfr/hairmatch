
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
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Clients</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/barbers" className="hover:text-white transition-colors">Find Barbers</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Barbers</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/for-barbers" className="hover:text-white transition-colors">Join as a Barber</Link></li>
              <li><Link to="/barber-resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link to="/barber-help" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-blue-100">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-6 text-sm text-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} HairMatch. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
