
import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { ModelSelector } from '@/components/behavior/ModelSelector';
import { AgentBehaviorConfiguration } from '@/components/behavior/AgentBehaviorConfiguration';
import BehaviorTemplateLibrary from '@/components/behavior/BehaviorTemplateLibrary';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Suspense } from 'react';

interface AgentConfigPanelProps {
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
}

const AgentConfigPanel: React.FC<AgentConfigPanelProps> = ({
  selectedModelId,
  onSelectModel
}) => {
  const [agentName, setAgentName] = useState("Customer Support Agent");

  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-medium flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Agent Configuration
          </h2>
          <div className="text-sm text-gray-400">ID: agent-cus-2491</div>
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Agent Name</label>
            <input 
              type="text"
              className="w-full bg-dark border border-white/10 rounded p-2 text-white"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Model Selection</label>
            <div className="bg-dark border border-white/10 rounded-lg overflow-hidden">
              <ErrorBoundary>
                <Suspense fallback={<div className="p-4 text-center text-gray-400">Loading model selector...</div>}>
                  <ModelSelector 
                    selectedModelId={selectedModelId}
                    onSelectModel={(modelId) => {
                      console.log('Model selected:', modelId);
                      onSelectModel(modelId);
                    }}
                  />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
      
      <AgentBehaviorConfiguration />
      <BehaviorTemplateLibrary />
    </div>
  );
};

export default AgentConfigPanel;
