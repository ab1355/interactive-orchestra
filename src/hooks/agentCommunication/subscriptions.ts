
import { useState, useEffect } from 'react';
import { agentCommunication } from '@/services/agentCommunication';
import { AgentMessage, CommunicationChannel, MessageContent } from '@/types/communication';
import { UseAgentCommunicationOptions } from '@/types/agentCommunication';
import { formatMessageToAgentMessage, shouldProcessMessage, processChannelMessage } from './messageHandlers';

export const useAgentSubscriptions = (
  options: UseAgentCommunicationOptions,
  onMessageReceived: (message: AgentMessage) => void
) => {
  const { agentId, channels = ['direct', 'broadcast'], priorityThreshold } = options;
  const [isConnected, setIsConnected] = useState(true);
  
  useEffect(() => {
    const subscriptions: Array<() => void> = [];
  
    // Subscribe to messages for this agent
    const unsubscribe = agentCommunication.subscribeToMessages((message) => {
      if (shouldProcessMessage(message, agentId, {})) {
        onMessageReceived(formatMessageToAgentMessage(message));
      }
    }, {
      recipientId: agentId,
      priority: priorityThreshold
    });
    
    subscriptions.push(unsubscribe);
    
    // Also subscribe to broadcast channel separately if specified
    if (channels.includes('broadcast')) {
      const broadcastUnsub = agentCommunication.subscribeToMessages((message) => {
        if (processChannelMessage(message, agentId)) {
          onMessageReceived(formatMessageToAgentMessage(message));
        }
      }, { channel: 'broadcast' });
      
      subscriptions.push(broadcastUnsub);
    }
    
    // Subscribe to priority channel if specified
    if (channels.includes('priority')) {
      const priorityUnsub = agentCommunication.subscribeToMessages((message) => {
        onMessageReceived(formatMessageToAgentMessage(message));
      }, { channel: 'priority' });
      
      subscriptions.push(priorityUnsub);
    }
    
    // Return cleanup function
    return () => {
      subscriptions.forEach(unsub => unsub());
    };
  }, [agentId, channels, priorityThreshold]);
  
  return { isConnected };
};

export const loadMessageHistory = (agentId: string) => {
  // Load message history
  const history = agentCommunication.getMessageHistory({
    recipientId: agentId,
    channel: 'all'
  });
  
  // Convert history to Message format
  return history.map(msg => formatMessageToAgentMessage(msg));
};
