
import React from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  Activity,
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

const PerformanceMonitoring: React.FC = () => {
  return (
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
                <AlertTriangle className="w-4 h-4 text-teal-400" />
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
  );
};

export default PerformanceMonitoring;
