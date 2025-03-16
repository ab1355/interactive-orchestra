
import React, { createContext, useContext, ReactNode } from 'react';
import { AgentBehaviorContext as AgentBehaviorContextType } from '@/types/agentBehavior';
import { useAgentBehavior } from '@/hooks/useAgentBehavior';

// Create context with a default placeholder value
const AgentBehaviorContext = createContext<AgentBehaviorContextType | undefined>(undefined);

// Provider component
export const AgentBehaviorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const behaviorContext = useAgentBehavior();
  
  return (
    <AgentBehaviorContext.Provider value={behaviorContext}>
      {children}
    </AgentBehaviorContext.Provider>
  );
};

// Custom hook to use the context
export const useAgentBehaviorContext = (): AgentBehaviorContextType => {
  const context = useContext(AgentBehaviorContext);
  
  if (context === undefined) {
    throw new Error('useAgentBehaviorContext must be used within an AgentBehaviorProvider');
  }
  
  return context;
};
