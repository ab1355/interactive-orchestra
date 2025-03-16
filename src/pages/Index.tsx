
import React, { useState, useEffect } from 'react';
import { Columns, Terminal, Activity, PieChart, LayoutGrid } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import CommandCenter from '@/components/command/CommandCenter';
import VisualizationPanel from '@/components/visualization/VisualizationPanel';
import StatusMonitor from '@/components/status/StatusMonitor';
import { useUnifiedStore } from '@/stores/unifiedStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DataCleanupDialog } from '@/components/ui/data-cleanup-dialog';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeView, setActiveView] = useState('command');
  const { toast } = useToast();
  const { createProject, currentProject } = useUnifiedStore();

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
          <h1 className="text-xl font-semibold">CEO Command Center</h1>
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
          <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-65px)]">
            <ResizablePanel defaultSize={60} minSize={40} className="flex flex-col">
              <Tabs 
                value={activeView} 
                onValueChange={setActiveView}
                className="w-full border-b border-dark-200"
              >
                <TabsList className="ml-4 mt-2 mb-0 bg-transparent">
                  <TabsTrigger 
                    value="command" 
                    className="flex items-center gap-2 data-[state=active]:bg-dark-accent/40"
                  >
                    <Terminal className="h-4 w-4" />
                    <span>Command</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="visualization" 
                    className="flex items-center gap-2 data-[state=active]:bg-dark-accent/40"
                  >
                    <PieChart className="h-4 w-4" />
                    <span>Visualization</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="grid" 
                    className="flex items-center gap-2 data-[state=active]:bg-dark-accent/40"
                  >
                    <LayoutGrid className="h-4 w-4" />
                    <span>Grid View</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex-1 overflow-hidden p-4">
                <TabsContent value="command" className="h-full m-0">
                  <CommandCenter />
                </TabsContent>
                <TabsContent value="visualization" className="h-full m-0">
                  <VisualizationPanel />
                </TabsContent>
                <TabsContent value="grid" className="h-full m-0">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="bg-dark-accent/30 rounded-lg p-4 border border-dark-200">
                      <CommandCenter compact={true} />
                    </div>
                    <div className="bg-dark-accent/30 rounded-lg p-4 border border-dark-200">
                      <VisualizationPanel compact={true} />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={40} minSize={20} className="flex flex-col">
              <div className="p-4 border-b border-dark-200 bg-dark-accent/10 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-purple" />
                <h2 className="text-lg font-medium">System Status</h2>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <StatusMonitor />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </div>
  );
};

export default Index;
