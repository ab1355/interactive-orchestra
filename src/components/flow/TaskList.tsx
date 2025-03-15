
import React from 'react';
import { Task } from '@/types/flow';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onStatusUpdate: (taskId: string, newStatus: string) => Promise<void>;
  isLoading: boolean;
  projectId?: string;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onStatusUpdate, 
  isLoading,
  projectId
}) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading tasks...</div>;
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
