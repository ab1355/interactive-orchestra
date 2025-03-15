
import { supabase } from '../client';
import { Alert } from '@/types/flow';

// Alert System Services
export const getProjectAlerts = async (projectId: string): Promise<Alert[]> => {
  try {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
      
    if (error) {
      if (error.code === "42P01") { // relation "alerts" does not exist
        console.warn("Alerts table doesn't exist, returning mock data");
        // Return mock alerts
        return [
          {
            id: '1',
            title: 'Resource bottleneck detected',
            description: 'Design team is over-allocated for the next sprint, which might delay project delivery',
            type: 'critical',
            created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            is_read: false,
            source: 'Resource Allocation',
            project_id: projectId,
          },
          {
            id: '2',
            title: 'Task deadline approaching',
            description: 'The "Create UI wireframes" task is due in 24 hours with no progress update',
            type: 'warning',
            created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
            is_read: false,
            source: 'Task Management',
            project_id: projectId,
          },
          {
            id: '3',
            title: 'Performance decline detected',
            description: 'Task completion rate has dropped by 15% in the last week',
            type: 'warning',
            created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
            is_read: true,
            source: 'Performance Metrics',
            project_id: projectId,
          },
          {
            id: '4',
            title: 'New team member added',
            description: 'Sarah Johnson has been added to the project team',
            type: 'info',
            created_at: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
            is_read: true,
            source: 'Team Management',
            project_id: projectId,
          }
        ] as Alert[];
      }
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching alerts:', error);
    // Return empty array as fallback
    return [];
  }
};

export const dismissAlert = async (alertId: string): Promise<Alert> => {
  try {
    const { data, error } = await supabase
      .from('alerts')
      .update({ is_read: true })
      .eq('id', alertId)
      .select()
      .single();
      
    if (error) {
      if (error.code === "42P01") { // relation "alerts" does not exist
        console.warn("Alerts table doesn't exist, returning mock data");
        return {
          id: alertId,
          is_read: true,
          title: "Mock Alert",
          description: "",
          type: "info",
          source: "System",
          project_id: "",
          created_at: new Date().toISOString()
        } as Alert;
      }
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error dismissing alert:', error);
    // Return mock data as fallback
    return {
      id: alertId,
      is_read: true,
      title: "Mock Alert",
      description: "",
      type: "info",
      source: "System",
      project_id: "",
      created_at: new Date().toISOString()
    } as Alert;
  }
};
