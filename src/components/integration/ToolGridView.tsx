
import React from 'react';
import ToolCard from './ToolCard';

type ToolGridViewProps = {
  tools: Array<any>;
};

const ToolGridView: React.FC<ToolGridViewProps> = ({ tools }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool, index) => (
        <ToolCard key={index} tool={tool} />
      ))}
    </div>
  );
};

export default ToolGridView;
