
import React from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Agent {
  id: string;
  name: string;
}

interface AssignTaskDialogProps {
  currentTask: any | null;
  selectedAgent: string;
  setSelectedAgent: React.Dispatch<React.SetStateAction<string>>;
  availableAgents: Agent[];
  onClose: () => void;
  onAssign: () => void;
}

const AssignTaskDialog: React.FC<AssignTaskDialogProps> = ({
  currentTask,
  selectedAgent,
  setSelectedAgent,
  availableAgents,
  onClose,
  onAssign
}) => {
  return (
    <DialogContent className="sm:max-w-[425px] bg-dark-accent border-white/10">
      <DialogHeader>
        <DialogTitle>Assign Task</DialogTitle>
        <DialogDescription>
          {currentTask ? `Assign "${currentTask.name}" to an agent` : 'Assign task to an agent'}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="agent-select" className="text-right">
            Agent
          </label>
          <Select
            value={selectedAgent}
            onValueChange={setSelectedAgent}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select an agent" />
            </SelectTrigger>
            <SelectContent>
              {availableAgents.map(agent => (
                <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={onAssign}>Assign</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AssignTaskDialog;
