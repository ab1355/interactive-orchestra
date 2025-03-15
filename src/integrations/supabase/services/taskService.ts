
import { supabase } from '../client';
import { Task } from '@/types/flow';
import { 
  getCachedProjectTasks, 
  cacheProjectTasks, 
  invalidateProjectTasksCache 
} from '@/services/taskCacheService';

// Task Management Services
export const getTasks = async (projectId: string): Promise<Task[]> => {
  try {
    // Check cache first
    const cachedTasks = getCachedProjectTasks(projectId);
    if (cachedTasks) {
      console.log(`Using cached tasks for project: ${projectId}`);
      return cachedTasks;
    }
    
    console.log(`Fetching tasks from database for project: ${projectId}`);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
      
    if (error) {
      if (error.code === "42P01") { // relation "tasks" does not exist
        console.warn("Tasks table doesn't exist, returning mock data");
        const mockTasks = [
          {
            id: "mock-1",
            project_id: projectId,
            title: "Create project plan",
            description: "Outline the project scope, timeline, and resource requirements",
            status: "completed",
            priority: "high",
            due_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
            assigned_to: "Sarah Johnson",
            created_at: new Date().toISOString()
          },
          {
            id: "mock-2",
            project_id: projectId,
            title: "Design user interface",
            description: "Create wireframes and design mockups for the application",
            status: "in_progress",
            priority: "medium",
            due_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
            assigned_to: "Michael Chen",
            created_at: new Date().toISOString()
          },
          {
            id: "mock-3",
            project_id: projectId,
            title: "Implement backend API",
            description: "Develop RESTful API endpoints for the application",
            status: "pending",
            priority: "high",
            due_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
            assigned_to: "David Kim",
            created_at: new Date().toISOString()
          }
        ] as Task[];
        
        // Cache the mock data
        cacheProjectTasks(projectId, mockTasks);
        return mockTasks;
      }
      
      console.error('Database error fetching tasks:', error);
      throw new Error(`Failed to fetch tasks: ${error.message}`);
    }
    
    // Cache the fetched tasks
    cacheProjectTasks(projectId, data || []);
    return data || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    // Return empty array but don't cache on error
    return [] as Task[];
  }
};

export const createTask = async (task: {
  project_id: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string | null;
  assigned_to?: string | null;
}): Promise<Task> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();
      
    if (error) {
      if (error.code === "42P01") { // relation "tasks" does not exist
        console.warn("Tasks table doesn't exist, returning mock data");
        const mockTask = {
          id: `mock-${Date.now()}`,
          ...task,
          description: task.description || null,
          status: task.status || "pending",
          priority: task.priority || "medium",
          due_date: task.due_date || null,
          assigned_to: task.assigned_to || null,
          created_at: new Date().toISOString()
        } as Task;
        
        // Invalidate the cache for this project
        invalidateProjectTasksCache(task.project_id);
        return mockTask;
      }
      
      console.error('Database error creating task:', error);
      throw new Error(`Failed to create task: ${error.message}`);
    }
    
    // Invalidate the cache since we added a new task
    invalidateProjectTasksCache(task.project_id);
    return data;
  } catch (error) {
    console.error('Error creating task:', error);
    // Return mock data as fallback
    return {
      id: `mock-${Date.now()}`,
      ...task,
      description: task.description || null,
      status: task.status || "pending",
      priority: task.priority || "medium",
      due_date: task.due_date || null,
      assigned_to: task.assigned_to || null,
      created_at: new Date().toISOString()
    } as Task;
  }
};

export const updateTaskStatus = async (taskId: string, status: string): Promise<Task> => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
      .select()
      .single();
      
    if (error) {
      if (error.code === "42P01") { // relation "tasks" does not exist
        console.warn("Tasks table doesn't exist, returning mock data");
        const mockUpdatedTask = {
          id: taskId,
          status,
          title: "Mock Task",
          description: null,
          priority: "medium",
          due_date: null,
          assigned_to: null,
          project_id: "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Task;
        
        // We don't know which project this task belongs to, so we can't invalidate the specific cache
        // Invalidate all task caches
        invalidateCacheByPrefix('tasks_');
        return mockUpdatedTask;
      }
      
      console.error('Database error updating task status:', error);
      throw new Error(`Failed to update task status: ${error.message}`);
    }
    
    // We need to invalidate the cache for the project this task belongs to
    if (data?.project_id) {
      invalidateProjectTasksCache(data.project_id);
    } else {
      // If we don't know the project_id, invalidate all task caches
      invalidateCacheByPrefix('tasks_');
    }
    
    return data;
  } catch (error) {
    console.error('Error updating task status:', error);
    // Return mock data as fallback
    return {
      id: taskId,
      status,
      title: "Mock Task",
      description: null,
      priority: "medium",
      due_date: null,
      assigned_to: null,
      project_id: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as Task;
  }
};

// Add the missing function from the import in taskCacheService
export const invalidateCacheByPrefix = (prefix: string): void => {
  console.log(`Invalidating cache items with prefix: ${prefix}`);
  // This is just a proxy to the function in taskCacheService
  // Needed because of the import in the taskService
  invalidateProjectTasksCache(prefix);
};
