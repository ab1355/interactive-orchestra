
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with correct project URL and API key
const supabaseUrl = 'https://yvtjimbvpuclcgvnmvyh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dGppbWJ2cHVjbGNndm5tdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMDYzMTksImV4cCI6MjA1NzU4MjMxOX0.VnjEht3dkgBV94NbyISAabrRq4tyW04X8fZ_dvdNBrM';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Import and re-export all service functions
// Task management
import { getTasks, createTask, updateTaskStatus, invalidateCacheByPrefix } from './services/taskService';
export { getTasks, createTask, updateTaskStatus, invalidateCacheByPrefix };

// Project management
import { getProjects, createProject, getProject } from './services/projectService';
export { getProjects, createProject, getProject };

// Goal management
import { getGoals, createGoal, updateGoal } from './services/goalService';
export { getGoals, createGoal, updateGoal };

// Efficiency analysis
import { getProjectEfficiency, getTasksCompletionRate } from './services/efficiencyService';
export { getProjectEfficiency, getTasksCompletionRate };

// Alerts management
import { getProjectAlerts, dismissAlert } from './services/alertService';
export { getProjectAlerts, dismissAlert };

// Task prioritization
import { getPrioritizedTasks, setPriorityFactors } from './services/prioritizationService';
export { getPrioritizedTasks, setPriorityFactors };

// Resources management
import { getResources, createResource } from './services/resourceService';
export { getResources, createResource };

// Timeline management
import { getTimelineEvents, createTimelineEvent } from './services/timelineService';
export { getTimelineEvents, createTimelineEvent };

// Metrics management
import { getMetrics, createMetric, updateMetric, updateMetricsFromGoals } from './services/metricService';
export { getMetrics, createMetric, updateMetric, updateMetricsFromGoals };

// AI suggestions
import { getAiSuggestions, markSuggestionImplemented, generateInsights } from './services/aiSuggestionService';
export { getAiSuggestions, markSuggestionImplemented, generateInsights };

// Autonomous execution
import { 
  getExecutions, 
  createExecution, 
  updateExecution, 
  getExecution 
} from './services/autonomousExecutionService';
export { 
  getExecutions, 
  createExecution, 
  updateExecution, 
  getExecution 
};
