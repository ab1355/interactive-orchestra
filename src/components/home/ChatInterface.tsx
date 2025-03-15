
import React, { useState } from 'react';
import { FileUp } from 'lucide-react';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import { ChatMessage, FileWithPath } from './types';

const ChatInterface: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { type: 'ai', content: 'Hello! I am your AI assistant. How can I help you today?' },
  ]);

  const handleSendMessage = (message: string, files: FileWithPath[]) => {
    // Add user message to chat if there's text
    if (message.trim()) {
      setChatHistory(prev => [...prev, { type: 'user', content: message }]);
    }
    
    // Simulate AI response
    setTimeout(() => {
      let responseContent = 'I\'ve received your message.';
      
      if (files.length > 0) {
        const fileNames = files.map(file => {
          if (file.webkitRelativePath) {
            return file.webkitRelativePath;
          }
          return file.name;
        }).join(', ');
        responseContent += ` I've also processed the following files: ${fileNames}`;
      }
      
      setChatHistory(prev => [...prev, { type: 'ai', content: responseContent }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Chat Interface</h2>
        <div className="text-sm text-gray-400">
          Connected to AI Agent
        </div>
      </div>
      
      <ChatHistory messages={chatHistory} />
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
