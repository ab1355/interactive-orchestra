
import React from 'react';
import { Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const AgentDashboard: React.FC = () => {
  return (
    <Card className="bg-dark border-purple/20 shadow-lg shadow-purple/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Crown className="w-5 h-5 text-purple" />
          Manager Agent Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md bg-dark-card border border-white/10 p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-white">AI Agent Workflow</div>
              <div className="text-xs text-purple">4 active agents</div>
            </div>
            <div className="space-y-2">
              {['Data processing', 'Customer service', 'Content creation', 'Code generation'].map((task, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-white/5 last:border-0">
                  <span className="text-xs text-gray-300">{task}</span>
                  <div className="h-1.5 w-24 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple" 
                      style={{ width: `${[75, 45, 90, 60][i]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-md bg-dark-card border border-white/10 p-3">
            <div className="text-sm font-medium text-white mb-2">Resource Allocation</div>
            <div className="grid grid-cols-2 gap-2">
              {['CPU', 'Memory', 'API Calls', 'Storage'].map((resource, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs text-gray-400">{resource}</span>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple/70 to-purple" 
                        style={{ width: `${[65, 45, 80, 30][i]}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">{[65, 45, 80, 30][i]}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentDashboard;
