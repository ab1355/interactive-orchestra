
import React from 'react';
import { 
  Database, 
  Server, 
  Cpu, 
  Network, 
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import missing icons or create custom ones
const Tool = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;

const Workflow = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>;

const Scaling = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3v18"/><path d="M3 12h18"/><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

const ResourceManagement: React.FC = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Dynamic Resource Management</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resource Allocation */}
        <Card className="bg-dark border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Share2 className="w-5 h-5 text-blue-400" />
              Resource Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Team Resources */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-white">Team Resources</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-black/20 p-3 rounded-lg flex flex-col items-center">
                  <Cpu className="w-8 h-8 text-green-400 mb-2" />
                  <span className="text-sm text-center text-gray-300">Computational Power</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg flex flex-col items-center">
                  <Database className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-sm text-center text-gray-300">Data Access</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg flex flex-col items-center">
                  <Tool className="w-8 h-8 text-yellow-400 mb-2" />
                  <span className="text-sm text-center text-gray-300">Tool Integration</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg flex flex-col items-center">
                  <Network className="w-8 h-8 text-purple-400 mb-2" />
                  <span className="text-sm text-center text-gray-300">API Access</span>
                </div>
              </div>
            </div>
            
            {/* Pod Resources */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-white">Pod Resources</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-black/20 p-3 rounded-lg flex flex-col items-center">
                  <Server className="w-8 h-8 text-orange-400 mb-2" />
                  <span className="text-sm text-center text-gray-300">Dedicated Infrastructure</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg flex flex-col items-center">
                  <Share2 className="w-8 h-8 text-teal-400 mb-2" />
                  <span className="text-sm text-center text-gray-300">Shared Resources</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg flex flex-col items-center">
                  <Tool className="w-8 h-8 text-red-400 mb-2" />
                  <span className="text-sm text-center text-gray-300">Specialized Tools</span>
                </div>
                <div className="bg-black/20 p-3 rounded-lg flex flex-col items-center">
                  <Workflow className="w-8 h-8 text-indigo-400 mb-2" />
                  <span className="text-sm text-center text-gray-300">Communication Channels</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Resource Optimization */}
        <Card className="bg-dark border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Scaling className="w-5 h-5 text-green-400" />
              Resource Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-code-background p-4 rounded-md border border-white/10 font-mono text-sm text-gray-300 mb-6">
              <div className="text-purple-400">class ResourceOptimization:</div>
              <div className="pl-4 text-white">def <span className="text-blue-400">__init__</span>(self):</div>
              <div className="pl-8 text-white">self.allocation_strategy = {"{"}</div>
              <div className="pl-12 text-white">
                &apos;<span className="text-green-400">dynamic</span>&apos;: <span className="text-yellow-400">True</span>,
              </div>
              <div className="pl-12 text-white">
                &apos;<span className="text-green-400">scalable</span>&apos;: <span className="text-yellow-400">True</span>,
              </div>
              <div className="pl-12 text-white">
                &apos;<span className="text-green-400">mission_based</span>&apos;: <span className="text-yellow-400">True</span>
              </div>
              <div className="pl-8 text-white">{"}"}</div>
              <div className="pl-8 text-white">self.resource_pools = {"{"}</div>
              <div className="pl-12 text-white">
                &apos;<span className="text-green-400">computational</span>&apos;: [],
              </div>
              <div className="pl-12 text-white">
                &apos;<span className="text-green-400">data</span>&apos;: [],
              </div>
              <div className="pl-12 text-white">
                &apos;<span className="text-green-400">tools</span>&apos;: [],
              </div>
              <div className="pl-12 text-white">
                &apos;<span className="text-green-400">api</span>&apos;: []
              </div>
              <div className="pl-8 text-white">{"}"}</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Scaling className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Dynamic Allocation</h4>
                  <p className="text-sm text-gray-400">Resources are allocated in real-time based on changing needs</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Scalable Infrastructure</h4>
                  <p className="text-sm text-gray-400">Easily scale resources up or down based on task complexity</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Workflow className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Mission-Based Distribution</h4>
                  <p className="text-sm text-gray-400">Priority resource assignment for critical mission components</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourceManagement;
