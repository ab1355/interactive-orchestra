
import React, { useState } from 'react';
import { BehaviorParameterKey } from '@/types/agentBehavior';
import { useAgentBehaviorContext } from '@/contexts/AgentBehaviorContext';
import { BehaviorParameterSlider } from './BehaviorParameterSlider';
import { BehaviorProfileManager } from './BehaviorProfileManager';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sliders, Brain, Database, CopyCheck } from 'lucide-react';

export const AgentBehaviorConfiguration: React.FC = () => {
  const { currentProfile, updateParameter } = useAgentBehaviorContext();
  const [activeTab, setActiveTab] = useState('decision-making');
  
  const handleParameterChange = (key: BehaviorParameterKey, value: number | boolean) => {
    updateParameter(key, value);
  };
  
  const decisionParameters: BehaviorParameterKey[] = [
    'decisionThreshold',
    'confidenceLevel',
    'learningRate'
  ];
  
  const behaviorFlags: BehaviorParameterKey[] = [
    'adaptiveResponses',
    'contextRetention',
    'multiTasking',
    'errorRecovery',
    'adaptiveLearning'
  ];
  
  const operationalParameters: BehaviorParameterKey[] = [
    'creativity',
    'precision',
    'responseSpeed',
    'resourceConsumption'
  ];
  
  return (
    <div className="space-y-6">
      <Card className="bg-dark-accent border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Brain className="w-5 h-5 mr-2 text-purple" />
            Agent Behavior Configuration
          </CardTitle>
          <CardDescription>
            Customize how agents make decisions and respond to tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="decision-making" className="flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Decision Making
              </TabsTrigger>
              <TabsTrigger value="behavior-flags" className="flex items-center">
                <CopyCheck className="w-4 h-4 mr-2" />
                Behavior Flags
              </TabsTrigger>
              <TabsTrigger value="operational" className="flex items-center">
                <Sliders className="w-4 h-4 mr-2" />
                Operational
              </TabsTrigger>
              <TabsTrigger value="profiles" className="flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Profiles
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="decision-making" className="space-y-4">
              <div className="text-sm text-gray-400 mb-4">
                These parameters control how agents make decisions and learn from interactions.
              </div>
              {decisionParameters.map(param => (
                <BehaviorParameterSlider
                  key={param}
                  paramKey={param}
                  value={currentProfile.parameters[param]}
                  onChange={handleParameterChange}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="behavior-flags" className="space-y-4">
              <div className="text-sm text-gray-400 mb-4">
                Toggle different behavioral capabilities for the agent.
              </div>
              {behaviorFlags.map(param => (
                <BehaviorParameterSlider
                  key={param}
                  paramKey={param}
                  value={currentProfile.parameters[param]}
                  onChange={handleParameterChange}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="operational" className="space-y-4">
              <div className="text-sm text-gray-400 mb-4">
                These parameters control operational aspects of agent behavior.
              </div>
              {operationalParameters.map(param => (
                <BehaviorParameterSlider
                  key={param}
                  paramKey={param}
                  value={currentProfile.parameters[param]}
                  onChange={handleParameterChange}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="profiles">
              <BehaviorProfileManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
