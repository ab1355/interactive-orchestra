
import { supabase } from '../client';

// Alert Services
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
