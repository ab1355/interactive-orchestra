
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModelSelector } from './ModelSelector';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export const EnhancedChatInterface = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none p-4 border-b">
        <ModelSelector />
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <ScrollArea className="h-full">
          <ChatMessages />
        </ScrollArea>
      </div>
      
      <div className="flex-none p-4 border-t">
        <ChatInput />
      </div>
    </div>
  );
};

export default EnhancedChatInterface;
