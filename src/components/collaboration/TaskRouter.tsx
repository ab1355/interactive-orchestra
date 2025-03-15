import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Router, Check, AlertCircle, ArrowUp, ArrowDown, Square, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAgentCommunication } from '@/hooks/useAgentCommunication';
import { CommunicationChannel } from '@/types/communication';

interface RoutedTask {
  id: string;
  name: string;
  complexity: 'low' | 'medium' | 'high';
  priority: number;
  status: 'routed' | 'pending' | 'failed' | 'stopped';
  agentId?: string;
  description?: string;
}

const TaskRouter: React.FC = () => {
  const [routedTasks, setRoutedTasks] = useState<RoutedTask[]>([
    { id: 'task-1', name: 'Market data analysis', complexity: 'high', priority: 8, status: 'routed', agentId: 'analysis-agent' },
    { id: 'task-2', name: 'Customer survey', complexity: 'medium', priority: 5, status: 'pending' },
    { id: 'task-3', name: 'Trend visualization', complexity: 'medium', priority: 6, status: 'routed', agentId: 'data-agent' },
    { id: 'task-4', name: 'Competitor research', complexity: 'high', priority: 9, status: 'routed', agentId: 'research-agent' },
  ]);
  
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<RoutedTask | null>(null);
  const [newTask, setNewTask] = useState<Partial<RoutedTask>>({
    name: '',
    description: '',
    complexity: 'medium',
    priority: 5
  });
  const [selectedAgent, setSelectedAgent] = useState('');
  
  const { toast } = useToast();
  
  const { sendMessage, messages, isConnected } = useAgentCommunication({
    agentId: 'task-router',
    agentRole: 'manager',
    channels: ['direct', 'broadcast', 'priority']
  });

  const availableAgents = [
    { id: 'research-agent', name: 'Research Agent' },
    { id: 'analysis-agent', name: 'Analysis Agent' },
    { id: 'data-agent', name: 'Data Agent' },
    { id: 'writer-agent', name: 'Writer Agent' },
    { id: 'specialist-agent', name: 'Specialist Agent' }
  ];

  const routeNewTask = () => {
    const taskTypes = ['Research', 'Analysis', 'Report Generation', 'Data Cleaning', 'Visualization'];
    const complexity: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
    
    const complexityValue = complexity[Math.floor(Math.random() * complexity.length)];
    let priorityBase = complexityValue === 'high' ? 7 : complexityValue === 'medium' ? 4 : 1;
    const priorityVariance = Math.floor(Math.random() * 3);
    const priority = Math.min(10, priorityBase + priorityVariance);
    
    const newTask: RoutedTask = {
      id: `task-${Math.floor(Math.random() * 1000)}`,
      name: `${taskTypes[Math.floor(Math.random() * taskTypes.length)]} task`,
      complexity: complexityValue,
      priority: priority,
      status: 'pending'
    };
    
    setRoutedTasks(prev => [newTask, ...prev]);
    
    setTimeout(() => {
      const routingDelay = 11 - newTask.priority;
      const agentTypes = newTask.priority >= 9 
        ? ['specialist-agent', 'expert-agent'] 
        : ['research-agent', 'analysis-agent', 'writer-agent', 'data-agent'];
      
      const randomAgent = agentTypes[Math.floor(Math.random() * agentTypes.length)];
      
      setRoutedTasks(prev => 
        prev.map(task => 
          task.id === newTask.id ? { ...task, status: 'routed', agentId: randomAgent } : task
        )
      );
      
      sendMessage(`New task assigned: ${newTask.name}`, {
        recipientId: randomAgent,
        priority: newTask.priority,
        channel: newTask.priority >= 8 ? 'priority' : 'direct'
      });
      
      toast({
        title: "Task Routed",
        description: `Task "${newTask.name}" (Priority ${newTask.priority}) has been routed to ${randomAgent}`,
      });
    }, 1500);
  };

  const handleAddTask = () => {
    if (!newTask.name) {
      toast({
        title: "Missing Information",
        description: "Please provide a name for the task",
        variant: "destructive",
      });
      return;
    }

    const taskId = `task-${Date.now()}`;
    const createdTask: RoutedTask = {
      id: taskId,
      name: newTask.name,
      description: newTask.description,
      complexity: newTask.complexity as 'low' | 'medium' | 'high' || 'medium',
      priority: newTask.priority || 5,
      status: 'pending'
    };

    setRoutedTasks(prev => [createdTask, ...prev]);
    setNewTask({
      name: '',
      description: '',
      complexity: 'medium',
      priority: 5
    });
    setShowAddTask(false);

    toast({
      title: "Task Added",
      description: `Task "${createdTask.name}" has been added with priority ${createdTask.priority}`,
      variant: "default",
    });

    setTimeout(() => {
      simulateProposals(taskId);
    }, 2000);
  };

  const handleAssignTask = () => {
    if (!currentTask || !selectedAgent) {
      toast({
        title: "Missing Information",
        description: "Please select both a task and an agent",
        variant: "destructive",
      });
      return;
    }

    setRoutedTasks(prev => 
      prev.map(task => 
        task.id === currentTask.id ? { ...task, status: 'routed', agentId: selectedAgent } : task
      )
    );

    sendMessage(`Task "${currentTask.name}" manually assigned to you`, {
      recipientId: selectedAgent,
      priority: currentTask.priority,
      channel: 'direct'
    });

    toast({
      title: "Task Assigned",
      description: `Task "${currentTask.name}" has been assigned to ${selectedAgent}`,
      variant: "default",
    });

    setShowAssignTask(false);
    setCurrentTask(null);
    setSelectedAgent('');

    setTimeout(() => {
      simulateProposalFromAgent(currentTask.id, selectedAgent);
    }, 1500);
  };

  const simulateProposals = (taskId: string) => {
    const numProposals = 1 + Math.floor(Math.random() * 3);
    const possibleAgents = [...availableAgents];
    
    for (let i = 0; i < numProposals; i++) {
      if (possibleAgents.length === 0) break;
      
      const agentIndex = Math.floor(Math.random() * possibleAgents.length);
      const agent = possibleAgents.splice(agentIndex, 1)[0];
      
      setTimeout(() => {
        simulateProposalFromAgent(taskId, agent.id);
      }, 800 * (i + 1));
    }
  };

  const simulateProposalFromAgent = (taskId: string, agentId: string) => {
    const task = routedTasks.find(t => t.id === taskId);
    if (!task) return;

    const agent = availableAgents.find(a => a.id === agentId);
    if (!agent) return;

    toast({
      title: "New Proposal",
      description: `${agent.name} has submitted a proposal for task "${task.name}"`,
      variant: "default",
    });

    sendMessage(`I've submitted a proposal for task "${task.name}" with ${70 + Math.floor(Math.random() * 30)}% confidence`, {
      senderId: agentId,
      senderRole: agent.name,
      channel: 'broadcast',
      priority: 5
    });
  };

  const stopTask = (taskId: string) => {
    const task = routedTasks.find(t => t.id === taskId);
    if (!task) return;

    setRoutedTasks(prev => 
      prev.map(t => 
        t.id === taskId ? { ...t, status: 'stopped', agentId: undefined } : t
      )
    );

    if (task.agentId) {
      sendMessage(`Task "${task.name}" has been stopped by the manager`, {
        recipientId: task.agentId,
        priority: 8,
        channel: 'priority'
      });
    }

    toast({
      title: "Task Stopped",
      description: `Task "${task.name}" has been stopped and unassigned`,
      variant: "destructive",
    });
  };

  const openAssignDialog = (task: RoutedTask) => {
    setCurrentTask(task);
    setSelectedAgent(task.agentId || '');
    setShowAssignTask(true);
  };

  const priorityLabel = (priority: number) => {
    if (priority >= 9) return { label: "Critical", color: "text-red-400 border-red-500" };
    if (priority >= 7) return { label: "High", color: "text-orange-400 border-orange-500" };
    if (priority >= 4) return { label: "Medium", color: "text-yellow-400 border-yellow-500" };
    return { label: "Low", color: "text-green-400 border-green-500" };
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Router className="h-5 w-5 text-purple" />
          Task Router
        </CardTitle>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddTask(true)}
            className="bg-green-500/20 hover:bg-green-500/30 text-white px-3 py-1 rounded-md text-sm flex items-center"
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add Task
          </button>
          <button 
            onClick={routeNewTask}
            className="bg-purple/20 hover:bg-purple/30 text-white px-3 py-1 rounded-md text-sm flex items-center"
          >
            Route New Task
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-400">Task</span>
            <div className="flex gap-4">
              <span className="text-gray-400 w-24 text-center">Complexity</span>
              <span className="text-gray-400 w-24 text-center">Priority</span>
              <span className="text-gray-400 w-24 text-center">Status</span>
              <span className="text-gray-400 w-32 text-center">Assigned Agent</span>
              <span className="text-gray-400 w-24 text-center">Actions</span>
            </div>
          </div>
          
          {routedTasks.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No tasks have been routed yet</div>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {routedTasks.map(task => (
                <div key={task.id} className="flex justify-between items-center bg-dark/60 p-3 rounded-md border border-white/5">
                  <div>
                    <span className="text-white text-sm font-medium">{task.name}</span>
                    {task.description && (
                      <p className="text-gray-400 text-xs mt-1">{task.description}</p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <Badge variant="outline" className={
                      task.complexity === 'high' 
                        ? 'border-red-500 text-red-400' 
                        : task.complexity === 'medium' 
                          ? 'border-yellow-500 text-yellow-400' 
                          : 'border-green-500 text-green-400'
                    }>
                      {task.complexity}
                    </Badge>
                    <Badge variant="outline" className={`${priorityLabel(task.priority).color}`}>
                      <span className="flex items-center gap-1">
                        {task.priority >= 7 && <ArrowUp className="h-3 w-3" />}
                        {task.priority <= 3 && <ArrowDown className="h-3 w-3" />}
                        {task.priority}
                      </span>
                    </Badge>
                    <div className="w-24 text-center">
                      {task.status === 'routed' ? (
                        <span className="text-green-400 flex items-center justify-center gap-1 text-xs">
                          <Check className="h-3 w-3" /> Routed
                        </span>
                      ) : task.status === 'pending' ? (
                        <span className="text-yellow-400 text-xs">Pending</span>
                      ) : task.status === 'stopped' ? (
                        <span className="text-red-400 flex items-center justify-center gap-1 text-xs">
                          <Square className="h-3 w-3" /> Stopped
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center justify-center gap-1 text-xs">
                          <AlertCircle className="h-3 w-3" /> Failed
                        </span>
                      )}
                    </div>
                    <div className="w-32 text-center">
                      {task.agentId ? (
                        <span className="text-purple text-xs">{task.agentId}</span>
                      ) : (
                        <span className="text-gray-500 text-xs">-</span>
                      )}
                    </div>
                    <div className="w-24 flex justify-center gap-1">
                      {task.status !== 'stopped' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-xs"
                            onClick={() => openAssignDialog(task)}
                          >
                            Assign
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-7 px-2 text-red-400 hover:text-red-300 text-xs"
                            onClick={() => stopTask(task.id)}
                          >
                            Stop
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
          <DialogContent className="sm:max-w-[425px] bg-dark-accent border-white/10">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task to be routed to agents
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="task-name" className="text-right">
                  Name
                </label>
                <Input
                  id="task-name"
                  value={newTask.name}
                  onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="task-description" className="text-right">
                  Description
                </label>
                <Textarea
                  id="task-description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="task-complexity" className="text-right">
                  Complexity
                </label>
                <Select
                  value={newTask.complexity as string}
                  onValueChange={(value) => setNewTask({...newTask, complexity: value as 'low' | 'medium' | 'high'})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="task-priority" className="text-right">
                  Priority (1-10)
                </label>
                <Input
                  id="task-priority"
                  type="number"
                  min="1"
                  max="10"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: parseInt(e.target.value)})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddTask(false)}>Cancel</Button>
              <Button onClick={handleAddTask}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showAssignTask} onOpenChange={setShowAssignTask}>
          <DialogContent className="sm:max-w-[425px] bg-dark-accent border-white/10">
            <DialogHeader>
              <DialogTitle>Assign Task</DialogTitle>
              <DialogDescription>
                {currentTask ? `Assign "${currentTask.name}" to an agent` : 'Assign task to an agent'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="agent-select" className="text-right">
                  Agent
                </label>
                <Select
                  value={selectedAgent}
                  onValueChange={setSelectedAgent}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAgents.map(agent => (
                      <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAssignTask(false)}>Cancel</Button>
              <Button onClick={handleAssignTask}>Assign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TaskRouter;
