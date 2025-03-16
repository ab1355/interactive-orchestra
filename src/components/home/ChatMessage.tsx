
import React from 'react';
import { ChatMessageType } from './types';

interface ChatMessageProps {
  type: ChatMessageType;
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  // Add more complex message rendering based on content type
  const renderContent = () => {
    if (content.startsWith('/canvas')) {
      return <div className="font-mono bg-dark-accent/50 p-2 rounded">{content}</div>;
    }
    
    // Handle system messages differently
    if (type === 'ai' && content === 'message received') {
      return (
        <div className="animate-pulse">
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 bg-purple rounded-full"></div>
            <div className="w-2 h-2 bg-purple rounded-full"></div>
            <div className="w-2 h-2 bg-purple rounded-full"></div>
          </div>
        </div>
      );
    }
    
    return <p className="whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} message-enter`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          type === 'user' 
            ? 'bg-purple text-white rounded-tr-none' 
            : 'bg-dark-accent text-white rounded-tl-none'
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatMessage;
