
import { createClient } from '@supabase/supabase-js';
import { getTasks, createTask, updateTaskStatus, invalidateCacheByPrefix } from './services/taskService';
import { getProjects, createProject, getProject } from './services/projectService';
import { getGoals, createGoal, updateGoal } from './services/goalService';
import { getProjectEfficiency, getTasksCompletionRate } from './services/efficiencyService';
import { getProjectAlerts, dismissAlert } from './services/alertService';
import { getPrioritizedTasks, setPriorityFactors } from './services/prioritizationService';
import { getResources, createResource } from './services/resourceService';
import { getTimelineEvents, createTimelineEvent } from './services/timelineService';
import { getMetrics, createMetric, updateMetric, updateMetricsFromGoals } from './services/metricService';
import { getAiSuggestions, markSuggestionImplemented, generateInsights } from './services/aiSuggestionService';

// Initialize the Supabase client with correct project URL and API key
const supabaseUrl = 'https://yvtjimbvpuclcgvnmvyh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2dGppbWJ2cHVjbGNndm5tdnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMDYzMTksImV4cCI6MjA1NzU4MjMxOX0.VnjEht3dkgBV94NbyISAabrRq4tyW04X8fZ_dvdNBrM';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Service functions exports
// Task management
export { getTasks, createTask, updateTaskStatus, invalidateCacheByPrefix };

// Project management
export { getProjects, createProject, getProject };

// Goal management
export { getGoals, createGoal, updateGoal };

// Efficiency analysis
export { getProjectEfficiency, getTasksCompletionRate };

// Alerts management
export { getProjectAlerts, dismissAlert };

// Task prioritization
export { getPrioritizedTasks, setPriorityFactors };

// Resources management
export { getResources, createResource };

// Timeline management
export { getTimelineEvents, createTimelineEvent };

// Metrics management
export { getMetrics, createMetric, updateMetric, updateMetricsFromGoals };

// AI suggestions
export { getAiSuggestions, markSuggestionImplemented, generateInsights };
