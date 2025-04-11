
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  const getInitials = () => {
    if (!user) return 'U';
    const email = user.email || '';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm z-50 relative">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-barber-primary">HairMatch</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-barber-primary transition-colors">
              Home
            </Link>
            <Link to="/barbers" className="text-gray-700 hover:text-barber-primary transition-colors">
              Find Barbers
            </Link>
            <Link to="/preferences" className="text-gray-700 hover:text-barber-primary transition-colors">
              Hair Quiz
            </Link>
            <Link to="/barber-registration" className="text-gray-700 hover:text-barber-primary transition-colors flex items-center">
              <UserPlus size={16} className="mr-1" />
              For Barbers
            </Link>
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/barber-dashboard">
                    <DropdownMenuItem>
                      Barber Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/bookings">
                    <DropdownMenuItem>
                      Bookings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Log in
                </Button>
                <Button className="bg-barber-primary hover:bg-blue-800" onClick={() => navigate('/auth?tab=signup')}>
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-barber-primary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute w-full bg-white shadow-md z-40 animate-slide-in-right`}>
        <div className="container-custom py-4 flex flex-col space-y-3">
          <Link to="/" className="py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/barbers" className="py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
            Find Barbers
          </Link>
          <Link to="/preferences" className="py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
            Hair Quiz
          </Link>
          <Link to="/barber-registration" className="py-2 text-gray-700 hover:text-barber-primary flex items-center" onClick={closeMenu}>
            <UserPlus size={16} className="mr-1" />
            For Barbers
          </Link>
          
          <div className="pt-4 border-t">
            {user ? (
              <>
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.user_metadata?.first_name} {user.user_metadata?.last_name}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link to="/profile" className="block py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
                    Profile
                  </Link>
                  <Link to="/barber-dashboard" className="block py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
                    Barber Dashboard
                  </Link>
                  <Link to="/bookings" className="block py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
                    Bookings
                  </Link>
                  <button onClick={handleSignOut} className="block w-full text-left py-2 text-red-600 hover:text-red-800">
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-3">
                <Button variant="outline" onClick={() => { closeMenu(); navigate('/auth'); }}>
                  Log in
                </Button>
                <Button className="bg-barber-primary hover:bg-blue-800" onClick={() => { closeMenu(); navigate('/auth?tab=signup'); }}>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
