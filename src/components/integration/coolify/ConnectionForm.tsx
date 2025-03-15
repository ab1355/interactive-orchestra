
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/ui/action-button";

interface ConnectionFormProps {
  onConnect: (url: string, apiKey: string) => void;
}

const ConnectionForm: React.FC<ConnectionFormProps> = ({ onConnect }) => {
  const [url, setUrl] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const handleConnect = async () => {
    if (!url || !apiKey) return;
    
    setIsConnecting(true);
    
    try {
      // In a real implementation, this would validate the connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConnect(url, apiKey);
      return true; // Success
    } catch (error) {
      console.error("Failed to connect to Coolify:", error);
      return false; // Failure
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-white mb-4">
          Connect to your Coolify instance to manage servers, applications, and databases.
        </p>
      </div>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="coolify-url" className="text-sm text-gray-300 block mb-1">
            Coolify Instance URL
          </label>
          <input 
            id="coolify-url" 
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://coolify.yourdomain.com"
            className="w-full bg-dark border border-white/10 rounded p-2 text-white"
          />
        </div>
        
        <div>
          <label htmlFor="api-key" className="text-sm text-gray-300 block mb-1">
            API Key
          </label>
          <input 
            id="api-key" 
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Coolify API key"
            className="w-full bg-dark border border-white/10 rounded p-2 text-white"
          />
        </div>
        
        <div className="pt-2">
          <ActionButton
            onClick={handleConnect}
            isLoading={isConnecting}
            disabled={!url || !apiKey}
            className="w-full bg-purple hover:bg-purple/80 text-white"
            successMessage="Connected to Coolify successfully"
            errorMessage="Failed to connect to Coolify"
          >
            Connect to Coolify
          </ActionButton>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 pt-2">
        <p>
          Don't have a Coolify instance yet?{" "}
          <a
            href="https://coolify.io/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple hover:text-purple-light underline"
          >
            Learn how to set up your own
          </a>
        </p>
      </div>
    </div>
  );
};

export default ConnectionForm;
