
import React, { useEffect, Suspense } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { AgentBehaviorProvider } from '@/contexts/AgentBehaviorContext';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import CustomizableAgentBehaviorContent from '@/components/behavior/CustomizableAgentBehaviorContent';

// Main wrapper component with ErrorBoundary and AgentBehaviorProvider
const CustomizableAgentBehavior: React.FC = () => {
  useEffect(() => {
    console.log('CustomizableAgentBehavior component mounted');
    // Add more detailed logging for production debugging
    console.log('Environment:', import.meta.env.MODE);
    console.log('App mode:', import.meta.env.VITE_APP_MODE);
    console.log('Base URL:', import.meta.env.BASE_URL);
  }, []);

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      <ErrorBoundary
        onError={(error, errorInfo) => {
          console.error('Error in CustomizableAgentBehavior:', error);
          console.error('Component stack:', errorInfo.componentStack);
        }}
      >
        <AgentBehaviorProvider>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-dark text-white">Loading agent behavior system...</div>}>
            <CustomizableAgentBehaviorContent />
          </Suspense>
        </AgentBehaviorProvider>
      </ErrorBoundary>
      <Toaster />
    </div>
  );
};

export default CustomizableAgentBehavior;
