
import React from 'react';
import { Button } from "@/components/ui/button";

const IntegrationConfiguration: React.FC = () => {
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

export default IntegrationConfiguration;
