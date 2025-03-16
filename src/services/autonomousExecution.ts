
import { supabase } from '@/integrations/supabase/client';

export interface AutonomousExecution {
  id: string;
  agent_id: string;
  task_id?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  execution_data?: any;
  result?: any;
  started_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export const getExecutions = async (options: {
  agentId?: string;
  status?: AutonomousExecution['status'];
  limit?: number;
} = {}): Promise<AutonomousExecution[]> => {
  try {
    let query = supabase
      .from('autonomous_executions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (options.agentId) {
      query = query.eq('agent_id', options.agentId);
    }
    
    if (options.status) {
      query = query.eq('status', options.status);
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching executions:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch executions:', error);
    return [];
  }
};

export const createExecution = async (execution: Omit<AutonomousExecution, 'id' | 'created_at' | 'updated_at'>): Promise<AutonomousExecution | null> => {
  try {
    const { data, error } = await supabase
      .from('autonomous_executions')
      .insert(execution)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating execution:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to create execution:', error);
    return null;
  }
};

export const updateExecution = async (id: string, updates: Partial<AutonomousExecution>): Promise<AutonomousExecution | null> => {
  try {
    const { data, error } = await supabase
      .from('autonomous_executions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating execution:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to update execution:', error);
    return null;
  }
};

export const getExecution = async (id: string): Promise<AutonomousExecution | null> => {
  try {
    const { data, error } = await supabase
      .from('autonomous_executions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching execution:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch execution:', error);
    return null;
  }
};
