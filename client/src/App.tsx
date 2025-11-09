import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Welcome from "@/pages/welcome";
import SDGSelection from "@/pages/sdg-selection";
import Discover from "@/pages/discover";
import FundDetail from "@/pages/fund-detail";
import Success from "@/pages/success";
import ImpactDashboard from "@/pages/impact-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/sdg" component={SDGSelection} />
      <Route path="/discover" component={Discover} />
      <Route path="/fund/:slug" component={FundDetail} />
      <Route path="/success" component={Success} />
      <Route path="/dashboard" component={ImpactDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen">
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
