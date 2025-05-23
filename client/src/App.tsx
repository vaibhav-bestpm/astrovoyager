import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import BirthDataForm from "@/pages/BirthDataForm";
import Compatibility from "@/pages/Compatibility";
import Predictions from "@/pages/Predictions";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/Navigation";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cosmic-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-mystical-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cosmic-300">Loading your cosmic profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <Switch>
        {!isAuthenticated ? (
          <Route path="/" component={Landing} />
        ) : (
          <>
            <Route path="/" component={Dashboard} />
            <Route path="/birth-chart" component={BirthDataForm} />
            <Route path="/compatibility" component={Compatibility} />
            <Route path="/predictions" component={Predictions} />
          </>
        )}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
