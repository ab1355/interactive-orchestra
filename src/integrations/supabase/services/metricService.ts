
import { supabase } from '../client';

// Metrics Services
export const getMetrics = async (projectId: string) => {
  const { data, error } = await supabase
    .from('metrics')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const createMetric = async (metric: {
  project_id: string;
  name: string;
  description?: string;
  target?: number;
  current_value?: number;
  unit?: string;
}) => {
  const { data, error } = await supabase
    .from('metrics')
    .insert(metric)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updateMetric = async (id: string, updates: {
  name?: string;
  description?: string;
  target?: number;
  current_value?: number;
  unit?: string;
}) => {
  const { data, error } = await supabase
    .from('metrics')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updateMetricsFromGoals = async () => {
  const { data, error } = await supabase
    .rpc('update_metrics_from_goals');
    
  if (error) throw error;
  return data;
};
