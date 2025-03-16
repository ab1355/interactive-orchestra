
import { useState, useCallback } from 'react';
import { ChatMessage, MessageType } from '@/types/chat';
import { useUnifiedStore } from '@/stores/unifiedStore';
import commandProcessor from '@/services/commandProcessor';
import { toolIntegration } from '@/services/toolIntegration';

interface UseChatOptions {
  initialMessages?: ChatMessage[];
}

export const useChat = (options: UseChatOptions = {}) => {
  // Use messages from unified store instead of local state
  const { messages, addMessage, ceoAgent } = useUnifiedStore();
  const [isLoading, setIsLoading] = useState(false);

  const processCommand = async (content: string) => {
    // Process command with our command processor
    const result = await commandProcessor.processCommand(content);
    
    // Check if any tools are suggested for this context
    const suggestedTools = toolIntegration.getToolSuggestions(content);
    
    // If we have relevant tools, add a mention of them to the response
    if (suggestedTools.length > 0 && result.type !== 'error') {
      const toolSuggestion = suggestedTools.length === 1 
        ? `\n\nYou might want to try the ${suggestedTools[0].name} tool for this.`
        : `\n\nYou might want to try these tools: ${suggestedTools.map(t => t.name).join(', ')}`;
      
      return result.content + toolSuggestion;
    }
    
    return result.content;
  };

  const sendMessage = useCallback(async (message: ChatMessage) => {
    // Add user message to the chat
    addMessage(message);
    setIsLoading(true);
    
    try {
      // Add "thinking" message temporarily
      addMessage({
        role: 'assistant',
        content: 'message received',
        type: MessageType.SYSTEM
      });
      
      // Process the command
      const responseContent = await processCommand(message.content);
      
      // Remove thinking message by getting the current messages state
      const currentMessages = useUnifiedStore.getState().messages;
      
      // Replace the last message with the actual response
      useUnifiedStore.setState({
        messages: [
          ...currentMessages.slice(0, currentMessages.length - 1),
          {
            role: 'assistant',
            content: responseContent,
            type: MessageType.TEXT,
          }
        ]
      });
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      addMessage({
        role: 'system',
        content: 'Failed to send message. Please try again.',
        type: MessageType.SYSTEM,
      });
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  return {
    messages,
    sendMessage,
    isLoading,
    setMessages: (messages: ChatMessage[]) => {
      useUnifiedStore.setState({ messages });
    }
  };
};
