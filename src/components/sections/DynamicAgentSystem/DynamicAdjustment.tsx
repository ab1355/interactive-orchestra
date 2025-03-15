
import React from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  RefreshCw,
  Activity,
  Users,
  Goal,
  MessagesSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Custom Goal icon
const GoalIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const DynamicAdjustment: React.FC = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Dynamic Adjustment Mechanisms</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Monitoring Card */}
        <Card className="bg-dark border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Performance Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Metrics */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-white">Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 rounded-full p-2 mt-0.5">
                    <Activity className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Team Efficiency</p>
                    <p className="text-sm text-gray-300">Speed and quality of task execution</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500/20 rounded-full p-2 mt-0.5">
                    <BarChart3 className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Resource Utilization</p>
                    <p className="text-sm text-gray-300">Optimal use of allocated resources</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-500/20 rounded-full p-2 mt-0.5">
                    <GoalIcon className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Goal Achievement</p>
                    <p className="text-sm text-gray-300">Progress toward mission objectives</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple/20 rounded-full p-2 mt-0.5">
                    <MessagesSquare className="w-4 h-4 text-purple" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Collaboration Quality</p>
                    <p className="text-sm text-gray-300">Effectiveness of agent interaction</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Adjustment Triggers */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-white">Adjustment Triggers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3">
                  <div className="bg-red-500/20 rounded-full p-2 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Performance Thresholds</p>
                    <p className="text-sm text-gray-300">Deviation from expected metrics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-500/20 rounded-full p-2 mt-0.5">
                    <BarChart3 className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Resource Constraints</p>
                    <p className="text-sm text-gray-300">Limitations in available resources</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-500/20 rounded-full p-2 mt-0.5">
                    <GoalIcon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Goal Changes</p>
                    <p className="text-sm text-gray-300">Shifts in mission objectives</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-teal-500/20 rounded-full p-2 mt-0.5">
                    <RefreshCw className="w-4 h-4 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Environmental Changes</p>
                    <p className="text-sm text-gray-300">External factors requiring adaptation</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Adaptation Process Card */}
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
      </div>
    </div>
  );
};

export default DynamicAdjustment;
