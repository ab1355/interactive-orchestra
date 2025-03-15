
import React from 'react';
import { Vote, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const DecisionMaking: React.FC = () => {
  return (
    <Card className="bg-dark border-purple/20 shadow-lg shadow-purple/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white text-xl">
          <Vote className="w-5 h-5 text-purple" />
          Decision Making
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-medium mb-2">Autonomous Decisions</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <Info className="w-3 h-3" />
                </span>
                Predefined Parameters
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <Info className="w-3 h-3" />
                </span>
                Risk Assessment
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <Info className="w-3 h-3" />
                </span>
                Impact Analysis
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-2">Collaborative Decisions</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <Info className="w-3 h-3" />
                </span>
                Multi-agent Consensus
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <Info className="w-3 h-3" />
                </span>
                Human Oversight
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <Info className="w-3 h-3" />
                </span>
                Approval Workflows
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DecisionMaking;
