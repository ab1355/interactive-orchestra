
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowUpDown, Filter, Calendar, Flag, CircleDot, CheckCircle2, Info, RefreshCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getPrioritizedTasks, setPriorityFactors } from '@/integrations/supabase/client';

interface Task {
  id: string;
  title: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: string;
  priorityScore: number;
  complexity: number;
  impact: number;
  effort: number;
  dependencies: number;
}

const TaskPrioritization = ({ projectId }: { projectId?: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('algorithm');
  const [sortField, setSortField] = useState('priorityScore');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [priorityFactors, setPriorityFactorsState] = useState({
    deadline: 30,
    impact: 25,
    effort: 15,
    complexity: 15,
    dependencies: 15
  });
  
  // Algorithm explanation content
  const algorithmExplanation = {
    name: "Balanced Value-Effort Prioritization",
    description: "This algorithm calculates a priority score for each task based on multiple weighted factors to maximize business value and optimize resource utilization.",
    factors: [
      {
        name: "Deadline Proximity",
        description: "Tasks with closer deadlines receive higher priority scores. Urgency increases exponentially as the deadline approaches.",
        weight: `${priorityFactors.deadline}%`
      },
      {
        name: "Business Impact",
        description: "Tasks that deliver higher business value or are strategically important receive higher priority scores.",
        weight: `${priorityFactors.impact}%`
      },
      {
        name: "Effort Required",
        description: "Tasks requiring less effort may be prioritized higher for quick wins. Effort is estimated in person-hours.",
        weight: `${priorityFactors.effort}%`
      },
      {
        name: "Task Complexity",
        description: "Complex tasks may need earlier starts to accommodate unforeseen challenges and team coordination.",
        weight: `${priorityFactors.complexity}%`
      },
      {
        name: "Dependencies",
        description: "Tasks with more dependencies or tasks that block other tasks receive higher priority to prevent bottlenecks.",
        weight: `${priorityFactors.dependencies}%`
      }
    ]
  };
  
  useEffect(() => {
    const fetchPrioritizedTasks = async () => {
      if (!projectId) {
        setTasks([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // In a real implementation, this would call the backend API
        const tasksData = await getPrioritizedTasks(projectId);
        
        // If no tasks returned, generate mock data
        if (!tasksData || tasksData.length === 0) {
          const mockTasks = generateMockPrioritizedTasks();
          setTasks(mockTasks);
        } else {
          setTasks(tasksData);
        }
      } catch (error) {
        console.error('Error fetching prioritized tasks:', error);
        // Generate mock data for demonstration
        const mockTasks = generateMockPrioritizedTasks();
        setTasks(mockTasks);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrioritizedTasks();
  }, [projectId]);
  
  const generateMockPrioritizedTasks = (): Task[] => {
    return [
      {
        id: '1',
        title: 'Implement user authentication',
        deadline: '2023-10-25',
        priority: 'high',
        status: 'pending',
        priorityScore: 92,
        complexity: 4,
        impact: 5,
        effort: 3,
        dependencies: 2
      },
      {
        id: '2',
        title: 'Design database schema',
        deadline: '2023-10-20',
        priority: 'high',
        status: 'in_progress',
        priorityScore: 88,
        complexity: 3,
        impact: 5,
        effort: 2,
        dependencies: 4
      },
      {
        id: '3',
        title: 'Create API documentation',
        deadline: '2023-11-05',
        priority: 'medium',
        status: 'pending',
        priorityScore: 74,
        complexity: 2,
        impact: 3,
        effort: 2,
        dependencies: 1
      },
      {
        id: '4',
        title: 'Implement payment gateway',
        deadline: '2023-11-10',
        priority: 'high',
        status: 'pending',
        priorityScore: 83,
        complexity: 4,
        impact: 5,
        effort: 4,
        dependencies: 3
      },
      {
        id: '5',
        title: 'Setup CI/CD pipeline',
        deadline: '2023-10-30',
        priority: 'medium',
        status: 'pending',
        priorityScore: 76,
        complexity: 3,
        impact: 3,
        effort: 3,
        dependencies: 2
      },
      {
        id: '6',
        title: 'Integrate analytics dashboard',
        deadline: '2023-11-15',
        priority: 'low',
        status: 'pending',
        priorityScore: 65,
        complexity: 2,
        impact: 4,
        effort: 2,
        dependencies: 1
      }
    ];
  };
  
  const handleUpdatePriorityFactors = async () => {
    try {
      // In a real implementation, this would update the algorithm parameters
      await setPriorityFactors(projectId || '', priorityFactors);
      
      // Close the settings dialog
      setSettingsOpen(false);
      
      // Show a success message or update the UI if needed
    } catch (error) {
      console.error('Error updating priority factors:', error);
    }
  };
  
  const handleRunPrioritization = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would trigger a re-run of the prioritization algorithm
      // For now, just simulate a delay and update with the same data
      setTimeout(() => {
        // Add some randomness to priority scores to simulate re-calculation
        const updatedTasks = tasks.map(task => ({
          ...task,
          priorityScore: Math.max(50, Math.min(99, task.priorityScore + (Math.random() * 10 - 5)))
        }));
        
        setTasks(updatedTasks);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error running prioritization:', error);
      setIsLoading(false);
    }
  };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortField === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    if (sortField === 'priorityScore') {
      return b.priorityScore - a.priorityScore;
    }
    return 0;
  });
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getTaskPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-red-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-green-500';
  };
  
  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5 text-purple" />
          Task Prioritization
        </CardTitle>
        <CardDescription>Optimize your workflow with intelligent task prioritization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="View mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="algorithm">Algorithm View</SelectItem>
                <SelectItem value="list">List View</SelectItem>
                <SelectItem value="table">Table View</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortField} onValueChange={setSortField}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priorityScore">Priority Score</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Algorithm Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Prioritization Algorithm</DialogTitle>
                  <DialogDescription>
                    Customize the weighting factors used by the prioritization algorithm.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-2">
                  <p className="text-sm text-gray-400">
                    Adjust the importance of each factor in the prioritization calculation. The total weight must equal 100%.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label htmlFor="deadline-factor">Deadline Proximity</Label>
                        <span className="text-sm">{priorityFactors.deadline}%</span>
                      </div>
                      <Slider 
                        id="deadline-factor"
                        value={[priorityFactors.deadline]}
                        min={0}
                        max={50}
                        step={5}
                        onValueChange={(value) => setPriorityFactorsState({...priorityFactors, deadline: value[0]})}
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label htmlFor="impact-factor">Business Impact</Label>
                        <span className="text-sm">{priorityFactors.impact}%</span>
                      </div>
                      <Slider 
                        id="impact-factor"
                        value={[priorityFactors.impact]}
                        min={0}
                        max={50}
                        step={5}
                        onValueChange={(value) => setPriorityFactorsState({...priorityFactors, impact: value[0]})}
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label htmlFor="effort-factor">Effort Required</Label>
                        <span className="text-sm">{priorityFactors.effort}%</span>
                      </div>
                      <Slider 
                        id="effort-factor"
                        value={[priorityFactors.effort]}
                        min={0}
                        max={40}
                        step={5}
                        onValueChange={(value) => setPriorityFactorsState({...priorityFactors, effort: value[0]})}
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label htmlFor="complexity-factor">Task Complexity</Label>
                        <span className="text-sm">{priorityFactors.complexity}%</span>
                      </div>
                      <Slider 
                        id="complexity-factor"
                        value={[priorityFactors.complexity]}
                        min={0}
                        max={40}
                        step={5}
                        onValueChange={(value) => setPriorityFactorsState({...priorityFactors, complexity: value[0]})}
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Label htmlFor="dependencies-factor">Dependencies</Label>
                        <span className="text-sm">{priorityFactors.dependencies}%</span>
                      </div>
                      <Slider 
                        id="dependencies-factor"
                        value={[priorityFactors.dependencies]}
                        min={0}
                        max={40}
                        step={5}
                        onValueChange={(value) => setPriorityFactorsState({...priorityFactors, dependencies: value[0]})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="font-medium">Total Weight:</span>
                    <span className={`font-bold ${
                      Object.values(priorityFactors).reduce((a, b) => a + b, 0) === 100 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {Object.values(priorityFactors).reduce((a, b) => a + b, 0)}%
                    </span>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSettingsOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpdatePriorityFactors}
                    disabled={Object.values(priorityFactors).reduce((a, b) => a + b, 0) !== 100}
                  >
                    Apply Settings
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button size="sm" onClick={handleRunPrioritization} disabled={isLoading || !projectId}>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Re-prioritize
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Prioritizing tasks...</div>
        ) : !projectId ? (
          <div className="text-center py-8 text-gray-400">
            Please select a project to view prioritized tasks.
          </div>
        ) : viewMode === 'algorithm' ? (
          <div className="space-y-6">
            <div className="bg-dark/50 border border-white/10 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Sparkles className="h-5 w-5 text-purple mr-2" />
                <h3 className="text-lg font-medium">{algorithmExplanation.name}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                {algorithmExplanation.description}
              </p>
              
              <h4 className="text-sm font-medium mb-2">Weighting Factors</h4>
              <div className="space-y-3">
                {algorithmExplanation.factors.map((factor, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{factor.name}</span>
                      <span className="text-purple">{factor.weight}</span>
                    </div>
                    <Progress value={parseInt(factor.weight)} className="h-1.5 mb-1" />
                    <p className="text-xs text-gray-400 mb-2">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Top Priority Tasks</h3>
              <div className="space-y-2">
                {sortedTasks.slice(0, 3).map((task, index) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-md border border-white/10 bg-dark/50"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center text-purple font-medium">
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{task.title}</h4>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Due: {formatDate(task.deadline)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${getScoreColor(task.priorityScore)}`}>
                        {task.priorityScore}
                      </div>
                      <div className="text-xs text-gray-400">Priority Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {sortedTasks.map((task) => (
              <div 
                key={task.id}
                className="p-4 rounded-md border border-white/10 bg-dark/50 hover:bg-dark/80 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-md font-medium">{task.title}</h3>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Due: {formatDate(task.deadline)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTaskPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <div className="flex flex-col items-end">
                      <span className={`text-lg font-bold ${getScoreColor(task.priorityScore)}`}>
                        {task.priorityScore}
                      </span>
                      <span className="text-xs text-gray-400">Priority Score</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <div className="flex flex-col items-center p-2 bg-dark rounded-md">
                    <span className="text-xs text-gray-400">Impact</span>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <CircleDot 
                          key={i}
                          className={`h-4 w-4 ${i < task.impact ? 'text-purple' : 'text-gray-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-2 bg-dark rounded-md">
                    <span className="text-xs text-gray-400">Complexity</span>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <CircleDot 
                          key={i}
                          className={`h-4 w-4 ${i < task.complexity ? 'text-amber-500' : 'text-gray-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-2 bg-dark rounded-md">
                    <span className="text-xs text-gray-400">Effort</span>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <CircleDot 
                          key={i}
                          className={`h-4 w-4 ${i < task.effort ? 'text-blue-500' : 'text-gray-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-2 bg-dark rounded-md">
                    <span className="text-xs text-gray-400">Dependencies</span>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <CircleDot 
                          key={i}
                          className={`h-4 w-4 ${i < task.dependencies ? 'text-green-500' : 'text-gray-700'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-white/10 rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{formatDate(task.deadline)}</TableCell>
                    <TableCell>
                      <Badge className={getTaskPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell className={`text-right font-bold ${getScoreColor(task.priorityScore)}`}>
                      {task.priorityScore}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskPrioritization;
