
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import useApiCredentialBridge from '@/hooks/useApiCredentialBridge';
import CredentialList from './api-bridge/CredentialList';
import BridgeFooter from './api-bridge/BridgeFooter';
import { ApiCredentialBridgeProps } from './api-bridge/types';

const ApiCredentialBridge: React.FC<ApiCredentialBridgeProps> = ({ initialCredentials }) => {
  const {
    isActive,
    credentials,
    isRefreshing,
    toggleCredentialAccess,
    toggleActive,
    refreshCredentials
  } = useApiCredentialBridge(initialCredentials);
  
  return (
    <Card className="bg-dark-accent rounded-lg border border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white font-medium flex items-center">
          <Settings className="w-5 h-5 mr-2 text-purple" />
          Agent API Tool Bridge
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Switch 
            checked={isActive} 
            onCheckedChange={toggleActive}
            className="data-[state=checked]:bg-purple"
          />
          <span className="text-sm text-gray-300">
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <CredentialList 
          credentials={credentials}
          onToggle={toggleCredentialAccess}
          isRefreshing={isRefreshing}
        />
        <BridgeFooter />
      </CardContent>
    </Card>
  );
};

export default ApiCredentialBridge;
