
import React from 'react';
import { Crown, Laptop, Smartphone } from 'lucide-react';
import CommandLayer from './CommandLayer';
import { executiveLayerItems, tacticalLayerItems, operationalLayerItems } from './data/commandLayerData';

const CommandStructure: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Command Structure</h3>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Executive Layer */}
        <CommandLayer
          title="Executive Layer (Me + Manager Agent)"
          icon={<Crown className="w-5 h-5 text-blue-400" />}
          color="blue"
          items={executiveLayerItems}
        />

        {/* Tactical Layer */}
        <CommandLayer
          title="Tactical Layer (Primary Agents)"
          icon={<Laptop className="w-5 h-5 text-green-400" />}
          color="green"
          items={tacticalLayerItems}
        />

        {/* Operational Layer */}
        <CommandLayer
          title="Operational Layer (Support & Specialized Agents)"
          icon={<Smartphone className="w-5 h-5 text-purple" />}
          color="purple"
          items={operationalLayerItems}
        />
      </div>
    </div>
  );
};

export default CommandStructure;
