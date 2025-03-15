
import React, { useState, useEffect } from 'react';
import { Brain, Plus, AlertTriangle, Check, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { agentCommunication } from '@/services/agentCommunication';

interface AgentBlueprint {
  id: string;
  name: string;
  role: string;
  status: 'proposed' | 'training' | 'ready' | 'rejected';
  confidence: number;
  justification: string;
  skills: string[];
  progress?: number;
}

const AgentCreationSystem: React.FC = () => {
  const [blueprints, setBlueprints] = useState<AgentBlueprint[]>([
    {
      id: 'bp-1',
      name: 'Financial Analyst Agent',
      role: 'Financial Analysis',
      status: 'proposed',
      confidence: 0.87,
      justification: 'High volume of financial data processing tasks exceeding current capacity',
      skills: ['Data analysis', 'Financial modeling', 'Risk assessment'],
    },
    {
      id: 'bp-2',
      name: 'Coordination Agent',
      role: 'Team Coordination',
      status: 'training',
      confidence: 0.92,
      progress: 68,
      justification: 'Communication bottlenecks detected between research and analysis agents',
      skills: ['Task scheduling', 'Resource allocation', 'Inter-agent communication'],
    }
  ]);
  const { toast } = useToast();

  // Simulate training progress for agents in training status
  useEffect(() => {
    const interval = setInterval(() => {
      setBlueprints(prev => prev.map(blueprint => {
        if (blueprint.status === 'training') {
          const newProgress = ((blueprint.progress || 0) + 5) % 100;
          
          // When reaching 100%, change status to ready
          if (newProgress === 0) {
            toast({
              title: "Agent Training Complete",
              description: `${blueprint.name} is now ready for deployment`,
              variant: "default",
            });
            
            // Send system message about the new agent
            agentCommunication.sendMessage({
              senderId: 'system',
              senderRole: 'manager',
              channel: 'broadcast',
              content: `New agent "${blueprint.name}" with role "${blueprint.role}" is now available`,
              priority: 7
            });
            
            return { ...blueprint, status: 'ready', progress: 100 };
          }
          
          return { ...blueprint, progress: newProgress };
        }
        return blueprint;
      }));
    }, 1500);
    
    return () => clearInterval(interval);
  }, [toast]);

  const approveBlueprint = (id: string) => {
    setBlueprints(prev => prev.map(bp => 
      bp.id === id ? { ...bp, status: 'training', progress: 0 } : bp
    ));
    
    toast({
      title: "Agent Blueprint Approved",
      description: "Training process has been initiated",
      variant: "default",
    });
  };

  const rejectBlueprint = (id: string) => {
    setBlueprints(prev => prev.map(bp => 
      bp.id === id ? { ...bp, status: 'rejected' } : bp
    ));
    
    toast({
      title: "Agent Blueprint Rejected",
      description: "The proposed agent will not be created",
      variant: "default",
    });
  };

  const deployAgent = (id: string) => {
    // Here you would typically add the agent to your actual agent roster
    toast({
      title: "Agent Deployed",
      description: "The new agent has been added to the agent roster",
      variant: "default",
    });
    
    // Remove from blueprints list
    setBlueprints(prev => prev.filter(bp => bp.id !== id));
  };

  // Simulate system proposing a new agent based on workload analysis
  const simulateAgentProposal = () => {
    const agentTypes = [
      {
        name: 'Translation Agent',
        role: 'Language Translation',
        skills: ['Multilingual processing', 'Context preservation', 'Cultural adaptation'],
        justification: 'Increasing number of multilingual content processing tasks'
      },
      {
        name: 'Code Generation Agent',
        role: 'Software Development',
        skills: ['Code generation', 'Bug detection', 'Documentation'],
        justification: 'Need for specialized code generation capabilities identified'
      },
      {
        name: 'Media Processing Agent',
        role: 'Media Analysis',
        skills: ['Image recognition', 'Video analysis', 'Audio transcription'],
        justification: 'Increasing backlog of media processing tasks'
      }
    ];
    
    const randomAgent = agentTypes[Math.floor(Math.random() * agentTypes.length)];
    const confidence = 0.7 + Math.random() * 0.25; // Random confidence between 0.7 and 0.95
    
    const newBlueprint: AgentBlueprint = {
      id: `bp-${Date.now()}`,
      name: randomAgent.name,
      role: randomAgent.role,
      status: 'proposed',
      confidence: parseFloat(confidence.toFixed(2)),
      justification: randomAgent.justification,
      skills: randomAgent.skills
    };
    
    setBlueprints(prev => [...prev, newBlueprint]);
    
    toast({
      title: "New Agent Proposed",
      description: `System suggests creating a ${randomAgent.role} agent based on workload analysis`,
    });
    
    // Also send through agent communication system
    agentCommunication.sendMessage({
      senderId: 'system',
      senderRole: 'manager',
      channel: 'priority',
      content: `New agent proposed: ${randomAgent.name} for ${randomAgent.role}. Confidence: ${(confidence * 100).toFixed(0)}%`,
      priority: 6
    });
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Brain className="w-5 h-5 mr-2 text-green-500" />
          Autonomous Agent Creation
        </CardTitle>
        <button 
          onClick={simulateAgentProposal}
          className="bg-green-500/20 hover:bg-green-500/30 text-green-500 py-1 px-3 rounded text-sm flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Simulate Proposal
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {blueprints.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No agent blueprints currently proposed or in training
            </div>
          ) : (
            blueprints.map((blueprint) => (
              <div key={blueprint.id} className={`p-4 rounded-lg border ${
                blueprint.status === 'ready' ? 'border-green-500 bg-green-500/10' :
                blueprint.status === 'training' ? 'border-blue-500 bg-blue-500/10' :
                blueprint.status === 'rejected' ? 'border-red-500 bg-red-500/10' :
                'border-yellow-500 bg-yellow-500/10'
              }`}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-white">{blueprint.name}</h3>
                    <p className="text-sm text-gray-400">{blueprint.role}</p>
                  </div>
                  <div>
                    {blueprint.status === 'proposed' && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded flex items-center">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Proposed
                      </span>
                    )}
                    {blueprint.status === 'training' && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                        Training
                      </span>
                    )}
                    {blueprint.status === 'ready' && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded flex items-center">
                        <Check className="w-3 h-3 mr-1" /> Ready
                      </span>
                    )}
                    {blueprint.status === 'rejected' && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center mb-1">
                    <BarChart3 className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-400">Confidence Score: </span>
                    <span className="text-sm text-white ml-1">{(blueprint.confidence * 100).toFixed(0)}%</span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mt-2">
                    <span className="text-gray-400">Justification:</span> {blueprint.justification}
                  </p>
                  
                  <div className="mt-3">
                    <span className="text-xs text-gray-400">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {blueprint.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-0.5 bg-dark rounded text-xs text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {blueprint.status === 'training' && (
                    <div className="mt-3">
                      <span className="text-xs text-gray-400">Training Progress:</span>
                      <div className="mt-1">
                        <Progress value={blueprint.progress} className="h-2" />
                        <div className="text-right text-xs text-gray-400 mt-1">
                          {blueprint.progress}%
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    {blueprint.status === 'proposed' && (
                      <>
                        <button 
                          onClick={() => rejectBlueprint(blueprint.id)}
                          className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded hover:bg-red-500/30"
                        >
                          Reject
                        </button>
                        <button 
                          onClick={() => approveBlueprint(blueprint.id)}
                          className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded hover:bg-green-500/30"
                        >
                          Approve
                        </button>
                      </>
                    )}
                    
                    {blueprint.status === 'ready' && (
                      <button 
                        onClick={() => deployAgent(blueprint.id)}
                        className="px-3 py-1 bg-purple/20 text-purple text-xs rounded hover:bg-purple/30"
                      >
                        Deploy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCreationSystem;
