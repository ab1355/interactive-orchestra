
import { useState, useEffect, useCallback } from 'react';
import { getExecutions, createExecution, updateExecution, getExecution } from '@/services/autonomousExecution';
import { supabase } from '@/integrations/supabase/client';
import { AutonomousExecution } from '@/services/autonomousExecution';
import { dataCache } from '@/utils/cacheUtils';
import { performanceMonitor } from '@/utils/performanceMonitor';

interface UseAutonomousExecutionOptions {
  agentId?: string;
  taskId?: string;
  autoFetch?: boolean;
  fetchInterval?: number;
}

export const useAutonomousExecution = (options: UseAutonomousExecutionOptions = {}) => {
  const [executions, setExecutions] = useState<AutonomousExecution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Generate a cache key based on options
  const getCacheKey = useCallback(() => {
    const parts = ['executions'];
    if (options.agentId) parts.push(`agent_${options.agentId}`);
    if (options.taskId) parts.push(`task_${options.taskId}`);
    return parts.join(':');
  }, [options.agentId, options.taskId]);
  
  const fetchExecutions = useCallback(async () => {
    const cacheKey = getCacheKey();
    
    // Check cache first
    const cachedData = dataCache.get<AutonomousExecution[]>(cacheKey);
    if (cachedData) {
      setExecutions(cachedData);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const perfTimer = performanceMonitor.startTimer('fetch_executions');
    
    try {
      const fetchOptions: any = {};
      
      if (options.agentId) {
        fetchOptions.agentId = options.agentId;
      }
      
      const data = await getExecutions(fetchOptions);
      setExecutions(data);
      
      // Cache the result
      dataCache.set(cacheKey, data);
      
      performanceMonitor.trackEvent('executions_fetched', { 
        count: data.length, 
        agentId: options.agentId 
      });
    } catch (err) {
      setError('Failed to fetch executions');
      console.error('Error fetching executions:', err);
      performanceMonitor.logError(err as Error, { 
        context: 'fetchExecutions', 
        options 
      });
    } finally {
      setLoading(false);
      perfTimer();
    }
  }, [options.agentId, getCacheKey]);
  
  const startExecution = useCallback(async (executionData: {
    agent_id: string;
    task_id?: string;
    execution_data?: any;
  }) => {
    const perfTimer = performanceMonitor.startTimer('start_execution');
    
    try {
      const execution = await createExecution({
        ...executionData,
        status: 'pending'
      });
      
      if (execution) {
        setExecutions(prev => [execution, ...prev]);
        
        // Invalidate cache
        dataCache.invalidateByPrefix('executions');
        
        performanceMonitor.trackEvent('execution_started', { 
          agentId: executionData.agent_id, 
          taskId: executionData.task_id 
        });
        
        return execution;
      }
      return null;
    } catch (err) {
      setError('Failed to start execution');
      console.error('Error starting execution:', err);
      performanceMonitor.logError(err as Error, { 
        context: 'startExecution',
        executionData
      });
      return null;
    } finally {
      perfTimer();
    }
  }, []);
  
  const updateExecutionStatus = useCallback(async (
    executionId: string, 
    status: AutonomousExecution['status'],
    result?: any
  ) => {
    const perfTimer = performanceMonitor.startTimer('update_execution');
    
    try {
      const updates: Partial<AutonomousExecution> = { status };
      
      if (result) {
        updates.result = result;
      }
      
      const updated = await updateExecution(executionId, updates);
      
      if (updated) {
        setExecutions(prev => 
          prev.map(exec => exec.id === executionId ? updated : exec)
        );
        
        // Invalidate cache
        dataCache.invalidateByPrefix('executions');
        
        performanceMonitor.trackEvent('execution_updated', { 
          executionId, 
          status 
        });
        
        return updated;
      }
      return null;
    } catch (err) {
      setError('Failed to update execution status');
      console.error('Error updating execution status:', err);
      performanceMonitor.logError(err as Error, { 
        context: 'updateExecutionStatus',
        executionId,
        status
      });
      return null;
    } finally {
      perfTimer();
    }
  }, []);
  
  // Listen for realtime updates
  useEffect(() => {
    const channel = supabase.channel('execution-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'autonomous_executions'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Filter if agentId is specified
            if (!options.agentId || payload.new.agent_id === options.agentId) {
              // Ensure the payload.new conforms to AutonomousExecution type
              const newExecution = payload.new as AutonomousExecution;
              setExecutions(prev => [newExecution, ...prev]);
              
              // Invalidate cache
              dataCache.invalidateByPrefix('executions');
              
              performanceMonitor.trackEvent('realtime_execution_insert', {
                executionId: newExecution.id
              });
            }
          } else if (payload.eventType === 'UPDATE') {
            // Ensure the payload.new conforms to AutonomousExecution type
            const updatedExecution = payload.new as AutonomousExecution;
            setExecutions(prev => 
              prev.map(exec => exec.id === updatedExecution.id ? updatedExecution : exec)
            );
            
            // Invalidate cache
            dataCache.invalidateByPrefix('executions');
            
            performanceMonitor.trackEvent('realtime_execution_update', {
              executionId: updatedExecution.id,
              status: updatedExecution.status
            });
          } else if (payload.eventType === 'DELETE') {
            setExecutions(prev => 
              prev.filter(exec => exec.id !== payload.old.id)
            );
            
            // Invalidate cache
            dataCache.invalidateByPrefix('executions');
            
            performanceMonitor.trackEvent('realtime_execution_delete', {
              executionId: payload.old.id
            });
          }
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [options.agentId]);
  
  // Initial fetch and polling if autoFetch is enabled
  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchExecutions();
      
      if (options.fetchInterval) {
        const interval = setInterval(fetchExecutions, options.fetchInterval);
        return () => clearInterval(interval);
      }
    }
  }, [fetchExecutions, options.autoFetch, options.fetchInterval]);
  
  return {
    executions,
    loading,
    error,
    fetchExecutions,
    startExecution,
    updateExecutionStatus
  };
};

export default useAutonomousExecution;
