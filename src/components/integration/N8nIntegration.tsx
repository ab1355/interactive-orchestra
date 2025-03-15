
import React, { useState } from 'react';
import { toast } from 'sonner';
import ConnectionForm from './n8n/ConnectionForm';
import WorkflowList from './n8n/WorkflowList';
import CredentialList from './n8n/CredentialList';
import TemplateList from './n8n/TemplateList';
import TabNavigation from './n8n/TabNavigation';
import N8nFooter from './n8n/N8nFooter';
import { N8nWorkflow, N8nCredential, N8nWorkflowTemplate } from '@/types/n8n';

// Types for n8n workflow integration
interface Workflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  nodes: number;
  connections: number;
}

interface Credential {
  id: string;
  name: string;
  type: string;
  createdAt: string;
}

const N8nIntegration: React.FC = () => {
  const [apiUrl, setApiUrl] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'workflows' | 'credentials' | 'templates'>('workflows');

  // Sample data for demonstration
  const mockWorkflows: Workflow[] = [
    { id: 'w1', name: 'Data Processing Pipeline', active: true, createdAt: '2023-09-15', updatedAt: '2023-10-20', nodes: 8, connections: 7 },
    { id: 'w2', name: 'Customer Onboarding', active: false, createdAt: '2023-08-22', updatedAt: '2023-09-30', nodes: 12, connections: 15 },
    { id: 'w3', name: 'Invoice Generation', active: true, createdAt: '2023-10-05', updatedAt: '2023-10-18', nodes: 5, connections: 4 },
    { id: 'w4', name: 'Lead Qualification', active: true, createdAt: '2023-09-28', updatedAt: '2023-10-12', nodes: 9, connections: 11 },
  ];

  const mockCredentials: Credential[] = [
    { id: 'c1', name: 'Google API', type: 'OAuth2', createdAt: '2023-09-10' },
    { id: 'c2', name: 'AWS S3', type: 'AccessKey', createdAt: '2023-08-15' },
    { id: 'c3', name: 'SMTP Server', type: 'UsernamePassword', createdAt: '2023-10-01' },
    { id: 'c4', name: 'Airtable API', type: 'ApiKey', createdAt: '2023-09-20' },
  ];

  const workflowTemplates = [
    { id: 't1', name: 'Data Sync', description: 'Sync data between two systems periodically', complexity: 'Medium' as const, nodes: 6 },
    { id: 't2', name: 'Lead Notification', description: 'Send notifications for new leads', complexity: 'Simple' as const, nodes: 4 },
    { id: 't3', name: 'Document Processing', description: 'Extract and process data from documents', complexity: 'Complex' as const, nodes: 12 },
    { id: 't4', name: 'Inventory Updates', description: 'Automatically update inventory levels across systems', complexity: 'Medium' as const, nodes: 8 },
    { id: 't5', name: 'Customer Journey', description: 'Track and respond to customer interactions', complexity: 'Complex' as const, nodes: 15 },
  ];

  // Connect to n8n instance
  const handleConnect = async () => {
    if (!apiUrl || !apiKey) {
      toast.error('Please enter both API URL and API Key');
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, this would make an API call to test the connection
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsConnected(true);
      setWorkflows(mockWorkflows);
      setCredentials(mockCredentials);
      toast.success('Connected to n8n successfully');
    } catch (error) {
      toast.error('Failed to connect to n8n');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle workflow active status
  const toggleWorkflowActive = async (id: string, currentStatus: boolean) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would make an API call to toggle the workflow
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      setWorkflows(workflows.map(w => 
        w.id === id ? { ...w, active: !currentStatus } : w
      ));
      toast.success(`Workflow ${currentStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to update workflow status');
    } finally {
      setIsLoading(false);
    }
  };

  // Execute a workflow
  const executeWorkflow = async (id: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would make an API call to execute the workflow
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API call
      toast.success('Workflow executed successfully');
    } catch (error) {
      toast.error('Failed to execute workflow');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a workflow
  const deleteWorkflow = async (id: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would make an API call to delete the workflow
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setWorkflows(workflows.filter(w => w.id !== id));
      toast.success('Workflow deleted successfully');
    } catch (error) {
      toast.error('Failed to delete workflow');
    } finally {
      setIsLoading(false);
    }
  };

  // Deploy a template as a new workflow
  const deployTemplate = async (templateId: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would make an API call to create a new workflow from the template
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      const template = workflowTemplates.find(t => t.id === templateId);
      if (template) {
        const newWorkflow: Workflow = {
          id: `w${Date.now()}`,
          name: `${template.name} Workflow`,
          active: false,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          nodes: template.nodes,
          connections: template.nodes - 1,
        };
        setWorkflows([...workflows, newWorkflow]);
        toast.success('Template deployed as new workflow');
      }
    } catch (error) {
      toast.error('Failed to deploy template');
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new credential
  const addCredential = async () => {
    // In a real implementation, this would open a form modal to collect credential details
    toast.info('This would open a credential creation form');
    return true; // Return a boolean instead of undefined
  };

  // Refresh workflow list
  const refreshWorkflows = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would make an API call to get the latest workflows
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // Just reshuffling the mock data for demonstration
      setWorkflows([...mockWorkflows].sort(() => Math.random() - 0.5));
      toast.success('Workflows refreshed');
    } catch (error) {
      toast.error('Failed to refresh workflows');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toast info messages to fix type errors
  const handleToastInfo = (message: string): boolean => {
    toast.info(message);
    return true;
  };

  // Disconnect from n8n
  const handleDisconnect = () => {
    setIsConnected(false);
    setApiUrl('');
    setApiKey('');
  };

  // Render the active tab content
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'workflows':
        return (
          <WorkflowList 
            workflows={workflows}
            toggleWorkflowActive={toggleWorkflowActive}
            executeWorkflow={executeWorkflow}
            deleteWorkflow={deleteWorkflow}
            refreshWorkflows={refreshWorkflows}
            handleToastInfo={handleToastInfo}
            isLoading={isLoading}
          />
        );
      case 'credentials':
        return (
          <CredentialList 
            credentials={credentials}
            addCredential={addCredential}
            handleToastInfo={handleToastInfo}
          />
        );
      case 'templates':
        return (
          <TemplateList 
            templates={workflowTemplates}
            deployTemplate={deployTemplate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">n8n Workflow Integration</h3>
      
      {!isConnected ? (
        <ConnectionForm
          apiUrl={apiUrl}
          setApiUrl={setApiUrl}
          apiKey={apiKey}
          setApiKey={setApiKey}
          handleConnect={handleConnect}
          isLoading={isLoading}
        />
      ) : (
        <div className="space-y-4">
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            refreshWorkflows={refreshWorkflows}
            addCredential={addCredential}
            handleToastInfo={handleToastInfo}
            activeTabComponent={renderActiveTabContent()}
          />

          <N8nFooter disconnect={handleDisconnect} />
        </div>
      )}
    </div>
  );
};

export default N8nIntegration;
