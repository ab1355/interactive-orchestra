
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings } from 'lucide-react';
import { ParameterControls } from './ParameterControls';
import { ConversationList } from './ConversationList';

export const EnhancedSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Settings</h2>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Model Parameters</h3>
          <ParameterControls />
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Conversation History</h3>
          <ScrollArea className="h-[300px]">
            <ConversationList />
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
};

export default EnhancedSidebar;
