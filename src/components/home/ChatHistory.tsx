
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from './types';

interface ChatHistoryProps {
  messages: ChatMessageType[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4"
    >
      {messages.map((chat, index) => (
        <ChatMessage key={index} type={chat.type} content={chat.content} />
      ))}
    </div>
  );
};

export default ChatHistory;
