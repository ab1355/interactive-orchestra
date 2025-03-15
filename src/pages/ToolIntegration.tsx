import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ChevronRight, Package, Search, Grid, Filter, ExternalLink, Plus, Star, Download, Cloud, Database, Server, HardDrive, Network, Box } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ActionButton } from '@/components/ui/action-button';

// Tool Card Component
const ToolCard = ({ tool }: { tool: any }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-md bg-${tool.color} flex items-center justify-center`}>
              {tool.icon}
            </div>
            <div className="ml-3">
              <h3 className="text-white font-medium">{tool.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < tool.rating ? 'text-yellow-500' : 'text-gray-600'}`} fill={i < tool.rating ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <span className="text-gray-400 text-xs ml-2">{tool.downloads} downloads</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <ActionButton 
              variant="ghost" 
              size="sm"
              className="text-xs px-2 py-1 rounded bg-dark border border-white/10 text-gray-300 hover:text-white"
              onClick={() => setExpanded(!expanded)}
              tooltipText={expanded ? "Show less details" : "Show more details"}
            >
              {expanded ? 'Less' : 'More'}
            </ActionButton>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-gray-300 text-sm">{tool.description}</p>
        </div>
        
        {expanded && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Category</p>
                <p className="text-white">{tool.category}</p>
              </div>
              <div>
                <p className="text-gray-400">Integration Type</p>
                <p className="text-white">{tool.type}</p>
              </div>
              <div>
                <p className="text-gray-400">Authentication</p>
                <p className="text-white">{tool.auth}</p>
              </div>
              <div>
                <p className="text-gray-400">Developer</p>
                <p className="text-white">{tool.developer}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-white text-sm font-medium mb-2">Capabilities</h4>
              <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                {tool.capabilities.map((cap: string, i: number) => (
                  <li key={i}>{cap}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-white/10 p-3 flex justify-between">
        <a href={tool.docsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-purple hover:text-purple-light flex items-center">
          <ExternalLink className="w-3 h-3 mr-1" />
          Documentation
        </a>
        <ActionButton 
          className="text-sm bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded flex items-center" 
          onClick={() => alert(`Adding ${tool.name} integration`)}
          tooltipText={`Add ${tool.name} integration to your project`}
          successMessage={`${tool.name} integration added successfully`}
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Integration
        </ActionButton>
      </div>
    </div>
  );
};

// Integration Configuration Component
const IntegrationConfiguration = () => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">Integration Configuration</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Integration Name</label>
          <input 
            type="text" 
            className="w-full bg-dark border border-white/10 rounded p-2 text-white"
            placeholder="My Google Drive Integration"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-300">API Key</label>
          <div className="flex">
            <input 
              type="password" 
              className="flex-1 bg-dark border border-white/10 rounded-l p-2 text-white"
              value="••••••••••••••••••••"
              readOnly
            />
            <button className="bg-dark-accent border border-white/10 border-l-0 rounded-r px-3 text-white" onClick={() => alert('Show API Key')}>
              Show
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Integration Scope</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="scope1" className="mr-2" defaultChecked />
              <label htmlFor="scope1" className="text-sm text-white">Read Files</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="scope2" className="mr-2" defaultChecked />
              <label htmlFor="scope2" className="text-sm text-white">Write Files</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="scope3" className="mr-2" />
              <label htmlFor="scope3" className="text-sm text-white">Delete Files</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="scope4" className="mr-2" />
              <label htmlFor="scope4" className="text-sm text-white">Manage Permissions</label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Rate Limiting</label>
          <div className="flex items-center">
            <input 
              type="number" 
              className="w-20 bg-dark border border-white/10 rounded-l p-2 text-white"
              defaultValue="100"
            />
            <span className="bg-dark-accent border border-white/10 border-l-0 border-r-0 px-3 py-2 text-white">
              requests per
            </span>
            <select className="bg-dark border border-white/10 rounded-r p-2 text-white">
              <option>minute</option>
              <option>hour</option>
              <option>day</option>
            </select>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end space-x-3">
          <button className="bg-dark hover:bg-dark-accent text-white py-2 px-4 rounded border border-white/10" onClick={() => alert('Configuration canceled')}>
            Cancel
          </button>
          <button className="bg-purple hover:bg-purple/80 text-white py-2 px-4 rounded" onClick={() => alert('Configuration saved')}>
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

// API Credential Manager Component
const APICredentialManager = () => {
  const storedCredentials = [
    { name: 'Google Drive API', type: 'OAuth2', lastUsed: '2 hours ago', status: 'Active', reference: 'https://developers.google.com/identity/protocols/oauth2' },
    { name: 'OpenAI API', type: 'API Key', lastUsed: '1 day ago', status: 'Active', reference: 'https://platform.openai.com/docs/api-reference/authentication' },
    { name: 'Weather API', type: 'API Key', lastUsed: '3 days ago', status: 'Expired', reference: 'https://openweathermap.org/appid' },
    { name: 'Odoo API', type: 'API Key', lastUsed: '5 days ago', status: 'Active', reference: 'https://www.odoo.com/documentation/16.0/developer/api/external_api.html' },
    { name: 'AWS S3', type: 'Access Key', lastUsed: '1 week ago', status: 'Active', reference: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html' },
  ];

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">API Credential Manager</h3>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storedCredentials.map((cred, index) => (
              <TableRow key={index} className="border-white/10">
                <TableCell className="text-white">{cred.name}</TableCell>
                <TableCell className="text-gray-300">{cred.type}</TableCell>
                <TableCell className="text-gray-300">{cred.lastUsed}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${cred.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {cred.status}
                  </span>
                </TableCell>
                <TableCell>
                  <a href={cred.reference} target="_blank" rel="noopener noreferrer" className="text-purple hover:text-purple-light text-sm flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Auth Guide
                  </a>
                </TableCell>
                <TableCell className="space-x-2">
                  <button className="text-purple hover:text-purple-light" onClick={() => alert(`Edit ${cred.name}`)}>Edit</button>
                  <button className="text-red-400 hover:text-red-300" onClick={() => alert(`Delete ${cred.name}`)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
        <Button 
          variant="default" 
          className="bg-purple hover:bg-purple/80 text-white text-sm flex items-center"
          onClick={() => alert('Add new credential')}
        >
          <Plus className="w-3 h-3 mr-1" />
          Add New Credential
        </Button>
      </div>
    </div>
  );
};

// Tool Testing Sandbox Component
const ToolTestingSandbox = () => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">Tool Testing Sandbox</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Select Integration</label>
            <select className="w-full bg-dark border border-white/10 rounded p-2 text-white">
              <option>Google Drive API</option>
              <option>OpenAI API</option>
              <option>Weather API</option>
              <option>Odoo API</option>
              <option>AWS S3</option>
              <option>DigitalOcean API</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Method</label>
            <select className="w-full bg-dark border border-white/10 rounded p-2 text-white">
              <option>listFiles</option>
              <option>uploadFile</option>
              <option>downloadFile</option>
              <option>searchFiles</option>
              <option>createVirtualMachine</option>
              <option>checkResource</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Parameters (JSON)</label>
            <textarea 
              className="w-full bg-dark border border-white/10 rounded p-2 text-white h-40 font-mono text-sm"
              placeholder='{"folderId": "root", "pageSize": 10}'
            ></textarea>
          </div>
          
          <Button 
            variant="default" 
            className="w-full bg-purple hover:bg-purple/80 text-white"
            onClick={() => alert('Testing integration')}
          >
            Test Integration
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-300">Response</label>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-white/10 text-gray-300"
                onClick={() => alert('Documentation reference')}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                API Docs
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-white/10 text-gray-300"
                onClick={() => alert('Copying response')}
              >
                Copy
              </Button>
            </div>
          </div>
          <div className="bg-dark border border-white/10 rounded p-3 text-gray-300 h-[340px] overflow-y-auto font-mono text-sm">
            <pre>{`{
  "kind": "drive#fileList",
  "incompleteSearch": false,
  "files": [
    {
      "kind": "drive#file",
      "id": "1Pc8jdIc2uZt5S4VjX5lrBRH7A7cZ9QvO",
      "name": "Project_Documentation.pdf",
      "mimeType": "application/pdf"
    },
    {
      "kind": "drive#file",
      "id": "1Uy7GhRL8Zq9cNxM3w0VFj2QiXRmZ1pYt",
      "name": "Quarterly_Report.xlsx",
      "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }
    // Additional files...
  ],
  "nextPageToken": "AB12CD34EF"
}`}</pre>
          </div>
          
          <div className="bg-dark-accent/50 border border-white/10 rounded p-3 mt-3">
            <h4 className="text-white text-sm font-medium mb-2">Quick Reference</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#" className="text-purple hover:text-purple-light flex items-center" onClick={() => alert('API Documentation')}>
                <ExternalLink className="w-3 h-3 mr-1" />
                API Documentation
              </a>
              <a href="#" className="text-purple hover:text-purple-light flex items-center" onClick={() => alert('Integration Guides')}>
                <ExternalLink className="w-3 h-3 mr-1" />
                Integration Guides
              </a>
              <a href="#" className="text-purple hover:text-purple-light flex items-center" onClick={() => alert('Code Examples')}>
                <ExternalLink className="w-3 h-3 mr-1" />
                Code Examples
              </a>
              <a href="#" className="text-purple hover:text-purple-light flex items-center" onClick={() => alert('Rate Limits')}>
                <ExternalLink className="w-3 h-3 mr-1" />
                Rate Limits
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tool Marketplace Table Component
const ToolMarketplaceTable = ({ tools }: { tools: any[] }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead>Integration</TableHead>
            <TableHead>Downloads</TableHead>
            <TableHead>Documentation</TableHead>
            <TableHead>Quick Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool, index) => (
            <TableRow key={index} className="border-white/10">
              <TableCell>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-md bg-${tool.color} flex items-center justify-center mr-2`}>
                    {tool.icon}
                  </div>
                  <div>
                    <div className="text-white font-medium">{tool.name}</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < tool.rating ? 'text-yellow-500' : 'text-gray-600'}`} fill={i < tool.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-300">{tool.downloads}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <a href={tool.docsUrl} target="_blank" rel="noopener noreferrer" className="text-purple hover:text-purple-light text-sm">
                    API Docs
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="#" className="text-purple hover:text-purple-light text-sm" onClick={() => alert(`${tool.name} Integration Guide`)}>
                    Integration Guide
                  </a>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-white/10 text-white hover:bg-purple/20 hover:text-purple-light"
                    onClick={() => alert(`Add ${tool.name} integration`)}
                  >
                    Add Integration
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-white/10 text-white hover:bg-purple/20 hover:text-purple-light"
                    onClick={() => alert(`Test ${tool.name}`)}
                  >
                    Test
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Tool Card Grid Component
const ToolCardGrid = ({ tools }: { tools: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool, index) => (
        <ToolCard key={index} tool={tool} />
      ))}
    </div>
  );
};

const ToolIntegration: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tools = [
    {
      name: 'Google Drive',
      description: 'Access and manipulate files stored in Google Drive.',
      rating: 4,
      downloads: '10.2k',
      color: 'blue-500',
      icon: <Download className="w-5 h-5 text-white" />,
      category: 'Storage',
      type: 'API Integration',
      auth: 'OAuth 2.0',
      developer: 'Google',
      docsUrl: 'https://developers.google.com/drive/api/v3/reference',
      capabilities: [
        'Read and write files and folders',
        'Search for specific files',
        'Manage file permissions',
        'Track file changes'
      ]
    },
    {
      name: 'Weather API',
      description: 'Get real-time and forecasted weather information for any location.',
      rating: 5,
      downloads: '8.7k',
      color: 'yellow-500',
      icon: <Download className="w-5 h-5 text-white" />,
      category: 'Data',
      type: 'REST API',
      auth: 'API Key',
      developer: 'WeatherCorp',
      docsUrl: 'https://openweathermap.org/api',
      capabilities: [
        'Current weather conditions',
        '5-day forecasts',
        'Historical weather data',
        'Severe weather alerts'
      ]
    },
    {
      name: 'Slack',
      description: 'Send messages and notifications to Slack channels and users.',
      rating: 4,
      downloads: '15.1k',
      color: 'purple',
      icon: <Download className="w-5 h-5 text-white" />,
      category: 'Communication',
      type: 'Webhook',
      auth: 'OAuth 2.0 / Tokens',
      developer: 'Slack Technologies',
      docsUrl: 'https://api.slack.com/docs',
      capabilities: [
        'Send channel messages',
        'Direct message users',
        'Create channels',
        'Attach files and media'
      ]
    },
    {
      name: 'OpenAI',
      description: 'Generate text, images, and other content with AI models.',
      rating: 5,
      downloads: '22.3k',
      color: 'green-500',
      icon: <Download className="w-5 h-5 text-white" />,
      category: 'AI',
      type: 'API Integration',
      auth: 'API Key',
      developer: 'OpenAI',
      docsUrl: 'https://platform.openai.com/docs',
      capabilities: [
        'Text generation and completion',
        'Text-to-image generation',
        'Text embeddings for search',
        'Fine-tuning models with custom data'
      ]
    },
    {
      name: 'GitHub',
      description: 'Manage repositories, issues, and pull requests on GitHub.',
      rating: 4,
      downloads: '12.8k',
      color: 'gray-500',
      icon: <Download className="w-5 h-5 text-white" />,
      category: 'Development',
      type: 'API Integration',
      auth: 'OAuth / Personal Access Tokens',
      developer: 'GitHub, Inc.',
      docsUrl: 'https://docs.github.com/rest',
      capabilities: [
        'Repository management',
        'Issue and PR handling',
        'Workflow automation',
        'Code search and analysis'
      ]
    },
    {
      name: 'Twilio',
      description: 'Send SMS, make calls, and manage communication services.',
      rating: 4,
      downloads: '9.6k',
      color: 'red-500',
      icon: <Download className="w-5 h-5 text-white" />,
      category: 'Communication',
      type: 'API Integration',
      auth: 'API Key / Auth Token',
      developer: 'Twilio Inc.',
      docsUrl: 'https://www.twilio.com/docs/api',
      capabilities: [
        'SMS messaging',
        'Voice calls',
        'Video conferencing',
        'WhatsApp messaging'
      ]
    },
    {
      name: 'Odoo',
      description: 'Integrate with Odoo ERP for business management and automation.',
      rating: 4,
      downloads: '8.2k',
      color: 'purple',
      icon: <Database className="w-5 h-5 text-white" />,
      category: 'ERP',
      type: 'API Integration',
      auth: 'API Key',
      developer: 'Odoo S.A.',
      docsUrl: 'https://www.odoo.com/documentation/16.0/developer/api/external_api.html',
      capabilities: [
        'Inventory management with real-time synchronization',
        'Sales order processing with custom field mapping',
        'Purchase order handling with automated workflows',
        'CRM data management with validation',
        'Manufacturing process automation'
      ]
    },
    {
      name: 'AWS',
      description: 'Amazon Web Services cloud infrastructure and services.',
      rating: 5,
      downloads: '18.3k',
      color: 'orange-500',
      icon: <Cloud className="w-5 h-5 text-white" />,
      category: 'Cloud',
      type: 'API Integration',
      auth: 'Access Key / Secret Key',
      developer: 'Amazon Web Services',
      docsUrl: 'https://docs.aws.amazon.com/',
      capabilities: [
        'S3 file storage and management',
        'EC2 virtual machine control',
        'Lambda serverless function execution',
        'CloudWatch monitoring'
      ]
    },
    {
      name: 'DigitalOcean',
      description: 'Manage cloud servers, databases, and storage.',
      rating: 4,
      downloads: '8.1k',
      color: 'blue-400',
      icon: <Server className="w-5 h-5 text-white" />,
      category: 'VPS',
      type: 'API Integration',
      auth: 'API Token',
      developer: 'DigitalOcean, LLC',
      docsUrl: 'https://docs.digitalocean.com/reference/api/',
      capabilities: [
        'Droplet management',
        'Volume storage control',
        'Load balancer configuration',
        'Image and snapshot handling'
      ]
    },
    {
      name: 'OVH Cloud',
      description: 'Complete cloud infrastructure with European data sovereignty.',
      rating: 4,
      downloads: '7.8k',
      color: 'blue-600',
      icon: <HardDrive className="w-5 h-5 text-white" />,
      category: 'Cloud Infrastructure',
      type: 'API Integration',
      auth: 'API Key / Application Credentials',
      developer: 'OVH SAS',
      docsUrl: 'https://docs.ovh.com/gb/en/api/first-steps-with-ovh-api/',
      capabilities: [
        'Virtual machine management (create, delete, list)',
        'Storage operations (object, block, archive)',
        'Network configuration and security',
        'Automated infrastructure deployment',
        'Load balancing and auto-scaling',
        'Backup and recovery services'
      ]
    },
  ];

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Tool Integration</h1>
          <div className="flex items-center space-x-4">
            <ActionButton 
              variant="default" 
              className="bg-purple hover:bg-purple/80 text-white flex items-center"
              onClick={() => alert('Creating new integration')}
              tooltipText="Create a new custom integration"
              keyboardShortcut="Alt+N"
            >
              <Plus className="w-4 h-4 mr-1" />
              New Integration
            </ActionButton>
          </div>
        </div>
        
        <main className={`flex-1 p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-4 flex items-center text-sm text-gray-400">
            <a href="/" className="hover:text-white">Dashboard</a>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-white">Tool Integration</span>
          </div>
          
          {/* Tool Marketplace */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center mb-2 sm:mb-0">
                <Package className="w-5 h-5 mr-2" />
                Tool Marketplace
              </h2>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search tools..." 
                    className="pl-10 pr-4 py-2 bg-dark border border-white/10 rounded text-white text-sm w-full sm:w-64"
                  />
                </div>
                
                <ActionButton 
                  className="p-2 bg-dark border border-white/10 rounded text-gray-300 hover:text-white"
                  onClick={() => alert('Filter tools')}
                  tooltipText="Filter tools by category"
                >
                  <Filter className="w-4 h-4" />
                </ActionButton>
                
                <ActionButton 
                  className={`p-2 bg-dark border border-white/10 rounded ${viewMode === 'grid' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  onClick={() => setViewMode('grid')}
                  tooltipText="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </ActionButton>
                
                <ActionButton 
                  className={`p-2 bg-dark border border-white/10 rounded ${viewMode === 'table' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  onClick={() => setViewMode('table')}
                  tooltipText="Table view"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4"
                  >
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </ActionButton>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <ToolCardGrid tools={tools} />
            ) : (
              <ToolMarketplaceTable tools={tools} />
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <IntegrationConfiguration />
            <APICredentialManager />
          </div>
          
          <div className="mb-6">
            <ToolTestingSandbox />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ToolIntegration;
