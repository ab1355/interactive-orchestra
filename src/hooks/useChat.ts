
import { useState, useCallback } from 'react';
import { ChatMessage, MessageType } from '@/types/chat';

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

  const sendMessage = useCallback(async (message: ChatMessage) => {
    // Add user message to the chat
    setMessages(prev => [...prev, message]);
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add "thinking" message temporarily
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'message received',
          type: MessageType.SYSTEM
        }
      ]);
      
      // Simulate more processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace "thinking" with actual response
      setMessages(prev => [
        ...prev.slice(0, prev.length - 1),
        {
          role: 'assistant',
          content: `I've processed your request: "${message.content}". How can I assist you further?`,
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
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    setMessages
  };
};
