
import { useState } from 'react';
import { agentCommunication } from '@/services/agentCommunication';
import { AgentMessage, MessageOptions } from '@/types/communication';
import { UseAgentCommunicationOptions, UseAgentCommunicationResult } from '@/types/agentCommunication';
import { useAgentSubscriptions, loadMessageHistory } from './subscriptions';

export const useAgentCommunication = (options: UseAgentCommunicationOptions): UseAgentCommunicationResult => {
  const { agentId, agentRole } = options;
  
  const [messages, setMessages] = useState<AgentMessage[]>(() => loadMessageHistory(agentId));
  
  // Add message handler
  const handleMessageReceived = (message: AgentMessage) => {
    setMessages(prev => [...prev, message]);
  };
  
  // Setup subscriptions
  const { isConnected } = useAgentSubscriptions(options, handleMessageReceived);
  
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

// Export both as named and default export for compatibility
export default useAgentCommunication;
