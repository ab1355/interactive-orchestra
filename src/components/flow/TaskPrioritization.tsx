
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowUp, ArrowDown, BarChart2, Calendar, Clock, Award } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { getPrioritizedTasks, setPriorityFactors } from '@/integrations/supabase/client';
import { PrioritizedTask, PriorityFactors } from '@/types/flow';

const TaskPrioritization = ({ projectId }: { projectId?: string }) => {
  const [prioritizedTasks, setPrioritizedTasks] = useState<PrioritizedTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [factors, setFactors] = useState<PriorityFactors>({
    deadline: 70,
    impact: 80,
    effort: 40,
    complexity: 50,
    dependencies: 60
  });
  const [activeTab, setActiveTab] = useState("tasks");
  const { toast } = useToast();

  useEffect(() => {
    const fetchPrioritizedTasks = async () => {
      if (!projectId) {
        setPrioritizedTasks([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const tasksData = await getPrioritizedTasks(projectId);
        setPrioritizedTasks(tasksData);
      } catch (error) {
        console.error('Error fetching prioritized tasks:', error);
        toast({
          title: "Error",
          description: "Could not load prioritized tasks. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPrioritizedTasks();
  }, [projectId, toast]);

  const handleFactorChange = (factorName: keyof PriorityFactors, value: number[]) => {
    setFactors(prev => ({
      ...prev,
      [factorName]: value[0]
    }));
  };

  const applyFactors = async () => {
    if (!projectId) {
      toast({
        title: "Error",
        description: "No project selected",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const result = await setPriorityFactors(projectId, factors);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Priority factors updated successfully"
        });
        
        // Refresh prioritized tasks
        const tasksData = await getPrioritizedTasks(projectId);
        setPrioritizedTasks(tasksData);
      }
    } catch (error) {
      console.error('Error updating priority factors:', error);
      toast({
        title: "Error",
        description: "Could not update priority factors. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Task Prioritization
        </CardTitle>
        <CardDescription>Set priority factors to influence task order</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="factors">Factors</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="space-y-4">
            {loading ? (
              <div className="text-center py-8">Loading prioritized tasks...</div>
            ) : prioritizedTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No tasks to prioritize.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/5">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {prioritizedTasks.map((task, index) => (
                      <tr key={task.id} className={index % 2 === 0 ? "bg-dark/50" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{task.title}</div>
                          <div className="text-xs text-gray-400">{task.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No Due Date'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{task.priority_score}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
          <TabsContent value="factors" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deadline" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                  Deadline <Calendar className="inline-block h-4 w-4 ml-1" />
                </Label>
                <Slider
                  id="deadline"
                  defaultValue={[factors.deadline]}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleFactorChange('deadline', value)}
                  className="mt-2"
                />
                <div className="text-sm text-gray-400 mt-1">Influence of task due date on priority.</div>
              </div>
              
              <div>
                <Label htmlFor="impact" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                  Impact <Award className="inline-block h-4 w-4 ml-1" />
                </Label>
                <Slider
                  id="impact"
                  defaultValue={[factors.impact]}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleFactorChange('impact', value)}
                  className="mt-2"
                />
                <div className="text-sm text-gray-400 mt-1">Influence of task impact on project goals.</div>
              </div>
              
              <div>
                <Label htmlFor="effort" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                  Effort <ArrowUp className="inline-block h-4 w-4 ml-1" />
                </Label>
                <Slider
                  id="effort"
                  defaultValue={[factors.effort]}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleFactorChange('effort', value)}
                  className="mt-2"
                />
                <div className="text-sm text-gray-400 mt-1">Influence of task effort on priority.</div>
              </div>
              
              <div>
                <Label htmlFor="complexity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                  Complexity <BarChart2 className="inline-block h-4 w-4 ml-1" />
                </Label>
                <Slider
                  id="complexity"
                  defaultValue={[factors.complexity]}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleFactorChange('complexity', value)}
                  className="mt-2"
                />
                <div className="text-sm text-gray-400 mt-1">Influence of task complexity on priority.</div>
              </div>
              
              <div>
                <Label htmlFor="dependencies" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                  Dependencies <Clock className="inline-block h-4 w-4 ml-1" />
                </Label>
                <Slider
                  id="dependencies"
                  defaultValue={[factors.dependencies]}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleFactorChange('dependencies', value)}
                  className="mt-2"
                />
                <div className="text-sm text-gray-400 mt-1">Influence of task dependencies on priority.</div>
              </div>
            </div>
            <Button onClick={applyFactors} className="mt-4">
              Apply Factors
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TaskPrioritization;
