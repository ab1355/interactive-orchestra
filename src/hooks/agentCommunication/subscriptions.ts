
import { useEffect, useState } from 'react';
import { agentCommunication } from '@/services/agentCommunication';
import { UseAgentCommunicationOptions } from '@/types/agentCommunication';
import { AgentMessage } from '@/types/communication';
import { supabase } from '@/integrations/supabase/client';

// Load message history from local storage (for persistent sessions)
export const loadMessageHistory = (agentId: string): AgentMessage[] => {
  try {
    const key = `agent_messages_${agentId}`;
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading message history:', error);
    return [];
  }
};

// Save message history to local storage
export const saveMessageHistory = (agentId: string, messages: AgentMessage[]) => {
  try {
    const key = `agent_messages_${agentId}`;
    localStorage.setItem(key, JSON.stringify(messages.slice(-100))); // Keep last 100 messages
  } catch (error) {
    console.error('Error saving message history:', error);
  }
};

// Setup subscriptions for agent communications
export const useAgentSubscriptions = (
  options: UseAgentCommunicationOptions,
  onMessageReceived: (message: AgentMessage) => void
) => {
  const { agentId, channels = ['direct'], priorityThreshold = 0 } = options;
  const [isConnected, setIsConnected] = useState(false);

  // Listen to Supabase realtime for agent communications
  useEffect(() => {
    // First check if the service is connected
    const connectionStatus = agentCommunication.isConnected();
    setIsConnected(connectionStatus);
    
    // Set up the subscription for the agent
    const unsubscribe = agentCommunication.subscribeToMessages((message) => {
      // Convert to AgentMessage format with proper date
      const agentMessage: AgentMessage = {
        ...message,
        timestamp: typeof message.timestamp === 'string' 
          ? new Date(message.timestamp) 
          : message.timestamp
      };
      
      // Process the message
      onMessageReceived(agentMessage);
      
      // Save to history
      const history = loadMessageHistory(agentId);
      const updatedHistory = [...history, agentMessage];
      saveMessageHistory(agentId, updatedHistory);
    }, {
      channel: 'all',
      recipientId: agentId,
      priority: priorityThreshold
    });

    // Set up Supabase realtime subscription to the agent_communications table
    const channel = supabase.channel('agent-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'agent_communications'
        },
        (payload) => {
          const newMessage = payload.new;
          
          // Check if this message is for this agent
          if (newMessage.recipient_id === agentId || 
              newMessage.channel === 'broadcast' ||
              channels.includes(newMessage.channel)) {
            
            // Convert to AgentMessage format
            const agentMessage: AgentMessage = {
              id: newMessage.id,
              senderId: newMessage.sender_id,
              recipientId: newMessage.recipient_id,
              content: newMessage.content,
              channel: newMessage.channel,
              priority: newMessage.priority || 3,
              timestamp: new Date(newMessage.created_at),
              metadata: newMessage.metadata
            };
            
            // Process the message
            onMessageReceived(agentMessage);
            
            // Save to history
            const history = loadMessageHistory(agentId);
            const updatedHistory = [...history, agentMessage];
            saveMessageHistory(agentId, updatedHistory);
          }
        }
      )
      .subscribe();
    
    return () => {
      unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [agentId, channels, priorityThreshold, onMessageReceived]);
  
  return { isConnected };
};

export default useAgentSubscriptions;
