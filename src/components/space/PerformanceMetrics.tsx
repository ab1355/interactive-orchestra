
import React from 'react';
import { BarChart4, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricData {
  id: string;
  name: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'neutral';
  change: number;
  unit: string;
}

const SAMPLE_METRICS: MetricData[] = [
  { id: 'm1', name: 'Revenue Growth', current: 8.3, target: 10, trend: 'up', change: 2.1, unit: '%' },
  { id: 'm2', name: 'Customer Satisfaction', current: 4.2, target: 4.5, trend: 'up', change: 0.3, unit: '/5' },
  { id: 'm3', name: 'Operational Costs', current: 6.8, target: 5, trend: 'down', change: -1.2, unit: '%' },
  { id: 'm4', name: 'Team Productivity', current: 82, target: 85, trend: 'up', change: 4, unit: '%' },
];

const CHART_DATA = [
  { month: 'Jan', actual: 65, target: 70 },
  { month: 'Feb', actual: 67, target: 72 },
  { month: 'Mar', actual: 70, target: 74 },
  { month: 'Apr', actual: 73, target: 76 },
  { month: 'May', actual: 75, target: 78 },
  { month: 'Jun', actual: 78, target: 80 },
];

const getTrendIcon = (trend: MetricData['trend'], change: number) => {
  if (trend === 'up') {
    return <TrendingUp className={`w-4 h-4 ${change > 0 ? 'text-green-500' : 'text-red-500'}`} />;
  } else if (trend === 'down') {
    return <TrendingDown className={`w-4 h-4 ${change < 0 ? 'text-green-500' : 'text-red-500'}`} />;
  }
  return null;
};

const PerformanceMetrics = () => {
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
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {SAMPLE_METRICS.map((metric) => (
              <div key={metric.id} className="bg-black/20 p-3 rounded-md">
                <div className="flex justify-between items-start">
                  <div className="text-sm text-gray-400">{metric.name}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {getTrendIcon(metric.trend, metric.change)}
                    <span className={`${
                      (metric.trend === 'up' && metric.change > 0) || (metric.trend === 'down' && metric.change < 0) 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-end justify-between">
                  <div className="text-xl font-bold">{metric.current}{metric.unit}</div>
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
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
