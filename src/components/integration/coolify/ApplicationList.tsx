
import React from 'react';
import { GitBranch, RefreshCw, Play, Square, RotateCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/ui/action-button";
import { CoolifyApplication, CoolifyServer } from './types';

interface ApplicationListProps {
  applications: CoolifyApplication[];
  servers: CoolifyServer[];
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications, servers }) => {
  const getServerName = (serverId: string): string => {
    const server = servers.find(s => s.id === serverId);
    return server ? server.name : 'Unknown Server';
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-sm font-medium">Your Applications</h3>
        <ActionButton 
          variant="outline" 
          size="sm"
          className="text-xs border-white/10 text-white"
          tooltipText="Refresh application list"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Refresh
        </ActionButton>
      </div>
      
      <div className="space-y-3">
        {applications.length === 0 ? (
          <div className="text-center p-4 bg-dark border border-white/10 rounded">
            <p className="text-gray-400">No applications found</p>
          </div>
        ) : (
          applications.map((app) => (
            <div 
              key={app.id} 
              className="bg-dark border border-white/10 rounded p-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <GitBranch className="w-5 h-5 text-purple mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-white font-medium">{app.name}</h4>
                    <p className="text-xs text-gray-400">{app.repository}</p>
                    <div className="flex items-center mt-1">
                      <span 
                        className={`w-2 h-2 rounded-full mr-1 ${
                          app.status === 'running' ? 'bg-green-500' : 
                          app.status === 'deploying' ? 'bg-blue-500' :
                          app.status === 'stopped' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                      <span className="text-xs text-gray-300 capitalize">{app.status}</span>
                      <span className="text-xs text-gray-500 mx-2">•</span>
                      <span className="text-xs text-gray-400">{getServerName(app.serverId)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {app.status === 'running' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs border-white/10 text-white"
                    >
                      <Square className="w-3 h-3 mr-1" />
                      Stop
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs border-white/10 text-white"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs border-white/10 text-white"
                  >
                    <RotateCw className="w-3 h-3 mr-1" />
                    Redeploy
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="bg-black/20 p-2 rounded">
                  <span className="text-gray-400 block">Destination</span>
                  <span className="text-white">{app.destination}</span>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <span className="text-gray-400 block">Last Deployed</span>
                  <span className="text-white">{formatDate(app.lastDeployed)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationList;
