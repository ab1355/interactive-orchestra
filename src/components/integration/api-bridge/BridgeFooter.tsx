
import React from 'react';
import { Shield, Download, Terminal, AlertTriangle } from 'lucide-react';

const BridgeFooter: React.FC = () => {
  return (
    <div className="text-xs text-gray-400 space-y-2">
      <p className="mb-1 flex items-center">
        <Shield className="w-3 h-3 mr-1 text-gray-500" />
        Agents will only be able to use APIs that you explicitly enable
      </p>
      <p className="mb-1 flex items-center">
        <Download className="w-3 h-3 mr-1 text-blue-500" />
        File downloads can be restricted by domain
      </p>
      <p className="mb-1 flex items-center">
        <Terminal className="w-3 h-3 mr-1 text-yellow-500" />
        Terminal commands are filtered for security
      </p>
      <p className="mb-1 flex items-center">
        <AlertTriangle className="w-3 h-3 mr-1 text-red-500" />
        Exercise caution when enabling terminal access for agents
      </p>
      <p>Each API request and tool usage will be logged and can be monitored in the agent activity</p>
    </div>
  );
};

export default BridgeFooter;
