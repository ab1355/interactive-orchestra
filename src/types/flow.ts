
// Task related types
export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at?: string;
}

// Alert related types
export interface Alert {
  id: string;
  title: string;
  description: string | null;
  type: "critical" | "warning" | "info";
  is_read: boolean;
  source: string;
  project_id: string;
  created_at: string;
}

// Efficiency metrics
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

// Task prioritization
export interface PrioritizedTask extends Task {
  priority_score: number;
  deadline_factor: number;
  impact_factor: number;
  effort_factor: number;
  complexity_factor: number;
  dependencies_factor: number;
}

export interface PriorityFactors {
  deadline: number;
  impact: number;
  effort: number;
  complexity: number;
  dependencies: number;
}

// Autonomous Execution type
export interface AutonomousExecution {
  id: string;
  agent_id: string;
  task_id: string | null;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  started_at: string | null;
  completed_at: string | null;
  execution_data: any | null;
  result: any | null;
  created_at: string;
  updated_at: string;
}
