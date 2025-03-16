
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TaskRouter from '@/components/collaboration/TaskRouter';
import PriorityQueue from '@/components/collaboration/PriorityQueue';
import CommunicationThread from '@/components/collaboration/CommunicationThread';
import AgentCreationSystem from '@/components/collaboration/AgentCreationSystem';

const AutonomousAgentSystem: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-dark text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-dark-200">
          <h1 className="text-xl font-semibold">Autonomous Agent System</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage agent tasks, communications, and autonomous actions
          </p>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TaskRouter />
            <PriorityQueue />
            <CommunicationThread />
            <AgentCreationSystem />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AutonomousAgentSystem;
