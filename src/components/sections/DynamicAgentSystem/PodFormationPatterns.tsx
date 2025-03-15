
import React from 'react';
import { Users, ShieldCheck, Tool, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PodFormationPatterns: React.FC = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Pod Formation Patterns</h3>
      
      <Card className="bg-dark border-green-500/20 shadow-lg shadow-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-xl">
            <Briefcase className="w-5 h-5 text-green-500" />
            Mission-Based Pods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Leadership Section */}
            <div className="space-y-4">
              <div className="bg-dark/50 border border-white/10 rounded-md p-4">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <ShieldCheck className="w-4 h-4 text-blue-400 mr-2" />
                  Leadership
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500/20 text-blue-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                      <Users className="w-3 h-3" />
                    </span>
                    <div>
                      <span className="text-white text-sm font-medium">Human Decision Maker</span>
                      <p className="text-gray-400 text-xs">Strategic oversight and final approval</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500/20 text-blue-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                      <Users className="w-3 h-3" />
                    </span>
                    <div>
                      <span className="text-white text-sm font-medium">Manager Agent</span>
                      <p className="text-gray-400 text-xs">Coordinates pod activities and resource allocation</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Core Team Section */}
            <div className="space-y-4">
              <div className="bg-dark/50 border border-white/10 rounded-md p-4">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <Users className="w-4 h-4 text-green-500 mr-2" />
                  Core Team
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="bg-green-500/20 text-green-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                      <Users className="w-3 h-3" />
                    </span>
                    <div>
                      <span className="text-white text-sm font-medium">Primary Agent Lead</span>
                      <p className="text-gray-400 text-xs">Main execution agent focused on primary objective</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-green-500/20 text-green-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                      <Users className="w-3 h-3" />
                    </span>
                    <div>
                      <span className="text-white text-sm font-medium">Specialist Agents</span>
                      <p className="text-gray-400 text-xs">Domain-specific expertise for complex tasks</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Support Team Section */}
            <div className="space-y-4">
              <div className="bg-dark/50 border border-white/10 rounded-md p-4">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <Tool className="w-4 h-4 text-purple mr-2" />
                  Support Team
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="bg-purple/20 text-purple rounded-full p-1 mt-0.5 flex-shrink-0">
                      <Users className="w-3 h-3" />
                    </span>
                    <div>
                      <span className="text-white text-sm font-medium">Support Agents</span>
                      <p className="text-gray-400 text-xs">Auxiliary assistance and backup capabilities</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple/20 text-purple rounded-full p-1 mt-0.5 flex-shrink-0">
                      <Tool className="w-3 h-3" />
                    </span>
                    <div>
                      <span className="text-white text-sm font-medium">Tool Integration Agents</span>
                      <p className="text-gray-400 text-xs">Specialized interfaces to external systems and tools</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-500/5 to-purple/5 border border-white/5 rounded-md p-4">
            <h4 className="text-white font-medium mb-2">Pod Communication Flows</h4>
            <div className="flex items-center justify-center py-4">
              <div className="relative">
                {/* Leadership to Core */}
                <div className="absolute top-[50%] left-[30%] w-[40%] h-0.5 bg-gradient-to-r from-blue-400 to-green-500"></div>
                
                {/* Core to Support */}
                <div className="absolute top-[50%] left-[70%] w-[30%] h-0.5 bg-gradient-to-r from-green-500 to-purple"></div>
                
                {/* Circles for each team */}
                <div className="flex items-center justify-between w-full space-x-32">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40 z-10">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/40 z-10">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center border border-purple/40 z-10">
                    <Tool className="w-6 h-6 text-purple" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center mt-4">
              Bidirectional communication flows with centralized coordination through the Manager Agent
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PodFormationPatterns;
