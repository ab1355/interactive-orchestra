
import { supabase } from '../client';

/**
 * Cleans up data from a specific table
 * @param tableName The name of the table to clean up
 * @returns A promise that resolves when the cleanup is complete
 */
export const cleanupTable = async (tableName: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows
    
    if (error) {
      console.error(`Error cleaning up ${tableName}:`, error);
      return { 
        success: false, 
        message: `Failed to clean up ${tableName}: ${error.message}` 
      };
    }
    
    return { 
      success: true, 
      message: `Successfully cleaned up ${tableName}` 
    };
  } catch (error) {
    console.error(`Error cleaning up ${tableName}:`, error);
    return { 
      success: false, 
      message: `Failed to clean up ${tableName}: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
};

/**
 * Cleans up all project-related data
 * @returns A promise that resolves when the cleanup is complete
 */
export const cleanupAllData = async (): Promise<{ success: boolean; message: string; details: Record<string, { success: boolean; message: string }> }> => {
  // The order is important for foreign key constraints
  const tables = [
    'autonomous_executions',
    'prioritized_tasks',
    'tasks',
    'resources', 
    'timeline_events',
    'metrics',
    'ai_suggestions',
    'alerts',
    'goals',
    'projects'
  ];
  
  const results: Record<string, { success: boolean; message: string }> = {};
  let overallSuccess = true;
  
  for (const table of tables) {
    const result = await cleanupTable(table);
    results[table] = result;
    
    if (!result.success) {
      overallSuccess = false;
    }
  }
  
  return {
    success: overallSuccess,
    message: overallSuccess 
      ? 'Successfully cleaned up all data' 
      : 'Failed to clean up some tables. Check details for more information.',
    details: results
  };
};
