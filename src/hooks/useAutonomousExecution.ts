
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { AutonomousExecution } from '@/types/flow';
import { 
  getExecutions, 
  createExecution, 
  updateExecution, 
  getExecution 
} from '@/integrations/supabase/client';

export const useAutonomousExecution = () => {
  const [executions, setExecutions] = useState<AutonomousExecution[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchExecutions = async (options?: {
    agentId?: string;
    status?: AutonomousExecution['status'];
    limit?: number;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getExecutions(options);
      setExecutions(data);
      return data;
    } catch (error) {
      console.error('Error fetching executions:', error);
      setError('Failed to load executions');
      toast({
        title: 'Error',
        description: 'Failed to load executions',
        variant: 'destructive',
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateExecution = async (execution: Omit<AutonomousExecution, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setError(null);
      const newExecution = await createExecution(execution);
      if (newExecution) {
        setExecutions((prev) => [newExecution, ...prev]);
        toast({
          title: 'Success',
          description: 'Execution created successfully',
        });
      }
      return newExecution;
    } catch (error) {
      console.error('Error creating execution:', error);
      setError('Failed to create execution');
      toast({
        title: 'Error',
        description: 'Failed to create execution',
        variant: 'destructive',
      });
      return null;
    }
  };

  const handleUpdateExecution = async (id: string, updates: Partial<AutonomousExecution>) => {
    try {
      setError(null);
      const updatedExecution = await updateExecution(id, updates);
      if (updatedExecution) {
        setExecutions((prev) =>
          prev.map((item) => (item.id === id ? updatedExecution : item))
        );
        toast({
          title: 'Success',
          description: 'Execution updated successfully',
        });
      }
      return updatedExecution;
    } catch (error) {
      console.error('Error updating execution:', error);
      setError('Failed to update execution');
      toast({
        title: 'Error',
        description: 'Failed to update execution',
        variant: 'destructive',
      });
      return null;
    }
  };

  const fetchExecution = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const execution = await getExecution(id);
      return execution;
    } catch (error) {
      console.error('Error fetching execution:', error);
      setError('Failed to load execution');
      toast({
        title: 'Error',
        description: 'Failed to load execution',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executions,
    isLoading,
    error,
    fetchExecutions,
    createExecution: handleCreateExecution,
    updateExecution: handleUpdateExecution,
    fetchExecution,
    setError,
  };
};
