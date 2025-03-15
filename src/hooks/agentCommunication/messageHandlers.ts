
import { AgentMessage, MessageContent } from '@/types/communication';

// Converts a MessageContent to an AgentMessage format
export const formatMessageToAgentMessage = (message: MessageContent): AgentMessage => {
  return {
    id: message.id || Date.now().toString(),
    senderId: message.senderId || 'unknown',
    senderRole: message.senderRole,
    recipientId: message.recipientId,
    content: message.content,
    channel: message.channel || 'broadcast',
    priority: message.priority || 3,
    timestamp: message.timestamp || new Date()
  };
};

// Filters and processes messages for an agent
export const shouldProcessMessage = (
  message: MessageContent,
  agentId: string,
  options: {
    channel?: string;
    senderId?: string;
  }
): boolean => {
  // Process broadcast messages or messages intended for this agent
  if (
    message.channel === 'broadcast' || 
    message.recipientId === agentId || 
    message.channel === 'priority'
  ) {
    // Filter by senderId if specified
    if (options.senderId && message.senderId !== options.senderId) {
      return false;
    }
    
    // Filter by specific channel if needed
    if (options.channel && options.channel !== 'all' && message.channel !== options.channel) {
      return false;
    }
    
    return true;
  }
  
  return false;
};

// Processes messages for a specific channel subscription
export const processChannelMessage = (
  message: MessageContent,
  agentId: string
): boolean => {
  // Don't process own broadcast messages
  if (message.channel === 'broadcast' && message.senderId === agentId) {
    return false;
  }
  
  return true;
};
