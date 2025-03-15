
import { supabase } from '../client';

// Goal Services
export const getGoals = async (projectId: string) => {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const createGoal = async (goal: { 
  project_id: string; 
  title: string; 
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
}) => {
  const { data, error } = await supabase
    .from('goals')
    .insert(goal)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updateGoal = async (id: string, updates: {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
}) => {
  const { data, error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};
