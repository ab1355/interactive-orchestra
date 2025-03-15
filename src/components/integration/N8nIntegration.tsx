
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EnhancedActionButton } from '@/components/ui/enhanced-action-button';
import { Plus, Play, Pause, Trash, Edit, Download, Upload, RefreshCw, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

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
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
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
    { id: 't1', name: 'Data Sync', description: 'Sync data between two systems periodically', complexity: 'Medium', nodes: 6 },
    { id: 't2', name: 'Lead Notification', description: 'Send notifications for new leads', complexity: 'Simple', nodes: 4 },
    { id: 't3', name: 'Document Processing', description: 'Extract and process data from documents', complexity: 'Complex', nodes: 12 },
    { id: 't4', name: 'Inventory Updates', description: 'Automatically update inventory levels across systems', complexity: 'Medium', nodes: 8 },
    { id: 't5', name: 'Customer Journey', description: 'Track and respond to customer interactions', complexity: 'Complex', nodes: 15 },
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
    return true; // Fixed: Return a boolean instead of undefined
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
    return true; // Fixed: Return a boolean instead of a string
  };

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">n8n Workflow Integration</h3>
      
      {!isConnected ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">n8n API URL</label>
              <input
                type="text"
                className="w-full bg-dark border border-white/10 rounded p-2 text-white"
                placeholder="https://your-n8n-instance.com/api/v1"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">API Key</label>
              <input
                type="password"
                className="w-full bg-dark border border-white/10 rounded p-2 text-white"
                placeholder="Your n8n API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
          <EnhancedActionButton
            className="w-full bg-purple hover:bg-purple/80 text-white"
            onClick={handleConnect}
            isLoading={isLoading}
            hasRipple={true}
            tooltipText="Connect to your n8n instance"
          >
            Connect to n8n
          </EnhancedActionButton>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${activeTab === 'workflows' ? 'bg-purple text-white' : 'bg-dark-accent text-gray-300 hover:text-white'}`}
                onClick={() => setActiveTab('workflows')}
              >
                Workflows
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === 'credentials' ? 'bg-purple text-white' : 'bg-dark-accent text-gray-300 hover:text-white'}`}
                onClick={() => setActiveTab('credentials')}
              >
                Credentials
              </button>
              <button
                className={`px-4 py-2 rounded ${activeTab === 'templates' ? 'bg-purple text-white' : 'bg-dark-accent text-gray-300 hover:text-white'}`}
                onClick={() => setActiveTab('templates')}
              >
                Templates
              </button>
            </div>
            <div className="flex space-x-2">
              {activeTab === 'workflows' && (
                <>
                  <EnhancedActionButton
                    variant="outline"
                    size="sm"
                    onClick={refreshWorkflows}
                    tooltipText="Refresh workflows"
                    hasRipple={true}
                    className="border-white/10 text-gray-300 hover:text-white"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </EnhancedActionButton>
                  <EnhancedActionButton
                    variant="purple"
                    size="sm"
                    className="text-white"
                    onClick={() => handleToastInfo('This would open a workflow creation form')}
                    tooltipText="Create new workflow"
                    hasRipple={true}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    New Workflow
                  </EnhancedActionButton>
                </>
              )}
              {activeTab === 'credentials' && (
                <EnhancedActionButton
                  variant="purple"
                  size="sm"
                  className="text-white"
                  onClick={addCredential}
                  tooltipText="Add new credential"
                  hasRipple={true}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  New Credential
                </EnhancedActionButton>
              )}
            </div>
          </div>

          {activeTab === 'workflows' && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Nodes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflows.map((workflow) => (
                    <TableRow key={workflow.id} className="border-white/10">
                      <TableCell className="text-white">{workflow.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${workflow.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                          {workflow.active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-300">{workflow.createdAt}</TableCell>
                      <TableCell className="text-gray-300">{workflow.updatedAt}</TableCell>
                      <TableCell className="text-gray-300">{workflow.nodes} nodes / {workflow.connections} connections</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <EnhancedActionButton
                            variant="outline"
                            size="sm"
                            onClick={() => toggleWorkflowActive(workflow.id, workflow.active)}
                            tooltipText={workflow.active ? 'Deactivate workflow' : 'Activate workflow'}
                            hasRipple={true}
                            className="border-white/10 text-gray-300 hover:text-white p-1"
                          >
                            {workflow.active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </EnhancedActionButton>
                          <EnhancedActionButton
                            variant="outline"
                            size="sm"
                            onClick={() => executeWorkflow(workflow.id)}
                            tooltipText="Execute workflow now"
                            hasRipple={true}
                            className="border-white/10 text-gray-300 hover:text-white p-1"
                          >
                            <Play className="w-4 h-4" />
                          </EnhancedActionButton>
                          <EnhancedActionButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleToastInfo('This would open the workflow editor')}
                            tooltipText="Edit workflow"
                            hasRipple={true}
                            className="border-white/10 text-gray-300 hover:text-white p-1"
                          >
                            <Edit className="w-4 h-4" />
                          </EnhancedActionButton>
                          <EnhancedActionButton
                            variant="outline"
                            size="sm"
                            onClick={() => deleteWorkflow(workflow.id)}
                            tooltipText="Delete workflow"
                            hasRipple={true}
                            confirmationMessage="Are you sure you want to delete this workflow?"
                            className="border-white/10 text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash className="w-4 h-4" />
                          </EnhancedActionButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === 'credentials' && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {credentials.map((credential) => (
                    <TableRow key={credential.id} className="border-white/10">
                      <TableCell className="text-white">{credential.name}</TableCell>
                      <TableCell className="text-gray-300">{credential.type}</TableCell>
                      <TableCell className="text-gray-300">{credential.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button className="text-purple hover:text-purple-light" onClick={() => handleToastInfo(`Edit ${credential.name}`)}>Edit</button>
                          <button className="text-red-400 hover:text-red-300" onClick={() => handleToastInfo(`Delete ${credential.name}`)}>Delete</button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workflowTemplates.map((template) => (
                <div key={template.id} className="bg-dark border border-white/10 rounded p-4">
                  <h4 className="text-white font-medium mb-2">{template.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-400">Complexity: </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        template.complexity === 'Simple' ? 'bg-green-500/20 text-green-400' : 
                        template.complexity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>{template.complexity}</span>
                      <span className="text-xs text-gray-400 ml-2">{template.nodes} nodes</span>
                    </div>
                    <EnhancedActionButton
                      variant="purple"
                      size="sm"
                      className="text-white"
                      onClick={() => deployTemplate(template.id)}
                      tooltipText="Deploy this template"
                      hasRipple={true}
                    >
                      Deploy
                    </EnhancedActionButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-white/10 mt-4">
            <EnhancedActionButton
              variant="outline"
              className="border-white/10 text-gray-300 hover:text-white"
              onClick={() => {
                setIsConnected(false);
                setApiUrl('');
                setApiKey('');
              }}
              tooltipText="Disconnect from n8n"
              hasRipple={true}
            >
              Disconnect
            </EnhancedActionButton>
            <a 
              href="https://docs.n8n.io/api/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-4 py-2 bg-dark-accent text-purple hover:text-purple-light rounded border border-white/10"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              n8n API Documentation
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default N8nIntegration;
