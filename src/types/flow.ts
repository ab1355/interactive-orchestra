
// Task Management Types
export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  assigned_to: string | null;
  project_id: string;
  created_at: string;
  updated_at?: string;
}

// Alert System Types
export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'critical' | 'info';
  created_at: string;
  is_read: boolean;
  source: string;
  project_id: string;
}

// Task Prioritization Types
export interface PrioritizedTask extends Task {
  priority_score: number;
  deadline_factor: number;
  impact_factor: number;
  effort_factor: number;
  complexity_factor: number;
  dependencies_factor: number;
}

// Efficiency Analysis Types
export interface EfficiencyMetrics {
  completionRate: number;
  resourceUtilization: number;
  avgTaskDuration: number;
}

export interface TaskCompletionRate {
  rate: number;
  total: number;
  completed: number;
}

// Priority Factors
export interface PriorityFactors {
  deadline: number;
  impact: number;
  effort: number;
  complexity: number;
  dependencies: number;
}
