
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'barber' | 'admin';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isLoaded, userId, isSignedIn } = useAuth();

  const { data: userRole, isLoading: isRoleLoading } = useQuery({
    queryKey: ['userRole', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      // First check in the profiles table for role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return null;
      }
      
      return profileData?.role || null;
    },
    enabled: !!userId && isSignedIn,
  });

  if (!isLoaded || (isSignedIn && isRoleLoading)) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!userId || !isSignedIn) {
    return <Navigate to="/auth" />;
  }

  // If a specific role is required and the user doesn't have it
  if (requiredRole && userRole !== requiredRole) {
    // Redirect based on user's actual role
    if (userRole === 'barber') {
      return <Navigate to="/barber-dashboard" />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    } else {
      // Default for users
      return <Navigate to="/user-profile" />;
    }
  }

  return <>{children}</>;
};
