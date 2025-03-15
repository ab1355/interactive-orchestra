
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ChevronRight, Users, Plus, BarChart, MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Agent Card Component
const AgentCard = ({ agent }: { agent: any }) => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full bg-${agent.color} flex items-center justify-center`}>
              <span className="text-white font-bold">{agent.name.charAt(0)}</span>
            </div>
            <div className="ml-3">
              <h3 className="text-white font-medium">{agent.name}</h3>
              <p className="text-gray-400 text-sm">{agent.role}</p>
            </div>
          </div>
          <div className={`text-xs px-2 py-1 rounded ${agent.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
            {agent.status}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-300">
            <p className="mb-2">Specialty: {agent.specialty}</p>
            <p>Tasks: {agent.tasks}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 p-3 flex justify-between">
        <button className="text-sm text-purple hover:text-purple-light">Configure</button>
        <button className="text-sm text-purple hover:text-purple-light">Assign Task</button>
      </div>
    </div>
  );
};

// Communication Thread Component
const CommunicationThread = () => {
  const messages = [
    { agent: 'Research Agent', message: 'I\'ve gathered the competitive analysis data you requested.', time: '10:32 AM' },
    { agent: 'Analysis Agent', message: 'Thanks, I\'ll start processing that information to identify market gaps.', time: '10:34 AM' },
    { agent: 'Research Agent', message: 'Also found some relevant customer testimonials that might help with sentiment analysis.', time: '10:36 AM' },
    { agent: 'Analysis Agent', message: 'Perfect. I\'ll incorporate those as well for a more comprehensive report.', time: '10:38 AM' },
  ];

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Inter-Agent Communication
        </h3>
        <div className="text-sm text-gray-400">Task: Market Analysis</div>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto p-1">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{msg.agent.charAt(0)}</span>
            </div>
            <div className="ml-3 bg-dark p-3 rounded-lg rounded-tl-none flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-purple font-medium text-sm">{msg.agent}</span>
                <span className="text-gray-500 text-xs">{msg.time}</span>
              </div>
              <p className="text-gray-300 text-sm">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex">
          <input type="text" className="flex-1 bg-dark border border-white/10 rounded-l p-2 text-white" placeholder="Send a message..." />
          <button className="bg-purple hover:bg-purple/80 text-white py-2 px-4 rounded-r">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Task Distribution Dashboard Component
const TaskDistributionDashboard = () => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium flex items-center">
          <BarChart className="w-4 h-4 mr-2" />
          Task Distribution
        </h3>
        <select className="bg-dark border border-white/10 rounded p-1 text-sm text-white">
          <option>Last 24 Hours</option>
          <option>Last Week</option>
          <option>Last Month</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-dark p-3 rounded-lg">
          <p className="text-gray-400 text-sm">Total Tasks</p>
          <p className="text-white text-xl font-semibold">24</p>
        </div>
        <div className="bg-dark p-3 rounded-lg">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-green-500 text-xl font-semibold">18</p>
        </div>
        <div className="bg-dark p-3 rounded-lg">
          <p className="text-gray-400 text-sm">In Progress</p>
          <p className="text-purple text-xl font-semibold">4</p>
        </div>
        <div className="bg-dark p-3 rounded-lg">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-yellow-500 text-xl font-semibold">2</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Research Agent</span>
          <span className="text-white">8 tasks</span>
        </div>
        <div className="w-full bg-dark rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '33%' }}></div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Analysis Agent</span>
          <span className="text-white">6 tasks</span>
        </div>
        <div className="w-full bg-dark rounded-full h-2">
          <div className="bg-purple h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Writer Agent</span>
          <span className="text-white">5 tasks</span>
        </div>
        <div className="w-full bg-dark rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '21%' }}></div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">QA Agent</span>
          <span className="text-white">5 tasks</span>
        </div>
        <div className="w-full bg-dark rounded-full h-2">
          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '21%' }}></div>
        </div>
      </div>
    </div>
  );
};

// Collaboration Flow Diagram Component
const CollaborationFlowDiagram = () => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">Collaboration Flow</h3>
      <div className="bg-dark border border-white/10 rounded-lg p-4 flex flex-col items-center">
        <p className="text-gray-400 text-sm mb-4">Current Active Workflow: Market Research Report</p>
        
        <div className="w-full max-w-lg">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 text-center w-40">
              <p className="text-blue-400 font-medium">Research Agent</p>
              <p className="text-xs text-gray-400">Data Collection</p>
            </div>
          </div>
          
          <div className="flex justify-center mb-2">
            <div className="h-8 w-0.5 bg-white/20"></div>
          </div>
          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-white/50" />
          </div>
          
          <div className="flex justify-center items-center my-4">
            <div className="bg-purple/20 border border-purple/50 rounded-lg p-3 text-center w-40">
              <p className="text-purple font-medium">Analysis Agent</p>
              <p className="text-xs text-gray-400">Data Processing</p>
            </div>
          </div>
          
          <div className="flex justify-center mb-2">
            <div className="h-8 w-0.5 bg-white/20"></div>
          </div>
          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-white/50" />
          </div>
          
          <div className="flex justify-center items-center my-4">
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center w-40">
              <p className="text-green-400 font-medium">Writer Agent</p>
              <p className="text-xs text-gray-400">Report Generation</p>
            </div>
          </div>
          
          <div className="flex justify-center mb-2">
            <div className="h-8 w-0.5 bg-white/20"></div>
          </div>
          <div className="flex justify-center">
            <ArrowRight className="w-5 h-5 text-white/50" />
          </div>
          
          <div className="flex justify-center items-center mt-4">
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 text-center w-40">
              <p className="text-yellow-400 font-medium">QA Agent</p>
              <p className="text-xs text-gray-400">Quality Verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MultiAgentCollaboration: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const agents = [
    { 
      name: 'Research Agent', 
      role: 'Information Gathering', 
      status: 'Active', 
      color: 'blue-500',
      specialty: 'Web search, data extraction',
      tasks: '8 completed, 2 in progress'
    },
    { 
      name: 'Analysis Agent', 
      role: 'Data Processing', 
      status: 'Active', 
      color: 'purple',
      specialty: 'Pattern recognition, statistics',
      tasks: '6 completed, 1 in progress'
    },
    { 
      name: 'Writer Agent', 
      role: 'Content Creation', 
      status: 'Active', 
      color: 'green-500',
      specialty: 'Text generation, summarization',
      tasks: '5 completed, 1 in progress'
    },
    { 
      name: 'QA Agent', 
      role: 'Quality Assurance', 
      status: 'Idle', 
      color: 'yellow-500',
      specialty: 'Fact checking, proofreading',
      tasks: '5 completed, 0 in progress'
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
              <p className="text-gray-400 text-sm">Total Agents</p>
              <p className="text-white text-2xl font-semibold">4</p>
            </div>
            <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
              <p className="text-gray-400 text-sm">Active Tasks</p>
              <p className="text-white text-2xl font-semibold">4</p>
            </div>
            <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
              <p className="text-gray-400 text-sm">Completed Tasks</p>
              <p className="text-white text-2xl font-semibold">24</p>
            </div>
            <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
              <p className="text-gray-400 text-sm">Success Rate</p>
              <p className="text-white text-2xl font-semibold">94%</p>
            </div>
          </div>
          
          {/* Agent Roster */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Agent Roster
              </h2>
              <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center">
                <Plus className="w-4 h-4 mr-1" />
                Add Agent
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map((agent, index) => (
                <AgentCard key={index} agent={agent} />
              ))}
            </div>
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
