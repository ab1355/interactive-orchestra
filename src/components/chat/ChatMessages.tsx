
import React from 'react';
import ChatHistory from '@/components/home/ChatHistory';
import { ChatMessage } from '@/components/home/types';

export const ChatMessages = () => {
  // This is a placeholder for demo purposes
  // In a real app, you would fetch or manage messages with state
  const sampleMessages: ChatMessage[] = [
    { type: 'ai', content: 'Hello! How can I help you today?' },
    { type: 'user', content: 'I need some assistance with a project.' },
    { type: 'ai', content: 'Sure, I\'d be happy to help. What kind of project are you working on?' }
  ];

  return (
    <div className="py-4">
      <ChatHistory messages={sampleMessages} />
    </div>
  );
};

export default ChatMessages;
