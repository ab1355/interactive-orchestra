
import React from 'react';
import { EnhancedActionButton } from '@/components/ui/enhanced-action-button';
import { ConnectionFormProps } from './types';

const ConnectionForm: React.FC<ConnectionFormProps> = ({
  apiUrl,
  setApiUrl,
  apiKey,
  setApiKey,
  handleConnect,
  isLoading
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">n8n API URL</label>
          <input
            type="text"
            className="w-full bg-dark border border-white/10 rounded p-2 text-white"
            placeholder="https://your-n8n-instance.com/api/v1"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">API Key</label>
          <input
            type="password"
            className="w-full bg-dark border border-white/10 rounded p-2 text-white"
            placeholder="Your n8n API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
      </div>
      <EnhancedActionButton
        className="w-full bg-purple hover:bg-purple/80 text-white"
        onClick={handleConnect}
        isLoading={isLoading}
        hasRipple={true}
        tooltipText="Connect to your n8n instance"
      >
        Connect to n8n
      </EnhancedActionButton>
    </div>
  );
};

export default ConnectionForm;
