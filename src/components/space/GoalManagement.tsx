
import React from 'react';
import { Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Goal {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed';
  owner: string;
  parent?: string;
  dueDate: string;
}

const SAMPLE_GOALS: Goal[] = [
  { id: 'g1', name: 'Increase market share by 10%', status: 'in-progress', owner: 'Marketing Team', dueDate: '2023-12-31' },
  { id: 'g2', name: 'Reduce operating costs by 15%', status: 'not-started', owner: 'Operations', dueDate: '2023-11-30' },
  { id: 'g3', name: 'Launch new product line', status: 'in-progress', owner: 'Product Team', dueDate: '2023-10-15' },
  { id: 'g4', name: 'Improve customer satisfaction score', status: 'completed', owner: 'Customer Success', parent: 'g1', dueDate: '2023-09-30' },
];

const getStatusIcon = (status: Goal['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'in-progress':
      return <ArrowRight className="w-4 h-4 text-blue-500" />;
    default:
      return <div className="w-4 h-4 rounded-full border border-gray-300" />;
  }
};

const GoalManagement = () => {
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
            <Button size="sm" variant="outline">New Goal</Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead className="w-[300px]">Goal</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SAMPLE_GOALS.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>{getStatusIcon(goal.status)}</TableCell>
                  <TableCell className="font-medium">{goal.name}</TableCell>
                  <TableCell>{goal.owner}</TableCell>
                  <TableCell>{goal.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-end mt-4">
            <Button size="sm" variant="ghost">View All Goals</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalManagement;
