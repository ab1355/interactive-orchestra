
import React from 'react';
import { Crown, Layers, ListChecks, BarChart3, Users, ServerCog, Laptop, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';

interface DynamicAgentSystemProps {
  className?: string;
}

const DynamicAgentSystem: React.FC<DynamicAgentSystemProps> = ({ className }) => {
  return (
    <div className={cn("py-16 bg-gradient-to-b from-dark/80 to-dark/95", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Dynamic Agent & Team Management System</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Adaptive system for optimal agent collaboration and team formation based on changing requirements</p>
        </div>
        
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Command Structure</h3>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Executive Layer */}
            <Card className="bg-dark border-blue-500/20 shadow-lg shadow-blue-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Crown className="w-5 h-5 text-blue-400" />
                  Executive Layer (Me + Manager Agent)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-500/20 text-blue-400 rounded-full p-1 mt-0.5">
                          <ServerCog className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Strategic team formation decisions</p>
                          <p className="text-gray-400 text-sm">High-level decisions on team structures and capabilities</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-500/20 text-blue-400 rounded-full p-1 mt-0.5">
                          <ServerCog className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Resource allocation approval</p>
                          <p className="text-gray-400 text-sm">Final authority on resource distribution across teams</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-500/20 text-blue-400 rounded-full p-1 mt-0.5">
                          <ServerCog className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Priority setting</p>
                          <p className="text-gray-400 text-sm">Determination of critical objectives and timelines</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-500/20 text-blue-400 rounded-full p-1 mt-0.5">
                          <ServerCog className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Final authority on team composition</p>
                          <p className="text-gray-400 text-sm">Ultimate decision-making on agent assignments</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tactical Layer */}
            <Card className="bg-dark border-green-500/20 shadow-lg shadow-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Laptop className="w-5 h-5 text-green-400" />
                  Tactical Layer (Primary Agents)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-green-500/20 text-green-400 rounded-full p-1 mt-0.5">
                          <Users className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Team recommendation generation</p>
                          <p className="text-gray-400 text-sm">Analysis-based suggestions for optimal team structures</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-green-500/20 text-green-400 rounded-full p-1 mt-0.5">
                          <Users className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Resource requirement analysis</p>
                          <p className="text-gray-400 text-sm">Detailed evaluation of necessary resources for success</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-green-500/20 text-green-400 rounded-full p-1 mt-0.5">
                          <Users className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Performance monitoring</p>
                          <p className="text-gray-400 text-sm">Continuous tracking of team effectiveness and output</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-green-500/20 text-green-400 rounded-full p-1 mt-0.5">
                          <Users className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Dynamic adjustment proposals</p>
                          <p className="text-gray-400 text-sm">Suggested modifications based on changing conditions</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operational Layer */}
            <Card className="bg-dark border-purple/20 shadow-lg shadow-purple/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Smartphone className="w-5 h-5 text-purple" />
                  Operational Layer (Support & Specialized Agents)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-purple/20 text-purple rounded-full p-1 mt-0.5">
                          <ListChecks className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Task execution</p>
                          <p className="text-gray-400 text-sm">Direct implementation of assigned responsibilities</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple/20 text-purple rounded-full p-1 mt-0.5">
                          <ListChecks className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Real-time adaptation</p>
                          <p className="text-gray-400 text-sm">Immediate adjustments to changing conditions</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-purple/20 text-purple rounded-full p-1 mt-0.5">
                          <ListChecks className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Resource utilization</p>
                          <p className="text-gray-400 text-sm">Efficient use of allocated resources</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple/20 text-purple rounded-full p-1 mt-0.5">
                          <ListChecks className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-white font-medium">Performance reporting</p>
                          <p className="text-gray-400 text-sm">Detailed metrics and progress updates</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Formation Framework */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Dynamic Team Formation Framework</h3>
          
          <div className="relative">
            <div className="flex justify-center mb-8">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="absolute top-0 left-1/2 w-px h-full bg-gray-700 -translate-x-1/2 -z-10"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-dark/60 border border-white/10 rounded-lg p-5 relative">
                  <div className="absolute top-0 left-1/2 w-6 h-6 rounded-full bg-blue-500/30 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                  <h4 className="text-lg font-medium text-white mb-3 mt-2 text-center">Analysis Phase</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 text-lg leading-none">•</span>
                      <span>Requirement identification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 text-lg leading-none">•</span>
                      <span>Available agent assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 text-lg leading-none">•</span>
                      <span>Historical performance evaluation</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-dark/60 border border-white/10 rounded-lg p-5 relative">
                  <div className="absolute top-0 left-1/2 w-6 h-6 rounded-full bg-green-500/30 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <h4 className="text-lg font-medium text-white mb-3 mt-2 text-center">Formation Phase</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 text-lg leading-none">•</span>
                      <span>Skill matching algorithms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 text-lg leading-none">•</span>
                      <span>Agent compatibility assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 text-lg leading-none">•</span>
                      <span>Resource allocation planning</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-dark/60 border border-white/10 rounded-lg p-5 relative">
                  <div className="absolute top-0 left-1/2 w-6 h-6 rounded-full bg-purple/30 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-purple"></div>
                  </div>
                  <h4 className="text-lg font-medium text-white mb-3 mt-2 text-center">Execution Phase</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple text-lg leading-none">•</span>
                      <span>Team deployment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple text-lg leading-none">•</span>
                      <span>Performance monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple text-lg leading-none">•</span>
                      <span>Dynamic reconfiguration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center border border-purple/40">
                <BarChart3 className="w-6 h-6 text-purple" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicAgentSystem;
