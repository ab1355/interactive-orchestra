
import React from 'react';
import { EnhancedActionButton } from '@/components/ui/enhanced-action-button';
import { Plus, RefreshCw } from 'lucide-react';
import { TabNavigationProps } from './types';

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  refreshWorkflows,
  addCredential,
  handleToastInfo,
  activeTabComponent
}) => {
  return (
    <>
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
      
      {activeTabComponent}
    </>
  );
};

export default TabNavigation;
