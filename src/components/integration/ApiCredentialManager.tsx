
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink, Plus } from 'lucide-react';

const ApiCredentialManager: React.FC = () => {
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

export default ApiCredentialManager;
