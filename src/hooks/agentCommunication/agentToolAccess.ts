
import { useState, useEffect } from 'react';
import useAgentCommunication from '@/hooks/useAgentCommunication';

interface AvailableTool {
  id: string;
  name: string;
  type: string;
}

export interface AgentToolAccessOptions {
  agentId: string;
  onToolsUpdated?: (tools: AvailableTool[]) => void;
}

export interface AgentToolAccessResult {
  availableTools: AvailableTool[];
  useApiTool: (toolId: string, params: any) => Promise<any>;
  isToolAvailable: (toolId: string) => boolean;
  isToolBridgeActive: boolean;
}

export const useAgentToolAccess = (options: AgentToolAccessOptions): AgentToolAccessResult => {
  const { agentId, onToolsUpdated } = options;
  const [availableTools, setAvailableTools] = useState<AvailableTool[]>([]);
  const [isToolBridgeActive, setIsToolBridgeActive] = useState(false);
  
  const { sendMessage, messages } = useAgentCommunication({
    agentId,
    agentRole: 'tool-user',
    channels: ['broadcast', 'direct']
  });
  
  useEffect(() => {
    // Listen for tool availability updates from the tool bridge
    const toolAvailabilityUpdates = messages.filter(
      msg => msg.metadata && msg.metadata.type === 'available-tools'
    );
    
    if (toolAvailabilityUpdates.length > 0) {
      const latestUpdate = toolAvailabilityUpdates[toolAvailabilityUpdates.length - 1];
      const tools = latestUpdate.metadata?.tools || [];
      setAvailableTools(tools);
      setIsToolBridgeActive(true);
      
      if (onToolsUpdated) {
        onToolsUpdated(tools);
      }
      
      console.log(`[Agent ${agentId}] Available tools updated:`, tools);
    }
    
    // Listen for tool access revocation
    const toolRevocations = messages.filter(
      msg => msg.metadata && msg.metadata.type === 'tool-access-revoked'
    );
    
    if (toolRevocations.length > 0) {
      setAvailableTools([]);
      setIsToolBridgeActive(false);
      console.log(`[Agent ${agentId}] Tool access revoked`);
    }
  }, [messages, agentId, onToolsUpdated]);
  
  const isToolAvailable = (toolId: string): boolean => {
    return availableTools.some(tool => tool.id === toolId);
  };
  
  const useApiTool = async (toolId: string, params: any): Promise<any> => {
    if (!isToolBridgeActive) {
      throw new Error('API Tool Bridge is not active');
    }
    
    if (!isToolAvailable(toolId)) {
      throw new Error(`Tool "${toolId}" is not available to this agent`);
    }
    
    // In a real implementation, this would call a function that properly validates
    // and executes the API call with proper authentication
    console.log(`[Agent ${agentId}] Using API tool ${toolId} with params:`, params);
    
    // Send a message to the tool bridge to log the tool usage
    sendMessage(`Request to use API tool: ${toolId}`, {
      recipientId: 'api-bridge',
      metadata: {
        type: 'tool-usage',
        toolId,
        params,
        timestamp: new Date().toISOString()
      }
    });
    
    // Simulate API call result
    // In a real implementation, this would make an actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          toolId,
          result: {
            message: `Successfully executed ${toolId} API call`,
            timestamp: new Date().toISOString(),
            data: { /* simulated response data */ }
          }
        });
      }, 1000);
    });
  };
  
  return {
    availableTools,
    useApiTool,
    isToolAvailable,
    isToolBridgeActive
  };
};

export default useAgentToolAccess;
