
import React, { useState } from 'react';
import { AgentBehaviorProvider } from '@/contexts/AgentBehaviorContext';
import Sidebar from '@/components/layout/Sidebar';
import { BehaviorParameterSlider } from '@/components/behavior/BehaviorParameterSlider';
import { useAgentBehaviorContext } from '@/contexts/AgentBehaviorContext';
import { BehaviorParameterKey } from '@/types/agentBehavior';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, Save, RefreshCw, AlertTriangle, Server, Cpu, Settings, ArrowUpDown, Zap } from 'lucide-react';
import { ModelSelector } from '@/components/behavior/ModelSelector';

const BehaviorSystemContent = () => {
  const { currentProfile, updateParameter, saveProfile } = useAgentBehaviorContext();
  const [profileName, setProfileName] = useState(currentProfile.name);
  const [profileDescription, setProfileDescription] = useState(currentProfile.description);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('gpt-4o');
  
  const handleParameterChange = (key: BehaviorParameterKey, value: number | boolean) => {
    updateParameter(key, value);
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await saveProfile(profileName, profileDescription);
      // Success toast or notification could be added here
    } catch (error) {
      console.error('Failed to save profile:', error);
      // Error toast or notification could be added here
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center text-sm text-gray-400">
        <a href="/" className="hover:text-white">Dashboard</a>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-white">Agent Behavior System</span>
      </div>
      
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Agent Behavior System</h1>
            <p className="text-gray-400 mt-2">Configure and manage how your AI agents behave and make decisions</p>
          </div>
          <Button 
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="bg-purple hover:bg-purple-dark"
          >
            {isSaving ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </>
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="bg-dark-accent border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">Customize your behavior profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-name" className="text-gray-300">Profile Name</Label>
                  <Input
                    id="profile-name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Enter profile name"
                    className="bg-dark border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-description" className="text-gray-300">Description</Label>
                  <Input
                    id="profile-description"
                    value={profileDescription}
                    onChange={(e) => setProfileDescription(e.target.value)}
                    placeholder="Enter profile description"
                    className="bg-dark border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Model Selection</Label>
                  <ModelSelector 
                    selectedModelId={selectedModelId}
                    onSelectModel={setSelectedModelId}
                  />
                </div>
                <div className="pt-4">
                  <div className="flex items-center p-4 rounded-lg bg-dark border border-amber-700/30">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                    <p className="text-sm text-amber-400">
                      Changes to behavior settings will affect all agents using this profile. Save your changes when ready.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="bg-dark-accent border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Behavior Parameters</CardTitle>
                <CardDescription className="text-gray-400">
                  Fine-tune how agents respond and make decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="decision-making">
                  <TabsList className="grid grid-cols-3 mb-6 bg-dark">
                    <TabsTrigger value="decision-making" className="flex items-center data-[state=active]:bg-purple/20 data-[state=active]:text-purple">
                      <Settings className="w-4 h-4 mr-2" />
                      Decision Making
                    </TabsTrigger>
                    <TabsTrigger value="operational" className="flex items-center data-[state=active]:bg-purple/20 data-[state=active]:text-purple">
                      <Cpu className="w-4 h-4 mr-2" />
                      Operational
                    </TabsTrigger>
                    <TabsTrigger value="learning" className="flex items-center data-[state=active]:bg-purple/20 data-[state=active]:text-purple">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Learning & Adaptation
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="decision-making" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <BehaviorParameterSlider
                          paramKey="decisionThreshold"
                          value={currentProfile.parameters.decisionThreshold}
                          onChange={handleParameterChange}
                        />
                        <BehaviorParameterSlider
                          paramKey="confidenceLevel"
                          value={currentProfile.parameters.confidenceLevel}
                          onChange={handleParameterChange}
                        />
                        <BehaviorParameterSlider
                          paramKey="adaptiveResponses"
                          value={currentProfile.parameters.adaptiveResponses}
                          onChange={handleParameterChange}
                        />
                      </div>
                      <div>
                        <BehaviorParameterSlider
                          paramKey="multiTasking"
                          value={currentProfile.parameters.multiTasking}
                          onChange={handleParameterChange}
                        />
                        <BehaviorParameterSlider
                          paramKey="errorRecovery"
                          value={currentProfile.parameters.errorRecovery}
                          onChange={handleParameterChange}
                        />
                        <BehaviorParameterSlider
                          paramKey="contextRetention"
                          value={currentProfile.parameters.contextRetention}
                          onChange={handleParameterChange}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="operational" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <BehaviorParameterSlider
                          paramKey="creativity"
                          value={currentProfile.parameters.creativity}
                          onChange={handleParameterChange}
                        />
                        <BehaviorParameterSlider
                          paramKey="precision"
                          value={currentProfile.parameters.precision}
                          onChange={handleParameterChange}
                        />
                      </div>
                      <div>
                        <BehaviorParameterSlider
                          paramKey="responseSpeed"
                          value={currentProfile.parameters.responseSpeed}
                          onChange={handleParameterChange}
                        />
                        <BehaviorParameterSlider
                          paramKey="resourceConsumption"
                          value={currentProfile.parameters.resourceConsumption}
                          onChange={handleParameterChange}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="learning" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <BehaviorParameterSlider
                          paramKey="learningRate"
                          value={currentProfile.parameters.learningRate}
                          onChange={handleParameterChange}
                        />
                        <BehaviorParameterSlider
                          paramKey="adaptiveLearning"
                          value={currentProfile.parameters.adaptiveLearning}
                          onChange={handleParameterChange}
                        />
                      </div>
                      <div>
                        <div className="p-4 rounded-lg border border-white/10 bg-dark">
                          <h3 className="text-sm font-medium flex items-center text-white">
                            <Zap className="w-4 h-4 mr-2 text-purple" />
                            Learning & Adaptation
                          </h3>
                          <p className="text-xs text-gray-400 mt-2">
                            These parameters control how the agent learns from interactions and adapts 
                            to new information over time. Higher learning rates will cause the agent 
                            to more quickly incorporate new information, while adaptive learning
                            enables more sophisticated adjustment strategies.
                          </p>
                        </div>
                        
                        <div className="p-4 mt-4 rounded-lg border border-white/10 bg-dark">
                          <h3 className="text-sm font-medium flex items-center text-white">
                            <Server className="w-4 h-4 mr-2 text-purple" />
                            Model Capabilities
                          </h3>
                          <p className="text-xs text-gray-400 mt-2">
                            The selected model may influence the effectiveness of certain behavior parameters.
                            Open source and local models may have different capabilities than proprietary models.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentBehaviorSystem: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark flex">
      <Sidebar />
      <div className="flex-1">
        <AgentBehaviorProvider>
          <BehaviorSystemContent />
        </AgentBehaviorProvider>
      </div>
    </div>
  );
};

export default AgentBehaviorSystem;
