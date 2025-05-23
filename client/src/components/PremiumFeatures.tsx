import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function PremiumFeatures() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscription } = useQuery({
    queryKey: ["/api/subscription"],
  });

  const upgradeMutation = useMutation({
    mutationFn: async (plan: string) => {
      const response = await apiRequest("POST", "/api/subscription", {
        plan,
        status: "active",
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Upgrade Successful!",
        description: "Welcome to Premium! Your new features are now active.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/subscription"] });
    },
    onError: (error: any) => {
      toast({
        title: "Upgrade Failed",
        description: error.message || "Failed to upgrade subscription. Please try again.",
        variant: "destructive",
      });
    },
  });

  const currentPlan = subscription?.plan || "basic";

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "Free",
      period: "Forever",
      features: [
        "Basic birth chart",
        "Daily predictions",
        "Basic compatibility",
      ],
      limitations: [
        "Detailed reports",
        "Divisional charts",
        "Premium support",
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      isPopular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "₹299",
      period: "per month",
      features: [
        "Everything in Basic",
        "Detailed PDF reports",
        "Divisional charts (D9, D10)",
        "Transit predictions",
        "Priority support",
      ],
      limitations: [],
      buttonText: "Upgrade Now",
      buttonVariant: "default" as const,
      isPopular: true,
    },
    {
      id: "professional",
      name: "Professional",
      price: "₹599",
      period: "per month",
      features: [
        "Everything in Premium",
        "Live consultations",
        "Yearly predictions",
        "Multiple chart storage",
        "Custom remedies",
      ],
      limitations: [],
      buttonText: "Choose Professional",
      buttonVariant: "outline" as const,
      isPopular: false,
    },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
          Unlock Premium Insights
        </h2>
        <p className="text-cosmic-300 text-lg">
          Get deeper astrological insights with our premium features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${
              plan.isPopular
                ? "bg-mystical-gradient border-2 border-mystical-400 transform scale-105"
                : "bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gold-gradient text-white">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <div className="text-center">
                <CardTitle className={`text-xl font-bold mb-2 ${
                  plan.isPopular ? "text-white" : "text-white"
                }`}>
                  {plan.name}
                </CardTitle>
                <div className={`text-3xl font-bold mb-1 ${
                  plan.isPopular ? "text-white" : plan.id === "professional" ? "text-gold-400" : "text-mystical-400"
                }`}>
                  {plan.price}
                </div>
                <p className={`text-sm ${
                  plan.isPopular ? "text-mystical-100" : "text-cosmic-300"
                }`}>
                  {plan.period}
                </p>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center text-sm ${
                      plan.isPopular ? "text-white" : "text-cosmic-200"
                    }`}
                  >
                    <i className={`fas fa-check mr-3 ${
                      plan.isPopular ? "text-gold-400" : "text-green-400"
                    }`}></i>
                    {feature}
                  </li>
                ))}
                {plan.limitations.map((limitation, index) => (
                  <li
                    key={index}
                    className="flex items-center text-cosmic-400 text-sm"
                  >
                    <i className="fas fa-times text-cosmic-500 mr-3"></i>
                    {limitation}
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  plan.id === currentPlan
                    ? "bg-cosmic-600 hover:bg-cosmic-500 text-white cursor-not-allowed"
                    : plan.isPopular
                    ? "bg-gold-gradient hover:shadow-lg hover:shadow-gold-500/30 text-white"
                    : plan.id === "professional"
                    ? "bg-gold-600 hover:bg-gold-500 text-white"
                    : "bg-mystical-600 hover:bg-mystical-500 text-white"
                }`}
                disabled={plan.id === currentPlan || upgradeMutation.isPending}
                onClick={() => {
                  if (plan.id !== currentPlan) {
                    upgradeMutation.mutate(plan.id);
                  }
                }}
              >
                {upgradeMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processing...
                  </>
                ) : plan.id === currentPlan ? (
                  "Current Plan"
                ) : (
                  plan.buttonText
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
