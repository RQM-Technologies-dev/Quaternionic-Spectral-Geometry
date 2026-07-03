import { useEffect, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Users, Star, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function QSGSubscription() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    document.title = "QSG Course Subscription - Academic Access | RQM Technologies";
  }, []);

  const handleSubscribeClick = async (planType: string) => {
    if (!isAuthenticated) {
      window.location.href = "/api/login";
      return;
    }

    setProcessingPayment(true);

    try {
      // Redirect to checkout page (Stripe configuration checked there)
      window.location.href = "/qsg-checkout";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process subscription request",
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  const features = [
    "Complete access to all 12 QSG chapters",
    "Advanced mathematical proofs and derivations",
    "Computational primitives and algorithms",
    "Variational principles and functionals",
    "Interactive exercises and problem sets",
    "Downloadable reference materials",
    "Monthly updates and new content",
    "Academic discussion forum access"
  ];

  const premiumChapters = [
    "Chapter 9: Coherence Functionals & Variational Principles",
    "Chapter 10: The Five Fundamental Theorems of QSG",
    "Chapter 11: Taylor/Series Analogs",
    "Chapter 12: Computational Primitives"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              QSG Course Access
            </h1>
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">
              Academic Pricing for Advanced Quaternionic Spectral Geometry
            </h2>
            <div className="text-lg text-blue-600 mb-8">
              <p className="mb-2">Unlock the complete digital textbook experience</p>
              <p className="text-base text-gray-600">Professional access to cutting-edge quantum mathematics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Premium Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Access Level
          </h3>

          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Free Access - Smaller and Above */}
            <Card className="border-2 border-gray-200 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <BookOpen className="mx-auto h-8 w-8 text-gray-600 mb-3" />
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Free Access</h4>
                  <p className="text-2xl font-bold text-gray-600">$0</p>
                  <p className="text-sm text-gray-500">Always free</p>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Chapters 1-8: Complete foundational content</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Framework, Spectral Theory, and Analysis</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Basic exercises and examples</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">PDF download capability</span>
                  </div>
                </div>

                <Link href="/quaternionic-spectral-geometry-book">
                  <Button variant="outline" className="w-full">
                    Access Free Content
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Academic Access - Premium/Full Size */}
            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Most Popular
                </div>
              </div>

              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Users className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Academic Access</h4>
                  <p className="text-4xl font-bold text-blue-600">$29</p>
                  <p className="text-gray-500">per month</p>
                  <p className="text-sm text-blue-600 mt-1">Special academic pricing</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Everything in Free</strong> plus:</span>
                  </div>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  onClick={() => handleSubscribeClick("academic")}
                  disabled={processingPayment}
                >
                  {processingPayment ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Content Details */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Premium Content Included
          </h3>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Part V — Variational & Fundamental Theorems
                </h4>
                <ul className="space-y-3 text-orange-700">
                  <li>• Chapter 9: Coherence Functionals & Variational Principles</li>
                  <li>• Chapter 10: The Five Fundamental Theorems of QSG</li>
                  <li>• Advanced proof techniques and theoretical foundations</li>
                  <li>• Variational calculus in quaternionic settings</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Part VI — Approximation & Computation
                </h4>
                <ul className="space-y-3 text-purple-700">
                  <li>• Chapter 11: Taylor/Series Analogs</li>
                  <li>• Chapter 12: Computational Primitives</li>
                  <li>• Implementation guides (Python, C++, GPU)</li>
                  <li>• FFT + Wigner–D algorithms</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Academic Benefits */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-8">
              <h4 className="text-2xl font-bold text-green-800 mb-6 text-center">
                Why Academic Pricing?
              </h4>
              <div className="grid md:grid-cols-3 gap-6 text-green-700">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-3 text-green-600" />
                  <h5 className="font-semibold mb-2">Research Community</h5>
                  <p className="text-sm">Supporting academic research in quantum mathematics</p>
                </div>
                <div className="text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-3 text-green-600" />
                  <h5 className="font-semibold mb-2">Educational Access</h5>
                  <p className="text-sm">Making advanced knowledge accessible to students</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-3 text-green-600" />
                  <h5 className="font-semibold mb-2">Premium Support</h5>
                  <p className="text-sm">Direct access to content creators and updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h3>

          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                What makes this academic pricing?
              </h4>
              <p className="text-gray-700">
                Our academic pricing is designed specifically for researchers, students, and educators working in quantum mathematics, spectral geometry, and related fields. This represents a significant discount from commercial licensing.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h4>
              <p className="text-gray-700">
                Yes, you can cancel your subscription at any time. You'll continue to have access to premium content until the end of your current billing period.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Is there institutional pricing available?
              </h4>
              <p className="text-gray-700">
                Yes! For university departments, research institutions, or group access, please contact us at <strong>contact@rqmtechnologies.com</strong> for custom pricing options.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods are accepted?
              </h4>
              <p className="text-gray-700">
                We accept all major credit cards and debit cards through our secure payment processor. All transactions are encrypted and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}