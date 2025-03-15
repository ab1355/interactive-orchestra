
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Router, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAgentCommunication } from '@/hooks/useAgentCommunication';

interface RoutedTask {
  id: string;
  name: string;
  complexity: 'low' | 'medium' | 'high';
  status: 'routed' | 'pending' | 'failed';
  agentId?: string;
}

const TaskRouter: React.FC = () => {
  const [routedTasks, setRoutedTasks] = useState<RoutedTask[]>([
    { id: 'task-1', name: 'Market data analysis', complexity: 'high', status: 'routed', agentId: 'analysis-agent' },
    { id: 'task-2', name: 'Customer survey', complexity: 'medium', status: 'pending' },
    { id: 'task-3', name: 'Trend visualization', complexity: 'medium', status: 'routed', agentId: 'data-agent' },
    { id: 'task-4', name: 'Competitor research', complexity: 'high', status: 'routed', agentId: 'research-agent' },
  ]);
  
  const { toast } = useToast();
  
  // Example of using the agent communication hook - connecting to the router agent
  const { sendMessage, messages, isConnected } = useAgentCommunication({
    agentId: 'task-router',
    agentRole: 'manager',
    channels: ['direct', 'broadcast', 'priority']
  });

  // Simulate task routing
  const routeNewTask = () => {
    const taskTypes = ['Research', 'Analysis', 'Report Generation', 'Data Cleaning', 'Visualization'];
    const complexity: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
    
    const newTask: RoutedTask = {
      id: `task-${Math.floor(Math.random() * 1000)}`,
      name: `${taskTypes[Math.floor(Math.random() * taskTypes.length)]} task`,
      complexity: complexity[Math.floor(Math.random() * complexity.length)],
      status: 'pending'
    };
    
    setRoutedTasks(prev => [newTask, ...prev]);
    
    // Simulate routing decision
    setTimeout(() => {
      const agentTypes = ['research-agent', 'analysis-agent', 'writer-agent', 'data-agent'];
      const randomAgent = agentTypes[Math.floor(Math.random() * agentTypes.length)];
      
      setRoutedTasks(prev => 
        prev.map(task => 
          task.id === newTask.id ? { ...task, status: 'routed', agentId: randomAgent } : task
        )
      );
      
      // Send a message to the agent about the new task
      sendMessage(`New task assigned: ${newTask.name}`, {
        recipientId: randomAgent,
        priority: newTask.complexity === 'high' ? 8 : newTask.complexity === 'medium' ? 5 : 3
      });
      
      toast({
        title: "Task Routed",
        description: `Task "${newTask.name}" has been routed to ${randomAgent}`,
      });
    }, 1500);
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Router className="h-5 w-5 text-purple" />
          Task Router
        </CardTitle>
        <button 
          onClick={routeNewTask}
          className="bg-purple/20 hover:bg-purple/30 text-white px-3 py-1 rounded-md text-sm flex items-center"
        >
          Route New Task
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-400">Task</span>
            <div className="flex gap-4">
              <span className="text-gray-400 w-24 text-center">Complexity</span>
              <span className="text-gray-400 w-24 text-center">Status</span>
              <span className="text-gray-400 w-32 text-center">Assigned Agent</span>
            </div>
          </div>
          
          {routedTasks.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No tasks have been routed yet</div>
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {routedTasks.map(task => (
                <div key={task.id} className="flex justify-between items-center bg-dark/60 p-3 rounded-md border border-white/5">
                  <span className="text-white text-sm font-medium">{task.name}</span>
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
                    <div className="w-24 text-center">
                      {task.status === 'routed' ? (
                        <span className="text-green-400 flex items-center justify-center gap-1 text-xs">
                          <Check className="h-3 w-3" /> Routed
                        </span>
                      ) : task.status === 'pending' ? (
                        <span className="text-yellow-400 text-xs">Pending</span>
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
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskRouter;
