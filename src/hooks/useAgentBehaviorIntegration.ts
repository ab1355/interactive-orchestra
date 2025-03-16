
import { useEffect } from 'react';
import { useAgentBehaviorContext } from '@/contexts/AgentBehaviorContext';
import { agentCommunication } from '@/services/agentCommunication';
import { useAgentCommunication } from './useAgentCommunication';

export interface UseAgentBehaviorIntegrationOptions {
  agentId: string;
  agentRole?: string;
  onBehaviorChange?: (behaviorParams: any) => void;
}

export const useAgentBehaviorIntegration = (options: UseAgentBehaviorIntegrationOptions) => {
  const { agentId, agentRole = 'Agent', onBehaviorChange } = options;
  const { currentProfile } = useAgentBehaviorContext();
  const { sendMessage } = useAgentCommunication({ agentId, agentRole });
  
  // Broadcast behavior parameters when they change
  useEffect(() => {
    // Throttle updates to prevent too frequent broadcasting
    const timeoutId = setTimeout(() => {
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
          }
        }
      });
      
      // Notify the parent component if callback provided
      if (onBehaviorChange) {
        onBehaviorChange(currentProfile.parameters);
      }
      
      console.log(`Behavior parameters for ${agentId} (${agentRole}) have been updated:`, currentProfile.parameters);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [currentProfile, agentId, agentRole, onBehaviorChange, sendMessage]);
  
  // Return the current behavior profile for convenience
  return {
    currentBehavior: currentProfile,
    behaviorParameters: currentProfile.parameters
  };
};
