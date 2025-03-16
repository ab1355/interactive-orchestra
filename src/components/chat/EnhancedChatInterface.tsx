
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModelSelector } from './ModelSelector';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export const EnhancedChatInterface = () => {
  return (
    <div className="flex flex-col h-screen bg-dark-50">
      <div className="flex-none p-3 border-b border-dark-200 bg-dark-accent/30">
        <ModelSelector />
      </div>
      
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full px-2 py-3">
          <ChatMessages />
        </ScrollArea>
      </div>
      
      <div className="flex-none p-3 border-t border-dark-200 bg-dark-accent/20">
        <ChatInput />
      </div>
    </div>
  );
};

export default EnhancedChatInterface;
