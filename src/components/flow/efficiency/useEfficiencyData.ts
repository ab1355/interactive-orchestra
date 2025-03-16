
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { EfficiencyMetrics, TaskCompletionRate } from '@/types/flow';
import { getProjectEfficiency, getTasksCompletionRate } from '@/integrations/supabase/client';
import { dataCache } from '@/utils/cacheUtils';
import { performanceMonitor } from '@/utils/performanceMonitor';

export const useEfficiencyData = (projectId?: string) => {
  const [efficiency, setEfficiency] = useState<EfficiencyMetrics | null>(null);
  const [completionRate, setCompletionRate] = useState<TaskCompletionRate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  // Helper function to fetch data
  const fetchData = async (forceRefresh = false) => {
    if (!projectId) {
      setEfficiency(null);
      setCompletionRate(null);
      setIsLoading(false);
      return;
    }
    
    const cacheKeyEfficiency = `efficiency_${projectId}`;
    const cacheKeyCompletion = `completion_${projectId}`;
    
    // Check cache first unless force refresh is requested
    if (!forceRefresh) {
      const cachedEfficiency = dataCache.get<EfficiencyMetrics>(cacheKeyEfficiency);
      const cachedCompletionRate = dataCache.get<TaskCompletionRate>(cacheKeyCompletion);
      
      if (cachedEfficiency && cachedCompletionRate) {
        setEfficiency(cachedEfficiency);
        setCompletionRate(cachedCompletionRate);
        setIsLoading(false);
        return;
      }
    }
    
    try {
      const start = performance.now();
      setIsLoading(true);
      
      const [efficiencyData, completionRateData] = await Promise.all([
        getProjectEfficiency(projectId),
        getTasksCompletionRate(projectId)
      ]);
      
      // Track performance
      const end = performance.now();
      performanceMonitor.trackMetric('efficiency_data_fetch_time', end - start);
      
      // Cache the results
      dataCache.set(cacheKeyEfficiency, efficiencyData);
      dataCache.set(cacheKeyCompletion, completionRateData);
      
      setEfficiency(efficiencyData);
      setCompletionRate(completionRateData);
    } catch (error) {
      console.error('Error fetching efficiency data:', error);
      performanceMonitor.logError(error as Error);
      
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
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
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
    
    setIsRefreshing(true);
    await fetchData(true);
    
    toast({
      title: "Data refreshed",
      description: "Efficiency metrics have been updated."
    });
  };

  return {
    efficiency,
    completionRate,
    isLoading,
    isRefreshing,
    handleRefresh
  };
};
