
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart3, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEfficiencyData } from './useEfficiencyData';
import EfficiencyOverview from './EfficiencyOverview';
import EfficiencyCharts from './EfficiencyCharts';
import { performanceMonitor } from '@/utils/performanceMonitor';

interface EfficiencyAnalysisProps {
  projectId?: string;
}

const EfficiencyAnalysis: React.FC<EfficiencyAnalysisProps> = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    efficiency, 
    completionRate, 
    isLoading, 
    isRefreshing, 
    handleRefresh 
  } = useEfficiencyData(projectId);

  // Track component render time
  React.useEffect(() => {
    const endTimer = performanceMonitor.startTimer('efficiency_analysis_render');
    return () => {
      endTimer();
    };
  }, []);

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
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <EfficiencyOverview 
                efficiency={efficiency}
                completionRate={completionRate}
              />
            </TabsContent>
            
            <TabsContent value="charts">
              <EfficiencyCharts 
                efficiency={efficiency}
                completionRate={completionRate}
              />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default EfficiencyAnalysis;
