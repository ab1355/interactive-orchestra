
import { useState, useCallback } from 'react';
import N8nService from '@/services/n8nService';
import { 
  N8nWorkflow, 
  N8nCredential, 
  N8nWorkflowTemplate, 
  N8nExecutionResult 
} from '@/types/n8n';
import { toast } from 'sonner';

interface UseN8nOptions {
  onError?: (error: Error) => void;
}

interface UseN8nState {
  isConnected: boolean;
  isLoading: boolean;
  service: N8nService | null;
  workflows: N8nWorkflow[];
  credentials: N8nCredential[];
  templates: N8nWorkflowTemplate[];
  executionResults: Record<string, N8nExecutionResult>;
}

interface UseN8nReturn extends UseN8nState {
  connect: (apiUrl: string, apiKey: string) => Promise<boolean>;
  disconnect: () => void;
  refreshWorkflows: () => Promise<N8nWorkflow[]>;
  refreshCredentials: () => Promise<N8nCredential[]>;
  refreshTemplates: () => Promise<N8nWorkflowTemplate[]>;
  activateWorkflow: (id: string) => Promise<N8nWorkflow>;
  deactivateWorkflow: (id: string) => Promise<N8nWorkflow>;
  executeWorkflow: (id: string, data?: Record<string, any>) => Promise<N8nExecutionResult>;
  createWorkflow: (workflow: Partial<N8nWorkflow>) => Promise<N8nWorkflow>;
  updateWorkflow: (id: string, workflow: Partial<N8nWorkflow>) => Promise<N8nWorkflow>;
  deleteWorkflow: (id: string) => Promise<void>;
  deployTemplate: (templateId: string) => Promise<N8nWorkflow>;
}

const useN8n = (options: UseN8nOptions = {}): UseN8nReturn => {
  const [state, setState] = useState<UseN8nState>({
    isConnected: false,
    isLoading: false,
    service: null,
    workflows: [],
    credentials: [],
    templates: [],
    executionResults: {},
  });

  const handleError = useCallback((error: Error) => {
    console.error('n8n error:', error);
    if (options.onError) {
      options.onError(error);
    } else {
      toast.error(`n8n error: ${error.message}`);
    }
  }, [options]);

  const connect = useCallback(async (apiUrl: string, apiKey: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const service = new N8nService(apiUrl, apiKey);
      
      // Test connection by fetching workflows
      const workflows = await service.getWorkflows();
      const credentials = await service.getCredentials();
      const templates = await service.getTemplates();
      
      setState({
        isConnected: true,
        isLoading: false,
        service,
        workflows,
        credentials,
        templates,
        executionResults: {},
      });
      
      return true;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      return false;
    }
  }, [handleError]);

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      isLoading: false,
      service: null,
      workflows: [],
      credentials: [],
      templates: [],
      executionResults: {},
    });
  }, []);

  const refreshWorkflows = useCallback(async (): Promise<N8nWorkflow[]> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const workflows = await state.service.getWorkflows();
      setState(prev => ({ ...prev, workflows, isLoading: false }));
      return workflows;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  const refreshCredentials = useCallback(async (): Promise<N8nCredential[]> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const credentials = await state.service.getCredentials();
      setState(prev => ({ ...prev, credentials, isLoading: false }));
      return credentials;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  const refreshTemplates = useCallback(async (): Promise<N8nWorkflowTemplate[]> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const templates = await state.service.getTemplates();
      setState(prev => ({ ...prev, templates, isLoading: false }));
      return templates;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  const activateWorkflow = useCallback(async (id: string): Promise<N8nWorkflow> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const workflow = await state.service.activateWorkflow(id);
      setState(prev => ({
        ...prev,
        workflows: prev.workflows.map(w => (w.id === id ? workflow : w)),
        isLoading: false,
      }));
      return workflow;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  const deactivateWorkflow = useCallback(async (id: string): Promise<N8nWorkflow> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const workflow = await state.service.deactivateWorkflow(id);
      setState(prev => ({
        ...prev,
        workflows: prev.workflows.map(w => (w.id === id ? workflow : w)),
        isLoading: false,
      }));
      return workflow;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  const executeWorkflow = useCallback(async (id: string, data?: Record<string, any>): Promise<N8nExecutionResult> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const result = await state.service.executeWorkflow(id, data);
      setState(prev => ({
        ...prev,
        executionResults: { ...prev.executionResults, [id]: result },
        isLoading: false,
      }));
      return result;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  const createWorkflow = useCallback(async (workflow: Partial<N8nWorkflow>): Promise<N8nWorkflow> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const newWorkflow = await state.service.createWorkflow(workflow);
      setState(prev => ({
        ...prev,
        workflows: [...prev.workflows, newWorkflow],
        isLoading: false,
      }));
      return newWorkflow;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  const updateWorkflow = useCallback(async (id: string, workflow: Partial<N8nWorkflow>): Promise<N8nWorkflow> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const updatedWorkflow = await state.service.updateWorkflow(id, workflow);
      setState(prev => ({
        ...prev,
        workflows: prev.workflows.map(w => (w.id === id ? updatedWorkflow : w)),
        isLoading: false,
      }));
      return updatedWorkflow;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  const deleteWorkflow = useCallback(async (id: string): Promise<void> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await state.service.deleteWorkflow(id);
      setState(prev => ({
        ...prev,
        workflows: prev.workflows.filter(w => w.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  const deployTemplate = useCallback(async (templateId: string): Promise<N8nWorkflow> => {
    if (!state.service) {
      throw new Error('Not connected to n8n');
    }
    
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const workflow = await state.service.deployTemplate(templateId);
      setState(prev => ({
        ...prev,
        workflows: [...prev.workflows, workflow],
        isLoading: false,
      }));
      return workflow;
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      handleError(error as Error);
      throw error;
    }
  }, [state.service, handleError]);

  return {
    ...state,
    connect,
    disconnect,
    refreshWorkflows,
    refreshCredentials,
    refreshTemplates,
    activateWorkflow,
    deactivateWorkflow,
    executeWorkflow,
    createWorkflow,
    updateWorkflow,
    deleteWorkflow,
    deployTemplate,
  };
};

export default useN8n;
