
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ToolIntegration from './pages/ToolIntegration';
import CustomizableAgentBehavior from './pages/CustomizableAgentBehavior';
import AgentBehaviorSystem from './pages/AgentBehaviorSystem';
import EnhancedChatPage from './pages/EnhancedChat';
import DiscoverSystem from './pages/DiscoverSystem';
import SpaceSystem from './pages/SpaceSystem';
import FlowSystem from './pages/FlowSystem';
import AutonomousAgentSystem from './pages/AutonomousAgentSystem';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tool-integration" element={<ToolIntegration />} />
          <Route path="/customizable-agent-behavior" element={<CustomizableAgentBehavior />} />
          <Route path="/agent-behavior-system" element={<AgentBehaviorSystem />} />
          <Route path="/enhanced-chat" element={<EnhancedChatPage />} />
          <Route path="/discover-system" element={<DiscoverSystem />} />
          <Route path="/space-system" element={<SpaceSystem />} />
          <Route path="/flow-system" element={<FlowSystem />} />
          <Route path="/autonomous-agent-system" element={<AutonomousAgentSystem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
