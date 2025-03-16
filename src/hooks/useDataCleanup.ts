
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { cleanupTable, cleanupAllData } from '@/integrations/supabase/client';

export const useDataCleanup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const resetTable = async (tableName: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await cleanupTable(tableName);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
        });
        return true;
      } else {
        setError(result.message);
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: `Failed to reset table: ${errorMessage}`,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetAllData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await cleanupAllData();
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
        });
        return true;
      } else {
        const failedTables = Object.entries(result.details)
          .filter(([_, detail]) => !detail.success)
          .map(([table]) => table)
          .join(', ');
          
        setError(`Failed to reset some tables: ${failedTables}`);
        toast({
          title: 'Warning',
          description: result.message,
          variant: 'destructive',
        });
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: `Failed to reset all data: ${errorMessage}`,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resetTable,
    resetAllData,
    isLoading,
    error,
  };
};
