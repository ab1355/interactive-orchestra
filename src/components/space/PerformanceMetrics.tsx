
import React, { useState, useEffect } from 'react';
import { BarChart4, TrendingUp, TrendingDown, Target, Plus, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { getMetrics, createMetric, updateMetric } from '@/integrations/supabase/client';

interface Metric {
  id: string;
  name: string;
  current_value: number;
  target: number;
  unit: string;
  description?: string;
}

// Sample chart data - would be replaced with real data in a full implementation
const CHART_DATA = [
  { month: 'Jan', actual: 65, target: 70 },
  { month: 'Feb', actual: 67, target: 72 },
  { month: 'Mar', actual: 70, target: 74 },
  { month: 'Apr', actual: 73, target: 76 },
  { month: 'May', actual: 75, target: 78 },
  { month: 'Jun', actual: 78, target: 80 },
];

const getTrendIcon = (current: number, target: number) => {
  const trend = current > target ? 'up' : 'down';
  const change = current - target;

  if (trend === 'up') {
    return <TrendingUp className={`w-4 h-4 ${change > 0 ? 'text-green-500' : 'text-red-500'}`} />;
  } else {
    return <TrendingDown className={`w-4 h-4 ${change < 0 ? 'text-red-500' : 'text-green-500'}`} />;
  }
};

const PerformanceMetrics = ({ projectId }: { projectId?: string }) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMetric, setNewMetric] = useState({
    name: '',
    description: '',
    target: 100,
    current_value: 0,
    unit: '%'
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!projectId) {
        setMetrics([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const metricsData = await getMetrics(projectId);
        setMetrics(metricsData);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        toast({
          title: "Error fetching metrics",
          description: "Could not load metrics from the database.",
          variant: "destructive"
        });
        // Set empty array if error occurs
        setMetrics([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [projectId, toast]);

  const handleAddNewMetric = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectId) {
      toast({
        title: "Error",
        description: "No project selected",
        variant: "destructive"
      });
      return;
    }

    if (!newMetric.name.trim()) {
      toast({
        title: "Error",
        description: "Metric name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const metricData = {
        project_id: projectId,
        name: newMetric.name,
        description: newMetric.description,
        target: newMetric.target,
        current_value: newMetric.current_value,
        unit: newMetric.unit
      };
      
      const createdMetric = await createMetric(metricData);
      setMetrics([...metrics, createdMetric]);
      
      toast({
        title: "Metric created",
        description: `Metric "${createdMetric.name}" has been created successfully.`
      });
      
      // Reset form and close dialog
      setNewMetric({
        name: '',
        description: '',
        target: 100,
        current_value: 0,
        unit: '%'
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating metric:', error);
      toast({
        title: "Error creating metric",
        description: "Could not create the metric. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateMetricValue = async (id: string, newValue: number) => {
    try {
      await updateMetric(id, { current_value: newValue });
      setMetrics(metrics.map(metric => 
        metric.id === id ? { ...metric, current_value: newValue } : metric
      ));
      
      toast({
        title: "Metric updated",
        description: `Metric value has been updated successfully.`
      });
    } catch (error) {
      console.error('Error updating metric:', error);
      toast({
        title: "Error updating metric",
        description: "Could not update the metric. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart4 className="w-5 h-5 text-purple" />
          Performance Metrics
        </CardTitle>
        <CardDescription>Track and analyze key performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">Key Metrics</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                disabled={!projectId}
                onClick={() => projectId ? setIsDialogOpen(true) : null}
              >
                <Plus className="w-4 h-4 mr-1" /> New Metric
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddNewMetric}>
                <DialogHeader>
                  <DialogTitle>Add New Metric</DialogTitle>
                  <DialogDescription>
                    Define a new key performance indicator for your project.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newMetric.name}
                      onChange={(e) => setNewMetric({...newMetric, name: e.target.value})}
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
                      value={newMetric.description}
                      onChange={(e) => setNewMetric({...newMetric, description: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="target" className="text-right">
                      Target
                    </Label>
                    <Input
                      id="target"
                      type="number"
                      value={newMetric.target}
                      onChange={(e) => setNewMetric({...newMetric, target: parseFloat(e.target.value)})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="current_value" className="text-right">
                      Current Value
                    </Label>
                    <Input
                      id="current_value"
                      type="number"
                      value={newMetric.current_value}
                      onChange={(e) => setNewMetric({...newMetric, current_value: parseFloat(e.target.value)})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="unit" className="text-right">
                      Unit
                    </Label>
                    <Input
                      id="unit"
                      value={newMetric.unit}
                      onChange={(e) => setNewMetric({...newMetric, unit: e.target.value})}
                      className="col-span-3"
                      placeholder="%, $, hrs, etc."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Metric
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      
        {isLoading ? (
          <div className="text-center py-4">Loading metrics...</div>
        ) : !projectId ? (
          <div className="text-center py-4 text-gray-400">
            Please select a project to view metrics.
          </div>
        ) : metrics.length === 0 ? (
          <div className="text-center py-4 text-gray-400">
            No metrics found. Define key performance indicators to track progress.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-black/20 p-3 rounded-md">
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-400">{metric.name}</div>
                    <div className="flex items-center gap-1 text-xs">
                      {getTrendIcon(metric.current_value, metric.target)}
                      <span className={`${
                        metric.current_value >= metric.target ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {(metric.current_value - metric.target).toFixed(1)}{metric.unit}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <div className="text-xl font-bold">{metric.current_value}{metric.unit}</div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Target className="w-3 h-3 mr-1" />
                      Target: {metric.target}{metric.unit}
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/10 flex justify-end">
                    <div className="text-xs">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2"
                        onClick={() => handleUpdateMetricValue(metric.id, Math.min(metric.current_value + 5, 100))}
                      >
                        + Update
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-medium mb-3">Performance Trends (6 Month)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={CHART_DATA}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#888" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#888" />
                    <Tooltip 
                      contentStyle={{ background: '#333', border: 'none', borderRadius: '4px' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                    <Bar dataKey="actual" name="Actual" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" name="Target" fill="#4ADE80" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
