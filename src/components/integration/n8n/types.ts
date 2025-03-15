
import { N8nWorkflow, N8nCredential, N8nWorkflowTemplate } from '@/types/n8n';

// Shared interfaces for N8n components
export interface ConnectionFormProps {
  apiUrl: string;
  setApiUrl: (url: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  handleConnect: () => Promise<void>;
  isLoading: boolean;
}

export interface WorkflowListProps {
  workflows: N8nWorkflow[];
  toggleWorkflowActive: (id: string, currentStatus: boolean) => Promise<void>;
  executeWorkflow: (id: string) => Promise<void>;
  deleteWorkflow: (id: string) => Promise<void>;
  refreshWorkflows: () => Promise<void>;
  handleToastInfo: (message: string) => boolean;
  isLoading: boolean;
}

export interface CredentialListProps {
  credentials: N8nCredential[];
  addCredential: () => Promise<boolean>;
  handleToastInfo: (message: string) => boolean;
}

export interface TemplateListProps {
  templates: N8nWorkflowTemplate[];
  deployTemplate: (templateId: string) => Promise<void>;
}

export interface TabNavigationProps {
  activeTab: 'workflows' | 'credentials' | 'templates';
  setActiveTab: (tab: 'workflows' | 'credentials' | 'templates') => void;
  refreshWorkflows: () => Promise<void>;
  addCredential: () => Promise<boolean>;
  handleToastInfo: (message: string) => boolean;
  activeTabComponent: React.ReactNode;
}

export interface N8nFooterProps {
  disconnect: () => void;
  toggleAgentAccess?: (enabled: boolean) => void;
  isAgentAccessEnabled?: boolean;
}

// New interfaces for agent API access
export interface ApiCredential {
  id: string;
  name: string;
  type: string;
  isAvailableToAgents: boolean;
}

export interface ApiAccessOptions {
  credentials: ApiCredential[];
  toggleCredentialAccess: (credentialId: string, isAvailable: boolean) => Promise<void>;
  isActive: boolean;
  toggleActive: (active: boolean) => void;
}
