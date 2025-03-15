
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import useAgentCommunication from '@/hooks/useAgentCommunication';
import { ApiCredential } from '@/components/integration/api-bridge/types';

export const useApiCredentialBridge = (initialCredentials?: ApiCredential[]) => {
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
    } else if (initialCredentials) {
      setCredentials(initialCredentials);
      localStorage.setItem('agent-accessible-credentials', JSON.stringify(initialCredentials));
    } else {
      // Initialize with default credentials
      const defaultCredentials: ApiCredential[] = [
        { id: 'google-drive', name: 'Google Drive API', type: 'OAuth2', isAvailableToAgents: false },
        { id: 'openai', name: 'OpenAI API', type: 'API Key', isAvailableToAgents: true },
        { id: 'weather', name: 'Weather API', type: 'API Key', isAvailableToAgents: false },
        { id: 'odoo', name: 'Odoo API', type: 'API Key', isAvailableToAgents: false },
        { id: 'aws-s3', name: 'AWS S3', type: 'Access Key', isAvailableToAgents: false },
      ];
      setCredentials(defaultCredentials);
      localStorage.setItem('agent-accessible-credentials', JSON.stringify(defaultCredentials));
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
  
  return {
    isActive,
    credentials,
    isRefreshing,
    toggleCredentialAccess,
    toggleActive,
    refreshCredentials
  };
};

export default useApiCredentialBridge;
