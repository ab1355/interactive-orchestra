
import React from 'react';
import { Server, RefreshCw, Power } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/ui/action-button";
import { CoolifyServer } from './types';

interface ServerListProps {
  servers: CoolifyServer[];
}

const ServerList: React.FC<ServerListProps> = ({ servers }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-sm font-medium">Your Servers</h3>
        <ActionButton 
          variant="outline" 
          size="sm"
          className="text-xs border-white/10 text-white"
          tooltipText="Refresh server list"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Refresh
        </ActionButton>
      </div>
      
      <div className="space-y-3">
        {servers.length === 0 ? (
          <div className="text-center p-4 bg-dark border border-white/10 rounded">
            <p className="text-gray-400">No servers found</p>
          </div>
        ) : (
          servers.map((server) => (
            <div 
              key={server.id} 
              className="bg-dark border border-white/10 rounded p-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <Server className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-white font-medium">{server.name}</h4>
                    <p className="text-xs text-gray-400">{server.url}</p>
                    <div className="flex items-center mt-1">
                      <span 
                        className={`w-2 h-2 rounded-full mr-1 ${
                          server.status === 'online' ? 'bg-green-500' : 
                          server.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                      <span className="text-xs text-gray-300 capitalize">{server.status}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs border-white/10 text-white"
                >
                  <Power className="w-3 h-3 mr-1" />
                  Manage
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                <div className="bg-black/20 p-2 rounded">
                  <span className="text-gray-400 block">CPU</span>
                  <span className="text-white">{server.resources.cpu}</span>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <span className="text-gray-400 block">Memory</span>
                  <span className="text-white">{server.resources.memory}</span>
                </div>
                <div className="bg-black/20 p-2 rounded">
                  <span className="text-gray-400 block">Storage</span>
                  <span className="text-white">{server.resources.storage}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServerList;
