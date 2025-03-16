
import React, { useState } from 'react';
import { BarChart2, PieChart, LineChart, GitBranch, LayoutDashboard } from 'lucide-react';
import { useUnifiedStore } from '@/stores/unifiedStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import TaskDistribution from './TaskDistribution';
import AgentPerformance from './AgentPerformance';
import ResourceUtilization from './ResourceUtilization';
import WorkflowVisualization from './WorkflowVisualization';

interface VisualizationPanelProps {
  compact?: boolean;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ compact = false }) => {
  const [activeSection, setActiveSection] = useState('tasks');
  const { currentProject, agents, messages } = useUnifiedStore();

  const renderContent = () => {
    switch (activeSection) {
      case 'tasks':
        return <TaskDistribution />;
      case 'agents':
        return <AgentPerformance />;
      case 'resources':
        return <ResourceUtilization />;
      case 'workflow':
        return <WorkflowVisualization />;
      default:
        return <TaskDistribution />;
    }
  };

  return (
    <div className={`bg-dark rounded-lg ${compact ? '' : 'border border-dark-200'} h-full flex flex-col`}>
      <header className={`${compact ? 'py-2 px-3' : 'p-4'} border-b border-dark-200 flex items-center`}>
        <PieChart className="h-5 w-5 mr-2 text-purple" />
        <h2 className={`${compact ? 'text-base' : 'text-lg'} font-medium`}>Visualization</h2>
      </header>

      <div className="flex-1 p-4 overflow-auto">
        {!compact ? (
          <div className="h-full flex flex-col">
            <div className="mb-4 grid grid-cols-4 gap-2">
              <button
                onClick={() => setActiveSection('tasks')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-sm ${
                  activeSection === 'tasks' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground'
                }`}
              >
                <BarChart2 className="h-4 w-4" />
                <span>Tasks</span>
              </button>
              <button
                onClick={() => setActiveSection('agents')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-sm ${
                  activeSection === 'agents' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground'
                }`}
              >
                <LineChart className="h-4 w-4" />
                <span>Agents</span>
              </button>
              <button
                onClick={() => setActiveSection('resources')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-sm ${
                  activeSection === 'resources' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground'
                }`}
              >
                <PieChart className="h-4 w-4" />
                <span>Resources</span>
              </button>
              <button
                onClick={() => setActiveSection('workflow')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-sm ${
                  activeSection === 'workflow' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground'
                }`}
              >
                <GitBranch className="h-4 w-4" />
                <span>Workflow</span>
              </button>
            </div>

            <div className="flex-1 m-0">
              {renderContent()}
            </div>
          </div>
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
