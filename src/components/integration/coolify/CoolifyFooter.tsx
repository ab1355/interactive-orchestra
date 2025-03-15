
import React from 'react';
import { Shield, GitBranch, Database, Server } from 'lucide-react';

const CoolifyFooter: React.FC = () => {
  return (
    <div className="text-xs text-gray-400 space-y-2 mt-4 pt-4 border-t border-white/10">
      <p className="mb-1 flex items-center">
        <Server className="w-3 h-3 mr-1 text-blue-400" />
        Manage your Coolify servers and monitor resources
      </p>
      <p className="mb-1 flex items-center">
        <GitBranch className="w-3 h-3 mr-1 text-purple" />
        Deploy and control your applications from Git repositories
      </p>
      <p className="mb-1 flex items-center">
        <Database className="w-3 h-3 mr-1 text-green-400" />
        Create and manage databases for your applications
      </p>
      <p className="mb-1 flex items-center">
        <Shield className="w-3 h-3 mr-1 text-gray-500" />
        Control which Coolify resources are available to agents
      </p>
      <p>Coolify is an open-source, self-hostable Heroku/Netlify alternative.</p>
    </div>
  );
};

export default CoolifyFooter;
