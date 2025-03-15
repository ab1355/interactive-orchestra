
import React from 'react';
import { Shield, Download, Terminal } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CredentialToggleProps } from './types';

const CredentialItem: React.FC<CredentialToggleProps> = ({ credential, onToggle }) => {
  // Function to render appropriate icon based on credential type
  const renderIcon = () => {
    switch(credential.type) {
      case 'download':
        return <Download className="w-4 h-4 ml-2 text-blue-500" />;
      case 'terminal':
        return <Terminal className="w-4 h-4 ml-2 text-yellow-500" />;
      default:
        return !credential.isAvailableToAgents && <Shield className="w-4 h-4 ml-2 text-gray-500" />;
    }
  };

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
        {renderIcon()}
      </div>
    </div>
  );
};

export default CredentialItem;
