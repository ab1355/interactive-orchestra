
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Shield, RefreshCw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import useAgentCommunication from '@/hooks/useAgentCommunication';

interface ApiCredential {
  id: string;
  name: string;
  type: string;
  isAvailableToAgents: boolean;
}

const ApiCredentialBridge: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [credentials, setCredentials] = useState<ApiCredential[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  const { sendMessage } = useAgentCommunication({
    agentId: 'api-bridge',
    agentRole: 'service',
    channels: ['broadcast']
  });
  
  useEffect(() => {
    // Fetch stored credentials from localStorage or API
    const storedCredentials = localStorage.getItem('agent-accessible-credentials');
    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
    } else {
      // Initialize with credentials from the ApiCredentialManager component
      // In a real application, these would come from a database or API
      const initialCredentials: ApiCredential[] = [
        { id: 'google-drive', name: 'Google Drive API', type: 'OAuth2', isAvailableToAgents: false },
        { id: 'openai', name: 'OpenAI API', type: 'API Key', isAvailableToAgents: true },
        { id: 'weather', name: 'Weather API', type: 'API Key', isAvailableToAgents: false },
        { id: 'odoo', name: 'Odoo API', type: 'API Key', isAvailableToAgents: false },
        { id: 'aws-s3', name: 'AWS S3', type: 'Access Key', isAvailableToAgents: false },
      ];
      setCredentials(initialCredentials);
      localStorage.setItem('agent-accessible-credentials', JSON.stringify(initialCredentials));
    }
    
    // Load active state
    const activeState = localStorage.getItem('agent-api-bridge-active') === 'true';
    setIsActive(activeState);
    
    // Broadcast available tools when active
    if (activeState) {
      broadcastAvailableTools();
    }
  }, []);
  
  const toggleCredentialAccess = (credentialId: string) => {
    const updatedCredentials = credentials.map(cred => 
      cred.id === credentialId 
        ? { ...cred, isAvailableToAgents: !cred.isAvailableToAgents } 
        : cred
    );
    
    setCredentials(updatedCredentials);
    localStorage.setItem('agent-accessible-credentials', JSON.stringify(updatedCredentials));
    
    if (isActive) {
      broadcastAvailableTools();
    }
    
    toast({
      title: "API Access Updated",
      description: `${updatedCredentials.find(c => c.id === credentialId)?.name} is now ${
        updatedCredentials.find(c => c.id === credentialId)?.isAvailableToAgents ? 'available' : 'unavailable'
      } to agents`,
      duration: 3000,
    });
  };
  
  const toggleActive = (newState: boolean) => {
    setIsActive(newState);
    localStorage.setItem('agent-api-bridge-active', newState.toString());
    
    if (newState) {
      broadcastAvailableTools();
      toast({
        title: "Agent API Access Enabled",
        description: "Agents can now use the enabled API tools",
        duration: 3000,
      });
    } else {
      // Notify agents that tools are no longer available
      sendMessage("API tools are no longer available", {
        channel: 'broadcast',
        metadata: {
          type: 'tool-access-revoked'
        }
      });
      
      toast({
        title: "Agent API Access Disabled",
        description: "Agents can no longer use API tools",
        duration: 3000,
      });
    }
  };
  
  const broadcastAvailableTools = () => {
    const availableTools = credentials
      .filter(cred => cred.isAvailableToAgents)
      .map(cred => ({
        id: cred.id,
        name: cred.name,
        type: cred.type
      }));
    
    sendMessage("Available API tools updated", {
      channel: 'broadcast',
      metadata: {
        type: 'available-tools',
        tools: availableTools
      }
    });
    
    console.log("Broadcasting available tools to agents:", availableTools);
  };
  
  const refreshCredentials = () => {
    setIsRefreshing(true);
    
    // In a real application, this would refresh from a database or API
    setTimeout(() => {
      setIsRefreshing(false);
      
      if (isActive) {
        broadcastAvailableTools();
      }
      
      toast({
        title: "Credentials Refreshed",
        description: "API credential list has been refreshed",
        duration: 3000,
      });
    }, 1000);
  };
  
  return (
    <Card className="bg-dark-accent rounded-lg border border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white font-medium flex items-center">
          <Settings className="w-5 h-5 mr-2 text-purple" />
          Agent API Tool Bridge
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Switch 
            checked={isActive} 
            onCheckedChange={toggleActive}
            className="data-[state=checked]:bg-purple"
          />
          <span className="text-sm text-gray-300">
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-dark rounded-md border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-medium">Available API Tools</h3>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 border-white/10 text-gray-300 hover:text-white"
              onClick={refreshCredentials}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Enable API tools that agents can access dynamically during tasks
          </p>
          
          <div className="space-y-3 mt-4">
            {credentials.map(credential => (
              <div 
                key={credential.id} 
                className="flex items-center justify-between p-2 bg-black/20 rounded-md"
              >
                <div>
                  <div className="flex items-center">
                    <span className="text-white mr-2">{credential.name}</span>
                    <Badge variant="outline" className="text-xs border-white/10 px-1.5 py-0.5 h-5">
                      {credential.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">
                    {credential.isAvailableToAgents 
                      ? 'Available to agents' 
                      : 'Not available to agents'}
                  </p>
                </div>
                <div className="flex items-center">
                  <Switch 
                    checked={credential.isAvailableToAgents} 
                    onCheckedChange={() => toggleCredentialAccess(credential.id)}
                    className="data-[state=checked]:bg-green-500"
                  />
                  {!credential.isAvailableToAgents && (
                    <Shield className="w-4 h-4 ml-2 text-gray-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-gray-400">
          <p className="mb-1 flex items-center">
            <Shield className="w-3 h-3 mr-1 text-gray-500" />
            Agents will only be able to use APIs that you explicitly enable
          </p>
          <p>Each API request will be logged and can be monitored in the agent activity</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiCredentialBridge;
