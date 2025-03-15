
import { createClient } from '@supabase/supabase-js';
import { getTasks, createTask, updateTaskStatus, invalidateCacheByPrefix } from './services/taskService';

// Initialize the Supabase client with correct project URL and API key
const supabaseUrl = 'https://yvtjimbvpuclcgvnmvyh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dGppbWJ2cHVjbGNndm5tdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMDYzMTksImV4cCI6MjA1NzU4MjMxOX0.VnjEht3dkgBV94NbyISAabrRq4tyW04X8fZ_dvdNBrM';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Service functions exports
// Task management
export { getTasks, createTask, updateTaskStatus, invalidateCacheByPrefix };

// Project management
export const getProjects = async () => {
  try {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const createProject = async (projectData: any) => {
  try {
    const { data, error } = await supabase.from('projects').insert(projectData).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Goals management
export const getGoals = async (projectId: string) => {
  try {
    const { data, error } = await supabase.from('goals').select('*').eq('project_id', projectId);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching goals:', error);
    return [];
  }
};

export const createGoal = async (goalData: any) => {
  try {
    const { data, error } = await supabase.from('goals').insert(goalData).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateGoal = async (goalId: string, updates: any) => {
  try {
    const { data, error } = await supabase.from('goals').update(updates).eq('id', goalId).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error;
  }
};

// Efficiency analysis
export const getProjectEfficiency = async (projectId: string) => {
  try {
    // In a real app, this would query metrics from Supabase
    // For now, return mock data
    return {
      completionRate: 78,
      resourceUtilization: 85,
      avgTaskDuration: 3.5
    };
  } catch (error) {
    console.error('Error fetching efficiency data:', error);
    throw error;
  }
};

export const getTasksCompletionRate = async (projectId: string) => {
  try {
    // In a real app, this would query task stats from Supabase
    // For now, return mock data
    return {
      rate: 78,
      total: 50,
      completed: 39
    };
  } catch (error) {
    console.error('Error fetching task completion data:', error);
    throw error;
  }
};

// Alerts
export const getProjectAlerts = async (projectId: string) => {
  try {
    const { data, error } = await supabase.from('alerts').select('*').eq('project_id', projectId);
    if (error) throw error;
    
    // If no data or empty array, return mock alerts for demonstration
    if (!data || data.length === 0) {
      return [
        {
          id: '1',
          type: 'critical',
          title: 'Task Deadline Approaching',
          description: 'High priority task "Database Schema Design" is due in 2 days',
          source: 'tasks',
          created_at: new Date().toISOString(),
          is_read: false,
          project_id: projectId
        },
        {
          id: '2',
          type: 'warning',
          title: 'Resource Utilization High',
          description: 'Development team is at 90% capacity',
          source: 'resources',
          created_at: new Date().toISOString(),
          is_read: false,
          project_id: projectId
        },
        {
          id: '3',
          type: 'info',
          title: 'New Project Milestone',
          description: 'Phase 1 completion scheduled for next week',
          source: 'timeline',
          created_at: new Date().toISOString(),
          is_read: true,
          project_id: projectId
        }
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return [];
  }
};

export const dismissAlert = async (alertId: string) => {
  try {
    const { data, error } = await supabase.from('alerts').update({ is_read: true }).eq('id', alertId).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error dismissing alert:', error);
    throw error;
  }
};

// Task prioritization
export const getPrioritizedTasks = async (projectId: string) => {
  try {
    const { data, error } = await supabase.from('prioritized_tasks').select('*').eq('project_id', projectId);
    if (error) throw error;
    
    // If no data or empty array, generate mock data
    if (!data || data.length === 0) {
      const mockTasks = [
        {
          id: '1',
          task_id: 'mock-1',
          project_id: projectId,
          priority_score: 85,
          deadline_factor: 0.8,
          impact_factor: 0.9,
          effort_factor: 0.6,
          complexity_factor: 0.7,
          dependencies_factor: 0.5,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          task_id: 'mock-2',
          project_id: projectId,
          priority_score: 75,
          deadline_factor: 0.7,
          impact_factor: 0.8,
          effort_factor: 0.5,
          complexity_factor: 0.6,
          dependencies_factor: 0.7,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          task_id: 'mock-3',
          project_id: projectId,
          priority_score: 60,
          deadline_factor: 0.5,
          impact_factor: 0.7,
          effort_factor: 0.4,
          complexity_factor: 0.5,
          dependencies_factor: 0.4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      return mockTasks;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching prioritized tasks:', error);
    return [];
  }
};

export const setPriorityFactors = async (taskId: string, factors: any) => {
  try {
    const { data, error } = await supabase.from('prioritized_tasks').update(factors).eq('task_id', taskId).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating priority factors:', error);
    throw error;
  }
};

// Resources
export const getResources = async (projectId: string) => {
  try {
    const { data, error } = await supabase.from('resources').select('*').eq('project_id', projectId);
    if (error) throw error;
    
    // If no data or empty array, generate mock data
    if (!data || data.length === 0) {
      return [
        {
          id: '1',
          name: 'Development Team',
          type: 'human',
          quantity: 5,
          availability: 'available',
          project_id: projectId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Project Budget',
          type: 'financial',
          quantity: 50000,
          availability: 'available',
          project_id: projectId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Server Infrastructure',
          type: 'equipment',
          quantity: 3,
          availability: 'allocated',
          project_id: projectId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
};

export const createResource = async (resourceData: any) => {
  try {
    const { data, error } = await supabase.from('resources').insert(resourceData).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

// Timeline events
export const getTimelineEvents = async (projectId: string) => {
  try {
    const { data, error } = await supabase.from('timeline_events').select('*').eq('project_id', projectId);
    if (error) throw error;
    
    // If no data or empty array, generate mock data
    if (!data || data.length === 0) {
      const today = new Date();
      return [
        {
          id: '1',
          title: 'Project Kickoff',
          description: 'Initial meeting and project setup',
          start_date: new Date(today.setDate(today.getDate() - 30)).toISOString().split('T')[0],
          end_date: new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0],
          status: 'completed',
          project_id: projectId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Design Phase',
          description: 'UI/UX design and prototyping',
          start_date: new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0],
          end_date: new Date(today.setDate(today.getDate() + 15)).toISOString().split('T')[0],
          status: 'in_progress',
          project_id: projectId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Development Sprint 1',
          description: 'Core functionality implementation',
          start_date: new Date(today.setDate(today.getDate() + 16)).toISOString().split('T')[0],
          end_date: new Date(today.setDate(today.getDate() + 30)).toISOString().split('T')[0],
          status: 'upcoming',
          project_id: projectId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching timeline events:', error);
    return [];
  }
};

export const createTimelineEvent = async (eventData: any) => {
  try {
    const { data, error } = await supabase.from('timeline_events').insert(eventData).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating timeline event:', error);
    throw error;
  }
};

// Performance metrics
export const getMetrics = async (projectId: string) => {
  try {
    const { data, error } = await supabase.from('metrics').select('*').eq('project_id', projectId);
    if (error) throw error;
    
    // If no data or empty array, generate mock data
    if (!data || data.length === 0) {
      return [
        {
          id: '1',
          name: 'Code Quality',
          description: 'Measured by code review ratings',
          current_value: 85,
          target: 90,
          unit: '%',
          project_id: projectId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Team Velocity',
          description: 'Story points completed per sprint',
          current_value: 32,
          target: 40,
          unit: 'pts',
          project_id: projectId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Customer Satisfaction',
          description: 'Based on stakeholder feedback',
          current_value: 4.2,
          target: 4.5,
          unit: '/5',
          project_id: projectId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return [];
  }
};

export const createMetric = async (metricData: any) => {
  try {
    const { data, error } = await supabase.from('metrics').insert(metricData).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating metric:', error);
    throw error;
  }
};

export const updateMetric = async (metricId: string, updates: any) => {
  try {
    const { data, error } = await supabase.from('metrics').update(updates).eq('id', metricId).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating metric:', error);
    throw error;
  }
};
