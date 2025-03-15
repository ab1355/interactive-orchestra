
import React, { useState } from 'react';
import { 
  BarChart3, 
  RefreshCw,
  Activity,
  RotateCcw,
  Router
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AdaptationProcess: React.FC = () => {
  const [dynamicRouting, setDynamicRouting] = useState(true);
  const { toast } = useToast();
  
  const handleToggleRouting = (checked: boolean) => {
    setDynamicRouting(checked);
    toast({
      title: checked ? "Dynamic Task Routing Enabled" : "Dynamic Task Routing Disabled",
      description: checked 
        ? "Tasks will be intelligently routed to agents only when necessary" 
        : "All tasks will be routed to predefined agents",
      variant: "default",
    });
  };

  return (
    <Card className="bg-dark border-white/10 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <RefreshCw className="w-5 h-5 text-green-400" />
          Adaptation Process
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4 bg-dark/50 p-3 rounded-md border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center">
              <Router className="w-5 h-5 text-purple" />
            </div>
            <div>
              <h4 className="text-white font-medium">Dynamic Task Routing</h4>
              <p className="text-xs text-gray-400">Involve agents only when necessary</p>
            </div>
          </div>
          <Switch 
            checked={dynamicRouting} 
            onCheckedChange={handleToggleRouting}
            className="data-[state=checked]:bg-green-500"
          />
        </div>

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
          <div className="pl-8 text-blue-400">- Dynamic_Task_Routing</div>
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
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-purple" />
            </div>
            <div>
              <h4 className="text-white font-medium">Task Routing Phase</h4>
              <p className="text-sm text-gray-400">{dynamicRouting 
                ? "Intelligent routing based on task complexity and agent availability" 
                : "Standard routing to predefined agent teams"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptationProcess;
