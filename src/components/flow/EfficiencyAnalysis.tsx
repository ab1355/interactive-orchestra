
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TrendingUp, Clock, Activity, AlertCircle, Award, BarChart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { getProjectEfficiency, getTasksCompletionRate } from '@/integrations/supabase/client';

interface EfficiencyData {
  date: string;
  completionRate: number;
  avgTaskDuration: number;
  resourceUtilization: number;
}

interface BottleneckData {
  name: string;
  value: number;
  indicator: 'positive' | 'warning' | 'negative';
}

const EfficiencyAnalysis = ({ projectId }: { projectId?: string }) => {
  const [timeframe, setTimeframe] = useState('week');
  const [efficiencyData, setEfficiencyData] = useState<EfficiencyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completionRate, setCompletionRate] = useState(0);
  const [resourceUtilization, setResourceUtilization] = useState(0);
  const [avgTaskDuration, setAvgTaskDuration] = useState(0);
  
  const bottlenecks: BottleneckData[] = [
    { name: 'Resource Allocation', value: 85, indicator: 'positive' },
    { name: 'Review Process', value: 62, indicator: 'warning' },
    { name: 'Approval Workflow', value: 45, indicator: 'negative' },
    { name: 'Testing Cycle', value: 78, indicator: 'positive' },
  ];

  useEffect(() => {
    const fetchEfficiencyData = async () => {
      if (!projectId) {
        setEfficiencyData([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // In a real application, this would come from the backend
        // For now, we'll generate mock data based on the projectId
        const mockData = generateMockEfficiencyData(timeframe);
        setEfficiencyData(mockData);
        
        // Fetch actual completion rate if available
        const completionData = await getTasksCompletionRate(projectId);
        if (completionData) {
          setCompletionRate(completionData.rate);
        }
        
        // Calculate averages from the mock data
        const avgCompletion = mockData.reduce((acc, item) => acc + item.completionRate, 0) / mockData.length;
        const avgDuration = mockData.reduce((acc, item) => acc + item.avgTaskDuration, 0) / mockData.length;
        const avgUtilization = mockData.reduce((acc, item) => acc + item.resourceUtilization, 0) / mockData.length;
        
        setCompletionRate(completionData?.rate || Math.round(avgCompletion));
        setAvgTaskDuration(Math.round(avgDuration));
        setResourceUtilization(Math.round(avgUtilization));
        
      } catch (error) {
        console.error('Error fetching efficiency data:', error);
        setEfficiencyData([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEfficiencyData();
  }, [projectId, timeframe]);

  const generateMockEfficiencyData = (timeframe: string): EfficiencyData[] => {
    const data: EfficiencyData[] = [];
    let days = 7;
    
    switch (timeframe) {
      case 'month':
        days = 30;
        break;
      case 'quarter':
        days = 90;
        break;
      default:
        days = 7;
    }
    
    // Use the projectId hash to get consistent random numbers for the same project
    const seed = projectId ? hashStringToNumber(projectId) : Date.now();
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      const seedForDay = seed + i;
      const randomFactor = pseudoRandom(seedForDay);
      
      data.push({
        date: date.toISOString().split('T')[0],
        completionRate: 60 + Math.floor(randomFactor * 30),
        avgTaskDuration: 2 + Math.floor(randomFactor * 4),
        resourceUtilization: 70 + Math.floor(randomFactor * 20)
      });
    }
    
    return data;
  };

  // Simple hash function for consistent random numbers
  const hashStringToNumber = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };
  
  // Simple pseudo-random number generator with seed
  const pseudoRandom = (seed: number): number => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Generate chart data in the appropriate format
  const getChartData = () => {
    return efficiencyData.map(item => ({
      date: item.date,
      'Completion Rate': item.completionRate,
      'Resource Utilization': item.resourceUtilization,
      'Task Duration': item.avgTaskDuration
    }));
  };

  const chartConfig = {
    completionRate: {
      label: 'Completion Rate',
      theme: {
        light: '#8B5CF6',
        dark: '#8B5CF6',
      },
    },
    resourceUtilization: {
      label: 'Resource Utilization',
      theme: {
        light: '#10B981',
        dark: '#10B981',
      },
    },
    taskDuration: {
      label: 'Task Duration',
      theme: {
        light: '#F59E0B',
        dark: '#F59E0B',
      },
    }
  };

  const formatBottleneckIndicator = (indicator: 'positive' | 'warning' | 'negative') => {
    switch (indicator) {
      case 'positive':
        return 'bg-green-900/30 text-green-400';
      case 'warning':
        return 'bg-amber-900/30 text-amber-400';
      case 'negative':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple" />
          Efficiency Analysis
        </CardTitle>
        <CardDescription>Track and optimize workflow performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Performance Metrics</h3>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading efficiency data...</div>
        ) : !projectId ? (
          <div className="text-center py-8 text-gray-400">
            Please select a project to view efficiency analysis.
          </div>
        ) : (
          <>
            {/* Key metrics section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg border border-white/10 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-gray-400">Task Completion Rate</p>
                    <p className="text-2xl font-bold">{completionRate}%</p>
                  </div>
                  <Award className="h-8 w-8 text-purple opacity-80" />
                </div>
                <Progress value={completionRate} className="h-2 mt-2" />
              </div>
              
              <div className="rounded-lg border border-white/10 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-gray-400">Resource Utilization</p>
                    <p className="text-2xl font-bold">{resourceUtilization}%</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500 opacity-80" />
                </div>
                <Progress value={resourceUtilization} className="h-2 mt-2" />
              </div>
              
              <div className="rounded-lg border border-white/10 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-gray-400">Avg. Task Duration</p>
                    <p className="text-2xl font-bold">{avgTaskDuration} days</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-500 opacity-80" />
                </div>
                <div className="h-2 mt-2">
                  {/* Custom progress visualization for duration */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i < avgTaskDuration ? 'bg-amber-500' : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance charts */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-4">Performance Trends</h4>
              <div className="h-72">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="date" stroke="#666" />
                      <YAxis stroke="#666" />
                      <ChartTooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="Completion Rate" 
                        stroke="#8B5CF6" 
                        fill="#8B5CF6" 
                        fillOpacity={0.2} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Resource Utilization" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            
            {/* Bottleneck analysis */}
            <div>
              <h4 className="text-sm font-medium mb-4">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                  Bottleneck Analysis
                </div>
              </h4>
              <div className="space-y-3">
                {bottlenecks.map((bottleneck, index) => (
                  <div key={index} className="rounded-lg border border-white/10 p-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm">{bottleneck.name}</p>
                      <Badge className={formatBottleneckIndicator(bottleneck.indicator)}>
                        {bottleneck.value}%
                      </Badge>
                    </div>
                    <Progress value={bottleneck.value} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EfficiencyAnalysis;
