
import { supabase } from '@/integrations/supabase/client';

// Check if a user has a specific role
export const hasRole = async (userId: string, role: 'customer' | 'barber' | 'admin'): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data?.role === role;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
};

// Get a user's role
export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data?.role;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

// Set a user's role
export const setUserRole = async (userId: string, role: 'customer' | 'barber' | 'admin'): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error setting user role:', error);
    return false;
  }
};
