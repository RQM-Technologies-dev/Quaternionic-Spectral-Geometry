import { useEffect, useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const getStripePromise = () => {
  if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
    console.error('Missing VITE_STRIPE_PUBLIC_KEY');
    return null;
  }
  try {
    return loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  } catch (error) {
    console.error('Failed to load Stripe:', error);
    return null;
  }
};
const stripePromise = getStripePromise();

const CheckoutForm = ({ subscriptionId }: { subscriptionId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/qsg-subscription?status=success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Welcome to QSG Course Premium Access!",
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700"
        size="lg"
      >
        {isLoading ? "Processing..." : "Subscribe for $29/month"}
      </Button>
    </form>
  );
};

export default function QSGCheckout() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "QSG Course Checkout - Secure Payment | RQM Technologies";
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      window.location.href = "/api/login";
      return;
    }

    if (!stripePromise) {
      setLoading(false);
      toast({
        title: "Configuration Error",
        description: "Payment system not properly configured. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    // Create subscription as soon as the page loads
    const createSubscription = async () => {
      try {
        setLoading(true);
        const response = await apiRequest("POST", "/api/create-subscription", {
          planType: "academic"
        });

        const data = await response.json();

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setSubscriptionId(data.subscriptionId);
        } else {
          throw new Error(data.message || "Failed to create subscription");
        }
      } catch (error: any) {
        console.error("Subscription creation error:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to initialize payment",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    createSubscription();
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Preparing your subscription...</p>
            </div>
          </div>
        </div>

      </div>
    );
  }

  if (!clientSecret || !stripePromise) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-red-200 bg-red-50">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-red-800 mb-4">
                  Payment Setup Error
                </h2>
                <p className="text-red-700 mb-6">
                  {!stripePromise ?
                    "Payment system configuration error. Please contact support." :
                    "Unable to initialize payment processing. Please try again or contact support."
                  }
                </p>
                <Link href="/qsg-subscription">
                  <Button variant="outline" className="mr-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go Back
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              Complete Your Subscription
            </h1>
            <p className="text-lg text-blue-700">
              Secure payment for QSG Course Academic Access
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">QSG Course Academic Access</h4>
                        <p className="text-sm text-gray-600">Monthly subscription</p>
                      </div>
                      <span className="font-semibold text-gray-900">$29.00</span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total per month:</span>
                        <span className="text-blue-600">$29.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Complete access to all 12 QSG chapters</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Parts V & VI: Advanced theoretical content</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Computational primitives and algorithms</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Cancel anytime - no long-term commitment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div>
              <Card className="border-2 border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h3>

                  <Elements stripe={stripePromise} options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#2563eb',
                      }
                    }
                  }}>
                    <CheckoutForm subscriptionId={subscriptionId} />
                  </Elements>

                  <div className="mt-6 text-xs text-gray-500 text-center">
                    <p className="mb-2">🔒 Your payment information is secure and encrypted</p>
                    <p>Powered by Stripe • Academic pricing available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link href="/qsg-subscription" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to subscription options
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}