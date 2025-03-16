
import { useState, useCallback } from 'react';
import { ChatMessage, MessageType } from '@/types/chat';
import { useAgentStore } from '@/stores/agentStore';

interface UseChatOptions {
  initialMessages?: ChatMessage[];
}

export const useChat = (options: UseChatOptions = {}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    options.initialMessages || [
      {
        role: 'assistant',
        content: 'Hello! I\'m your CEO assistant. How can I help you today?',
        type: MessageType.TEXT,
      },
    ]
  );
  const [isLoading, setIsLoading] = useState(false);
  const { mainAgent } = useAgentStore();

  const processCommand = async (content: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!mainAgent) {
      return "I'm not connected to any agent yet. Please create a project first.";
    }
    
    if (content.toLowerCase().includes('create task')) {
      return `Task created from: "${content}"`;
    }
    if (content.toLowerCase().includes('assign agent')) {
      return `Agent assignment processed for: "${content}"`;
    }
    if (content.toLowerCase().includes('status')) {
      return `Current status: All systems operational. Project progress at 72%.`;
    }
    
    // Default interaction
    return `I've processed your request: "${content}". How can I assist you further?`;
  };

  const sendMessage = useCallback(async (message: ChatMessage) => {
    // Add user message to the chat
    setMessages(prev => [...prev, message]);
    setIsLoading(true);
    
    try {
      // Add "thinking" message temporarily
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'message received',
          type: MessageType.SYSTEM
        }
      ]);
      
      // Process the command
      const responseContent = await processCommand(message.content);
      
      // Replace "thinking" with actual response
      setMessages(prev => [
        ...prev.slice(0, prev.length - 1),
        {
          role: 'assistant',
          content: responseContent,
          type: MessageType.TEXT,
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          role: 'system',
          content: 'Failed to send message. Please try again.',
          type: MessageType.SYSTEM,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [mainAgent]);

  return {
    messages,
    sendMessage,
    isLoading,
    setMessages
  };
};
