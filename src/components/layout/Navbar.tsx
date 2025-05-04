
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
import { useAuth, useUser, SignOutButton } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch user role from Supabase
  const { data: userRole } = useQuery({
    queryKey: ['userRole', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      
      return data?.role || null;
    },
    enabled: !!user?.id,
  });

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getInitials = () => {
    if (!user) return 'U';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
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
            {userRole !== 'barber' && (
              <Link to="/barber-registration" className="text-gray-700 hover:text-barber-primary transition-colors flex items-center">
                <UserPlus size={16} className="mr-1" />
                For Barbers
              </Link>
            )}
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/user-profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/bookings')}>
                    My Bookings
                  </DropdownMenuItem>
                  {userRole === 'barber' && (
                    <DropdownMenuItem onClick={() => navigate('/barber-dashboard')}>
                      Barber Dashboard
                    </DropdownMenuItem>
                  )}
                  {userRole === 'admin' && (
                    <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOutButton>
                      <button className="w-full text-left">Log out</button>
                    </SignOutButton>
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
          {userRole !== 'barber' && (
            <Link to="/barber-registration" className="py-2 text-gray-700 hover:text-barber-primary flex items-center" onClick={closeMenu}>
              <UserPlus size={16} className="mr-1" />
              For Barbers
            </Link>
          )}
          
          <div className="pt-4 border-t">
            {isSignedIn && user ? (
              <>
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.emailAddresses[0]?.emailAddress}</div>
                    <div className="text-sm text-gray-500">{user.firstName} {user.lastName}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link to="/user-profile" className="block py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
                    Profile
                  </Link>
                  <Link to="/bookings" className="block py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
                    My Bookings
                  </Link>
                  {userRole === 'barber' && (
                    <Link to="/barber-dashboard" className="block py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
                      Barber Dashboard
                    </Link>
                  )}
                  {userRole === 'admin' && (
                    <Link to="/admin-dashboard" className="block py-2 text-gray-700 hover:text-barber-primary" onClick={closeMenu}>
                      Admin Dashboard
                    </Link>
                  )}
                  <SignOutButton>
                    <button onClick={closeMenu} className="block w-full text-left py-2 text-red-600 hover:text-red-800">
                      Log out
                    </button>
                  </SignOutButton>
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
