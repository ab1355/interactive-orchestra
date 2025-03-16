
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TaskDistribution: React.FC = () => {
  const data = [
    {
      name: 'Research',
      completed: 12,
      inProgress: 5,
      pending: 3,
    },
    {
      name: 'Analysis',
      completed: 8,
      inProgress: 4,
      pending: 2,
    },
    {
      name: 'Development',
      completed: 6,
      inProgress: 8,
      pending: 4,
    },
    {
      name: 'QA',
      completed: 4,
      inProgress: 2,
      pending: 9,
    },
    {
      name: 'Deployment',
      completed: 2,
      inProgress: 1,
      pending: 7,
    },
  ];

  const statusColors = {
    completed: '#4ade80',
    inProgress: '#8b5cf6',
    pending: '#f97316',
  };

  return (
    <div className="space-y-4">
      <Card className="bg-dark-accent/30 border-dark-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Task Distribution by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1F2C', 
                    borderColor: '#374151',
                    color: 'white' 
                  }} 
                />
                <Legend />
                <Bar dataKey="completed" name="Completed" stackId="a" fill={statusColors.completed} />
                <Bar dataKey="inProgress" name="In Progress" stackId="a" fill={statusColors.inProgress} />
                <Bar dataKey="pending" name="Pending" stackId="a" fill={statusColors.pending} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{data.reduce((acc, item) => acc + item.completed + item.inProgress + item.pending, 0)}</div>
            <div className="text-sm text-gray-400 mt-1">Across all categories</div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">68%</div>
            <div className="text-sm text-gray-400 mt-1">Of assigned tasks</div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Avg. Completion Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">4.2h</div>
            <div className="text-sm text-gray-400 mt-1">Per task</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskDistribution;
