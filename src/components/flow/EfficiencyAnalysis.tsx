
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart3, PieChart, TrendingUp, Clock, RefreshCw, ArrowUpCircle, ArrowDownCircle, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart as RechartsPC, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { getProjectEfficiency, getTasksCompletionRate } from '@/integrations/supabase/client';
import { EfficiencyMetrics, TaskCompletionRate } from '@/types/flow';

// Chart color constants
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#9cafff'];

// Helper function to generate random data
const getRandomData = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const EfficiencyAnalysis = ({ projectId }: { projectId?: string }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [efficiency, setEfficiency] = useState<EfficiencyMetrics | null>(null);
  const [completionRate, setCompletionRate] = useState<TaskCompletionRate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) {
        setEfficiency(null);
        setCompletionRate(null);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const [efficiencyData, completionRateData] = await Promise.all([
          getProjectEfficiency(projectId),
          getTasksCompletionRate(projectId)
        ]);
        
        setEfficiency(efficiencyData);
        setCompletionRate(completionRateData);
      } catch (error) {
        console.error('Error fetching efficiency data:', error);
        toast({
          title: "Error fetching data",
          description: "Could not load efficiency metrics from the database.",
          variant: "destructive"
        });
        
        // Set fallback mock data
        setEfficiency({
          completionRate: 78,
          resourceUtilization: 85,
          avgTaskDuration: 3.5
        });
        
        setCompletionRate({
          rate: 78,
          total: 50,
          completed: 39
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId, toast]);

  const handleRefresh = async () => {
    if (!projectId) {
      toast({
        title: "Error",
        description: "No project selected",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsRefreshing(true);
      const [efficiencyData, completionRateData] = await Promise.all([
        getProjectEfficiency(projectId),
        getTasksCompletionRate(projectId)
      ]);
      
      setEfficiency(efficiencyData);
      setCompletionRate(completionRateData);
      
      toast({
        title: "Data refreshed",
        description: "Efficiency metrics have been updated."
      });
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast({
        title: "Error refreshing data",
        description: "Could not refresh efficiency metrics. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const pieChartData = [
    { name: 'Completed', value: completionRate?.completed || 0 },
    { name: 'Remaining', value: (completionRate?.total || 0) - (completionRate?.completed || 0) },
  ];

  const barChartData = [
    { name: 'Resource Utilization', value: efficiency?.resourceUtilization || 0 },
  ];

  const lineChartData = [
    { name: 'Week 1', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Week 2', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Week 3', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Week 4', uv: 2780, pv: 3908, amt: 2000 },
  ];

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple" />
          Efficiency Analysis
        </CardTitle>
        <CardDescription>Analyze project efficiency and resource utilization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing || !projectId}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading efficiency data...</div>
        ) : !projectId ? (
          <div className="text-center py-8 text-gray-400">
            Please select a project to view efficiency analysis.
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              {/* <TabsTrigger value="insights">Insights</TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 rounded-md border border-white/10 bg-dark/50">
                  <TrendingUp className="h-6 w-6 text-green-500 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium">Completion Rate</h3>
                    <p className="text-sm text-gray-400">
                      {completionRate?.rate}%
                      <span className="ml-2">
                        {completionRate?.rate && completionRate?.rate > 50 ? (
                          <ArrowUpCircle className="inline-block h-4 w-4 text-green-500 align-middle" />
                        ) : (
                          <ArrowDownCircle className="inline-block h-4 w-4 text-red-500 align-middle" />
                        )}
                      </span>
                    </p>
                    <Progress value={completionRate?.rate || 0} className="mt-2" />
                  </div>
                </div>
                
                <div className="flex items-center p-4 rounded-md border border-white/10 bg-dark/50">
                  <Clock className="h-6 w-6 text-blue-500 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium">Avg Task Duration</h3>
                    <p className="text-sm text-gray-400">{efficiency?.avgTaskDuration} days</p>
                    <Progress value={efficiency?.avgTaskDuration ? 100 - (efficiency?.avgTaskDuration * 10) : 0} className="mt-2" />
                  </div>
                </div>
                
                <div className="flex items-center p-4 rounded-md border border-white/10 bg-dark/50">
                  <PieChart className="h-6 w-6 text-amber-500 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium">Resource Utilization</h3>
                    <p className="text-sm text-gray-400">{efficiency?.resourceUtilization}%</p>
                    <Progress value={efficiency?.resourceUtilization || 0} className="mt-2" />
                  </div>
                </div>
                
                <div className="flex items-center p-4 rounded-md border border-white/10 bg-dark/50">
                  <List className="h-6 w-6 text-purple mr-4" />
                  <div>
                    <h3 className="text-lg font-medium">Total Tasks</h3>
                    <p className="text-sm text-gray-400">{completionRate?.total} tasks</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="charts">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-md border border-white/10 bg-dark/50">
                  <h4 className="text-md font-medium mb-2">Task Completion</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPC width={400} height={300} >
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </RechartsPC>
                  </ResponsiveContainer>
                </div>
                
                <div className="p-4 rounded-md border border-white/10 bg-dark/50">
                  <h4 className="text-md font-medium mb-2">Resource Utilization</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="p-4 rounded-md border border-white/10 bg-dark/50">
                  <h4 className="text-md font-medium mb-2">Weekly Performance</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default EfficiencyAnalysis;
