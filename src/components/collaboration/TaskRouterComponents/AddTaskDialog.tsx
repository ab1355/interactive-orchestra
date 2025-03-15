
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddTaskDialogProps {
  newTask: {
    name: string;
    description?: string;
    complexity: string;
    priority?: number;
  };
  setNewTask: React.Dispatch<React.SetStateAction<{
    name: string;
    description?: string;
    complexity: string;
    priority?: number;
  }>>;
  onClose: () => void;
  onAddTask: () => void;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  newTask,
  setNewTask,
  onClose,
  onAddTask
}) => {
  return (
    <DialogContent className="sm:max-w-[425px] bg-dark-accent border-white/10">
      <DialogHeader>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogDescription>
          Create a new task for agents to handle
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="task-name" className="text-right">
            Name
          </label>
          <Input
            id="task-name"
            value={newTask.name}
            onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))}
            className="col-span-3"
            placeholder="Task name"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="task-description" className="text-right">
            Description
          </label>
          <Textarea
            id="task-description"
            value={newTask.description || ''}
            onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            className="col-span-3"
            placeholder="Describe the task (optional)"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="task-complexity" className="text-right">
            Complexity
          </label>
          <Select
            value={newTask.complexity}
            onValueChange={(value) => setNewTask(prev => ({ ...prev, complexity: value }))}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select complexity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="task-priority" className="text-right">
            Priority
          </label>
          <Select
            value={newTask.priority?.toString() || '5'}
            onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: parseInt(value) }))}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onAddTask}>Add Task</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddTaskDialog;
