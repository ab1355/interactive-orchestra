
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';

interface GoalFormProps {
  newGoal: {
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string;
  };
  setNewGoal: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string;
  }>>;
  handleAddNewGoal: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ 
  newGoal, 
  setNewGoal, 
  handleAddNewGoal, 
  isSubmitting, 
  setIsDialogOpen 
}) => {
  return (
    <form onSubmit={handleAddNewGoal}>
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
  );
};

export default GoalForm;
