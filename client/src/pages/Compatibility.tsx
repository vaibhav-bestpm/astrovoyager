import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { insertBirthChartSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";

const compatibilitySchema = z.object({
  person1Data: insertBirthChartSchema.omit({ userId: true }),
  person2Data: insertBirthChartSchema.omit({ userId: true }),
});

export default function Compatibility() {
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(compatibilitySchema),
    defaultValues: {
      person1Data: {
        fullName: "",
        birthDate: "",
        birthTime: "",
        birthLocation: "",
        gender: "",
        chartSystem: "vedic",
        houseSystem: "whole_sign",
      },
      person2Data: {
        fullName: "",
        birthDate: "",
        birthTime: "",
        birthLocation: "",
        gender: "",
        chartSystem: "vedic",
        houseSystem: "whole_sign",
      },
    },
  });

  const analyzeCompatibilityMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/compatibility", data);
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysis(data);
      toast({
        title: "Compatibility Analysis Complete!",
        description: "Your cosmic connection has been analyzed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze compatibility. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    analyzeCompatibilityMutation.mutate(data);
  };

  const getIntensityColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getIntensityLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Challenging";
  };

  return (
    <div className="min-h-screen bg-cosmic-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-mystical-300 to-mystical-500 bg-clip-text text-transparent">
            Relationship Compatibility
          </h1>
          <p className="text-cosmic-300 text-lg">
            Discover your cosmic connection through Vedic astrology synastry analysis
          </p>
        </div>

        <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <i className="fas fa-heart text-mystical-400 mr-2"></i>
              Compatibility Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Compatibility Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Person 1 */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">Person 1</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="person1Data.fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200">Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter name"
                                className="bg-cosmic-800 border-cosmic-600 text-white placeholder-cosmic-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="person1Data.birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200">Birth Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="bg-cosmic-800 border-cosmic-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="person1Data.birthTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200">Birth Time</FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                className="bg-cosmic-800 border-cosmic-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="person1Data.birthLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200">Birth Location</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City, State, Country"
                                className="bg-cosmic-800 border-cosmic-600 text-white placeholder-cosmic-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Person 2 */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 text-center">Person 2</h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="person2Data.fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200">Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter name"
                                className="bg-cosmic-800 border-cosmic-600 text-white placeholder-cosmic-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="person2Data.birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200">Birth Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                className="bg-cosmic-800 border-cosmic-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="person2Data.birthTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200">Birth Time</FormLabel>
                            <FormControl>
                              <Input
                                type="time"
                                className="bg-cosmic-800 border-cosmic-600 text-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="person2Data.birthLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200">Birth Location</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="City, State, Country"
                                className="bg-cosmic-800 border-cosmic-600 text-white placeholder-cosmic-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={analyzeCompatibilityMutation.isPending}
                    className="bg-mystical-gradient hover:shadow-lg hover:shadow-mystical-500/50 text-white px-8 py-4 text-lg font-semibold"
                  >
                    {analyzeCompatibilityMutation.isPending ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-heart mr-2"></i>
                        Analyze Compatibility
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {/* Compatibility Results */}
            {analysis && (
              <div className="mt-8 bg-cosmic-800/50 rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-mystical-gradient rounded-full mb-4">
                    <span className="text-3xl font-bold text-white">{analysis.overallScore}%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {getIntensityLabel(analysis.overallScore)} Compatibility
                  </h3>
                  <p className="text-cosmic-300">Your cosmic energies analysis</p>
                </div>

                {/* Compatibility Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <i className="fas fa-heart text-green-400 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-white mb-2">Emotional</h4>
                    <div className="mb-2">
                      <Progress value={analysis.emotionalScore} className="w-full" />
                    </div>
                    <p className={`font-bold ${getIntensityColor(analysis.emotionalScore)}`}>
                      {analysis.emotionalScore}%
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-yellow-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <i className="fas fa-comments text-yellow-400 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-white mb-2">Communication</h4>
                    <div className="mb-2">
                      <Progress value={analysis.communicationScore} className="w-full" />
                    </div>
                    <p className={`font-bold ${getIntensityColor(analysis.communicationScore)}`}>
                      {analysis.communicationScore}%
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                      <i className="fas fa-star text-purple-400 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-white mb-2">Spiritual</h4>
                    <div className="mb-2">
                      <Progress value={analysis.spiritualScore} className="w-full" />
                    </div>
                    <p className={`font-bold ${getIntensityColor(analysis.spiritualScore)}`}>
                      {analysis.spiritualScore}%
                    </p>
                  </div>
                </div>

                {/* Detailed Analysis */}
                {analysis.analysis && (
                  <div className="p-4 bg-cosmic-700/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Detailed Analysis:</h4>
                    <p className="text-cosmic-200 text-sm leading-relaxed">{analysis.analysis}</p>
                  </div>
                )}

                {/* Key Insights */}
                {analysis.keyInsights && analysis.keyInsights.length > 0 && (
                  <div className="mt-4 p-4 bg-cosmic-700/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Key Insights:</h4>
                    <ul className="text-cosmic-200 text-sm space-y-1">
                      {analysis.keyInsights.map((insight: string, index: number) => (
                        <li key={index}>• {insight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
