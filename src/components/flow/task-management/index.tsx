
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';

import { useTasks } from '@/hooks/useTasks';
import { filterTasks, sortTasks } from '@/utils/taskFilterUtils';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';

interface TaskManagementProps {
  projectId?: string;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ projectId }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: '',
    assigned_to: ''
  });
  
  const { 
    tasks, 
    isLoading, 
    error, 
    createTask: handleCreateTask, 
    updateTaskStatus: handleStatusUpdate 
  } = useTasks({ projectId });

  const filteredTasks = filterTasks(tasks, filterStatus);
  const sortedTasks = sortTasks(filteredTasks, sortBy);

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await handleCreateTask(newTask);
    
    if (result) {
      // Reset form and close dialog
      setNewTask({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
        assigned_to: ''
      });
      setIsFormOpen(false);
    }
  };

  // Here we modify the onStatusUpdate function to match the expected type
  const onStatusUpdate = async (taskId: string, newStatus: string) => {
    await handleStatusUpdate(taskId, newStatus);
    // No return value needed since the function expects void
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-purple" />
          Task Management
        </CardTitle>
        <CardDescription>Create, track, and prioritize tasks for your project</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <TaskFilters 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          
          <Button 
            variant="outline" 
            disabled={!projectId}
            onClick={() => setIsFormOpen(true)}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> New Task
          </Button>
        </div>
        
        <TaskList 
          tasks={sortedTasks} 
          onStatusUpdate={onStatusUpdate}
          isLoading={isLoading}
          projectId={projectId}
          error={error}
        />
        
        <TaskForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmitTask}
          taskData={newTask}
          setTaskData={setNewTask}
        />
      </CardContent>
    </Card>
  );
};

export default TaskManagement;
