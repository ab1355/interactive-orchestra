
import React from 'react';
import { Task } from '@/types/flow';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskItemProps {
  task: Task;
  onStatusUpdate: (taskId: string, newStatus: string) => Promise<void>;
}

export const getPriorityColor = (priority: string) => {
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

export const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'in_progress':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'blocked':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusUpdate }) => {
  return (
    <div className="p-4 rounded-md border border-white/10 bg-dark/50 hover:bg-dark/80 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {getStatusIcon(task.status)}
          <h3 className="text-md font-medium ml-2">{task.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
          <Select
            value={task.status}
            onValueChange={(value) => onStatusUpdate(task.id, value)}
          >
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-gray-400 mb-2">{task.description}</p>
      )}
      <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
        <div>
          {task.assigned_to && (
            <span>Assigned to: {task.assigned_to}</span>
          )}
        </div>
        <div>
          {task.due_date && (
            <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
