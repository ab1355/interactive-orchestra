import { useEffect, useState } from 'react';
import { useAgentBehaviorContext } from '@/contexts/AgentBehaviorContext';
import { agentCommunication } from '@/services/agentCommunication';
import useAgentCommunication from './useAgentCommunication';
import { useToast } from '@/hooks/use-toast';
import { getModelById } from '@/types/models';

export interface UseAgentBehaviorIntegrationOptions {
  agentId: string;
  agentRole?: string;
  modelId?: string;
  onBehaviorChange?: (behaviorParams: any) => void;
  onError?: (error: Error) => void;
}

export const useAgentBehaviorIntegration = (options: UseAgentBehaviorIntegrationOptions) => {
  const { agentId, agentRole = 'Agent', modelId = 'gpt-4o', onBehaviorChange, onError } = options;
  const { currentProfile } = useAgentBehaviorContext();
  const { sendMessage } = useAgentCommunication({ agentId, agentRole });
  const { toast } = useToast();
  const [lastBroadcastTime, setLastBroadcastTime] = useState<number | null>(null);
  const [broadcastStatus, setBroadcastStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const selectedModel = getModelById(modelId);
  
  // Broadcast behavior parameters when they change
  useEffect(() => {
    // Throttle updates to prevent too frequent broadcasting
    const timeoutId = setTimeout(() => {
      // Set status to pending before attempting broadcast
      setBroadcastStatus('pending');
      
      try {
        // Validate parameters before broadcasting
        if (!currentProfile || !currentProfile.parameters) {
          throw new Error('Invalid behavior profile or parameters');
        }
        
        if (!selectedModel) {
          console.warn(`Model with ID ${modelId} not found, using default parameters`);
        }
        
        // Handle custom models appropriately
        const modelInfo = selectedModel ? {
          id: selectedModel.id,
          name: selectedModel.name,
          source: selectedModel.source,
          isCustom: selectedModel.isCustom || false,
          supportsVision: selectedModel.supportsVision || false,
          supportsStreaming: selectedModel.supportsStreaming || false,
          endpoint: selectedModel.endpoint,
          capabilities: selectedModel.capabilities || {},
          parameters: selectedModel.parameters || {},
          version: selectedModel.version || 'unknown'
        } : undefined;
        
        // Broadcast the behavior parameters to all agents
        agentCommunication.sendMessage({
          senderId: agentId,
          senderRole: 'BehaviorCoordinator',
          channel: 'broadcast',
          content: `Behavior parameters updated for ${agentRole}`,
          priority: 5,
          metadata: {
            type: 'behavior_update',
            agentId,
            agentRole,
            profile: {
              id: currentProfile.id,
              name: currentProfile.name,
              parameters: currentProfile.parameters
            },
            model: modelInfo
          }
        });
        
        // Update broadcast status and time
        setBroadcastStatus('success');
        setLastBroadcastTime(Date.now());
        
        // Notify the parent component if callback provided
        if (onBehaviorChange) {
          onBehaviorChange({
            ...currentProfile.parameters,
            model: selectedModel
          });
        }
        
        console.log(`Behavior parameters for ${agentId} (${agentRole}) have been updated with model ${modelId}:`, {
          profileParams: currentProfile.parameters,
          modelParams: selectedModel?.parameters,
          modelCapabilities: selectedModel?.capabilities,
          isCustomModel: selectedModel?.isCustom
        });
      } catch (error) {
        console.error('Failed to broadcast behavior parameters:', error);
        setBroadcastStatus('error');
        
        // Show toast notification for error
        toast({
          title: 'Behavior Update Failed',
          description: error instanceof Error ? error.message : 'Failed to update agent behavior',
          variant: 'destructive'
        });
        
        // Call error callback if provided
        if (onError && error instanceof Error) {
          onError(error);
        }
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [currentProfile, agentId, agentRole, modelId, onBehaviorChange, onError, sendMessage, toast, selectedModel]);
  
  // Retry mechanism for failed broadcasts
  const retryBroadcast = () => {
    if (broadcastStatus === 'error') {
      // Reset status and trigger a new broadcast attempt
      setBroadcastStatus('idle');
      
      // Force effect to run again by updating a dependency
      setLastBroadcastTime(null);
      
      toast({
        title: 'Retrying',
        description: 'Attempting to broadcast behavior parameters again'
      });
    }
  };
  
  // Return the current behavior profile and model information for convenience
  return {
    currentBehavior: currentProfile,
    behaviorParameters: currentProfile.parameters,
    model: selectedModel,
    modelCapabilities: selectedModel?.capabilities,
    modelParameters: selectedModel?.parameters,
    isCustomModel: selectedModel?.isCustom,
    modelEndpoint: selectedModel?.endpoint,
    broadcastStatus,
    lastBroadcastTime,
    retryBroadcast
  };
};
