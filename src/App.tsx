
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SimpleAgentWorkflow from "./pages/SimpleAgentWorkflow";
import MultiAgentCollaboration from "./pages/MultiAgentCollaboration";
import ToolIntegration from "./pages/ToolIntegration";
import CustomizableAgentBehavior from "./pages/CustomizableAgentBehavior";
import ElevateSystem from "./pages/ElevateSystem";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/simple-agent-workflow" element={<SimpleAgentWorkflow />} />
          <Route path="/multi-agent-collaboration" element={<MultiAgentCollaboration />} />
          <Route path="/tool-integration" element={<ToolIntegration />} />
          <Route path="/customizable-agent-behavior" element={<CustomizableAgentBehavior />} />
          <Route path="/elevate-system" element={<ElevateSystem />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
