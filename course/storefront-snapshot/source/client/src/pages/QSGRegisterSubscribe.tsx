import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { CheckCircle, ArrowLeft, User, Mail, Lock, CreditCard } from "lucide-react";
import { Link } from "wouter";

// Load Stripe script
const loadStripe = () => {
  if (!(window as any).Stripe) {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    document.head.appendChild(script);
  }
};

const PaymentForm = ({ userData }: { userData: any }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate payment processing for now
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Registration Successful!",
        description: "Your account has been created. Payment processing will be configured shortly.",
      });

      // Redirect to main textbook page for subscribers
      window.location.href = "/quaternionic-spectral-geometry-book";
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
          <div>
            <p className="text-blue-800 font-medium">Payment System Setup</p>
            <p className="text-blue-600 text-sm">
              Your account will be created. Payment processing is being configured.
            </p>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700"
        size="lg"
      >
        {isLoading ? "Creating Account..." : "Create Account & Subscribe"}
      </Button>
    </form>
  );
};

export default function QSGRegisterSubscribe() {
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = registration info, 2 = payment
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    document.title = "Register & Subscribe - QSG Course | RQM Technologies";
    // Load Stripe
    loadStripe();
  }, []);

  const handleUserDataChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinueToPayment = async () => {
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Process registration and create Stripe subscription directly
      toast({
        title: "Processing Registration",
        description: "Creating your account and setting up payment...",
      });

      const payload = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        planType: 'academic'
      };

      console.log('Sending registration data:', payload);

      const response = await fetch('/api/register-and-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create account');
      }

      const { clientSecret, subscriptionId } = await response.json();

      if (clientSecret) {
        // Load Stripe and redirect to payment
        const stripe = (window as any).Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

        toast({
          title: "Account Created!",
          description: "Redirecting to secure payment...",
        });

        // Redirect to Stripe payment
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

    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: error.message || "Failed to process registration",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Processing your registration...</p>
            </div>
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
              {step === 1 ? "Create Your Account" : "Complete Your Subscription"}
            </h1>
            <p className="text-lg text-blue-700">
              {step === 1
                ? "Register for QSG Course Academic Access"
                : "Secure payment for your subscription"
              }
            </p>

            {/* Progress indicator */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
                }`}>
                  {step > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
                </div>
                <span className="ml-2 font-medium">Account</span>
              </div>
              <div className={`h-1 w-12 ${step > 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Subscription Details */}
            <div>
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Subscription Details</h3>

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

            {/* Registration/Payment Form */}
            <div>
              <Card className="border-2 border-gray-200">
                <CardContent className="p-6">
                  {step === 1 ? (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Account Information</h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <div className="relative">
                              <User className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <Input
                                id="firstName"
                                type="text"
                                value={userData.firstName}
                                onChange={(e) => handleUserDataChange('firstName', e.target.value)}
                                className="pl-10"
                                placeholder="John"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <div className="relative">
                              <User className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <Input
                                id="lastName"
                                type="text"
                                value={userData.lastName}
                                onChange={(e) => handleUserDataChange('lastName', e.target.value)}
                                className="pl-10"
                                placeholder="Doe"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              value={userData.email}
                              onChange={(e) => handleUserDataChange('email', e.target.value)}
                              className="pl-10"
                              placeholder="john@university.edu"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="password">Create Password</Label>
                          <div className="relative">
                            <Lock className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="password"
                              type="password"
                              value={userData.password}
                              onChange={(e) => handleUserDataChange('password', e.target.value)}
                              className="pl-10"
                              placeholder="••••••••"
                              required
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Minimum 6 characters. Use a strong password.
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={handleContinueToPayment}
                        className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
                        size="lg"
                      >
                        Continue to Payment
                      </Button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h3>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <p className="text-green-800 text-sm">
                          <CheckCircle className="h-4 w-4 inline mr-2" />
                          Account details saved. Complete payment to activate your subscription.
                        </p>
                      </div>

                      <PaymentForm userData={userData} />

                      <div className="mt-6 text-center">
                        <Button
                          variant="outline"
                          onClick={() => setStep(1)}
                          size="sm"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back to Account Info
                        </Button>
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <div className="mt-6 text-xs text-gray-500 text-center">
                      <p className="mb-2">🔒 Your information is secure and encrypted</p>
                      <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
                    </div>
                  )}
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