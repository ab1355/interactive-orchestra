
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatInterface from '@/components/home/ChatInterface';
import ResourceMetrics from '@/components/home/ResourceMetrics';
import ActivityFeed from '@/components/home/ActivityFeed';
import InteractiveCanvas from '@/components/home/InteractiveCanvas';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-xl font-semibold">AI Agent Framework</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-purple/10 text-purple px-3 py-1 rounded-md text-sm hover:bg-purple/20 transition-colors">
              New Project
            </button>
            <button className="bg-dark-accent border border-white/10 px-3 py-1 rounded-md text-sm hover:bg-white/5 transition-colors">
              Settings
            </button>
          </div>
        </header>
        
        <main className={`flex-1 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-65px)]">
            <ResizablePanel defaultSize={25} minSize={15} maxSize={40} className="bg-dark">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={40} minSize={25} className="p-4 border-r border-white/10">
                  <ResourceMetrics />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={60} className="p-4 border-r border-white/10">
                  <ActivityFeed />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={75} className="bg-dark">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={60} minSize={30} className="p-4 border-b border-white/10">
                  <ChatInterface />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40} className="p-4">
                  <InteractiveCanvas />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </div>
  );
};

export default Index;
