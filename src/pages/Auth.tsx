
import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const { userId, isSignedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    // Set active tab based on URL parameter
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam === 'signup') {
      setActiveTab('signup');
    }
  }, [location.search]);

  // Function to create user profile with role in Supabase after Clerk signup
  const createUserProfile = async (userId: string, role: string = 'customer') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          role: role as any,
          first_name: '',
          last_name: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      toast({
        title: "Profile created",
        description: "Your profile has been created successfully.",
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      toast({
        title: "Error creating profile",
        description: "There was an error creating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Redirect to home if already signed in
  useEffect(() => {
    if (userId && isSignedIn) {
      // Check if this user has a profile in Supabase
      const checkUserProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', userId);

        if (error) {
          console.error('Error checking user profile:', error);
          return;
        }

        // If no profile exists, create one
        if (!data || data.length === 0) {
          await createUserProfile(userId);
        }
        
        navigate('/');
      };
      
      checkUserProfile();
    }
  }, [userId, isSignedIn, navigate]);

  if (userId && isSignedIn) {
    return null; // Don't render anything while the effect runs
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container flex items-center justify-center py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-barber-dark mb-2">Welcome to HairMatch</h1>
            <p className="text-gray-600">Find the perfect barber for your hair type</p>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-center">Log in to your account</CardTitle>
                </CardHeader>
                <CardContent>
                  <SignIn 
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-barber-primary hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-md",
                        card: "bg-transparent shadow-none",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        formFieldLabel: "block text-gray-700 font-medium mb-1",
                        formFieldInput: "w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-primary",
                      }
                    }}
                    routing="path"
                    path="/auth"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card className="border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-center">Create an account</CardTitle>
                </CardHeader>
                <CardContent>
                  <SignUp 
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-barber-primary hover:bg-blue-800 text-white font-medium py-3 px-4 rounded-md",
                        card: "bg-transparent shadow-none",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        formFieldLabel: "block text-gray-700 font-medium mb-1",
                        formFieldInput: "w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-primary",
                      }
                    }}
                    routing="path"
                    path="/auth"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
