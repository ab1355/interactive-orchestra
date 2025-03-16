
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Settings } from 'lucide-react';
import { ParameterControls } from './ParameterControls';
import { ConversationList } from './ConversationList';
import SettingsDialog from '@/components/dialogs/SettingsDialog';
import { NavLink } from 'react-router-dom';

export const EnhancedSidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-900 p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Settings</h2>
          <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)}>
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

        <Separator />
        
        <NavLink to="/" className="flex items-center gap-2 mt-4 text-sm text-gray-300 hover:text-white">
          <Home className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </NavLink>
      </div>

      <SettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen} 
      />
    </aside>
  );
};

export default EnhancedSidebar;
