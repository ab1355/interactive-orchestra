
import React from 'react';

const BehaviorTemplateLibrary: React.FC = () => {
  const templates = [
    { name: 'Customer Support Agent', description: 'Polite, helpful, focuses on solving customer issues quickly.', active: true },
    { name: 'Data Analyst', description: 'Analytical, delivers insights from data, provides visualizations.', active: false },
    { name: 'Creative Writer', description: 'Imaginative, generates engaging and creative content.', active: false },
    { name: 'Technical Expert', description: 'Detailed, provides technical explanations with code examples.', active: false },
    { name: 'Executive Summarizer', description: 'Concise, extracts key points for busy executives.', active: false },
  ];

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">Behavior Templates</h3>
      
      <div className="space-y-3">
        {templates.map((template, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border ${template.active ? 'border-purple bg-purple/10' : 'border-white/10 bg-dark'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-medium">{template.name}</h4>
                <p className="text-sm text-gray-300 mt-1">{template.description}</p>
              </div>
              {template.active ? (
                <span className="px-2 py-1 bg-purple/20 text-purple text-xs rounded">Active</span>
              ) : (
                <button className="text-sm text-purple hover:text-purple-light">
                  Apply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="text-sm text-purple hover:text-purple-light">
          + Create New Template
        </button>
      </div>
    </div>
  );
};

export default BehaviorTemplateLibrary;
