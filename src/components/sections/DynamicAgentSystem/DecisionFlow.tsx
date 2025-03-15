
import React from 'react';
import { GitBranch, ArrowRightLeft, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DecisionFlow: React.FC = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Decision Flow Hierarchy</h3>
      
      <Card className="bg-dark border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <GitBranch className="w-5 h-5 text-blue-400" />
            Multi-Level Decision Making Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Executive Level */}
            <div className="p-4 bg-dark/60 border border-white/10 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-blue-400" />
                Executive Level
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full p-1">
                    <GitBranch className="w-3 h-3" />
                  </span>
                  Strategic Decisions
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full p-1">
                    <GitBranch className="w-3 h-3" />
                  </span>
                  Pod Formation Approval
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-blue-500/20 text-blue-400 rounded-full p-1">
                    <GitBranch className="w-3 h-3" />
                  </span>
                  Resource Authorization
                </li>
              </ul>
            </div>
            
            {/* Pod Level */}
            <div className="p-4 bg-dark/60 border border-white/10 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-green-400" />
                Pod Level
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-green-500/20 text-green-400 rounded-full p-1">
                    <GitBranch className="w-3 h-3" />
                  </span>
                  Tactical Decisions
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-green-500/20 text-green-400 rounded-full p-1">
                    <GitBranch className="w-3 h-3" />
                  </span>
                  Resource Management
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-green-500/20 text-green-400 rounded-full p-1">
                    <GitBranch className="w-3 h-3" />
                  </span>
                  Performance Optimization
                </li>
              </ul>
            </div>
            
            {/* Team Level */}
            <div className="p-4 bg-dark/60 border border-white/10 rounded-lg">
              <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-purple" />
                Team Level
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-purple/20 text-purple rounded-full p-1">
                    <GitBranch className="w-3 h-3" />
                  </span>
                  Operational Decisions
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-purple/20 text-purple rounded-full p-1">
                    <GitBranch className="w-3 h-3" />
                  </span>
                  Task Execution
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="bg-purple/20 text-purple rounded-full p-1">
                    <GitBranch className="w-3 h-3" />
                  </span>
                  Real-time Adjustments
                </li>
              </ul>
            </div>
          </div>
          
          {/* Decision Flow Process */}
          <div className="mt-8 p-4 bg-dark/40 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-white mb-3">Decision Flow Process</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-white font-medium text-sm mb-2">Top-Down Directives</h5>
                <p className="text-sm text-gray-400">Strategic decisions cascade from executive to operational levels</p>
              </div>
              <div>
                <h5 className="text-white font-medium text-sm mb-2">Bottom-Up Feedback</h5>
                <p className="text-sm text-gray-400">Operational insights inform tactical and strategic decision-making</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DecisionFlow;
