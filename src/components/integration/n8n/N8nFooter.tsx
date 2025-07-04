
import React from 'react';
import { EnhancedActionButton } from '@/components/ui/enhanced-action-button';
import { ExternalLink, Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { N8nFooterProps } from './types';

const N8nFooter: React.FC<N8nFooterProps> = ({ disconnect, toggleAgentAccess, isAgentAccessEnabled }) => {
  return (
    <div className="flex justify-between pt-4 border-t border-white/10 mt-4">
      <div className="flex items-center space-x-4">
        <EnhancedActionButton
          variant="outline"
          className="border-white/10 text-gray-300 hover:text-white"
          onClick={disconnect}
          tooltipText="Disconnect from n8n"
          hasRipple={true}
        >
          Disconnect
        </EnhancedActionButton>
        
        <div className="flex items-center space-x-2">
          <Switch 
            checked={isAgentAccessEnabled} 
            onCheckedChange={toggleAgentAccess}
            id="agent-access-toggle"
            className="data-[state=checked]:bg-purple"
          />
          <label 
            htmlFor="agent-access-toggle" 
            className="text-sm text-gray-300 cursor-pointer flex items-center"
          >
            <Settings className="w-4 h-4 mr-1" />
            Agent API Access
          </label>
        </div>
      </div>
      
      <a 
        href="https://docs.n8n.io/api/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center px-4 py-2 bg-dark-accent text-purple hover:text-purple-light rounded border border-white/10"
      >
        <ExternalLink className="w-4 h-4 mr-1" />
        n8n API Documentation
      </a>
    </div>
  );
};

export default N8nFooter;
