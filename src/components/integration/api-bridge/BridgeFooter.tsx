
import React from 'react';
import { Shield } from 'lucide-react';

const BridgeFooter: React.FC = () => {
  return (
    <div className="text-xs text-gray-400">
      <p className="mb-1 flex items-center">
        <Shield className="w-3 h-3 mr-1 text-gray-500" />
        Agents will only be able to use APIs that you explicitly enable
      </p>
      <p>Each API request will be logged and can be monitored in the agent activity</p>
    </div>
  );
};

export default BridgeFooter;
