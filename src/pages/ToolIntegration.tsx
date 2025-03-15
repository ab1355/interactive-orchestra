
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ChevronRight, Package, Search, Grid, Filter, ExternalLink, Plus, Star, Download } from 'lucide-react';

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
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-xs px-2 py-1 rounded bg-dark border border-white/10 text-gray-300 hover:text-white"
            >
              {expanded ? 'Less' : 'More'}
            </button>
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
        <a href="#" className="text-sm text-purple hover:text-purple-light flex items-center">
          <ExternalLink className="w-3 h-3 mr-1" />
          Documentation
        </a>
        <button className="text-sm bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded flex items-center">
          <Plus className="w-3 h-3 mr-1" />
          Add Integration
        </button>
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
            <button className="bg-dark-accent border border-white/10 border-l-0 rounded-r px-3 text-white">
              Show
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Integration Scope</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="scope1" className="mr-2" checked />
              <label htmlFor="scope1" className="text-sm text-white">Read Files</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="scope2" className="mr-2" checked />
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
              value="100"
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
          <button className="bg-dark hover:bg-dark-accent text-white py-2 px-4 rounded border border-white/10">
            Cancel
          </button>
          <button className="bg-purple hover:bg-purple/80 text-white py-2 px-4 rounded">
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
    { name: 'Google Drive API', type: 'OAuth2', lastUsed: '2 hours ago', status: 'Active' },
    { name: 'OpenAI API', type: 'API Key', lastUsed: '1 day ago', status: 'Active' },
    { name: 'Weather API', type: 'API Key', lastUsed: '3 days ago', status: 'Expired' },
  ];

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">API Credential Manager</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Last Used</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {storedCredentials.map((cred, index) => (
              <tr key={index} className="border-b border-white/10">
                <td className="px-4 py-3 text-white">{cred.name}</td>
                <td className="px-4 py-3 text-gray-300">{cred.type}</td>
                <td className="px-4 py-3 text-gray-300">{cred.lastUsed}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${cred.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {cred.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button className="text-purple hover:text-purple-light">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
        <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center">
          <Plus className="w-3 h-3 mr-1" />
          Add New Credential
        </button>
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
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Method</label>
            <select className="w-full bg-dark border border-white/10 rounded p-2 text-white">
              <option>listFiles</option>
              <option>uploadFile</option>
              <option>downloadFile</option>
              <option>searchFiles</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Parameters (JSON)</label>
            <textarea 
              className="w-full bg-dark border border-white/10 rounded p-2 text-white h-40 font-mono text-sm"
              placeholder='{"folderId": "root", "pageSize": 10}'
            ></textarea>
          </div>
          
          <button className="w-full bg-purple hover:bg-purple/80 text-white py-2 px-4 rounded">
            Test Integration
          </button>
        </div>
        
        <div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Response</label>
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
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolIntegration: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
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
      capabilities: [
        'SMS messaging',
        'Voice calls',
        'Video conferencing',
        'WhatsApp messaging'
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
            <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center">
              <Plus className="w-4 h-4 mr-1" />
              New Integration
            </button>
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
                
                <button className="p-2 bg-dark border border-white/10 rounded text-gray-300 hover:text-white">
                  <Filter className="w-4 h-4" />
                </button>
                
                <button className="p-2 bg-dark border border-white/10 rounded text-gray-300 hover:text-white">
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
              ))}
            </div>
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
