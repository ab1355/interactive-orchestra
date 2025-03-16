
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatInterface, { CanvasCollaborationContext } from '@/components/home/ChatInterface';
import ResourceMetrics from '@/components/home/ResourceMetrics';
import ActivityFeed from '@/components/home/ActivityFeed';
import InteractiveCanvas from '@/components/home/InteractiveCanvas';
import NewProjectDialog from '@/components/dialogs/NewProjectDialog';
import SettingsDialog from '@/components/dialogs/SettingsDialog';
import { DataCleanupDialog } from '@/components/ui/data-cleanup-dialog';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Create canvas collaboration context values
  const [canvasState, setCanvasState] = useState({
    elements: [],
    zoom: 1,
    tool: 'select' as const,
    color: '#ffffff'
  });

  const canvasContextValue = {
    addElementToCanvas: (elementType: string, properties?: any) => {
      const newElement = {
        id: `element-${Date.now()}`,
        type: elementType,
        ...properties
      };
      setCanvasState(prev => ({
        ...prev,
        elements: [...prev.elements, newElement]
      }));
      console.log(`Added ${elementType} to canvas`);
    },
    clearCanvas: () => {
      setCanvasState(prev => ({
        ...prev,
        elements: []
      }));
      console.log('Canvas cleared');
    },
    updateCanvasZoom: (zoomLevel: number) => {
      setCanvasState(prev => ({
        ...prev,
        zoom: zoomLevel
      }));
      console.log(`Canvas zoom set to ${zoomLevel}`);
    },
    setCanvasTool: (tool: any) => {
      setCanvasState(prev => ({
        ...prev,
        tool
      }));
      console.log(`Canvas tool set to ${tool}`);
    },
    setCanvasColor: (color: string) => {
      setCanvasState(prev => ({
        ...prev,
        color
      }));
      console.log(`Canvas color set to ${color}`);
    },
  };

  const handleProjectCreated = () => {
    // Refresh projects data or navigate to new project
    console.log('Project created successfully!');
    toast({
      title: "Success",
      description: "New project created successfully.",
    });
  };

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <header className="px-6 py-4 border-b border-dark-200 flex items-center justify-between">
          <h1 className="text-xl font-semibold">AI Agent Framework</h1>
          <div className="flex items-center space-x-4">
            <button 
              className="bg-purple/10 text-purple px-3 py-1 rounded-md text-sm hover:bg-purple/20 transition-colors"
              onClick={() => setNewProjectOpen(true)}
            >
              New Project
            </button>
            <DataCleanupDialog />
            <button 
              className="bg-dark-accent border border-dark-200 px-3 py-1 rounded-md text-sm hover:bg-white/5 transition-colors"
              onClick={() => setSettingsOpen(true)}
            >
              Settings
            </button>
          </div>
        </header>
        
        <main className={`flex-1 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <CanvasCollaborationContext.Provider value={canvasContextValue}>
            <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-65px)]">
              <ResizablePanel defaultSize={25} minSize={15} maxSize={40} className="bg-dark">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={40} minSize={25} className="p-4 border-r border-dark-200">
                    <ResourceMetrics />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={60} className="p-4 border-r border-dark-200">
                    <ActivityFeed />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              <ResizablePanel defaultSize={75} className="bg-dark">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={60} minSize={30} className="p-4 border-b border-dark-200">
                    <ChatInterface />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={40} className="p-4">
                    <InteractiveCanvas />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </CanvasCollaborationContext.Provider>
        </main>
      </div>

      <NewProjectDialog 
        open={newProjectOpen} 
        onOpenChange={setNewProjectOpen} 
        onProjectCreated={handleProjectCreated}
      />
      
      <SettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen} 
      />
    </div>
  );
};

export default Dashboard;
