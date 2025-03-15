
import React from 'react';
import { Database, RefreshCw, Play, Square, RotateCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/components/ui/action-button";
import { CoolifyDatabase, CoolifyServer } from './types';

interface DatabaseListProps {
  databases: CoolifyDatabase[];
  servers: CoolifyServer[];
}

const DatabaseList: React.FC<DatabaseListProps> = ({ databases, servers }) => {
  const getServerName = (serverId: string): string => {
    const server = servers.find(s => s.id === serverId);
    return server ? server.name : 'Unknown Server';
  };

  const getDatabaseIcon = (type: string): JSX.Element => {
    // We're using Database icon for all types since we don't have specific icons,
    // but in a real app you could use different icons for different database types
    return <Database className={`w-5 h-5 ${
      type === 'postgresql' ? 'text-blue-400' :
      type === 'mysql' ? 'text-orange-400' :
      type === 'mongodb' ? 'text-green-400' :
      'text-red-400' // Redis
    } mt-0.5 mr-2`} />;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-sm font-medium">Your Databases</h3>
        <ActionButton 
          variant="outline" 
          size="sm"
          className="text-xs border-white/10 text-white"
          tooltipText="Refresh database list"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Refresh
        </ActionButton>
      </div>
      
      <div className="space-y-3">
        {databases.length === 0 ? (
          <div className="text-center p-4 bg-dark border border-white/10 rounded">
            <p className="text-gray-400">No databases found</p>
          </div>
        ) : (
          databases.map((db) => (
            <div 
              key={db.id} 
              className="bg-dark border border-white/10 rounded p-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  {getDatabaseIcon(db.type)}
                  <div>
                    <h4 className="text-white font-medium">{db.name}</h4>
                    <p className="text-xs text-gray-400 capitalize">{db.type} {db.version}</p>
                    <div className="flex items-center mt-1">
                      <span 
                        className={`w-2 h-2 rounded-full mr-1 ${
                          db.status === 'running' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      />
                      <span className="text-xs text-gray-300 capitalize">{db.status}</span>
                      <span className="text-xs text-gray-500 mx-2">•</span>
                      <span className="text-xs text-gray-400">{getServerName(db.serverId)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {db.status === 'running' ? (
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
                    Restart
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DatabaseList;
