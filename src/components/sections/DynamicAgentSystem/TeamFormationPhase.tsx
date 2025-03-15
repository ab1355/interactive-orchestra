
import React from 'react';

interface PhaseProps {
  title: string;
  color: string;
  items: string[];
}

const TeamFormationPhase: React.FC<PhaseProps> = ({ title, color, items }) => {
  const dotColor = `text-${color}-400`;
  const bgColor = `bg-${color}-500/30`;
  const roundedColor = `bg-${color}-500`;
  
  return (
    <div className="bg-dark/60 border border-white/10 rounded-lg p-5 relative">
      <div className={`absolute top-0 left-1/2 w-6 h-6 rounded-full ${bgColor} -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
        <div className={`w-3 h-3 rounded-full ${roundedColor}`}></div>
      </div>
      <h4 className="text-lg font-medium text-white mb-3 mt-2 text-center">{title}</h4>
      <ul className="space-y-2 text-sm text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className={`${dotColor} text-lg leading-none`}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamFormationPhase;
