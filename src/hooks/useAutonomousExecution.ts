
import { useState, useEffect, useCallback } from 'react';
import { getExecutions, createExecution, updateExecution, getExecution } from '@/services/autonomousExecution';
import { supabase } from '@/integrations/supabase/client';
import { AutonomousExecution } from '@/services/autonomousExecution';

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
  
  const fetchExecutions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const fetchOptions: any = {};
      
      if (options.agentId) {
        fetchOptions.agentId = options.agentId;
      }
      
      const data = await getExecutions(fetchOptions);
      setExecutions(data);
    } catch (err) {
      setError('Failed to fetch executions');
      console.error('Error fetching executions:', err);
    } finally {
      setLoading(false);
    }
  }, [options.agentId]);
  
  const startExecution = useCallback(async (executionData: {
    agent_id: string;
    task_id?: string;
    execution_data?: any;
  }) => {
    try {
      const execution = await createExecution({
        ...executionData,
        status: 'pending'
      });
      
      if (execution) {
        setExecutions(prev => [execution, ...prev]);
        return execution;
      }
      return null;
    } catch (err) {
      setError('Failed to start execution');
      console.error('Error starting execution:', err);
      return null;
    }
  }, []);
  
  const updateExecutionStatus = useCallback(async (
    executionId: string, 
    status: AutonomousExecution['status'],
    result?: any
  ) => {
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
        return updated;
      }
      return null;
    } catch (err) {
      setError('Failed to update execution status');
      console.error('Error updating execution status:', err);
      return null;
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
            }
          } else if (payload.eventType === 'UPDATE') {
            // Ensure the payload.new conforms to AutonomousExecution type
            const updatedExecution = payload.new as AutonomousExecution;
            setExecutions(prev => 
              prev.map(exec => exec.id === updatedExecution.id ? updatedExecution : exec)
            );
          } else if (payload.eventType === 'DELETE') {
            setExecutions(prev => 
              prev.filter(exec => exec.id !== payload.old.id)
            );
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
