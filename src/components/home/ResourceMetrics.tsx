
import React, { useState } from 'react';
import { CpuIcon, MemoryStick, Database, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const ResourceMetrics: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center">
          <CpuIcon className="w-4 h-4 mr-2" />
          {!isCollapsed && "Resource Metrics"}
        </h2>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {!isCollapsed ? (
        <div className="space-y-4 flex-1">
          <div className="bg-dark-accent p-3 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <CpuIcon className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-sm">CPU Usage</span>
              </div>
              <span className="text-sm font-semibold">42%</span>
            </div>
            <Progress value={42} className="h-1.5 bg-white/10" />
          </div>

          <div className="bg-dark-accent p-3 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <MemoryStick className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-sm">Memory</span>
              </div>
              <span className="text-sm font-semibold">1.2/4 GB</span>
            </div>
            <Progress value={30} className="h-1.5 bg-white/10" />
          </div>

          <div className="bg-dark-accent p-3 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Database className="w-4 h-4 mr-2 text-purple" />
                <span className="text-sm">Storage</span>
              </div>
              <span className="text-sm font-semibold">3.8/10 GB</span>
            </div>
            <Progress value={38} className="h-1.5 bg-white/10" />
          </div>

          <div className="bg-dark-accent p-3 rounded-lg border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <LayoutGrid className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">Active Agents</span>
              </div>
              <span className="text-sm font-semibold">3/4</span>
            </div>
            <Progress value={75} className="h-1.5 bg-white/10" />
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">System Status</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs ml-1">API</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs ml-1">Database</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs ml-1">Models</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-dark border border-white/10 rounded p-2 text-xs hover:bg-white/5 transition-colors text-left">
                Clear Cache
              </button>
              <button className="bg-dark border border-white/10 rounded p-2 text-xs hover:bg-white/5 transition-colors text-left">
                Restart Agents
              </button>
              <button className="bg-dark border border-white/10 rounded p-2 text-xs hover:bg-white/5 transition-colors text-left">
                System Logs
              </button>
              <button className="bg-dark border border-white/10 rounded p-2 text-xs hover:bg-white/5 transition-colors text-left">
                Advanced
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <div className="w-8 h-8 rounded-full bg-dark-accent flex items-center justify-center">
            <CpuIcon className="w-4 h-4 text-blue-400" />
          </div>
          <div className="w-8 h-8 rounded-full bg-dark-accent flex items-center justify-center">
            <MemoryStick className="w-4 h-4 text-green-400" />
          </div>
          <div className="w-8 h-8 rounded-full bg-dark-accent flex items-center justify-center">
            <Database className="w-4 h-4 text-purple" />
          </div>
          <div className="w-8 h-8 rounded-full bg-dark-accent flex items-center justify-center">
            <LayoutGrid className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceMetrics;
