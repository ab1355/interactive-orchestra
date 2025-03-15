
import React from 'react';
import { Layers, BarChart3 } from 'lucide-react';
import TeamFormationPhase from './TeamFormationPhase';

const TeamFormationFramework = () => {
  const analysisPhaseItems = [
    "Requirement identification",
    "Available agent assessment",
    "Historical performance evaluation"
  ];

  const formationPhaseItems = [
    "Skill matching algorithms",
    "Agent compatibility assessment",
    "Resource allocation planning"
  ];

  const executionPhaseItems = [
    "Team deployment",
    "Performance monitoring",
    "Dynamic reconfiguration"
  ];

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Dynamic Team Formation Framework</h3>
      
      <div className="relative">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
            <Layers className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gray-700 -translate-x-1/2 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamFormationPhase 
              title="Analysis Phase" 
              color="blue" 
              items={analysisPhaseItems} 
            />
            
            <TeamFormationPhase 
              title="Formation Phase" 
              color="green" 
              items={formationPhaseItems} 
            />
            
            <TeamFormationPhase 
              title="Execution Phase" 
              color="purple" 
              items={executionPhaseItems} 
            />
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center border border-purple/40">
            <BarChart3 className="w-6 h-6 text-purple" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamFormationFramework;
