
import { supabase } from './client';
import { getTasks, createTask, updateTaskStatus, invalidateCacheByPrefix } from './services/taskService';

export {
  supabase,
  getTasks,
  createTask,
  updateTaskStatus,
  invalidateCacheByPrefix
};
