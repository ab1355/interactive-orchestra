
import React from 'react';
import { Users, Crown, Code, Wrench, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PodFormationPatterns: React.FC = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Pod Formation Patterns</h3>
      
      <Card className="bg-dark border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Layers className="w-5 h-5 text-purple" />
            Mission-Based Pods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Leadership */}
            <div className="p-4 bg-dark/60 border border-white/10 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Crown className="w-4 h-4 text-blue-400" />
                Leadership
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full p-1">
                    <Users className="w-3 h-3" />
                  </span>
                  Human Decision Maker
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full p-1">
                    <Users className="w-3 h-3" />
                  </span>
                  Manager Agent
                </li>
              </ul>
            </div>
            
            {/* Core Team */}
            <div className="p-4 bg-dark/60 border border-white/10 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-green-400" />
                Core Team
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-green-500/20 text-green-400 rounded-full p-1">
                    <Users className="w-3 h-3" />
                  </span>
                  Primary Agent Lead
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-green-500/20 text-green-400 rounded-full p-1">
                    <Code className="w-3 h-3" />
                  </span>
                  Specialist Agents
                </li>
              </ul>
            </div>
            
            {/* Support Team */}
            <div className="p-4 bg-dark/60 border border-white/10 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-purple" />
                Support Team
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-purple/20 text-purple rounded-full p-1">
                    <Users className="w-3 h-3" />
                  </span>
                  Support Agents
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-purple/20 text-purple rounded-full p-1">
                    <Wrench className="w-3 h-3" />
                  </span>
                  Tool Integration Agents
                </li>
              </ul>
            </div>
          </div>
          
          {/* Communication flows */}
          <div className="mt-8 p-4 bg-dark/40 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-white mb-3">Communication Flows</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-white font-medium text-sm mb-2">Inter-Pod Communication</h5>
                <p className="text-sm text-gray-400">Structured protocols for information exchange between mission-focused pods</p>
              </div>
              <div>
                <h5 className="text-white font-medium text-sm mb-2">Intra-Pod Collaboration</h5>
                <p className="text-sm text-gray-400">Direct channels between pod members with minimal overhead</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PodFormationPatterns;
