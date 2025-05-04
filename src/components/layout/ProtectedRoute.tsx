
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'barber' | 'admin';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isSignedIn, isLoaded } = useUser();

  const { data: userRole, isLoading: isRoleLoading } = useQuery({
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
    enabled: !!user?.id && isSignedIn,
  });

  if (!isLoaded || isRoleLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/auth" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    if (userRole === 'barber') {
      return <Navigate to="/barber-dashboard" />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/user-profile" />;
    }
  }

  return <>{children}</>;
};
