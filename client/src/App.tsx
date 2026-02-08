import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomCursor } from "@/components/ui/custom-cursor";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Expertise from "@/pages/expertise";
import Sectors from "@/pages/sectors";
import Insight from "@/pages/insight";
import Contact from "@/pages/contact";
import ProjectCrossNursery from "@/pages/project-cross-nursery";
import ProjectStJulians from "@/pages/project-st-julians";
import ProjectPottersBar from "@/pages/project-potters-bar";
import Arboriculture from "@/pages/arboriculture";
import SurveyCalendar from "@/pages/survey-calendar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/expertise" component={Expertise} />
      <Route path="/arboriculture-and-forestry" component={Arboriculture} />
      <Route path="/sectors" component={Sectors} />
      <Route path="/insight" component={Insight} />
      <Route path="/survey-calendar" component={SurveyCalendar} />
      <Route path="/contact" component={Contact} />
      <Route path="/projects/cross-nursery" component={ProjectCrossNursery} />
      <Route path="/projects/st-julians" component={ProjectStJulians} />
      <Route path="/projects/potters-bar" component={ProjectPottersBar} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const raf = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(raf);
  }, [location]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <CustomCursor />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
