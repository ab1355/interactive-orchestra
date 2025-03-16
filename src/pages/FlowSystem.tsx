
import React, { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { performanceMonitor } from '@/utils/performanceMonitor';
import TaskManagement from '@/components/flow/TaskManagement';
import EfficiencyAnalysis from '@/components/flow/efficiency';

const FlowSystem: React.FC = () => {
  // Track page load time
  useEffect(() => {
    const endTimer = performanceMonitor.startTimer('flow_system_render');
    
    // Track page view
    performanceMonitor.trackEvent('page_view', { page: 'flow-system' });
    
    return () => {
      endTimer();
    };
  }, []);
  
  return (
    <div className="flex min-h-screen bg-dark text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-6 py-4 border-b border-dark-200">
          <h1 className="text-xl font-semibold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Flow System
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Optimize processes and workflows for maximum efficiency
          </p>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ErrorBoundary>
              <Card className="bg-dark-accent border-white/10">
                <CardHeader>
                  <CardTitle>Workflow Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    The Flow System helps you design, optimize, and automate workflows for improved efficiency.
                  </p>
                  
                  <div className="mt-4 p-4 bg-dark/50 rounded-md border border-white/5">
                    <p className="text-center text-gray-500">Create your first workflow to begin optimizing your processes</p>
                  </div>
                </CardContent>
              </Card>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <TaskManagement />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <EfficiencyAnalysis />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FlowSystem;
