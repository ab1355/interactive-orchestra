
import React from 'react';
import { RefreshCw, Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { ActionButton } from "@/components/ui/action-button";
import { CoolifyCredential } from './types';

interface CredentialListProps {
  credentials: CoolifyCredential[];
  onToggle: (credentialId: string) => void;
  isRefreshing: boolean;
}

const CredentialList: React.FC<CredentialListProps> = ({ credentials, onToggle, isRefreshing }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-sm font-medium">API Credentials</h3>
        <ActionButton 
          variant="outline" 
          size="sm"
          className="text-xs border-white/10 text-white"
          isLoading={isRefreshing}
          tooltipText="Refresh credentials"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Refresh
        </ActionButton>
      </div>
      
      <div className="space-y-2">
        {credentials.length === 0 ? (
          <div className="text-center p-4 bg-dark border border-white/10 rounded">
            <p className="text-gray-400">No credentials found</p>
          </div>
        ) : (
          credentials.map((credential) => (
            <div 
              key={credential.id} 
              className="flex items-center justify-between p-2 bg-black/20 rounded-md"
            >
              <div>
                <div className="flex items-center">
                  <span className="text-white mr-2">{credential.name}</span>
                </div>
                <p className="text-xs text-gray-400">
                  {credential.isAvailableToAgents 
                    ? 'Available to agents' 
                    : 'Not available to agents'}
                </p>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={credential.isAvailableToAgents} 
                  onCheckedChange={() => onToggle(credential.id)}
                  className="data-[state=checked]:bg-green-500"
                />
                {!credential.isAvailableToAgents && 
                  <Shield className="w-4 h-4 ml-2 text-gray-500" />
                }
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CredentialList;
