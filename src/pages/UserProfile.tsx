
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    // Update form state when profile data is loaded or refreshed
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
    }
  }, [profile]);

  const getInitials = () => {
    if (!profile) return 'U';
    const firstChar = profile.first_name?.charAt(0) || '';
    const lastChar = profile.last_name?.charAt(0) || '';
    return (firstChar + lastChar).toUpperCase();
  };

  const handleUpdateProfile = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to update your profile.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refresh the profile data in the context
      await refreshProfile();
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
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
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
                  </Avatar>
                  <CardTitle>
                    {profile?.first_name} {profile?.last_name}
                  </CardTitle>
                  <CardDescription>
                    {user?.email}
                  </CardDescription>
                  <CardDescription className="mt-2">
                    Role: {profile?.role || 'Customer'}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/preferences')}
                  >
                    Update Preferences
                  </Button>
                  
                  {profile?.role === 'barber' && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/barber-dashboard')}
                    >
                      Barber Dashboard
                    </Button>
                  )}
                  
                  {profile?.role === 'admin' && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/admin-dashboard')}
                    >
                      Admin Dashboard
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="preferences">Hair Preferences</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details here
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input 
                          id="firstName" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input 
                          id="lastName" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          value={user?.email || ''} 
                          disabled 
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Contact support to change your email
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleUpdateProfile} 
                        disabled={loading}
                        className="bg-barber-primary hover:bg-blue-800"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hair Preferences</CardTitle>
                      <CardDescription>
                        Your hair type and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-300 rounded-md">
                        <p className="text-gray-500 mb-4 text-center">
                          Take our hair quiz to set your preferences
                        </p>
                        <Button
                          onClick={() => navigate('/preferences')}
                          className="bg-barber-primary hover:bg-blue-800"
                        >
                          Take Hair Quiz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="appointments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Appointments</CardTitle>
                      <CardDescription>
                        View and manage your appointments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-300 rounded-md">
                        <p className="text-gray-500 mb-4 text-center">
                          You don't have any appointments yet
                        </p>
                        <Button
                          onClick={() => navigate('/barbers')}
                          className="bg-barber-primary hover:bg-blue-800"
                        >
                          Find a Barber
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
