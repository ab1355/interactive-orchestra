
import React from 'react';
import { Crown, Network, Share, Target, Handshake } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';

interface ManagerAgentProps {
  className?: string;
}

const ManagerAgent: React.FC<ManagerAgentProps> = ({ className }) => {
  return (
    <div className={cn("py-16 bg-gradient-to-b from-dark to-dark/80", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Manager Agent <span className="text-purple">(Universal Orchestrator)</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">CEO-level agent that orchestrates other agents, manages communications, and ensures optimal resource allocation</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard 
                title="Inter-agent Communication" 
                description="Enable seamless communication between multiple AI agents to solve complex problems collaboratively."
                icon={<Network className="w-6 h-6" />}
                className="hover:border-purple/30 hover:bg-purple/5"
              />
              <FeatureCard 
                title="Task Distribution" 
                description="Intelligently allocate tasks to specialized agents based on their capabilities and current workload."
                icon={<Share className="w-6 h-6" />}
                className="hover:border-purple/30 hover:bg-purple/5"
              />
              <FeatureCard 
                title="Priority Management" 
                description="Dynamically adjust task priorities based on business impact, deadlines, and dependencies."
                icon={<Target className="w-6 h-6" />}
                className="hover:border-purple/30 hover:bg-purple/5"
              />
              <FeatureCard 
                title="Resource Coordination" 
                description="Optimize resource allocation across multiple agents and tasks to maximize efficiency."
                icon={<Handshake className="w-6 h-6" />}
                className="hover:border-purple/30 hover:bg-purple/5"
              />
            </div>
          </div>
          
          <Card className="bg-dark border-purple/20 shadow-lg shadow-purple/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Crown className="w-5 h-5 text-purple" />
                Manager Agent Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md bg-dark-card border border-white/10 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-white">AI Agent Workflow</div>
                    <div className="text-xs text-purple">4 active agents</div>
                  </div>
                  <div className="space-y-2">
                    {['Data processing', 'Customer service', 'Content creation', 'Code generation'].map((task, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                        <span className="text-xs text-gray-300">{task}</span>
                        <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple" 
                            style={{ width: `${[75, 45, 90, 60][i]}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="rounded-md bg-dark-card border border-white/10 p-3">
                  <div className="text-sm font-medium text-white mb-2">Resource Allocation</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['CPU', 'Memory', 'API Calls', 'Storage'].map((resource, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-xs text-gray-400">{resource}</span>
                        <div className="flex items-center gap-1">
                          <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple/70 to-purple" 
                              style={{ width: `${[65, 45, 80, 30][i]}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{[65, 45, 80, 30][i]}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManagerAgent;
