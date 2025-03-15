
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Search, 
  FileText, 
  BookOpen, 
  Database, 
  Filter,
  Download,
  Clock
} from 'lucide-react';

// Mock data for knowledge sources
const knowledgeSources = [
  { id: 1, title: 'Industry Research Papers', count: 1243, lastUpdated: '2 hours ago' },
  { id: 2, title: 'Market Analysis Reports', count: 567, lastUpdated: '1 day ago' },
  { id: 3, title: 'Competitor Intelligence', count: 328, lastUpdated: '3 days ago' },
  { id: 4, title: 'Academic Publications', count: 2156, lastUpdated: '5 hours ago' },
  { id: 5, title: 'Patent Filings', count: 892, lastUpdated: '12 hours ago' },
];

// Mock data for recent discoveries
const recentDiscoveries = [
  { 
    id: 1, 
    title: 'Emerging Quantum Computing Applications', 
    relevance: 92, 
    source: 'Academic Research',
    date: '2023-08-15',
    summary: 'New applications in cryptography and material science showing promising results.'
  },
  { 
    id: 2, 
    title: 'Sustainable Manufacturing Techniques', 
    relevance: 87, 
    source: 'Industry Reports',
    date: '2023-08-12',
    summary: 'Cost-effective methods for reducing carbon footprint in manufacturing processes.'
  },
  { 
    id: 3, 
    title: 'AI-Driven Customer Experience Platforms', 
    relevance: 94, 
    source: 'Market Analysis',
    date: '2023-08-10',
    summary: 'Platforms leveraging machine learning to personalize customer interactions.'
  },
];

const KnowledgeDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDataset, setActiveDataset] = useState('all');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-purple" />
              Knowledge Discovery Engine
            </CardTitle>
            <CardDescription>Discover insights and patterns across multiple data sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-6">
              <Input 
                type="text" 
                placeholder="Search knowledge base..." 
                className="bg-dark border-white/10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="bg-purple hover:bg-purple-dark">Search</Button>
            </div>
            
            <Tabs value={activeDataset} onValueChange={setActiveDataset}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Sources</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="industry">Industry</TabsTrigger>
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="patents">Patents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {recentDiscoveries.map(discovery => (
                  <Card key={discovery.id} className="bg-dark border-white/10 hover:border-purple/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-white">{discovery.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">{discovery.summary}</p>
                        </div>
                        <div className="bg-purple/20 text-purple px-2 py-1 rounded-full text-xs font-medium">
                          {discovery.relevance}% match
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>{discovery.source}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{discovery.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              {['academic', 'industry', 'market', 'patents'].map(tab => (
                <TabsContent key={tab} value={tab}>
                  <div className="bg-dark-accent border border-white/10 rounded-md p-6 text-center">
                    <p className="text-gray-400">Select specific {tab} sources to view filtered results</p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="border-t border-white/10 flex justify-between">
            <div className="text-sm text-gray-400">
              <span className="font-medium text-white">5,186</span> knowledge items indexed
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-white/10 gap-1">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-white/10 gap-1">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple" />
              ML-Powered Research Assistant
            </CardTitle>
            <CardDescription>Ask questions to our AI research assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-dark-accent border border-white/10 rounded-md p-6">
              <div className="flex flex-col gap-4">
                <div className="bg-dark-600 p-3 rounded-lg max-w-[80%]">
                  <p className="text-gray-300">What are the latest trends in quantum computing?</p>
                </div>
                <div className="bg-purple/20 p-3 rounded-lg max-w-[80%] self-end">
                  <p className="text-white">
                    Recent research shows significant advancements in quantum error correction, with several papers published in the last 2 months demonstrating error rates below previous thresholds. Additionally, there's growing investment in quantum machine learning applications, particularly in the financial sector.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Input 
                  type="text" 
                  placeholder="Ask a research question..." 
                  className="bg-dark border-white/10" 
                />
                <Button className="bg-purple hover:bg-purple-dark">Ask</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple" />
              Knowledge Sources
            </CardTitle>
            <CardDescription>Connected data sources and repositories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {knowledgeSources.map(source => (
                <div 
                  key={source.id} 
                  className="flex items-center justify-between p-3 rounded-md bg-dark hover:bg-dark-600 cursor-pointer"
                >
                  <div>
                    <h4 className="text-sm font-medium text-white">{source.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-gray-400">{source.count} documents</p>
                      <p className="text-xs text-gray-400">Updated {source.lastUpdated}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    Browse
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-dark hover:bg-dark-600 border border-white/10">
              Connect New Source
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              ML Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">Relevance Threshold</label>
                <Input type="range" min="0" max="100" defaultValue="70" className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">Data Freshness</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button size="sm" variant="outline" className="border-white/10 text-xs">24h</Button>
                  <Button size="sm" variant="outline" className="border-purple bg-purple/20 text-purple text-xs">7d</Button>
                  <Button size="sm" variant="outline" className="border-white/10 text-xs">30d</Button>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400">Model Selection</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="radio" id="model-standard" name="model" className="text-purple" defaultChecked />
                    <label htmlFor="model-standard" className="text-xs">Standard Analysis</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" id="model-advanced" name="model" className="text-purple" />
                    <label htmlFor="model-advanced" className="text-xs">Advanced ML Analysis</label>
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4 bg-purple hover:bg-purple-dark">
              Apply Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeDiscovery;
