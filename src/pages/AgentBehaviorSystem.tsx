
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { AgentBehaviorProvider } from '@/contexts/AgentBehaviorContext';
import { AgentBehaviorConfiguration } from '@/components/behavior/AgentBehaviorConfiguration';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Save, RefreshCcw } from 'lucide-react';
import { useAgentBehaviorIntegration } from '@/hooks/useAgentBehaviorIntegration';
import { useAgentBehaviorContext } from '@/contexts/AgentBehaviorContext';
import { BehaviorParameterKey } from '@/types/agentBehavior';

// Component to display behavior metrics
const BehaviorMetrics: React.FC = () => {
  const { currentProfile } = useAgentBehaviorContext();
  const params = currentProfile.parameters;
  
  // Simulate metrics based on behavior parameters
  const responseTime = 100 + (1 - params.responseSpeed) * 900; // 100-1000ms
  const resourceUsage = Math.round(params.resourceConsumption * 100);
  const successRate = Math.round((params.precision * 0.7 + params.confidenceLevel * 0.3) * 100);
  const adaptability = Math.round((params.adaptiveResponses ? 0.7 : 0.3) * 100 + params.learningRate * 30);
  
  // Animation for metrics
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          Behavior Metrics
        </CardTitle>
        <button 
          onClick={handleRefresh}
          className="text-gray-400 hover:text-white"
        >
          <RefreshCcw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Response Time</h3>
            <div className="flex items-end">
              <span className="text-2xl font-bold">{Math.round(responseTime)}</span>
              <span className="text-sm text-gray-400 ml-1">ms</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full mt-2">
              <div 
                className="h-2 bg-blue-500 rounded-full" 
                style={{ width: `${100 - (responseTime / 10)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400">Resource Usage</h3>
            <div className="flex items-end">
              <span className="text-2xl font-bold">{resourceUsage}</span>
              <span className="text-sm text-gray-400 ml-1">%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full mt-2">
              <div 
                className={`h-2 rounded-full ${resourceUsage > 80 ? 'bg-red-500' : resourceUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                style={{ width: `${resourceUsage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400">Success Rate</h3>
            <div className="flex items-end">
              <span className="text-2xl font-bold">{successRate}</span>
              <span className="text-sm text-gray-400 ml-1">%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full mt-2">
              <div 
                className={`h-2 rounded-full ${successRate > 80 ? 'bg-green-500' : successRate > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-400">Adaptability</h3>
            <div className="flex items-end">
              <span className="text-2xl font-bold">{adaptability}</span>
              <span className="text-sm text-gray-400 ml-1">%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full mt-2">
              <div 
                className="h-2 bg-purple rounded-full" 
                style={{ width: `${adaptability}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component to visualize behavior impact
const BehaviorVisualization: React.FC = () => {
  const { currentProfile } = useAgentBehaviorContext();
  const params = currentProfile.parameters;
  
  // Calculate visualization parameters
  const speedFactor = params.responseSpeed;
  const creativityFactor = params.creativity;
  const precisionFactor = params.precision;
  
  // Calculate visualization center based on parameters
  const centerX = 50 + (creativityFactor - 0.5) * 60;
  const centerY = 50 + (precisionFactor - 0.5) * 60;
  const radius = 20 + speedFactor * 15;
  
  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Behavior Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 w-full border border-white/10 rounded-md bg-dark/50">
          <div className="absolute text-xs text-gray-400 left-2 top-2">Creative</div>
          <div className="absolute text-xs text-gray-400 right-2 top-2">Precise</div>
          <div className="absolute text-xs text-gray-400 left-2 bottom-2">Adaptive</div>
          <div className="absolute text-xs text-gray-400 right-2 bottom-2">Structured</div>
          
          {/* Quadrants */}
          <div className="absolute left-0 top-0 w-1/2 h-1/2 border-r border-b border-white/10"></div>
          <div className="absolute right-0 top-0 w-1/2 h-1/2 border-l border-b border-white/10"></div>
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 border-r border-t border-white/10"></div>
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 border-l border-t border-white/10"></div>
          
          {/* Agent behavior representation */}
          <div 
            className="absolute rounded-full bg-purple/30 border-2 border-purple transition-all duration-500"
            style={{
              left: `${centerX}%`,
              top: `${centerY}%`,
              width: `${radius}px`,
              height: `${radius}px`,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${15 + radius}px ${params.resourceConsumption * 10}px rgba(147, 51, 234, 0.3)`
            }}
          ></div>
          
          {/* Parameter labels */}
          <div className="absolute left-1/2 top-1" style={{ transform: 'translateX(-50%)' }}>
            <div className="text-xs text-center">
              <div className="text-gray-400">Speed</div>
              <div className="font-bold">{Math.round(params.responseSpeed * 100)}%</div>
            </div>
          </div>
          
          <div className="absolute left-1/2 bottom-1" style={{ transform: 'translateX(-50%)' }}>
            <div className="text-xs text-center">
              <div className="text-gray-400">Adaptability</div>
              <div className="font-bold">{params.adaptiveResponses ? 'On' : 'Off'}</div>
            </div>
          </div>
          
          <div className="absolute left-1 top-1/2" style={{ transform: 'translateY(-50%)' }}>
            <div className="text-xs text-center">
              <div className="text-gray-400">Creativity</div>
              <div className="font-bold">{Math.round(params.creativity * 100)}%</div>
            </div>
          </div>
          
          <div className="absolute right-1 top-1/2" style={{ transform: 'translateY(-50%)' }}>
            <div className="text-xs text-center">
              <div className="text-gray-400">Precision</div>
              <div className="font-bold">{Math.round(params.precision * 100)}%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main component for the agent behavior system
const AgentBehaviorSystem: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Inside the inner component to use the context
  const AgentBehaviorContent = () => {
    const { behaviorParameters } = useAgentBehaviorIntegration({
      agentId: 'behavior-system',
      agentRole: 'BehaviorCoordinator',
      onBehaviorChange: (params) => {
        console.log('Behavior parameters changed:', params);
      }
    });
    
    return (
      <>
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Agent Behavior System</h1>
          </div>
          
          <main className={`flex-1 p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mb-4 flex items-center text-sm text-gray-400">
              <a href="/" className="hover:text-white">Dashboard</a>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-white">Agent Behavior System</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AgentBehaviorConfiguration />
              </div>
              
              <div className="lg:col-span-1 space-y-6">
                <BehaviorMetrics />
                <BehaviorVisualization />
              </div>
            </div>
          </main>
        </div>
      </>
    );
  };
  
  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      <AgentBehaviorProvider>
        <AgentBehaviorContent />
      </AgentBehaviorProvider>
    </div>
  );
};

export default AgentBehaviorSystem;
