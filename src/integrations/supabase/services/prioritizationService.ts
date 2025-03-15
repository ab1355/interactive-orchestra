
import { supabase } from '../client';
import { getTasks } from './taskService';
import { PrioritizedTask, PriorityFactors } from '@/types/flow';

// Task Prioritization Services
export const getPrioritizedTasks = async (projectId: string): Promise<PrioritizedTask[]> => {
  try {
    const { data: tasksData, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId);
      
    if (tasksError) {
      throw tasksError;
    }
    
    const { data: priorityData, error: priorityError } = await supabase
      .from('prioritized_tasks')
      .select('*')
      .eq('project_id', projectId);
      
    if (priorityError && priorityError.code !== "42P01") {
      throw priorityError;
    }
    
    // Combine task data with priority data
    const prioritizedTasks: PrioritizedTask[] = tasksData?.map(task => {
      const priorityInfo = priorityData?.find(p => p.task_id === task.id);
      
      if (priorityInfo) {
        return {
          ...task,
          priority_score: priorityInfo.priority_score,
          deadline_factor: priorityInfo.deadline_factor,
          impact_factor: priorityInfo.impact_factor,
          effort_factor: priorityInfo.effort_factor,
          complexity_factor: priorityInfo.complexity_factor,
          dependencies_factor: priorityInfo.dependencies_factor
        };
      } else {
        // If no priority data exists, create with default values
        const priorityScore = Math.round(Math.random() * 100);
        return {
          ...task,
          priority_score: priorityScore,
          deadline_factor: Math.round(Math.random() * 100),
          impact_factor: Math.round(Math.random() * 100),
          effort_factor: Math.round(Math.random() * 100),
          complexity_factor: Math.round(Math.random() * 100),
          dependencies_factor: Math.round(Math.random() * 100)
        };
      }
    }) || [];
    
    return prioritizedTasks.sort((a, b) => b.priority_score - a.priority_score);
    
  } catch (error) {
    console.error('Error fetching prioritized tasks:', error);
    
    // Return mock data as fallback
    const mockTasks = await getTasks(projectId);
    return mockTasks.map(task => ({
      ...task,
      priority_score: Math.round(Math.random() * 100),
      deadline_factor: Math.round(Math.random() * 100),
      impact_factor: Math.round(Math.random() * 100),
      effort_factor: Math.round(Math.random() * 100),
      complexity_factor: Math.round(Math.random() * 100),
      dependencies_factor: Math.round(Math.random() * 100)
    }));
  }
};

export const setPriorityFactors = async (projectId: string, factors: PriorityFactors): Promise<{
  success: boolean;
  projectId: string;
  factors: PriorityFactors;
}> => {
  // In a real implementation, this would update the priority factors in the database
  // For now, just log and return mock success data
  console.log('Setting priority factors for project', projectId, factors);
  return {
    success: true,
    projectId,
    factors
  };
};
