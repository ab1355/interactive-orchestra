
import React from 'react';
import { Calendar, Target, Users, BarChart4, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const SpaceSystem = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">SPACE System</h1>
        <p className="text-muted-foreground">
          Strategic Planning And Capacity Evaluation system for resource management and goal tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple" />
              Goal Management
            </CardTitle>
            <CardDescription>Create and track strategic goals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              Organize objectives in a hierarchical structure with clear KPIs and ownership tracking.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple" />
              Resource Allocation
            </CardTitle>
            <CardDescription>Optimize resource distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              Efficiently allocate personnel, budget, and equipment to maximize productivity.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple" />
              Timeline Planning
            </CardTitle>
            <CardDescription>Schedule with dependencies</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              Create detailed timelines with dependency tracking and critical path analysis.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart4 className="w-5 h-5 text-purple" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Track progress and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              Monitor KPIs, analyze variances, and create performance forecasts.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-dark-accent border-white/10">
        <CardHeader>
          <CardTitle>Strategic Planning Dashboard</CardTitle>
          <CardDescription>
            Comprehensive overview of your strategic initiatives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 border border-dashed border-white/10 rounded-md">
            <p className="text-muted-foreground">Dashboard visualizations coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpaceSystem;
