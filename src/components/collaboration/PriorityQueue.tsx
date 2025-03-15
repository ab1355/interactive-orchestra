
import React, { useState } from 'react';
import { Flame, AlertCircle, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface QueuedTask {
  id: string;
  name: string;
  priority: number;
  status: 'queued' | 'processing' | 'completed';
  addedAt: Date;
  agentId?: string;
  timeEstimate?: number;
}

const priorityLabels: Record<number, { label: string; color: string }> = {
  1: { label: 'Low', color: 'bg-gray-500/20 text-gray-400 border-gray-500/50' },
  2: { label: 'Low', color: 'bg-gray-500/20 text-gray-400 border-gray-500/50' },
  3: { label: 'Low', color: 'bg-gray-500/20 text-gray-400 border-gray-500/50' },
  4: { label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
  5: { label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
  6: { label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
  7: { label: 'High', color: 'bg-orange-500/20 text-orange-400 border-orange-500/50' },
  8: { label: 'High', color: 'bg-orange-500/20 text-orange-400 border-orange-500/50' },
  9: { label: 'Critical', color: 'bg-red-500/20 text-red-400 border-red-500/50' },
  10: { label: 'Critical', color: 'bg-red-500/20 text-red-400 border-red-500/50' },
};

const PriorityQueue: React.FC = () => {
  const [queue, setQueue] = useState<QueuedTask[]>([
    { 
      id: 'task-101', 
      name: 'Security vulnerability assessment', 
      priority: 10, 
      status: 'processing', 
      addedAt: new Date(Date.now() - 1000 * 60 * 30),
      agentId: 'security-agent',
      timeEstimate: 45
    },
    { 
      id: 'task-102', 
      name: 'Customer data analysis', 
      priority: 8, 
      status: 'queued', 
      addedAt: new Date(Date.now() - 1000 * 60 * 20),
      timeEstimate: 60
    },
    { 
      id: 'task-103', 
      name: 'Quarterly report generation', 
      priority: 7, 
      status: 'queued', 
      addedAt: new Date(Date.now() - 1000 * 60 * 15),
      timeEstimate: 90
    },
    { 
      id: 'task-104', 
      name: 'Database optimization', 
      priority: 6, 
      status: 'queued', 
      addedAt: new Date(Date.now() - 1000 * 60 * 10),
      timeEstimate: 120
    },
    { 
      id: 'task-105', 
      name: 'Content translation', 
      priority: 4, 
      status: 'queued', 
      addedAt: new Date(Date.now() - 1000 * 60 * 5),
      timeEstimate: 30
    },
  ]);

  const { toast } = useToast();

  // Add a new task to the queue with random priority
  const addRandomTask = () => {
    const taskTypes = [
      'Data analysis', 
      'Report generation', 
      'API integration', 
      'Content creation',
      'Testing procedure',
      'Review process',
      'Documentation update'
    ];
    
    const newTask: QueuedTask = {
      id: `task-${Math.floor(Math.random() * 1000)}`,
      name: `${taskTypes[Math.floor(Math.random() * taskTypes.length)]}`,
      priority: Math.floor(Math.random() * 10) + 1,
      status: 'queued',
      addedAt: new Date(),
      timeEstimate: Math.floor(Math.random() * 120) + 15
    };
    
    // Insert task in correct order by priority
    const newQueue = [...queue, newTask].sort((a, b) => b.priority - a.priority);
    setQueue(newQueue);
    
    toast({
      title: "Task Added",
      description: `"${newTask.name}" added to priority queue with ${priorityLabels[newTask.priority].label} priority.`,
    });
  };

  // Process the next highest priority task
  const processNextTask = () => {
    const queuedTasks = queue.filter(task => task.status === 'queued');
    
    if (queuedTasks.length === 0) {
      toast({
        title: "Queue Empty",
        description: "There are no tasks in the queue to process.",
        variant: "destructive"
      });
      return;
    }
    
    // Tasks are already sorted by priority, so get the first queued one
    const nextTask = queuedTasks[0];
    const agentTypes = ['research-agent', 'analysis-agent', 'writer-agent', 'data-agent'];
    const assignedAgent = agentTypes[Math.floor(Math.random() * agentTypes.length)];
    
    // Update the task status
    setQueue(queue.map(task => 
      task.id === nextTask.id 
        ? { ...task, status: 'processing', agentId: assignedAgent } 
        : task
    ));
    
    toast({
      title: "Task Processing",
      description: `"${nextTask.name}" assigned to ${assignedAgent} for processing.`,
    });
  };

  // Format the time since a task was added
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-red-500" />
          Priority Queue
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            onClick={addRandomTask}
            variant="outline" 
            className="border-white/10 hover:bg-white/5"
          >
            Add Task
          </Button>
          <Button 
            onClick={processNextTask}
            className="bg-purple hover:bg-purple/80"
          >
            Process Next
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-400">Task</span>
            <div className="flex gap-4">
              <span className="text-gray-400 w-24 text-center">Priority</span>
              <span className="text-gray-400 w-24 text-center">Status</span>
              <span className="text-gray-400 w-32 text-center">Added</span>
              <span className="text-gray-400 w-32 text-center">Agent</span>
            </div>
          </div>
          
          {queue.length === 0 ? (
            <div className="text-center py-4 text-gray-500">The priority queue is empty</div>
          ) : (
            <div className="space-y-2 max-h-[280px] overflow-y-auto">
              {queue.map(task => (
                <div key={task.id} className="flex justify-between items-center bg-dark/60 p-3 rounded-md border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">{task.name}</span>
                    {task.timeEstimate && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Est. {task.timeEstimate} min
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <div className="w-24 text-center">
                      <Badge variant="outline" className={priorityLabels[task.priority].color}>
                        <span className="flex items-center gap-1">
                          {task.priority > 6 && <ArrowUp className="w-3 h-3" />}
                          {task.priority < 4 && <ArrowDown className="w-3 h-3" />}
                          {priorityLabels[task.priority].label} ({task.priority})
                        </span>
                      </Badge>
                    </div>
                    <div className="w-24 text-center">
                      {task.status === 'processing' ? (
                        <span className="text-green-400 flex items-center justify-center gap-1 text-xs">
                          <AlertCircle className="h-3 w-3" /> Processing
                        </span>
                      ) : (
                        <span className="text-yellow-400 text-xs">Queued</span>
                      )}
                    </div>
                    <div className="w-32 text-center text-xs text-gray-400">
                      {formatTimeAgo(task.addedAt)}
                    </div>
                    <div className="w-32 text-center">
                      {task.agentId ? (
                        <span className="text-purple text-xs">{task.agentId}</span>
                      ) : (
                        <span className="text-gray-500 text-xs">Unassigned</span>
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

export default PriorityQueue;
