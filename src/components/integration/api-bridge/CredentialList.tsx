
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CredentialItem from './CredentialItem';
import { CredentialListProps } from './types';

const CredentialList: React.FC<CredentialListProps> = ({ 
  credentials, 
  onToggle, 
  isRefreshing 
}) => {
  return (
    <div className="mb-4 p-3 bg-dark rounded-md border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-medium">Available API Tools</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 border-white/10 text-gray-300 hover:text-white"
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      <p className="text-sm text-gray-400 mb-3">
        Enable API tools that agents can access dynamically during tasks
      </p>
      
      <div className="space-y-3 mt-4">
        {credentials.map(credential => (
          <CredentialItem 
            key={credential.id} 
            credential={credential} 
            onToggle={onToggle} 
          />
        ))}
      </div>
    </div>
  );
};

export default CredentialList;
