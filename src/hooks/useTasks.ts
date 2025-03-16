
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Task } from '@/types/flow';
import { getTasks, createTask, updateTaskStatus } from '@/integrations/supabase/services/taskService';

interface UseTasksProps {
  projectId?: string;
}

export const useTasks = ({ projectId }: UseTasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) {
        setTasks([]);
        setIsLoading(false);
        setError(null);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const tasksData = await getTasks(projectId);
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks. Please try again later.');
        toast({
          title: "Error fetching tasks",
          description: "Could not load tasks from the database.",
          variant: "destructive"
        });
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [projectId, toast]);

  const handleCreateTask = async (taskData: {
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string;
    assigned_to: string;
  }) => {
    if (!projectId) {
      toast({
        title: "Error",
        description: "No project selected",
        variant: "destructive"
      });
      return null;
    }

    if (!taskData.title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive"
      });
      return null;
    }

    try {
      setError(null);
      const newTaskData = {
        project_id: projectId,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        due_date: taskData.due_date || null,
        assigned_to: taskData.assigned_to || null
      };
      
      const createdTask = await createTask(newTaskData);
      setTasks([...tasks, createdTask]);
      
      toast({
        title: "Task created",
        description: `Task "${createdTask.title}" has been created successfully.`
      });
      
      return createdTask;
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again later.');
      toast({
        title: "Error creating task",
        description: "Could not create the task. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  const handleStatusUpdate = async (taskId: string, newStatus: string): Promise<void> => {
    try {
      setError(null);
      await updateTaskStatus(taskId, newStatus);
      
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
      
      toast({
        title: "Task updated",
        description: `Task status changed to "${newStatus}".`
      });
    } catch (error) {
      console.error('Error updating task status:', error);
      setError('Failed to update task status. Please try again later.');
      toast({
        title: "Error updating task",
        description: "Could not update the task status. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    tasks,
    isLoading,
    error,
    createTask: handleCreateTask,
    updateTaskStatus: handleStatusUpdate,
    setError
  };
};
