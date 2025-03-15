
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Router, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { useAgentCommunication } from '@/hooks/agentCommunication';
import { MessageOptions } from '@/types/communication';

import TaskHeader from './TaskRouterComponents/TaskHeader';
import TaskItem from './TaskRouterComponents/TaskItem';
import AddTaskDialog from './TaskRouterComponents/AddTaskDialog';
import AssignTaskDialog from './TaskRouterComponents/AssignTaskDialog';
import { simulateProposals } from './TaskRouterComponents/TaskUtils';

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
      simulateProposals(taskId, availableAgents, sendMessage);
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
          <TaskHeader />
          
          {routedTasks.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No tasks have been routed yet</div>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {routedTasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onAssign={openAssignDialog} 
                  onStop={stopTask} 
                />
              ))}
            </div>
          )}
        </div>

        <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
          <AddTaskDialog 
            newTask={newTask as any}
            setNewTask={setNewTask}
            onClose={() => setShowAddTask(false)}
            onAddTask={handleAddTask}
          />
        </Dialog>

        <Dialog open={showAssignTask} onOpenChange={setShowAssignTask}>
          <AssignTaskDialog 
            currentTask={currentTask}
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            availableAgents={availableAgents}
            onClose={() => setShowAssignTask(false)}
            onAssign={handleAssignTask}
          />
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TaskRouter;
