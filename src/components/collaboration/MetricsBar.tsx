
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { getMetrics, updateMetricsFromGoals } from '@/integrations/supabase/services/metricService';

interface MetricsBarProps {
  projectId?: string;
}

const MetricsBar: React.FC<MetricsBarProps> = ({ projectId }) => {
  const [metrics, setMetrics] = useState({
    totalAgents: 4,
    activeTasks: 0,
    completedTasks: 0,
    successRate: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!projectId) return;

      try {
        setIsLoading(true);
        
        // First, update the metrics based on goals completion
        await updateMetricsFromGoals();
        
        // Then fetch all metrics for the project
        const metricsData = await getMetrics(projectId);
        
        // Process the metrics data to extract the values we need
        let successRateMetric = metricsData.find(m => m.name === 'Goal Completion Rate');
        let activeTasks = metricsData.find(m => m.name === 'Active Tasks');
        let completedTasks = metricsData.find(m => m.name === 'Completed Tasks');
        
        setMetrics({
          totalAgents: 4, // Keeping static for now, could be fetched from agents table
          activeTasks: activeTasks ? Math.round(activeTasks.current_value) : 4,
          completedTasks: completedTasks ? Math.round(completedTasks.current_value) : 24,
          successRate: successRateMetric ? Math.round(successRateMetric.current_value) : 94
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
        toast({
          title: "Error fetching metrics",
          description: "Could not load metrics from the database.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, [projectId, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
        <p className="text-gray-400 text-sm">Total Agents</p>
        <p className="text-white text-2xl font-semibold">{metrics.totalAgents}</p>
      </div>
      <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
        <p className="text-gray-400 text-sm">Active Tasks</p>
        {isLoading ? (
          <div className="flex items-center space-x-2 h-8">
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : (
          <p className="text-white text-2xl font-semibold">{metrics.activeTasks}</p>
        )}
      </div>
      <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
        <p className="text-gray-400 text-sm">Completed Tasks</p>
        {isLoading ? (
          <div className="flex items-center space-x-2 h-8">
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : (
          <p className="text-white text-2xl font-semibold">{metrics.completedTasks}</p>
        )}
      </div>
      <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
        <p className="text-gray-400 text-sm">Success Rate</p>
        {isLoading ? (
          <div className="flex items-center space-x-2 h-8">
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : (
          <p className="text-white text-2xl font-semibold">{metrics.successRate}%</p>
        )}
      </div>
    </div>
  );
};

export default MetricsBar;
