
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface StripeCheckoutButtonProps {
  priceId: string;
  buttonText: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  successUrl?: string;
  cancelUrl?: string;
  className?: string;
}

export const StripeCheckoutButton = ({
  priceId,
  buttonText,
  variant = 'default',
  successUrl,
  cancelUrl,
  className,
}: StripeCheckoutButtonProps) => {
  const { userId, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!isSignedIn || !userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe",
        variant: "destructive",
      });
      window.location.href = "/auth";
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId,
          successUrl: successUrl || `${window.location.origin}/payment-success`,
          cancelUrl: cancelUrl || `${window.location.origin}/payment-canceled`,
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
      onClick={handleCheckout} 
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
