
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, GitBranch, GitMerge, GitPullRequest, Circle, Check, X, AlertTriangle } from 'lucide-react';

const WorkflowVisualization: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  const workflowSteps = [
    { 
      id: 1, 
      name: 'Research', 
      status: 'completed', 
      agents: ['research-agent'], 
      tasks: 12, 
      connections: [2] 
    },
    { 
      id: 2, 
      name: 'Analysis', 
      status: 'completed', 
      agents: ['analysis-agent', 'research-agent'], 
      tasks: 8, 
      connections: [3, 4] 
    },
    { 
      id: 3, 
      name: 'Development', 
      status: 'in-progress', 
      agents: ['development-agent'], 
      tasks: 24, 
      connections: [5] 
    },
    { 
      id: 4, 
      name: 'Integration', 
      status: 'in-progress', 
      agents: ['integration-agent', 'development-agent'], 
      tasks: 6, 
      connections: [5] 
    },
    { 
      id: 5, 
      name: 'Validation', 
      status: 'pending', 
      agents: ['qa-agent', 'analysis-agent'], 
      tasks: 15, 
      connections: [6] 
    },
    { 
      id: 6, 
      name: 'Deployment', 
      status: 'pending', 
      agents: ['deployment-agent'], 
      tasks: 4, 
      connections: [] 
    },
  ];

  // Status to icon mapping
  const statusIcons = {
    'completed': <Check className="h-4 w-4 text-green-500" />,
    'in-progress': <GitBranch className="h-4 w-4 text-purple" />,
    'pending': <Circle className="h-4 w-4 text-gray-500" />,
    'failed': <X className="h-4 w-4 text-red-500" />,
    'warning': <AlertTriangle className="h-4 w-4 text-yellow-500" />
  };

  return (
    <div className="space-y-4">
      <Card className="bg-dark-accent/30 border-dark-200">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Workflow Visualization</CardTitle>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 hover:bg-dark-accent/50 rounded-full"
          >
            <Settings className="h-4 w-4 text-gray-400" />
          </button>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] overflow-auto p-4">
            <div className="flex flex-col items-center">
              {workflowSteps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div 
                    className={`w-full max-w-md p-4 rounded-lg border-2 flex items-center ${
                      step.status === 'completed' ? 'border-green-500/30 bg-green-500/10' :
                      step.status === 'in-progress' ? 'border-purple/30 bg-purple/10' :
                      step.status === 'failed' ? 'border-red-500/30 bg-red-500/10' :
                      'border-gray-500/30 bg-dark-accent/30'
                    }`}
                  >
                    <div className="mr-3">
                      {statusIcons[step.status as keyof typeof statusIcons]}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.name}</div>
                      {showDetails && (
                        <div className="mt-2 text-sm text-gray-400">
                          <div className="flex justify-between mb-1">
                            <span>Tasks: {step.tasks}</span>
                            <span>Agents: {step.agents.length}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {step.agents.map(agent => (
                              <span key={agent} className="px-2 py-0.5 bg-dark-accent/50 rounded-full text-xs">
                                {agent}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {index < workflowSteps.length - 1 && (
                    <div className="h-10 flex items-center">
                      <GitMerge className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{workflowSteps.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {workflowSteps.filter(step => step.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple">
              {workflowSteps.filter(step => step.status === 'in-progress').length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-400">
              {workflowSteps.filter(step => step.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowVisualization;
