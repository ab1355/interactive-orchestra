
import React from 'react';
import { EnhancedActionButton } from '@/components/ui/enhanced-action-button';
import { TemplateListProps } from './types';

const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  deployTemplate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => (
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
  );
};

export default TemplateList;
