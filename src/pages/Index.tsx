
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import UnifiedCanvas from '@/components/canvas/UnifiedCanvas';
import { useProjectStore } from '@/stores/projectStore';
import { useAgentStore } from '@/stores/agentStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DataCleanupDialog } from '@/components/ui/data-cleanup-dialog';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const { createProject, currentProject } = useProjectStore();
  const { agents, initializeMainAgent } = useAgentStore();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNewProject = async () => {
    try {
      const projectData = {
        name: 'New Project',
        description: 'Project description',
        timestamp: new Date().toISOString(),
      };
      
      const newProject = await createProject(projectData);
      await initializeMainAgent();
      
      toast({
        title: "Project Created",
        description: "New project workspace is ready.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <header className="px-6 py-4 border-b border-dark-200 flex items-center justify-between">
          <h1 className="text-xl font-semibold">AI Agent Framework</h1>
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-purple/10 text-purple px-3 py-1 rounded-md text-sm hover:bg-purple/20 transition-colors animate-fade-in"
              onClick={handleNewProject}
            >
              New Project
            </Button>
            <DataCleanupDialog />
          </div>
        </header>
        
        <main className={`flex-1 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <UnifiedCanvas />
        </main>
      </div>
    </div>
  );
};

export default Index;
