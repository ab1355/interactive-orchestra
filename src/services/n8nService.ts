
import { 
  N8nWorkflow, 
  N8nCredential, 
  N8nWorkflowTemplate, 
  N8nExecutionResult,
  N8nApi
} from '@/types/n8n';

class N8nService implements N8nApi {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-N8N-API-KEY': this.apiKey,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`n8n API error: ${error.message}`);
    }

    return response.json();
  }

  // Workflow methods
  async getWorkflows(): Promise<N8nWorkflow[]> {
    return this.fetchWithAuth('/workflows');
  }

  async getWorkflow(id: string): Promise<N8nWorkflow> {
    return this.fetchWithAuth(`/workflows/${id}`);
  }

  async createWorkflow(workflow: Partial<N8nWorkflow>): Promise<N8nWorkflow> {
    return this.fetchWithAuth('/workflows', {
      method: 'POST',
      body: JSON.stringify(workflow),
    });
  }

  async updateWorkflow(id: string, workflow: Partial<N8nWorkflow>): Promise<N8nWorkflow> {
    return this.fetchWithAuth(`/workflows/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workflow),
    });
  }

  async deleteWorkflow(id: string): Promise<void> {
    await this.fetchWithAuth(`/workflows/${id}`, {
      method: 'DELETE',
    });
  }

  async activateWorkflow(id: string): Promise<N8nWorkflow> {
    return this.fetchWithAuth(`/workflows/${id}/activate`, {
      method: 'POST',
    });
  }

  async deactivateWorkflow(id: string): Promise<N8nWorkflow> {
    return this.fetchWithAuth(`/workflows/${id}/deactivate`, {
      method: 'POST',
    });
  }

  async executeWorkflow(id: string, data?: Record<string, any>): Promise<N8nExecutionResult> {
    return this.fetchWithAuth(`/workflows/${id}/execute`, {
      method: 'POST',
      body: JSON.stringify(data || {}),
    });
  }

  // Credential methods
  async getCredentials(): Promise<N8nCredential[]> {
    return this.fetchWithAuth('/credentials');
  }

  async getCredential(id: string): Promise<N8nCredential> {
    return this.fetchWithAuth(`/credentials/${id}`);
  }

  async createCredential(credential: Partial<N8nCredential>): Promise<N8nCredential> {
    return this.fetchWithAuth('/credentials', {
      method: 'POST',
      body: JSON.stringify(credential),
    });
  }

  async updateCredential(id: string, credential: Partial<N8nCredential>): Promise<N8nCredential> {
    return this.fetchWithAuth(`/credentials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(credential),
    });
  }

  async deleteCredential(id: string): Promise<void> {
    await this.fetchWithAuth(`/credentials/${id}`, {
      method: 'DELETE',
    });
  }

  // Template methods
  async getTemplates(): Promise<N8nWorkflowTemplate[]> {
    return this.fetchWithAuth('/templates');
  }

  async deployTemplate(templateId: string): Promise<N8nWorkflow> {
    return this.fetchWithAuth(`/templates/${templateId}/deploy`, {
      method: 'POST',
    });
  }
}

export default N8nService;
