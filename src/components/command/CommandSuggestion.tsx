
import React from 'react';
import { Sparkle } from 'lucide-react';

interface CommandSuggestionProps {
  command: string;
  onClick: () => void;
}

const CommandSuggestion: React.FC<CommandSuggestionProps> = ({ command, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-accent/30 hover:bg-dark-accent/50 
      text-white text-sm rounded-full border border-dark-200 whitespace-nowrap transition-colors"
    >
      <Sparkle className="h-3 w-3 text-purple" />
      <span>{command}</span>
    </button>
  );
};

export default CommandSuggestion;
