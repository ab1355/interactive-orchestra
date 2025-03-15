import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, CheckCircle2, Clock, AlertCircle, MoreHorizontal, Filter, ArrowUpDown } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { getTasks, createTask, updateTaskStatus } from '@/integrations/supabase/client';
import { Task } from '@/types/flow';

const getPriorityColor = (priority: string) => {
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

const getStatusIcon = (status: string) => {
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

const TaskManagement = ({ projectId }: { projectId?: string }) => {
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
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      
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
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
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
          <div className="flex items-center space-x-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="due_date">Due Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" disabled={!projectId}>
                <PlusCircle className="h-4 w-4 mr-2" /> New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleCreateTask}>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to your project workflow.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={newTask.status}
                      onValueChange={(value) => setNewTask({...newTask, status: value})}
                    >
                      <SelectTrigger id="status" className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="blocked">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right">
                      Priority
                    </Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({...newTask, priority: value})}
                    >
                      <SelectTrigger id="priority" className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="due_date" className="text-right">
                      Due Date
                    </Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={newTask.due_date}
                      onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assigned_to" className="text-right">
                      Assigned To
                    </Label>
                    <Input
                      id="assigned_to"
                      value={newTask.assigned_to}
                      onChange={(e) => setNewTask({...newTask, assigned_to: e.target.value})}
                      className="col-span-3"
                      placeholder="Enter team member name"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading tasks...</div>
        ) : !projectId ? (
          <div className="text-center py-8 text-gray-400">
            Please select a project to view tasks.
          </div>
        ) : sortedTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No tasks found. Create your first task to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTasks.map((task) => (
              <div key={task.id} className="p-4 rounded-md border border-white/10 bg-dark/50 hover:bg-dark/80 transition-colors">
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
                      onValueChange={(value) => handleStatusUpdate(task.id, value)}
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
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskManagement;
