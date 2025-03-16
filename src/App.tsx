
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ToolIntegration from './pages/ToolIntegration';
import CustomizableAgentBehavior from './pages/CustomizableAgentBehavior';
import AgentBehaviorSystem from './pages/AgentBehaviorSystem';
import EnhancedChatPage from './pages/EnhancedChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tool-integration" element={<ToolIntegration />} />
        <Route path="/customizable-agent-behavior" element={<CustomizableAgentBehavior />} />
        <Route path="/agent-behavior-system" element={<AgentBehaviorSystem />} />
        <Route path="/enhanced-chat" element={<EnhancedChatPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
