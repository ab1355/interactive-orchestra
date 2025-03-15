
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ChevronRight, Package, Search, Grid, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActionButton } from '@/components/ui/action-button';
import { tools } from '@/components/integration/ToolData'; // The import will still work
import ToolGridView from '@/components/integration/ToolGridView';
import ToolTableView from '@/components/integration/ToolTableView';
import IntegrationConfiguration from '@/components/integration/IntegrationConfiguration';
import ApiCredentialManager from '@/components/integration/ApiCredentialManager';
import ToolTestingSandbox from '@/components/integration/ToolTestingSandbox';
import ButtonFunctionalityDemo from '@/components/integration/ButtonFunctionalityDemo';
import N8nIntegration from '@/components/integration/N8nIntegration';
import CoolifyIntegration from '@/components/integration/coolify/CoolifyIntegration';
import { Toaster } from 'sonner';

const ToolIntegration: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
              onClick={() => alert('This would open a dialog to create a custom integration')}
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
              <ToolGridView tools={tools} />
            ) : (
              <ToolTableView tools={tools} />
            )}
          </div>
          
          {/* Coolify Integration */}
          <div className="mb-6">
            <CoolifyIntegration />
          </div>
          
          {/* n8n Integration */}
          <div className="mb-6">
            <N8nIntegration />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <IntegrationConfiguration />
            <ApiCredentialManager />
          </div>
          
          <div className="mb-6">
            <ToolTestingSandbox />
          </div>

          {/* Button Functionality Demo */}
          <div className="mb-6">
            <ButtonFunctionalityDemo />
          </div>
        </main>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default ToolIntegration;
