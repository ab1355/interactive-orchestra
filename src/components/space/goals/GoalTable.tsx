
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Goal {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
  description?: string;
}

interface GoalTableProps {
  goals: Goal[];
  formatDate: (dateString: string | null) => string;
  handleUpdateGoalStatus: (goalId: string, newStatus: string) => Promise<void>;
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

const GoalTable: React.FC<GoalTableProps> = ({ goals, formatDate, handleUpdateGoalStatus }) => {
  return (
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
  );
};

export default GoalTable;
