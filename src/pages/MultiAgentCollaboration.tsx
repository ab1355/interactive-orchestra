
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ChevronRight } from 'lucide-react';
import MetricsBar from '@/components/collaboration/MetricsBar';
import AgentRoster from '@/components/collaboration/AgentRoster';
import CommunicationThread from '@/components/collaboration/CommunicationThread';
import TaskDistributionDashboard from '@/components/collaboration/TaskDistributionDashboard';
import CollaborationFlowDiagram from '@/components/collaboration/CollaborationFlowDiagram';
import TaskRouter from '@/components/collaboration/TaskRouter';
import PriorityQueue from '@/components/collaboration/PriorityQueue';
import AgentCreationSystem from '@/components/collaboration/AgentCreationSystem';
import { agentCommunication } from '@/services/agentCommunication';
import { toast } from 'sonner';

const MultiAgentCollaboration: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading and setup
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Setup priority message handler to show toast notifications
      const unsubscribe = agentCommunication.subscribeToMessages((message) => {
        if (message.channel === 'priority') {
          toast.warning(`Priority message from ${message.senderRole}: ${message.content}`, {
            position: 'top-right',
            duration: 5000,
          });
        }
      }, { channel: 'priority' });
      
      // Clean up on unmount
      return () => {
        unsubscribe();
        agentCommunication.cleanup();
      };
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Multi-Agent Collaboration</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Active Agents: 3/4</span>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        <main className={`flex-1 p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-4 flex items-center text-sm text-gray-400">
            <a href="/" className="hover:text-white">Dashboard</a>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-white">Multi-Agent Collaboration</span>
          </div>

          {/* Top metrics bar */}
          <MetricsBar />
          
          {/* Agent Roster */}
          <AgentRoster />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TaskRouter />
            <PriorityQueue />
          </div>

          {/* Agent Creation System */}
          <div className="mb-6">
            <AgentCreationSystem />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CommunicationThread />
            <TaskDistributionDashboard />
          </div>
          
          <div className="mt-6">
            <CollaborationFlowDiagram />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MultiAgentCollaboration;
