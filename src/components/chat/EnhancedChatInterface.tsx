
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModelSelector } from './ModelSelector';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { NavLink } from 'react-router-dom';
import { Home, Lightbulb, Settings, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SettingsDialog from '@/components/dialogs/SettingsDialog';

export const EnhancedChatInterface = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-dark-50">
      <div className="flex-none p-3 border-b border-dark-200 bg-dark-accent/30 flex justify-between items-center">
        <ModelSelector />
        <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full px-2 py-3">
          <ChatMessages />
        </ScrollArea>
      </div>
      
      <div className="flex-none p-3 border-t border-dark-200 bg-dark-accent/20">
        <ChatInput />
      </div>
      
      {/* Navigation elements for Home, Discover, Space, and Flow systems */}
      <div className="flex-none p-3 border-t border-dark-200 bg-dark-accent/10">
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
            <NavLink to="/" className="text-sm">
              <Home className="w-4 h-4" />
              <span>HOME</span>
            </NavLink>
          </Button>
          
          <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
            <NavLink to="/discover-system" className="text-sm">
              <Lightbulb className="w-4 h-4" />
              <span>DISCOVER</span>
            </NavLink>
          </Button>
          
          <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
            <NavLink to="/space-system" className="text-sm">
              <Target className="w-4 h-4" />
              <span>SPACE</span>
            </NavLink>
          </Button>
          
          <Button variant="outline" size="sm" asChild className="flex items-center gap-2">
            <NavLink to="/flow-system" className="text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>FLOW</span>
            </NavLink>
          </Button>
        </div>
      </div>

      <SettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen} 
      />
    </div>
  );
};

export default EnhancedChatInterface;
