
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface SubscriptionButtonProps {
  priceId: string;
  buttonText: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  successUrl?: string;
  cancelUrl?: string;
  className?: string;
}

export const SubscriptionButton = ({
  priceId,
  buttonText,
  variant = 'default',
  successUrl,
  cancelUrl,
  className,
}: SubscriptionButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscription = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId,
          successUrl,
          cancelUrl,
        },
      });

      if (error) throw error;
      
      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Could not initiate checkout",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      onClick={handleSubscription} 
      disabled={loading}
      className={className || (variant === 'default' ? 'bg-barber-primary hover:bg-blue-800' : '')}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};
