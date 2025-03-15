
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

const ToolTestingSandbox: React.FC = () => {
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

export default ToolTestingSandbox;
