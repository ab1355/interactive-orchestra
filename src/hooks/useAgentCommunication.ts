
import { useState, useEffect } from 'react';
import { agentCommunication } from '@/services/agentCommunication';
import { CommunicationChannel, AgentMessage, MessageContent, MessageOptions } from '@/types/communication';

interface UseAgentCommunicationOptions {
  agentId: string;
  agentRole?: string;
  channels?: CommunicationChannel[];
  priorityThreshold?: number;
}

export const useAgentCommunication = (options: UseAgentCommunicationOptions) => {
  const { agentId, agentRole, channels = ['direct', 'broadcast'], priorityThreshold } = options;
  
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  
  useEffect(() => {
    // Subscribe to messages for this agent
    const unsubscribe = agentCommunication.subscribeToMessages((message) => {
      // Only process messages intended for this agent or broadcast messages
      if (
        message.channel === 'broadcast' || 
        message.recipientId === agentId || 
        message.channel === 'priority'
      ) {
        setMessages(prev => [
          ...prev, 
          {
            id: Date.now().toString(),
            senderId: message.senderId || 'unknown',
            senderRole: message.senderRole,
            recipientId: message.recipientId,
            content: message.content,
            channel: message.channel as CommunicationChannel || 'broadcast',
            priority: message.priority || 3,
            timestamp: message.timestamp || new Date()
          }
        ]);
      }
    }, {
      recipientId: agentId,
      priority: priorityThreshold
    });
    
    // Also subscribe to broadcast channel separately if specified
    const subscriptions = [unsubscribe];
    
    if (channels.includes('broadcast')) {
      const broadcastUnsub = agentCommunication.subscribeToMessages((message) => {
        if (message.senderId !== agentId) { // Don't process own broadcast messages
          setMessages(prev => [
            ...prev, 
            {
              id: Date.now().toString(),
              senderId: message.senderId || 'unknown',
              senderRole: message.senderRole,
              content: message.content,
              channel: 'broadcast',
              priority: message.priority || 3,
              timestamp: message.timestamp || new Date()
            }
          ]);
        }
      }, { channel: 'broadcast' });
      
      subscriptions.push(broadcastUnsub);
    }
    
    // Subscribe to priority channel if specified
    if (channels.includes('priority')) {
      const priorityUnsub = agentCommunication.subscribeToMessages((message) => {
        setMessages(prev => [
          ...prev, 
          {
            id: Date.now().toString(),
            senderId: message.senderId || 'unknown',
            senderRole: message.senderRole,
            content: message.content,
            channel: 'priority',
            priority: message.priority || 7,
            timestamp: message.timestamp || new Date()
          }
        ]);
      }, { channel: 'priority' });
      
      subscriptions.push(priorityUnsub);
    }
    
    // Load message history
    const history = agentCommunication.getMessageHistory({
      recipientId: agentId,
      channel: 'all'
    });
    
    // Convert history to Message format and set initial messages
    if (history.length > 0) {
      setMessages(history.map(msg => ({
        id: msg.timestamp ? new Date(msg.timestamp).getTime().toString() : Date.now().toString(),
        senderId: msg.senderId || 'unknown',
        senderRole: msg.senderRole,
        recipientId: msg.recipientId,
        content: msg.content,
        channel: msg.channel as CommunicationChannel || 'broadcast',
        priority: msg.priority || 3,
        timestamp: msg.timestamp || new Date()
      })));
    }
    
    // Return cleanup function
    return () => {
      subscriptions.forEach(unsub => unsub());
    };
  }, [agentId, agentRole, channels, priorityThreshold]);
  
  const sendMessage = (content: string, options: MessageOptions = {}) => {
    const { recipientId, channel = 'direct', priority = 3, metadata } = options;
    
    return agentCommunication.sendMessage({
      senderId: agentId,
      senderRole: agentRole,
      recipientId,
      content,
      channel,
      priority,
      metadata
    });
  };
  
  return {
    messages,
    sendMessage,
    isConnected
  };
};

export default useAgentCommunication;
