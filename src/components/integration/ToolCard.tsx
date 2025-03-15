
import React, { useState } from 'react';
import { Star, ExternalLink, Plus, Download, Cloud, Database, Server, HardDrive } from 'lucide-react';
import { ActionButton } from "@/components/ui/action-button";
import IntegrationDialog from '@/components/integration/IntegrationDialog';

type ToolProps = {
  tool: {
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
};

const ToolCard: React.FC<ToolProps> = ({ tool }) => {
  const [expanded, setExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const openIntegrationDialog = () => {
    setIsDialogOpen(true);
  };

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
          onClick={openIntegrationDialog}
          tooltipText={`Add ${tool.name} integration to your project`}
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Integration
        </ActionButton>
      </div>
      
      <IntegrationDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        tool={tool}
      />
    </div>
  );
};

export default ToolCard;
