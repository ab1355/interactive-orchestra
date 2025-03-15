
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import { Task } from '@/types/flow';
import { getTasks, createTask, updateTaskStatus } from '@/integrations/supabase/client';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskFilters from './TaskFilters';

interface TaskManagementProps {
  projectId?: string;
}

const TaskManagement: React.FC<TaskManagementProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectId) {
        setTasks([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const tasksData = await getTasks(projectId);
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
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

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectId) {
      toast({
        title: "Error",
        description: "No project selected",
        variant: "destructive"
      });
      return;
    }

    if (!newTask.title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive"
      });
      return;
    }

    try {
      const taskData = {
        project_id: projectId,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        priority: newTask.priority,
        due_date: newTask.due_date || null,
        assigned_to: newTask.assigned_to || null
      };
      
      const createdTask = await createTask(taskData);
      setTasks([...tasks, createdTask]);
      
      toast({
        title: "Task created",
        description: `Task "${createdTask.title}" has been created successfully.`
      });
      
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
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Error creating task",
        description: "Could not create the task. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleStatusUpdate = async (taskId: string, newStatus: string) => {
    try {
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
      toast({
        title: "Error updating task",
        description: "Could not update the task status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredTasks = tasks.filter(task => 
    filterStatus === 'all' || task.status === filterStatus
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    } else if (sortBy === 'due_date') {
      return new Date(a.due_date || '').getTime() - new Date(b.due_date || '').getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

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
          onStatusUpdate={handleStatusUpdate}
          isLoading={isLoading}
          projectId={projectId}
        />
        
        <TaskForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleCreateTask}
          taskData={newTask}
          setTaskData={setNewTask}
        />
      </CardContent>
    </Card>
  );
};

export default TaskManagement;
