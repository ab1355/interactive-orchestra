
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Lightbulb, 
  TrendingUp, 
  Globe, 
  Target 
} from 'lucide-react';
import KnowledgeDiscovery from '@/components/discover/KnowledgeDiscovery';
import TrendAnalysis from '@/components/discover/TrendAnalysis';
import MarketIntelligence from '@/components/discover/MarketIntelligence';
import InnovationTracking from '@/components/discover/InnovationTracking';

const DiscoverSystem = () => {
  const [activeTab, setActiveTab] = useState('knowledge');

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">DISCOVER Research & Innovation System</h1>
            <p className="text-gray-400">Advanced market intelligence, trend analysis, and innovation tracking platform</p>
          </header>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="knowledge" className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                <span>Knowledge Discovery</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Trend Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Market Intelligence</span>
              </TabsTrigger>
              <TabsTrigger value="innovation" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Innovation Tracking</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="knowledge">
              <KnowledgeDiscovery />
            </TabsContent>
            
            <TabsContent value="trends">
              <TrendAnalysis />
            </TabsContent>
            
            <TabsContent value="market">
              <MarketIntelligence />
            </TabsContent>
            
            <TabsContent value="innovation">
              <InnovationTracking />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSystem;
