
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import SimpleAgentWorkflow from "./pages/SimpleAgentWorkflow";
import MultiAgentCollaboration from "./pages/MultiAgentCollaboration";
import ToolIntegration from "./pages/ToolIntegration";
import CustomizableAgentBehavior from "./pages/CustomizableAgentBehavior";
import NotFound from "./pages/NotFound";
import ElevateSystem from "./pages/ElevateSystem";
import DiscoverSystem from "./pages/DiscoverSystem";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/simple-agent-workflow",
    element: <SimpleAgentWorkflow />,
  },
  {
    path: "/multi-agent-collaboration",
    element: <MultiAgentCollaboration />,
  },
  {
    path: "/tool-integration",
    element: <ToolIntegration />,
  },
  {
    path: "/customizable-agent-behavior",
    element: <CustomizableAgentBehavior />,
  },
  {
    path: "/elevate-system",
    element: <ElevateSystem />,
  },
  {
    path: "/discover-system",
    element: <DiscoverSystem />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
