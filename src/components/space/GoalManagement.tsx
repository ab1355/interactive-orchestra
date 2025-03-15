
import React, { useState, useEffect } from 'react';
import { Target, ArrowRight, CheckCircle2, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getGoals, createGoal, updateGoal } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Goal {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
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
  const { toast } = useToast();

  useEffect(() => {
    const fetchGoals = async () => {
      // Use a demo project ID if none is provided
      const demoProjectId = "00000000-0000-0000-0000-000000000000";
      const activeProjectId = projectId || demoProjectId;
      
      try {
        setIsLoading(true);
        const goalsData = await getGoals(activeProjectId);
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

  const handleAddNewGoal = async () => {
    // This would typically open a form modal to add a new goal
    // For simplicity, we're just showing a toast notification
    toast({
      title: "New Goal",
      description: "This would open a form to add a new goal.",
    });
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
            <Button size="sm" variant="outline" onClick={handleAddNewGoal}>
              <Plus className="w-4 h-4 mr-1" /> New Goal
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-4">Loading goals...</div>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          <div className="flex justify-end mt-4">
            <Button size="sm" variant="ghost">View All Goals</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalManagement;
