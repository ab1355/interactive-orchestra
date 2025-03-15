import { useState, useEffect, useRef } from 'react';
import { agentCommunication, AgentMessage, CommunicationChannel, AgentRole } from '@/services/agentCommunication';

interface UseAgentCommunicationProps {
  agentId: string;
  agentRole: AgentRole;
  channels?: CommunicationChannel[];
}

export function useAgentCommunication({
  agentId,
  agentRole,
  channels = ['direct', 'broadcast']
}: UseAgentCommunicationProps) {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  // Keep track of unsubscribe functions
  const unsubscribeRefs = useRef<(() => void)[]>([]);

  useEffect(() => {
    // Get initial messages
    const initialMessages = agentCommunication.getMessages({
      recipientId: agentId,
    });
    setMessages(initialMessages);

    // Subscribe to relevant messages
    const unsubscribeAll = agentCommunication.subscribeToMessages((message) => {
      setMessages(prev => {
        const exists = prev.some(m => m.id === message.id);
        if (exists) return prev;
        return [message, ...prev].sort((a, b) => {
          if (a.priority !== b.priority) {
            return b.priority - a.priority;
          }
          return b.timestamp.getTime() - a.timestamp.getTime();
        });
      });
    }, {
      recipientId: agentId
    });

    // Subscribe to each channel separately
    const channelUnsubscribes = channels.map(channel => 
      agentCommunication.subscribeToMessages((message) => {
        setMessages(prev => {
          const exists = prev.some(m => m.id === message.id);
          if (exists) return prev;
          return [message, ...prev].sort((a, b) => {
            if (a.priority !== b.priority) {
              return b.priority - a.priority;
            }
            return b.timestamp.getTime() - a.timestamp.getTime();
          });
        });
      }, { channel })
    );

    // Store all unsubscribe functions
    unsubscribeRefs.current = [unsubscribeAll, ...channelUnsubscribes];

    return () => {
      // Cleanup all subscriptions
      unsubscribeRefs.current.forEach(unsubscribe => unsubscribe());
    };
  }, [agentId, channels]);

  // Send a new message
  const sendMessage = async (
    content: string,
    options: {
      recipientId?: string;
      channel?: CommunicationChannel;
      priority?: number;
      metadata?: Record<string, any>;
    } = {}
  ) => {
    try {
      const message = await agentCommunication.sendMessage({
        senderId: agentId,
        senderRole: agentRole,
        recipientId: options.recipientId,
        channel: options.channel || 'direct',
        content,
        priority: options.priority || 1,
        metadata: options.metadata
      });
      
      return message;
    } catch (error) {
      console.error('Failed to send message:', error);
      return null;
    }
  };

  // Send a priority message - shorthand for high priority messages
  const sendPriorityMessage = (content: string, recipientId?: string) => {
    return sendMessage(content, {
      recipientId,
      channel: 'priority',
      priority: 10
    });
  };

  // Broadcast to all agents
  const broadcastMessage = (content: string, priority: number = 5) => {
    return sendMessage(content, {
      channel: 'broadcast',
      priority
    });
  };

  return {
    messages,
    isConnected,
    sendMessage,
    sendPriorityMessage,
    broadcastMessage
  };
}
