
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Example messages for demo purposes
const demoMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    sender: 'ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: '2',
    content: 'I need help with configuring the model parameters.',
    sender: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 4)
  },
  {
    id: '3',
    content: 'Sure! You can adjust temperature, max tokens, and other parameters in the sidebar under "Model Parameters" section.',
    sender: 'ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 3)
  }
];

export const ChatMessages = () => {
  return (
    <div className="space-y-4 py-4">
      {demoMessages.map((message) => (
        <div 
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-enter`}
        >
          <div 
            className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm animate-fade-in
            ${message.sender === 'user' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-dark-200 text-foreground'}`}
          >
            <p>{message.content}</p>
            <div className="text-xs opacity-70 mt-1 text-right">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-start mt-2">
        <div className="flex items-center space-x-1 text-gray-400 typing-indicator">
          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          <div className="h-2 w-2 rounded-full bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
