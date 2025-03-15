
import { supabase } from '../client';

// AI Suggestions Services
export const getAiSuggestions = async (projectId: string) => {
  const { data, error } = await supabase
    .from('ai_suggestions')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const markSuggestionImplemented = async (id: string, isImplemented: boolean = true) => {
  const { data, error } = await supabase
    .from('ai_suggestions')
    .update({ is_implemented: isImplemented })
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

// Trigger scheduled tasks manually (for demonstration purposes)
export const generateInsights = async () => {
  const { data, error } = await supabase
    .rpc('generate_project_insights');
    
  if (error) throw error;
  return data;
};
