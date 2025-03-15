
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  UserCheck, 
  Users, 
  BarChart, 
  Milestone 
} from 'lucide-react';
import EmployeeAssessment from '@/components/elevate/EmployeeAssessment';
import TeamBuilding from '@/components/elevate/TeamBuilding';
import PerformanceAnalytics from '@/components/elevate/PerformanceAnalytics';
import DevelopmentTracking from '@/components/elevate/DevelopmentTracking';

const ElevateSystem = () => {
  const [activeTab, setActiveTab] = useState('assessment');

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">ELEVATE Workplace Development System</h1>
            <p className="text-gray-400">Comprehensive employee development, performance tracking, and team building platform</p>
          </header>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="assessment" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span>Assessment</span>
              </TabsTrigger>
              <TabsTrigger value="team-building" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Team Building</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="development" className="flex items-center gap-2">
                <Milestone className="w-4 h-4" />
                <span>Development</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="assessment">
              <EmployeeAssessment />
            </TabsContent>
            
            <TabsContent value="team-building">
              <TeamBuilding />
            </TabsContent>
            
            <TabsContent value="analytics">
              <PerformanceAnalytics />
            </TabsContent>
            
            <TabsContent value="development">
              <DevelopmentTracking />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ElevateSystem;
