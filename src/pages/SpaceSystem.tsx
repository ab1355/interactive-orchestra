
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const SpaceSystem: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-dark text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-dark-200">
          <h1 className="text-xl font-semibold flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-500" />
            Space System
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Organize and visualize your work in spatial environments
          </p>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-dark-accent border-white/10">
              <CardHeader>
                <CardTitle>Spatial Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  The Space System provides spatial organization and visualization tools for your projects and tasks.
                </p>
                
                <div className="mt-4 p-4 bg-dark/50 rounded-md border border-white/5">
                  <p className="text-center text-gray-500">Create your first space to begin organizing your work spatially</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpaceSystem;
