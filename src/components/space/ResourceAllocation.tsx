
import React from 'react';
import { Users, Briefcase, HandCoins } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Resource {
  id: string;
  name: string;
  type: 'human' | 'financial' | 'equipment';
  allocated: number;
  total: number;
  unit: string;
}

const SAMPLE_RESOURCES: Resource[] = [
  { id: 'r1', name: 'Development Team', type: 'human', allocated: 8, total: 10, unit: 'members' },
  { id: 'r2', name: 'Marketing Budget', type: 'financial', allocated: 75000, total: 100000, unit: 'USD' },
  { id: 'r3', name: 'Server Infrastructure', type: 'equipment', allocated: 65, total: 100, unit: 'servers' },
  { id: 'r4', name: 'Design Team', type: 'human', allocated: 3, total: 5, unit: 'members' },
];

const getResourceIcon = (type: Resource['type']) => {
  switch (type) {
    case 'human':
      return <Users className="w-4 h-4 text-blue-400" />;
    case 'financial':
      return <HandCoins className="w-4 h-4 text-green-400" />;
    case 'equipment':
      return <Briefcase className="w-4 h-4 text-amber-400" />;
    default:
      return null;
  }
};

const ResourceAllocation = () => {
  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple" />
          Resource Allocation
        </CardTitle>
        <CardDescription>Optimize resource distribution across initiatives</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {SAMPLE_RESOURCES.map((resource) => (
            <div key={resource.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getResourceIcon(resource.type)}
                  <span className="font-medium">{resource.name}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {resource.allocated} / {resource.total} {resource.unit}
                </span>
              </div>
              <Progress 
                value={(resource.allocated / resource.total) * 100} 
                className="h-2"
              />
            </div>
          ))}
          
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm font-medium mb-2">Resource Allocation Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-black/20 rounded-md">
                <div className="text-blue-400 flex justify-center mb-1">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xs text-gray-400">Human</div>
                <div className="text-sm font-medium">73% Allocated</div>
              </div>
              <div className="p-2 bg-black/20 rounded-md">
                <div className="text-green-400 flex justify-center mb-1">
                  <HandCoins className="w-4 h-4" />
                </div>
                <div className="text-xs text-gray-400">Financial</div>
                <div className="text-sm font-medium">75% Allocated</div>
              </div>
              <div className="p-2 bg-black/20 rounded-md">
                <div className="text-amber-400 flex justify-center mb-1">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="text-xs text-gray-400">Equipment</div>
                <div className="text-sm font-medium">65% Allocated</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceAllocation;
