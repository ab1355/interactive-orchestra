
import { Download, Cloud, Database, Server, HardDrive, Network, Box } from 'lucide-react';
import React from 'react';

// Define the Tool type
export type Tool = {
  name: string;
  description: string;
  rating: number;
  downloads: string;
  color: string;
  icon: React.ReactNode;
  category: string;
  type: string;
  auth: string;
  developer: string;
  docsUrl: string;
  capabilities: string[];
};

// Export the tools array
export const tools: Tool[] = [
  {
    name: 'Google Drive',
    description: 'Access and manipulate files stored in Google Drive.',
    rating: 4,
    downloads: '10.2k',
    color: 'blue-500',
    icon: React.createElement(Download, { className: "w-5 h-5 text-white" }),
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
    icon: React.createElement(Download, { className: "w-5 h-5 text-white" }),
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
    icon: React.createElement(Download, { className: "w-5 h-5 text-white" }),
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
    icon: React.createElement(Download, { className: "w-5 h-5 text-white" }),
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
    icon: React.createElement(Download, { className: "w-5 h-5 text-white" }),
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
    icon: React.createElement(Download, { className: "w-5 h-5 text-white" }),
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
    icon: React.createElement(Database, { className: "w-5 h-5 text-white" }),
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
    icon: React.createElement(Cloud, { className: "w-5 h-5 text-white" }),
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
    icon: React.createElement(Server, { className: "w-5 h-5 text-white" }),
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
    icon: React.createElement(HardDrive, { className: "w-5 h-5 text-white" }),
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
