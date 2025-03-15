
import React from 'react';
import { Network, GitBranch, ArrowUpDown, ArrowRightLeft, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CommunicationStructure: React.FC = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Integration with Communication Structure</h3>
      
      <Card className="bg-dark border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Network className="w-5 h-5 text-purple" />
            Cross-Pod Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vertical Communication */}
            <div className="bg-dark/60 border border-white/10 rounded-lg p-5">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-blue-400" />
                Vertical Channels
              </h4>
              
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-px bg-blue-500/30"></div>
                
                <div className="pl-10 pb-8 relative">
                  <div className="absolute left-3 top-2 w-3 h-3 rounded-full bg-blue-500"></div>
                  <h5 className="text-white font-medium mb-1">Executive → Pod Leaders</h5>
                  <p className="text-sm text-gray-300">Strategic directives and mission parameters flow down from executive decision makers to pod leaders</p>
                </div>
                
                <div className="pl-10 pb-8 relative">
                  <div className="absolute left-3 top-2 w-3 h-3 rounded-full bg-blue-500"></div>
                  <h5 className="text-white font-medium mb-1">Pod Leaders → Team Members</h5>
                  <p className="text-sm text-gray-300">Task assignments and role clarifications from pod leaders to specialized team members</p>
                </div>
                
                <div className="pl-10 relative">
                  <div className="absolute left-3 top-2 w-3 h-3 rounded-full bg-blue-500"></div>
                  <h5 className="text-white font-medium mb-1">Team Members → Support Systems</h5>
                  <p className="text-sm text-gray-300">Tool activation requests and resource requisitions from team members to support infrastructure</p>
                </div>
              </div>
            </div>
            
            {/* Horizontal Communication */}
            <div className="bg-dark/60 border border-white/10 rounded-lg p-5">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-green-400" />
                Horizontal Channels
              </h4>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <GitBranch className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">Inter-Pod Collaboration</h5>
                    <p className="text-sm text-gray-300">Structured protocols for cross-functional teams to share information and coordinate activities on related objectives</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Share2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">Resource Sharing Networks</h5>
                    <p className="text-sm text-gray-300">Efficient distribution and utilization of computational resources, data assets, and specialized tools across different pods</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Network className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-1">Knowledge Exchange Paths</h5>
                    <p className="text-sm text-gray-300">Systematic methods for distributing insights, lessons learned, and best practices between different agent pods and teams</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunicationStructure;
