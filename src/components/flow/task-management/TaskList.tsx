
import React from 'react';
import { Task } from '@/types/flow';
import { AlertCircle } from 'lucide-react';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onStatusUpdate: (taskId: string, newStatus: string) => Promise<void>;
  isLoading: boolean;
  projectId?: string;
  error?: string | null;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onStatusUpdate, 
  isLoading,
  projectId,
  error
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple border-t-transparent"></div>
        <span className="ml-2">Loading tasks...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-center">
        <AlertCircle className="h-6 w-6 text-red-400 mx-auto mb-2" />
        <p className="text-red-400">{error}</p>
      </div>
    );
  }
  
  if (!projectId) {
    return (
      <div className="text-center py-8 text-gray-400">
        Please select a project to view tasks.
      </div>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No tasks found. Create your first task to get started.
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onStatusUpdate={onStatusUpdate} 
        />
      ))}
    </div>
  );
};

export default TaskList;
