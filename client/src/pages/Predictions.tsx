import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PremiumFeatures from "@/components/PremiumFeatures";

const predictionCategories = [
  { id: "career", name: "Career", icon: "fas fa-briefcase", color: "text-gold-400" },
  { id: "love", name: "Love", icon: "fas fa-heart", color: "text-mystical-400" },
  { id: "finance", name: "Finance", icon: "fas fa-coins", color: "text-gold-400" },
  { id: "health", name: "Health", icon: "fas fa-heartbeat", color: "text-red-400" },
  { id: "education", name: "Education", icon: "fas fa-graduation-cap", color: "text-mystical-400" },
  { id: "family", name: "Family", icon: "fas fa-users", color: "text-blue-400" },
];

export default function Predictions() {
  const [activeType, setActiveType] = useState("daily");
  const [activeCategory, setActiveCategory] = useState("");

  const { data: predictions = [], isLoading } = useQuery({
    queryKey: ["/api/predictions", { type: activeType, category: activeCategory }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeType) params.append("type", activeType);
      if (activeCategory) params.append("category", activeCategory);
      
      const response = await fetch(`/api/predictions?${params.toString()}`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch predictions");
      }
      
      return response.json();
    },
  });

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "excellent":
        return "text-green-400";
      case "favorable":
        return "text-green-400";
      case "positive":
        return "text-green-400";
      case "mixed":
        return "text-yellow-400";
      case "caution":
        return "text-yellow-400";
      case "challenging":
        return "text-red-400";
      default:
        return "text-cosmic-300";
    }
  };

  const getIntensityBadge = (intensity: string) => {
    const color = getIntensityColor(intensity);
    return (
      <Badge variant="outline" className={`${color} border-current`}>
        {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-cosmic-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-mystical-300 to-mystical-500 bg-clip-text text-transparent">
            Your Cosmic Predictions
          </h1>
          <p className="text-cosmic-300 text-lg">
            Personalized insights based on current planetary transits and your birth chart
          </p>
        </div>

        {/* Time Period Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-cosmic-700/60 backdrop-blur-sm rounded-full p-1 border border-mystical-800/30">
            {["daily", "weekly", "monthly"].map((type) => (
              <Button
                key={type}
                variant={activeType === type ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveType(type)}
                className={
                  activeType === type
                    ? "bg-mystical-600 text-white"
                    : "text-cosmic-300 hover:text-white"
                }
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={activeCategory === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory("")}
            className={
              activeCategory === ""
                ? "bg-mystical-600 text-white"
                : "border-cosmic-600 text-cosmic-300"
            }
          >
            All Categories
          </Button>
          {predictionCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={
                activeCategory === category.id
                  ? "bg-mystical-600 text-white"
                  : "border-cosmic-600 text-cosmic-300"
              }
            >
              <i className={`${category.icon} mr-1`}></i>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Predictions Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-cosmic-600 rounded mb-2"></div>
                    <div className="h-3 bg-cosmic-600 rounded mb-4"></div>
                    <div className="h-20 bg-cosmic-600 rounded mb-4"></div>
                    <div className="h-3 bg-cosmic-600 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : predictions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction: any) => {
              const category = predictionCategories.find(c => c.id === prediction.category);
              return (
                <Card
                  key={prediction.id}
                  className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30 hover:border-mystical-600/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {category && (
                          <i className={`${category.icon} ${category.color}`}></i>
                        )}
                        <CardTitle className="text-white text-lg">
                          {category?.name || prediction.category}
                        </CardTitle>
                      </div>
                      {prediction.intensity && getIntensityBadge(prediction.intensity)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cosmic-200 text-sm mb-4 leading-relaxed">
                      {prediction.content}
                    </p>
                    
                    {(prediction.luckyNumber || prediction.luckyColor) && (
                      <div className="flex items-center justify-between mb-4 text-xs">
                        {prediction.luckyNumber && (
                          <span className="text-gold-400 font-medium">
                            Lucky Number: {prediction.luckyNumber}
                          </span>
                        )}
                        {prediction.luckyColor && (
                          <span className="text-mystical-400 font-medium">
                            Lucky Color: {prediction.luckyColor}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-cosmic-400">
                      <span>
                        Valid: {new Date(prediction.validFrom).toLocaleDateString()} - {new Date(prediction.validTo).toLocaleDateString()}
                      </span>
                      {prediction.confidence && (
                        <span>Confidence: {prediction.confidence}%</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-crystal-ball text-cosmic-500 text-6xl mb-4"></i>
            <h3 className="text-xl font-semibold text-white mb-2">No Predictions Available</h3>
            <p className="text-cosmic-300 mb-6">
              Predictions will be generated once you create your birth chart.
            </p>
            <Button className="bg-mystical-gradient hover:shadow-lg hover:shadow-mystical-500/50 text-white">
              Create Birth Chart
            </Button>
          </div>
        )}

        {/* Premium Features Section */}
        <div className="mt-16">
          <PremiumFeatures />
        </div>
      </div>
    </div>
  );
}
