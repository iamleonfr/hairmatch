
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'barber' | 'admin';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading, profile } = useAuth();
  
  // If auth is still loading, show loading state
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If no user is logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // If a specific role is required and the user doesn't have it
  if (requiredRole && profile?.role !== requiredRole) {
    console.log('Role mismatch, current role:', profile?.role, 'required role:', requiredRole);
    
    // Redirect based on user's actual role
    if (profile?.role === 'barber') {
      return <Navigate to="/barber-dashboard" />;
    } else if (profile?.role === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    } else {
      // Default for customers
      return <Navigate to="/user-profile" />;
    }
  }

  return <>{children}</>;
};
