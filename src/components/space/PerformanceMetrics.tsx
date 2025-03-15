
import React, { useState, useEffect } from 'react';
import { BarChart4, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/components/ui/use-toast';
import { getMetrics } from '@/integrations/supabase/client';

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
  const { toast } = useToast();

  useEffect(() => {
    const fetchMetrics = async () => {
      // Use a demo project ID if none is provided
      const demoProjectId = "00000000-0000-0000-0000-000000000000";
      const activeProjectId = projectId || demoProjectId;
      
      try {
        setIsLoading(true);
        const metricsData = await getMetrics(activeProjectId);
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
        {isLoading ? (
          <div className="text-center py-4">Loading metrics...</div>
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
