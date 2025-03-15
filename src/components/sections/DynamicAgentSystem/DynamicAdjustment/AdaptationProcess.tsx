
import React from 'react';
import { 
  BarChart3, 
  RefreshCw,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdaptationProcess: React.FC = () => {
  return (
    <Card className="bg-dark border-white/10 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <RefreshCw className="w-5 h-5 text-green-400" />
          Adaptation Process
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-code-background p-4 rounded-md border border-white/10 font-mono text-sm text-gray-300 mb-6">
          <div className="text-purple">Adaptation_Process:</div>
          <div className="pl-4 text-white">Monitoring:</div>
          <div className="pl-8 text-gray-300">- Performance_Metrics</div>
          <div className="pl-8 text-gray-300">- Resource_Usage</div>
          <div className="pl-8 text-gray-300">- Goal_Alignment</div>
          <div className="pl-4 text-white">Analysis:</div>
          <div className="pl-8 text-gray-300">- Impact_Assessment</div>
          <div className="pl-8 text-gray-300">- Resource_Requirements</div>
          <div className="pl-8 text-gray-300">- Team_Dynamics</div>
          <div className="pl-4 text-white">Implementation:</div>
          <div className="pl-8 text-gray-300">- Team_Adjustments</div>
          <div className="pl-8 text-gray-300">- Resource_Reallocation</div>
          <div className="pl-8 text-gray-300">- Process_Optimization</div>
        </div>
        
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Monitoring Phase</h4>
              <p className="text-sm text-gray-400">Continuous tracking of key performance indicators and resource usage</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Analysis Phase</h4>
              <p className="text-sm text-gray-400">Evaluating performance data to identify needed adjustments</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Implementation Phase</h4>
              <p className="text-sm text-gray-400">Executing team composition changes and resource reallocation</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptationProcess;
