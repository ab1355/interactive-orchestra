
import React from 'react';
import { ChatMessageType } from './types';

interface ChatMessageProps {
  type: ChatMessageType;
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, content }) => {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          type === 'user' 
            ? 'bg-purple text-white rounded-tr-none' 
            : 'bg-dark-accent text-white rounded-tl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
