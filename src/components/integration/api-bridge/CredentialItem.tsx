
import React from 'react';
import { Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CredentialToggleProps } from './types';

const CredentialItem: React.FC<CredentialToggleProps> = ({ credential, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-black/20 rounded-md">
      <div>
        <div className="flex items-center">
          <span className="text-white mr-2">{credential.name}</span>
          <Badge variant="outline" className="text-xs border-white/10 px-1.5 py-0.5 h-5">
            {credential.type}
          </Badge>
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
        {!credential.isAvailableToAgents && (
          <Shield className="w-4 h-4 ml-2 text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default CredentialItem;
