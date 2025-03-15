
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/ui/action-button";

interface IntegrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tool: {
    name: string;
    description: string;
    auth: string;
    category: string;
    developer: string;
  };
}

const IntegrationDialog: React.FC<IntegrationDialogProps> = ({
  isOpen,
  onClose,
  tool
}) => {
  const [apiKey, setApiKey] = useState("");
  const [integrationName, setIntegrationName] = useState(`My ${tool.name} Integration`);
  const [isConfiguring, setIsConfiguring] = useState(false);

  const handleAddIntegration = async () => {
    try {
      setIsConfiguring(true);
      // In a real application, this would make an API call to set up the integration
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsConfiguring(false);
      onClose();
      return true; // Return true to trigger success message
    } catch (error) {
      setIsConfiguring(false);
      return false; // Return false to prevent success message
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dark-accent border border-white/10 text-white max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Add {tool.name} Integration</DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure your integration with {tool.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <label htmlFor="integration-name" className="text-sm text-gray-300">Integration Name</label>
            <input
              id="integration-name"
              type="text"
              value={integrationName}
              onChange={(e) => setIntegrationName(e.target.value)}
              className="w-full bg-dark border border-white/10 rounded p-2 text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm text-gray-300">
              {tool.auth === 'API Key' ? 'API Key' : 
               tool.auth === 'OAuth 2.0' ? 'OAuth Credentials' :
               tool.auth === 'Access Key / Secret Key' ? 'Access & Secret Keys' : 
               'Authentication Credentials'}
            </label>
            <div className="flex">
              <input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={tool.auth === 'API Key' ? 'Enter your API key' : 'Enter your credentials'}
                className="flex-1 bg-dark border border-white/10 rounded-l p-2 text-white"
              />
              <button 
                className="bg-dark-accent border border-white/10 border-l-0 rounded-r px-3 text-white"
                onClick={() => alert('For security, this would toggle password visibility')}
              >
                Show
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              You can find your {tool.auth} in the {tool.name} dashboard
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Integration Scope</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="scope1" className="mr-2" defaultChecked />
                <label htmlFor="scope1" className="text-sm text-white">Read Access</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="scope2" className="mr-2" defaultChecked />
                <label htmlFor="scope2" className="text-sm text-white">Write Access</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="scope3" className="mr-2" />
                <label htmlFor="scope3" className="text-sm text-white">Delete Access</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="scope4" className="mr-2" />
                <label htmlFor="scope4" className="text-sm text-white">Admin Access</label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
          <Button
            variant="outline"
            className="border-white/10 text-gray-300 hover:text-white"
            onClick={onClose}
          >
            Cancel
          </Button>
          
          <ActionButton
            isLoading={isConfiguring}
            onClick={handleAddIntegration}
            className="bg-purple hover:bg-purple/80 text-white"
            successMessage={`${tool.name} integration added successfully`}
            errorMessage={`Failed to add ${tool.name} integration`}
          >
            Add Integration
          </ActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationDialog;
