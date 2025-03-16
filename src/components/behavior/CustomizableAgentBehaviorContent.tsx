
import React, { useState, useEffect, Suspense } from 'react';
import { ChevronRight, Save, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AgentConfigPanel from './AgentConfigPanel';
import TestingAndVersionPanel from './TestingAndVersionPanel';

const CustomizableAgentBehaviorContent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('gpt-4o');
  const { toast } = useToast();
  
  useEffect(() => {
    // Log component mounting for debugging
    console.log('CustomizableAgentBehaviorContent mounted');
    console.log('Environment mode:', import.meta.env.VITE_APP_MODE);
    console.log('Build mode:', import.meta.env.MODE);
    
    // Add a small delay to ensure smoother transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
      console.log('Content loaded state set to true');
      // Show a toast when the page loads successfully
      toast({
        title: "Page loaded",
        description: "Agent behavior configuration system is ready",
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-dark">
          <h1 className="text-xl font-semibold text-white">Customizable Agent Behavior</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-dark hover:bg-dark-accent text-white py-1 px-3 rounded text-sm border border-white/10 flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              Documentation
            </button>
            <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center"
              onClick={() => toast({
                title: "Settings saved",
                description: "Your agent behavior settings have been saved"
              })}>
              <Save className="w-4 h-4 mr-1" />
              Save Changes
            </button>
          </div>
        </div>
        
        <main className={`flex-1 p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} bg-dark`}>
          <div className="mb-4 flex items-center text-sm text-gray-400">
            <a href="/" className="hover:text-white">Dashboard</a>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-white">Customizable Agent Behavior</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Editor */}
            <AgentConfigPanel 
              selectedModelId={selectedModelId}
              onSelectModel={setSelectedModelId}
            />
            
            {/* Right Panel - Testing & Version Control */}
            <TestingAndVersionPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomizableAgentBehaviorContent;
