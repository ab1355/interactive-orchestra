
import { useState, useEffect } from 'react';
import { agentCommunication } from '@/services/agentCommunication';
import { AgentMessage, CommunicationChannel, MessageContent, InternalMessage } from '@/types/communication';
import { UseAgentCommunicationOptions } from '@/types/agentCommunication';
import { formatMessageToAgentMessage, shouldProcessMessage, processChannelMessage } from './messageHandlers';

// Helper function to convert InternalMessage to MessageContent
const internalToMessageContent = (message: InternalMessage): MessageContent => {
  return {
    id: message.id,
    senderId: message.senderId,
    senderRole: message.senderRole,
    recipientId: message.recipientId,
    content: message.content,
    channel: message.channel,
    priority: message.priority,
    metadata: message.metadata,
    timestamp: message.timestamp
  };
};

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
      const messageContent = internalToMessageContent(message);
      if (shouldProcessMessage(messageContent, agentId, {})) {
        onMessageReceived(formatMessageToAgentMessage(messageContent));
      }
    }, {
      recipientId: agentId,
      priority: priorityThreshold
    });
    
    subscriptions.push(unsubscribe);
    
    // Also subscribe to broadcast channel separately if specified
    if (channels.includes('broadcast')) {
      const broadcastUnsub = agentCommunication.subscribeToMessages((message) => {
        const messageContent = internalToMessageContent(message);
        if (processChannelMessage(messageContent, agentId)) {
          onMessageReceived(formatMessageToAgentMessage(messageContent));
        }
      }, { channel: 'broadcast' });
      
      subscriptions.push(broadcastUnsub);
    }
    
    // Subscribe to priority channel if specified
    if (channels.includes('priority')) {
      const priorityUnsub = agentCommunication.subscribeToMessages((message) => {
        const messageContent = internalToMessageContent(message);
        onMessageReceived(formatMessageToAgentMessage(messageContent));
      }, { channel: 'priority' });
      
      subscriptions.push(priorityUnsub);
    }
    
    // Return cleanup function
    return () => {
      subscriptions.forEach(unsub => unsub());
    };
  }, [agentId, channels, priorityThreshold, onMessageReceived]);
  
  return { isConnected };
};

export const loadMessageHistory = (agentId: string) => {
  // Load message history
  const history = agentCommunication.getMessageHistory({
    recipientId: agentId,
    channel: 'all'
  });
  
  // Convert history to Message format
  return history.map(msg => formatMessageToAgentMessage(internalToMessageContent(msg)));
};
