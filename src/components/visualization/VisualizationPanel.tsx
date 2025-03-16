
import React, { useState } from 'react';
import { BarChart2, PieChart, LineChart, GitBranch, LayoutDashboard } from 'lucide-react';
import { useUnifiedStore } from '@/stores/unifiedStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import TaskDistribution from './TaskDistribution';
import AgentPerformance from './AgentPerformance';
import ResourceUtilization from './ResourceUtilization';
import WorkflowVisualization from './WorkflowVisualization';

interface VisualizationPanelProps {
  compact?: boolean;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ compact = false }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  const { currentProject, agents, messages } = useUnifiedStore();

  return (
    <div className={`bg-dark rounded-lg ${compact ? '' : 'border border-dark-200'} h-full flex flex-col`}>
      <header className={`${compact ? 'py-2 px-3' : 'p-4'} border-b border-dark-200 flex items-center`}>
        <PieChart className="h-5 w-5 mr-2 text-purple" />
        <h2 className={`${compact ? 'text-base' : 'text-lg'} font-medium`}>Visualization</h2>
      </header>

      <div className="flex-1 p-4 overflow-auto">
        {!compact ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="mb-4 grid grid-cols-4 gap-2">
              <TabsTrigger value="tasks" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                <span>Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                <span>Agents</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                <span>Resources</span>
              </TabsTrigger>
              <TabsTrigger value="workflow" className="flex items-center gap-1">
                <GitBranch className="h-4 w-4" />
                <span>Workflow</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="flex-1 m-0">
              <TaskDistribution />
            </TabsContent>
            
            <TabsContent value="agents" className="flex-1 m-0">
              <AgentPerformance />
            </TabsContent>
            
            <TabsContent value="resources" className="flex-1 m-0">
              <ResourceUtilization />
            </TabsContent>
            
            <TabsContent value="workflow" className="flex-1 m-0">
              <WorkflowVisualization />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="h-full flex flex-col">
            <div className="text-center text-sm mb-3 text-gray-400">Task Progress Overview</div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Research</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" indicatorClassName="bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Analysis</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" indicatorClassName="bg-purple" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Development</span>
                  <span>20%</span>
                </div>
                <Progress value={20} className="h-2" indicatorClassName="bg-green-500" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizationPanel;
