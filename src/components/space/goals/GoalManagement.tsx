
import React, { useState, useEffect } from 'react';
import { Target, Plus, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { getGoals, createGoal, updateGoal } from '@/integrations/supabase/services/goalService';
import GoalTable from './GoalTable';
import GoalForm from './GoalForm';

interface Goal {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
  description?: string;
}

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
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                  <DialogDescription>
                    Add a new strategic goal to your project.
                  </DialogDescription>
                </DialogHeader>
                <GoalForm 
                  newGoal={newGoal}
                  setNewGoal={setNewGoal}
                  handleAddNewGoal={handleAddNewGoal}
                  isSubmitting={isSubmitting}
                  setIsDialogOpen={setIsDialogOpen}
                />
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
            <GoalTable 
              goals={goals} 
              formatDate={formatDate} 
              handleUpdateGoalStatus={handleUpdateGoalStatus} 
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalManagement;
