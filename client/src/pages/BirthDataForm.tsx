import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { insertBirthChartSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const formSchema = insertBirthChartSchema.extend({
  isTimeUnknown: insertBirthChartSchema.shape.isTimeUnknown.optional(),
});

export default function BirthDataForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      birthTime: "",
      isTimeUnknown: false,
      birthLocation: "",
      gender: "",
      chartSystem: "vedic",
      houseSystem: "whole_sign",
    },
  });

  const createChartMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/birth-charts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Chart Generated Successfully!",
        description: "Your birth chart has been created and saved.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/birth-charts"] });
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: "Error Creating Chart",
        description: error.message || "Failed to create birth chart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    createChartMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-cosmic-900 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-mystical-300 to-mystical-500 bg-clip-text text-transparent">
            Create Your Birth Chart
          </h1>
          <p className="text-cosmic-300 text-lg">
            Enter your birth details to generate your personalized Kundali
          </p>
        </div>

        <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <i className="fas fa-star text-gold-400 mr-2"></i>
              Birth Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cosmic-200">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
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
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cosmic-200">Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-cosmic-800 border-cosmic-600 text-white">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-cosmic-800 border-cosmic-600">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Birth Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="birthDate"
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
                    name="birthTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cosmic-200">Birth Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="bg-cosmic-800 border-cosmic-600 text-white"
                            disabled={form.watch("isTimeUnknown")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isTimeUnknown"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-8">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-cosmic-600"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-cosmic-300 text-sm">Unknown time</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Birth Location */}
                <FormField
                  control={form.control}
                  name="birthLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cosmic-200">Birth Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="City, State, Country"
                            className="bg-cosmic-800 border-cosmic-600 text-white placeholder-cosmic-400 pr-10"
                            {...field}
                          />
                          <i className="fas fa-map-marker-alt absolute right-3 top-1/2 transform -translate-y-1/2 text-cosmic-400"></i>
                        </div>
                      </FormControl>
                      <p className="text-cosmic-400 text-sm">We use this to calculate accurate planetary positions</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Chart Preferences */}
                <Card className="bg-cosmic-800/50 border-cosmic-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center">
                      <i className="fas fa-cog text-mystical-400 mr-2"></i>
                      Chart Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="chartSystem"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200 text-sm">Chart System</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-cosmic-700 border-cosmic-600 text-white text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-cosmic-800 border-cosmic-600">
                                <SelectItem value="vedic">Vedic (Sidereal)</SelectItem>
                                <SelectItem value="western">Western (Tropical)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="houseSystem"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-cosmic-200 text-sm">House System</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-cosmic-700 border-cosmic-600 text-white text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-cosmic-800 border-cosmic-600">
                                <SelectItem value="whole_sign">Whole Sign</SelectItem>
                                <SelectItem value="placidus">Placidus</SelectItem>
                                <SelectItem value="equal_house">Equal House</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={createChartMutation.isPending}
                  className="w-full bg-mystical-gradient hover:shadow-lg hover:shadow-mystical-500/50 text-white py-4 text-lg font-semibold"
                >
                  {createChartMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-3"></i>
                      Generating Chart...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-chart-pie mr-3"></i>
                      Generate My Kundali
                    </>
                  )}
                </Button>

                <p className="text-center text-cosmic-400 text-sm">
                  Your birth data is securely encrypted and never shared with third parties.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
