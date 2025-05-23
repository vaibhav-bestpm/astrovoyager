import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ChartVisualization from "@/components/ChartVisualization";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: charts = [] } = useQuery({
    queryKey: ["/api/birth-charts"],
  });

  const { data: activePredictions = [] } = useQuery({
    queryKey: ["/api/predictions/active"],
  });

  const { data: upcomingTransits = [] } = useQuery({
    queryKey: ["/api/transits?limit=5"],
  });

  const { data: subscription } = useQuery({
    queryKey: ["/api/subscription"],
  });

  const primaryChart = charts[0];

  if (!primaryChart) {
    return (
      <div className="min-h-screen bg-cosmic-900 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <i className="fas fa-chart-pie text-gold-400 text-6xl mb-4"></i>
            <h1 className="text-3xl font-bold text-white mb-4">Welcome to Your Cosmic Journey</h1>
            <p className="text-cosmic-300 text-lg mb-8">
              Create your first birth chart to unlock personalized astrological insights
            </p>
          </div>
          
          <Link href="/birth-chart">
            <Button className="bg-mystical-gradient hover:shadow-lg hover:shadow-mystical-500/50 text-white px-8 py-4 text-lg">
              <i className="fas fa-plus mr-2"></i>
              Create Your Birth Chart
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-mystical-300 to-mystical-500 bg-clip-text text-transparent">
            Your Cosmic Dashboard
          </h1>
          <p className="text-cosmic-300 text-lg">
            Welcome back, {user?.firstName || "Cosmic Seeker"}! Here are your personalized insights.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <i className="fas fa-sun text-gold-400 text-2xl"></i>
                <span className="text-cosmic-400 text-sm">Sun Sign</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{primaryChart.sunSign || "Loading..."}</h3>
              <p className="text-cosmic-300 text-sm">Ruling Planet: Sun</p>
            </CardContent>
          </Card>

          <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <i className="fas fa-moon text-mystical-400 text-2xl"></i>
                <span className="text-cosmic-400 text-sm">Moon Sign</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{primaryChart.moonSign || "Loading..."}</h3>
              <p className="text-cosmic-300 text-sm">Nakshatra: {primaryChart.nakshatra || "Unknown"}</p>
            </CardContent>
          </Card>

          <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <i className="fas fa-arrow-up text-gold-400 text-2xl"></i>
                <span className="text-cosmic-400 text-sm">Ascendant</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{primaryChart.ascendant || "Loading..."}</h3>
              <p className="text-cosmic-300 text-sm">Rising Sign</p>
            </CardContent>
          </Card>

          <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <i className="fas fa-clock text-mystical-400 text-2xl"></i>
                <span className="text-cosmic-400 text-sm">Current Dasha</span>
              </div>
              <h3 className="text-2xl font-bold text-white">{primaryChart.currentMahadasha || "Unknown"}</h3>
              <p className="text-cosmic-300 text-sm">Mahadasha Period</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Birth Chart Visualization */}
          <div className="lg:col-span-2">
            <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Your Birth Chart
                  <Button variant="outline" size="sm" className="text-gold-400 border-gold-400">
                    <i className="fas fa-expand mr-2"></i>
                    Full View
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartVisualization chart={primaryChart} />
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-mystical-600 text-white">
                    Rashi Chart
                  </Badge>
                  <Badge variant="outline" className="border-cosmic-600 text-cosmic-300">
                    Navamsa (D9)
                  </Badge>
                  <Badge variant="outline" className="border-cosmic-600 text-cosmic-300">
                    Dashamsa (D10)
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Today's Insight */}
            <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <i className="fas fa-crystal-ball text-mystical-400 mr-2"></i>
                  Today's Insight
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activePredictions.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-cosmic-200 text-sm leading-relaxed">
                      {activePredictions[0].content}
                    </p>
                    <div className="flex items-center justify-between">
                      {activePredictions[0].luckyNumber && (
                        <span className="text-gold-400 font-medium text-sm">
                          Lucky Number: {activePredictions[0].luckyNumber}
                        </span>
                      )}
                      {activePredictions[0].luckyColor && (
                        <span className="text-mystical-400 font-medium text-sm">
                          Lucky Color: {activePredictions[0].luckyColor}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-cosmic-300 text-sm">No active predictions available.</p>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Transits */}
            <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <i className="fas fa-route text-gold-400 mr-2"></i>
                  Upcoming Transits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTransits.length > 0 ? (
                    upcomingTransits.map((transit: any) => (
                      <div
                        key={transit.id}
                        className="flex items-center justify-between p-3 bg-cosmic-800/50 rounded-lg"
                      >
                        <div>
                          <p className="text-white font-medium text-sm">
                            {transit.planet} → {transit.toSign}
                          </p>
                          <p className="text-cosmic-300 text-xs">
                            {new Date(transit.eventDate).toLocaleDateString()}
                          </p>
                        </div>
                        <i className="fas fa-info-circle text-mystical-400"></i>
                      </div>
                    ))
                  ) : (
                    <p className="text-cosmic-300 text-sm">No upcoming transits available.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-cosmic-700/60 backdrop-blur-sm border-mystical-800/30">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/compatibility">
                  <Button className="w-full bg-mystical-gradient hover:shadow-lg hover:shadow-mystical-500/30 text-white">
                    <i className="fas fa-heart mr-3"></i>
                    Check Compatibility
                  </Button>
                </Link>
                <Button className="w-full bg-gold-gradient hover:shadow-lg hover:shadow-gold-500/30 text-white">
                  <i className="fas fa-file-pdf mr-3"></i>
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
