
export interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  nodes: number;
  connections: number;
}

export interface N8nCredential {
  id: string;
  name: string;
  type: string;
  createdAt: string;
}

export interface N8nWorkflowTemplate {
  id: string;
  name: string;
  description: string;
  complexity: 'Simple' | 'Medium' | 'Complex';
  nodes: number;
}

export interface N8nNode {
  id: string;
  name: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  parameters: Record<string, any>;
}

export interface N8nConnection {
  sourceNodeId: string;
  targetNodeId: string;
  sourceOutput: string;
  targetInput: string;
}

export interface N8nExecutionResult {
  id: string;
  workflowId: string;
  startedAt: string;
  finishedAt: string;
  status: 'running' | 'success' | 'error' | 'waiting';
  data: Record<string, any>;
}

export interface N8nApi {
  // Workflow methods
  getWorkflows: () => Promise<N8nWorkflow[]>;
  getWorkflow: (id: string) => Promise<N8nWorkflow>;
  createWorkflow: (workflow: Partial<N8nWorkflow>) => Promise<N8nWorkflow>;
  updateWorkflow: (id: string, workflow: Partial<N8nWorkflow>) => Promise<N8nWorkflow>;
  deleteWorkflow: (id: string) => Promise<void>;
  activateWorkflow: (id: string) => Promise<N8nWorkflow>;
  deactivateWorkflow: (id: string) => Promise<N8nWorkflow>;
  executeWorkflow: (id: string, data?: Record<string, any>) => Promise<N8nExecutionResult>;
  
  // Credential methods
  getCredentials: () => Promise<N8nCredential[]>;
  getCredential: (id: string) => Promise<N8nCredential>;
  createCredential: (credential: Partial<N8nCredential>) => Promise<N8nCredential>;
  updateCredential: (id: string, credential: Partial<N8nCredential>) => Promise<N8nCredential>;
  deleteCredential: (id: string) => Promise<void>;
  
  // Template methods
  getTemplates: () => Promise<N8nWorkflowTemplate[]>;
  deployTemplate: (templateId: string) => Promise<N8nWorkflow>;
}
