import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Users, Star, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

// Load Stripe script
const loadStripe = () => {
  if (!(window as any).Stripe) {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    document.head.appendChild(script);
  }
};

export default function QSGSubscriptionSimple() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [pendingUserData, setPendingUserData] = useState<any>(null);

  useEffect(() => {
    document.title = "QSG Course Subscription - Academic Access | RQM Technologies";

    // Load Stripe
    loadStripe();

    // Check if user came from registration page
    const savedUserData = localStorage.getItem('pendingUserData');
    if (savedUserData) {
      try {
        const userData = JSON.parse(savedUserData);
        // Validate that we have all required fields
        if (userData.email && userData.password && userData.firstName && userData.lastName) {
          setPendingUserData(userData);
          toast({
            title: "Welcome back!",
            description: `Complete your subscription to activate your account, ${userData.firstName}.`,
          });
        } else {
          // Invalid/incomplete data, clean up
          localStorage.removeItem('pendingUserData');
        }
      } catch (error) {
        localStorage.removeItem('pendingUserData'); // Clean up invalid data
      }
    }
  }, [toast]);

  const handleDirectStripeCheckout = async () => {
    setProcessingPayment(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_academic', // We'll create this
          successUrl: `${window.location.origin}/quaternionic-spectral-geometry-book?success=true`,
          cancelUrl: `${window.location.origin}/qsg-subscription?canceled=true`
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = url;

    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to start checkout process",
        variant: "destructive",
      });
      setProcessingPayment(false);
    }
  };

  const handleSubscribeClick = async (planType: string) => {
    setProcessingPayment(true);

    try {
      if (pendingUserData && pendingUserData.email && pendingUserData.password &&
          pendingUserData.firstName && pendingUserData.lastName) {
        // Validate we have all required fields
        toast({
          title: "Processing Subscription",
          description: "Creating your Stripe subscription...",
        });

        const response = await fetch('/api/register-and-subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: pendingUserData.email,
            password: pendingUserData.password,
            firstName: pendingUserData.firstName,
            lastName: pendingUserData.lastName,
            planType
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create subscription');
        }

        const { clientSecret, subscriptionId } = await response.json();

        if (clientSecret) {
          // Redirect to Stripe Checkout
          const stripe = (window as any).Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
          const { error } = await stripe.confirmPayment({
            clientSecret,
            return_url: `${window.location.origin}/quaternionic-spectral-geometry-book?subscription_success=true`,
          });

          if (error) {
            throw new Error(error.message);
          }
        } else {
          throw new Error('Failed to initialize payment');
        }

        localStorage.removeItem('pendingUserData'); // Clean up
      } else {
        // Either no pending data or incomplete data - redirect to registration
        if (pendingUserData) {
          // Clean up incomplete data
          localStorage.removeItem('pendingUserData');
        }

        toast({
          title: "Registration Required",
          description: "Please complete account registration to continue with your subscription.",
        });

        // Use timeout to ensure toast is shown before redirect
        setTimeout(() => {
          window.location.href = "/qsg-register-subscribe";
        }, 1000);
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process subscription payment",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  const features = [
    "Complete access to all 12 QSG chapters",
    "Regularly published RQM resource access",
    "Advanced mathematical proofs and derivations",
    "Computational primitives and algorithms",
    "Stereographic projection techniques",
    "Real-time collaboration tools",
    "Priority support and updates"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 text-blue-600 mr-4" />
              <h1 className="text-4xl font-bold text-blue-900">
                QSG Course Academic Access
              </h1>
            </div>
            <p className="text-xl text-blue-700 mb-8 max-w-3xl mx-auto">
              Unlock advanced quaternionic spectral geometry content with our comprehensive
              academic subscription. Perfect for researchers, graduate students, and professionals.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-blue-800">
                <CheckCircle className="h-4 w-4 inline mr-2" />
                Create your account and subscribe in one simple step
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Access Overview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Content Access Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Content */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Free Access</h3>
                  <p className="text-green-700">Always available to everyone</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-green-800">Parts I-IV: Foundational Theory (Chapters 1-8)</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-green-800">Basic quaternionic algebra and geometry</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-green-800">Essential mathematical frameworks</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-green-800">Community access and discussions</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-green-800">$0</p>
                  <p className="text-sm text-green-600">Forever free</p>
                </div>
              </CardContent>
            </Card>

            {/* Premium Content */}
            <Card className="border-2 border-blue-200 bg-blue-50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  <Star className="h-3 w-3 inline mr-1" />
                  PREMIUM
                </div>
              </div>

              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">Academic Access</h3>
                  <p className="text-blue-700">Advanced research content</p>
                </div>

                <div className="space-y-3 mb-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-blue-800">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-blue-800">$29</p>
                  <p className="text-sm text-blue-600">per month</p>
                  <p className="text-xs text-blue-500 mt-1">Academic pricing • Cancel anytime</p>
                </div>

                <Button
                  onClick={() => handleDirectStripeCheckout()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                  size="lg"
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What's Included in Premium Access
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Parts V & VI: Advanced Theory</h3>
                  <p className="text-gray-600">
                    Complete access to Chapters 9-12 covering advanced computational
                    primitives and cutting-edge applications.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Research-Grade Content</h3>
                  <p className="text-gray-600">
                    Peer-reviewed mathematical proofs, derivations, and theoretical
                    frameworks used in active research.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Academic Community</h3>
                  <p className="text-gray-600">
                    Connect with researchers, graduate students, and professionals
                    working in quaternionic spectral geometry.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Regular Updates</h3>
                  <p className="text-gray-600">
                    Stay current with the latest developments in RQM theory and
                    quaternionic quantum computing research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Pricing Note */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            Academic Pricing
          </h3>
          <p className="text-blue-700 text-lg mb-6">
            Our subscription is designed specifically for academic use, with pricing
            that reflects our commitment to making advanced quantum research accessible
            to students, researchers, and educational institutions.
          </p>
          <div className="bg-white rounded-lg p-6 border border-blue-200">
            <p className="text-gray-700 mb-4">
              <strong>Perfect for:</strong> Graduate students, postdocs, faculty researchers,
              and professionals in quantum computing, theoretical physics, and advanced mathematics.
            </p>
            <p className="text-sm text-gray-600">
              No long-term commitment required. Cancel anytime through your account settings.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}