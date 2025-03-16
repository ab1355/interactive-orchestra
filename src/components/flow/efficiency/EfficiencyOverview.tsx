
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, PieChart, List, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { EfficiencyMetrics, TaskCompletionRate } from '@/types/flow';

interface EfficiencyOverviewProps {
  efficiency: EfficiencyMetrics | null;
  completionRate: TaskCompletionRate | null;
}

const EfficiencyOverview: React.FC<EfficiencyOverviewProps> = ({ efficiency, completionRate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center p-4 rounded-md border border-white/10 bg-dark/50">
        <TrendingUp className="h-6 w-6 text-green-500 mr-4" />
        <div>
          <h3 className="text-lg font-medium">Completion Rate</h3>
          <p className="text-sm text-gray-400">
            {completionRate?.rate}%
            <span className="ml-2">
              {completionRate?.rate && completionRate?.rate > 50 ? (
                <ArrowUpCircle className="inline-block h-4 w-4 text-green-500 align-middle" />
              ) : (
                <ArrowDownCircle className="inline-block h-4 w-4 text-red-500 align-middle" />
              )}
            </span>
          </p>
          <Progress value={completionRate?.rate || 0} className="mt-2" />
        </div>
      </div>
      
      <div className="flex items-center p-4 rounded-md border border-white/10 bg-dark/50">
        <Clock className="h-6 w-6 text-blue-500 mr-4" />
        <div>
          <h3 className="text-lg font-medium">Avg Task Duration</h3>
          <p className="text-sm text-gray-400">{efficiency?.avgTaskDuration} days</p>
          <Progress value={efficiency?.avgTaskDuration ? 100 - (efficiency?.avgTaskDuration * 10) : 0} className="mt-2" />
        </div>
      </div>
      
      <div className="flex items-center p-4 rounded-md border border-white/10 bg-dark/50">
        <PieChart className="h-6 w-6 text-amber-500 mr-4" />
        <div>
          <h3 className="text-lg font-medium">Resource Utilization</h3>
          <p className="text-sm text-gray-400">{efficiency?.resourceUtilization}%</p>
          <Progress value={efficiency?.resourceUtilization || 0} className="mt-2" />
        </div>
      </div>
      
      <div className="flex items-center p-4 rounded-md border border-white/10 bg-dark/50">
        <List className="h-6 w-6 text-purple mr-4" />
        <div>
          <h3 className="text-lg font-medium">Total Tasks</h3>
          <p className="text-sm text-gray-400">{completionRate?.total} tasks</p>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyOverview;
