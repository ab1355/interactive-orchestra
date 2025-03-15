
import { EfficiencyMetrics, TaskCompletionRate } from '@/types/flow';

// Efficiency Analysis Services
export const getProjectEfficiency = async (projectId: string): Promise<EfficiencyMetrics> => {
  // In a real implementation, this would call the database
  // For now, return mock data for demonstration
  return {
    completionRate: 78,
    resourceUtilization: 85,
    avgTaskDuration: 3.5
  };
};

export const getTasksCompletionRate = async (projectId: string): Promise<TaskCompletionRate> => {
  // In a real implementation, this would calculate from tasks table
  // For now, return mock data for demonstration
  return {
    rate: 78,
    total: 50,
    completed: 39
  };
};
