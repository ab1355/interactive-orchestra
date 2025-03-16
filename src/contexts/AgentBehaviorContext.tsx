
import React, { createContext, useContext, ReactNode } from 'react';
import { AgentBehaviorContext as AgentBehaviorContextType } from '@/types/agentBehavior';
import { useAgentBehavior } from '@/hooks/useAgentBehavior';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Create context with a default placeholder value
const AgentBehaviorContext = createContext<AgentBehaviorContextType | undefined>(undefined);

interface AgentBehaviorProviderProps {
  children: ReactNode;
  fallback?: React.ReactNode;
}

// Provider component with error boundary functionality
export const AgentBehaviorProvider: React.FC<AgentBehaviorProviderProps> = ({ 
  children,
  fallback = (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription>
        There was an error loading the agent behavior system.
        Please refresh the page or contact support if the issue persists.
      </AlertDescription>
    </Alert>
  )
}) => {
  try {
    const behaviorContext = useAgentBehavior();
    
    // Check if the context has valid data
    if (!behaviorContext || !behaviorContext.currentProfile) {
      console.error('Agent behavior context initialized with invalid data');
      return <>{fallback}</>;
    }
    
    return (
      <AgentBehaviorContext.Provider value={behaviorContext}>
        {children}
      </AgentBehaviorContext.Provider>
    );
  } catch (error) {
    console.error('Error in AgentBehaviorProvider:', error);
    return <>{fallback}</>;
  }
};

// Custom hook to use the context with error handling
export const useAgentBehaviorContext = (): AgentBehaviorContextType => {
  const context = useContext(AgentBehaviorContext);
  
  if (context === undefined) {
    throw new Error('useAgentBehaviorContext must be used within an AgentBehaviorProvider');
  }
  
  return context;
};
