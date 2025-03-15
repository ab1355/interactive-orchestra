import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { List, BarChart2, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getPrioritizedTasks, setPriorityFactors } from '@/integrations/supabase/client';
import { Task, PrioritizedTask, PriorityFactors } from '@/types/flow';

const TaskPrioritization = ({ projectId }: { projectId?: string }) => {
  const [tasks, setTasks] = useState<PrioritizedTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('priority_score');
  const [factorsDialogOpen, setFactorsDialogOpen] = useState(false);
  const [priorityFactors, setPriorityFactors] = useState<PriorityFactors>({
    deadline: 25,
    impact: 30,
    effort: 15,
    complexity: 15,
    dependencies: 15
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) {
        setTasks([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const tasksData = await getPrioritizedTasks(projectId);
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching prioritized tasks:', error);
        toast({
          title: "Error fetching tasks",
          description: "Could not load prioritized tasks from the database.",
          variant: "destructive"
        });
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, toast]);

  const handleSaveFactors = async () => {
    try {
      if (!projectId) {
        toast({
          title: "Error",
          description: "No project selected",
          variant: "destructive"
        });
        return;
      }
      
      await setPriorityFactors(projectId, priorityFactors);
      
      toast({
        title: "Priority factors updated",
        description: "Task prioritization factors have been saved successfully."
      });
      
      setFactorsDialogOpen(false);
      
      // Refresh tasks with new prioritization
      const tasksData = await getPrioritizedTasks(projectId);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error saving priority factors:', error);
      toast({
        title: "Error saving factors",
        description: "Could not save priority factors. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleFactorChange = (factor: keyof PriorityFactors, value: number) => {
    setPriorityFactors({
      ...priorityFactors,
      [factor]: value
    });
  };

  const sumFactors = Object.values(priorityFactors).reduce((sum, value) => sum + value, 0);
  const isFactorsValid = sumFactors === 100;

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'priority_score') {
      return b.priority_score - a.priority_score;
    } else if (sortBy === 'deadline') {
      return a.deadline_factor - b.deadline_factor;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <List className="w-5 h-5 text-purple" />
              Task Prioritization
            </CardTitle>
            <CardDescription>Rank tasks based on customizable factors</CardDescription>
          </div>
          <Button variant="outline" size="icon">
            <BarChart2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority_score">Priority Score</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Dialog open={factorsDialogOpen} onOpenChange={setFactorsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Set Factors
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Priority Factors</DialogTitle>
                <DialogDescription>
                  Customize the factors that influence task prioritization.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline ({priorityFactors.deadline}%)</Label>
                  <Slider
                    id="deadline"
                    defaultValue={[priorityFactors.deadline]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleFactorChange('deadline', value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="impact">Impact ({priorityFactors.impact}%)</Label>
                  <Slider
                    id="impact"
                    defaultValue={[priorityFactors.impact]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleFactorChange('impact', value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="effort">Effort ({priorityFactors.effort}%)</Label>
                  <Slider
                    id="effort"
                    defaultValue={[priorityFactors.effort]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleFactorChange('effort', value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complexity">Complexity ({priorityFactors.complexity}%)</Label>
                  <Slider
                    id="complexity"
                    defaultValue={[priorityFactors.complexity]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleFactorChange('complexity', value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dependencies">Dependencies ({priorityFactors.dependencies}%)</Label>
                  <Slider
                    id="dependencies"
                    defaultValue={[priorityFactors.dependencies]}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleFactorChange('dependencies', value[0])}
                  />
                </div>
              </div>
              
              {!isFactorsValid && (
                <div className="text-red-500 text-sm">
                  Total factors must equal 100% (Currently: {sumFactors}%)
                </div>
              )}
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setFactorsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSaveFactors} disabled={!isFactorsValid}>
                  Save Factors
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading tasks...</div>
        ) : !projectId ? (
          <div className="text-center py-8 text-gray-400">
            Please select a project to view prioritized tasks.
          </div>
        ) : sortedTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No tasks found.
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTasks.map((task) => (
              <div key={task.id} className="p-4 rounded-md border border-white/10 bg-dark/50 hover:bg-dark/80 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-medium">{task.title}</h3>
                  <Badge variant="secondary">
                    Priority Score: {task.priority_score}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Deadline:</span>
                      <span>{task.deadline_factor}%</span>
                    </div>
                    <Progress value={task.deadline_factor} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Impact:</span>
                      <span>{task.impact_factor}%</span>
                    </div>
                    <Progress value={task.impact_factor} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Effort:</span>
                      <span>{task.effort_factor}%</span>
                    </div>
                    <Progress value={task.effort_factor} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Complexity:</span>
                      <span>{task.complexity_factor}%</span>
                    </div>
                    <Progress value={task.complexity_factor} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Dependencies:</span>
                      <span>{task.dependencies_factor}%</span>
                    </div>
                    <Progress value={task.dependencies_factor} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskPrioritization;
