
import { supabase } from '../client';

// Timeline Services
export const getTimelineEvents = async (projectId: string) => {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*')
    .eq('project_id', projectId)
    .order('start_date', { ascending: true });
    
  if (error) throw error;
  return data;
};

export const createTimelineEvent = async (event: {
  project_id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  status?: string;
}) => {
  const { data, error } = await supabase
    .from('timeline_events')
    .insert(event)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
