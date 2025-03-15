
import { supabase } from '../client';

// Resource Services
export const getResources = async (projectId: string) => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const createResource = async (resource: {
  project_id: string;
  name: string;
  type: string;
  quantity?: number;
  availability?: string;
  allocation_details?: string;
}) => {
  const { data, error } = await supabase
    .from('resources')
    .insert(resource)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
