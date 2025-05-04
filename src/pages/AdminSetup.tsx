
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminSetup = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [userId, setUserId] = useState(user?.id || '');
  const [loading, setLoading] = useState(false);
  
  const handleSetAdmin = async () => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Please enter a user ID",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Update the profile to set role to admin
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Admin role has been set successfully",
      });
    } catch (error) {
      console.error('Error setting admin role:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom max-w-lg">
          <h1 className="text-3xl font-bold mb-8">Admin Setup</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Set Admin Role</CardTitle>
              <CardDescription>
                Use this utility to set a user as an admin. This page should be removed before production deployment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter user ID"
                />
                {user && (
                  <p className="text-xs text-gray-500">
                    Your current user ID: {user.id}
                  </p>
                )}
              </div>
              
              <Button
                className="w-full"
                onClick={handleSetAdmin}
                disabled={loading}
              >
                {loading ? "Setting Admin..." : "Set as Admin"}
              </Button>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <div className="p-4 bg-amber-100 border border-amber-300 rounded-md">
              <h2 className="font-semibold text-amber-800 mb-2">Security Warning</h2>
              <p className="text-amber-700 text-sm">
                This page is for initial setup only. Remove it from your application before deploying to production.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminSetup;
