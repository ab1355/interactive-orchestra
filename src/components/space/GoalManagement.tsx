
import React, { useState, useEffect } from 'react';
import { Target, ArrowRight, CheckCircle2, Plus, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getGoals, createGoal, updateGoal } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Goal {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
  description?: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'in_progress':
      return <ArrowRight className="w-4 h-4 text-blue-500" />;
    default:
      return <div className="w-4 h-4 rounded-full border border-gray-300" />;
  }
};

const GoalManagement = ({ projectId }: { projectId?: string }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'in_progress',
    due_date: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchGoals = async () => {
      if (!projectId) {
        setGoals([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const goalsData = await getGoals(projectId);
        setGoals(goalsData);
      } catch (error) {
        console.error('Error fetching goals:', error);
        toast({
          title: "Error fetching goals",
          description: "Could not load goals from the database.",
          variant: "destructive"
        });
        // Set empty array if error occurs
        setGoals([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, [projectId, toast]);

  const handleAddNewGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectId) {
      toast({
        title: "Error",
        description: "No project selected",
        variant: "destructive"
      });
      return;
    }

    if (!newGoal.title.trim()) {
      toast({
        title: "Error",
        description: "Goal title is required",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const goalData = {
        project_id: projectId,
        title: newGoal.title,
        description: newGoal.description,
        status: newGoal.status,
        priority: newGoal.priority,
        due_date: newGoal.due_date || null
      };
      
      const createdGoal = await createGoal(goalData);
      setGoals([...goals, createdGoal]);
      
      toast({
        title: "Goal created",
        description: `Goal "${createdGoal.title}" has been created successfully.`
      });
      
      // Reset form and close dialog
      setNewGoal({
        title: '',
        description: '',
        priority: 'medium',
        status: 'in_progress',
        due_date: ''
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating goal:', error);
      toast({
        title: "Error creating goal",
        description: "Could not create the goal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateGoalStatus = async (goalId: string, newStatus: string) => {
    try {
      await updateGoal(goalId, { status: newStatus });
      setGoals(goals.map(goal => 
        goal.id === goalId ? { ...goal, status: newStatus } : goal
      ));
      
      toast({
        title: "Goal updated",
        description: `Goal status has been updated successfully.`
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Error updating goal",
        description: "Could not update the goal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    try {
      return format(new Date(dateString), 'yyyy-MM-dd');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple" />
          Goal Management
        </CardTitle>
        <CardDescription>Track and manage strategic objectives</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Strategic Goals</h3>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline" 
                  disabled={!projectId}
                  onClick={() => projectId ? setIsDialogOpen(true) : null}
                >
                  <Plus className="w-4 h-4 mr-1" /> New Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddNewGoal}>
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                    <DialogDescription>
                      Add a new strategic goal to your project.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
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
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="priority" className="text-right">
                        Priority
                      </Label>
                      <Select
                        value={newGoal.priority}
                        onValueChange={(value) => setNewGoal({...newGoal, priority: value})}
                      >
                        <SelectTrigger id="priority" className="col-span-3">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select
                        value={newGoal.status}
                        onValueChange={(value) => setNewGoal({...newGoal, status: value})}
                      >
                        <SelectTrigger id="status" className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started">Not Started</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
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
                        value={newGoal.due_date}
                        onChange={(e) => setNewGoal({...newGoal, due_date: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Goal
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          {isLoading ? (
            <div className="text-center py-4">Loading goals...</div>
          ) : !projectId ? (
            <div className="text-center py-4 text-gray-400">
              Please select a project to view goals.
            </div>
          ) : goals.length === 0 ? (
            <div className="text-center py-4 text-gray-400">
              No goals found. Create your first goal to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[300px]">Goal</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {goals.map((goal) => (
                  <TableRow key={goal.id}>
                    <TableCell>{getStatusIcon(goal.status)}</TableCell>
                    <TableCell className="font-medium">{goal.title}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        goal.priority === 'high' ? 'bg-red-900/30 text-red-400' : 
                        goal.priority === 'medium' ? 'bg-amber-900/30 text-amber-400' : 
                        'bg-green-900/30 text-green-400'
                      }`}>
                        {goal.priority}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(goal.due_date)}</TableCell>
                    <TableCell>
                      <Select
                        value={goal.status}
                        onValueChange={(value) => handleUpdateGoalStatus(goal.id, value)}
                      >
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started">Not Started</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalManagement;
