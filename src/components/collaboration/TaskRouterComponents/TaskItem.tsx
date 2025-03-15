
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, ArrowUp, ArrowDown, Square, AlertCircle } from 'lucide-react';

interface TaskItemProps {
  task: {
    id: string;
    name: string;
    complexity: 'low' | 'medium' | 'high';
    priority: number;
    status: 'routed' | 'pending' | 'failed' | 'stopped';
    agentId?: string;
    description?: string;
  };
  onAssign: (task: any) => void;
  onStop: (taskId: string) => void;
}

export const priorityLabel = (priority: number) => {
  if (priority >= 9) return { label: "Critical", color: "text-red-400 border-red-500" };
  if (priority >= 7) return { label: "High", color: "text-orange-400 border-orange-500" };
  if (priority >= 4) return { label: "Medium", color: "text-yellow-400 border-yellow-500" };
  return { label: "Low", color: "text-green-400 border-green-500" };
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onAssign, onStop }) => {
  return (
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
                onClick={() => onAssign(task)}
              >
                Assign
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-7 px-2 text-red-400 hover:text-red-300 text-xs"
                onClick={() => onStop(task.id)}
              >
                Stop
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
