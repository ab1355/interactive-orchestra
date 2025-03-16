
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

const DiscoverSystem: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-dark text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-dark-200">
          <h1 className="text-xl font-semibold flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
            Discover System
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Explore insights and discover new patterns and opportunities
          </p>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-dark-accent border-white/10">
              <CardHeader>
                <CardTitle>Discovery Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  The Discovery System helps you identify patterns, insights, and opportunities within your data.
                </p>
                
                <div className="mt-4 p-4 bg-dark/50 rounded-md border border-white/5">
                  <p className="text-center text-gray-500">Connect to your data sources to begin discovering insights</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DiscoverSystem;
