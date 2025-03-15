
import { useState, useEffect, useCallback } from 'react';
import useAgentCommunication from '@/hooks/useAgentCommunication';
import { toast } from '@/components/ui/use-toast';

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
  downloadFile: (url: string, filename?: string) => Promise<boolean>;
  runTerminalCommand: (command: string, args?: string[]) => Promise<{
    success: boolean;
    output: string;
    error?: string;
  }>;
  toolCapabilities: {
    canUseApis: boolean;
    canDownload: boolean;
    canRunCommands: boolean;
  };
}

export const useAgentToolAccess = (options: AgentToolAccessOptions): AgentToolAccessResult => {
  const { agentId, onToolsUpdated } = options;
  const [availableTools, setAvailableTools] = useState<AvailableTool[]>([]);
  const [isToolBridgeActive, setIsToolBridgeActive] = useState(false);
  const [toolPermissions, setToolPermissions] = useState({
    allowDownloads: false,
    allowTerminalCommands: false,
    allowedDomains: [] as string[],
    restrictedCommands: ['rm -rf', 'sudo', 'chmod', 'rm -r', 'format'] as string[]
  });
  
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
      
      // Check for tool permissions in the message
      if (latestUpdate.metadata?.permissions) {
        setToolPermissions(prev => ({
          ...prev,
          ...latestUpdate.metadata?.permissions
        }));
      }
      
      if (onToolsUpdated) {
        onToolsUpdated(tools);
      }
      
      console.log(`[Agent ${agentId}] Available tools updated:`, tools);
      console.log(`[Agent ${agentId}] Tool permissions updated:`, latestUpdate.metadata?.permissions);
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

  const downloadFile = useCallback(async (url: string, filename?: string): Promise<boolean> => {
    if (!isToolBridgeActive) {
      toast({
        title: "Tool Bridge Inactive",
        description: "Cannot download files when the tool bridge is inactive",
        variant: "destructive"
      });
      return false;
    }

    if (!toolPermissions.allowDownloads) {
      toast({
        title: "Download Permission Denied",
        description: "This agent does not have permission to download files",
        variant: "destructive"
      });
      return false;
    }

    // Check if the URL is from an allowed domain
    const urlObj = new URL(url);
    const domainAllowed = toolPermissions.allowedDomains.length === 0 || 
      toolPermissions.allowedDomains.some(domain => urlObj.hostname.includes(domain));

    if (!domainAllowed) {
      toast({
        title: "Domain Blocked",
        description: `Downloads from ${urlObj.hostname} are not allowed`,
        variant: "destructive"
      });
      return false;
    }

    // Log the download attempt
    sendMessage(`Downloading file from ${url}`, {
      recipientId: 'api-bridge',
      metadata: {
        type: 'file-download',
        url,
        filename: filename || url.split('/').pop() || 'downloaded-file',
        timestamp: new Date().toISOString()
      }
    });

    console.log(`[Agent ${agentId}] Downloading file from: ${url}`);

    // Simulate download (in a real implementation, this would save the file)
    toast({
      title: "Download Started",
      description: `Downloading ${filename || url.split('/').pop() || 'file'}...`
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          title: "Download Complete",
          description: `Successfully downloaded ${filename || url.split('/').pop() || 'file'}`
        });
        resolve(true);
      }, 2000);
    });
  }, [agentId, isToolBridgeActive, sendMessage, toolPermissions]);

  const runTerminalCommand = useCallback(async (command: string, args: string[] = []): Promise<{
    success: boolean;
    output: string;
    error?: string;
  }> => {
    if (!isToolBridgeActive) {
      toast({
        title: "Tool Bridge Inactive",
        description: "Cannot run terminal commands when the tool bridge is inactive",
        variant: "destructive"
      });
      return { success: false, output: "", error: "Tool bridge inactive" };
    }

    if (!toolPermissions.allowTerminalCommands) {
      toast({
        title: "Terminal Access Denied",
        description: "This agent does not have permission to run terminal commands",
        variant: "destructive"
      });
      return { success: false, output: "", error: "Permission denied" };
    }

    // Check if the command is restricted
    const fullCommand = `${command} ${args.join(' ')}`;
    const isRestricted = toolPermissions.restrictedCommands.some(
      restrictedCmd => fullCommand.includes(restrictedCmd)
    );

    if (isRestricted) {
      toast({
        title: "Command Blocked",
        description: `The command "${fullCommand}" contains restricted operations`,
        variant: "destructive"
      });
      return { 
        success: false, 
        output: "", 
        error: "This command contains restricted operations and has been blocked" 
      };
    }

    // Log the command execution
    sendMessage(`Executing terminal command: ${fullCommand}`, {
      recipientId: 'api-bridge',
      metadata: {
        type: 'terminal-command',
        command: fullCommand,
        timestamp: new Date().toISOString()
      }
    });

    console.log(`[Agent ${agentId}] Running terminal command: ${fullCommand}`);

    // Simulate command execution (in a real implementation, this would execute the command)
    toast({
      title: "Command Executing",
      description: `Running: ${fullCommand}`
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate for simulation
        
        if (success) {
          toast({
            title: "Command Completed",
            description: `Successfully executed: ${fullCommand}`
          });
          resolve({
            success: true,
            output: `Simulated output for command: ${fullCommand}\n$ ${command} ${args.join(' ')}\nOperation completed successfully.`
          });
        } else {
          toast({
            title: "Command Failed",
            description: `Error executing: ${fullCommand}`,
            variant: "destructive"
          });
          resolve({
            success: false,
            output: "",
            error: `Simulated error for command: ${fullCommand}\nError: Command execution failed with code 1`
          });
        }
      }, 1500);
    });
  }, [agentId, isToolBridgeActive, sendMessage, toolPermissions]);
  
  return {
    availableTools,
    useApiTool,
    isToolAvailable,
    isToolBridgeActive,
    downloadFile,
    runTerminalCommand,
    toolCapabilities: {
      canUseApis: isToolBridgeActive,
      canDownload: isToolBridgeActive && toolPermissions.allowDownloads,
      canRunCommands: isToolBridgeActive && toolPermissions.allowTerminalCommands
    }
  };
};

export default useAgentToolAccess;
