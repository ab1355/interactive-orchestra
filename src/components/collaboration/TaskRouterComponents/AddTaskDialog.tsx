
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
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
          Create a new task to be routed to agents
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
            onChange={(e) => setNewTask({...newTask, name: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="task-description" className="text-right">
            Description
          </label>
          <Textarea
            id="task-description"
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="task-complexity" className="text-right">
            Complexity
          </label>
          <Select
            value={newTask.complexity}
            onValueChange={(value) => setNewTask({...newTask, complexity: value})}
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
            Priority (1-10)
          </label>
          <Input
            id="task-priority"
            type="number"
            min="1"
            max="10"
            value={newTask.priority}
            onChange={(e) => setNewTask({...newTask, priority: parseInt(e.target.value)})}
            className="col-span-3"
          />
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
