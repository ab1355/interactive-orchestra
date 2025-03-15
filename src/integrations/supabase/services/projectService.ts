
import { supabase } from '../client';

// Project Services
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const getProject = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};

export const createProject = async (project: { name: string; description?: string; user_id: string }) => {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
