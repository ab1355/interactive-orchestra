
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Users, 
  Layers, 
  Database,
  BarChart4,
  BookOpen,
  PieChart,
  ArrowRight
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Legend, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

// Mock data for market segments
const marketSegmentData = [
  { name: 'Enterprise', value: 40 },
  { name: 'SMB', value: 30 },
  { name: 'Consumer', value: 20 },
  { name: 'Government', value: 10 },
];

const COLORS = ['#8B5CF6', '#60A5FA', '#10B981', '#F59E0B'];

// Mock data for competitors
const competitorData = [
  { 
    name: 'TechGiant Inc', 
    marketShare: '32%', 
    strengthScore: 87,
    keyProducts: ['Enterprise Cloud', 'AI Platform', 'Security Suite'],
    recentUpdates: 'Launched new AI-driven analytics platform last month'
  },
  { 
    name: 'InnovateSoft', 
    marketShare: '24%', 
    strengthScore: 82,
    keyProducts: ['Business Intelligence', 'Data Integration', 'Workflow Automation'],
    recentUpdates: 'Acquired data visualization startup for $50M'
  },
  { 
    name: 'FutureTech Systems', 
    marketShare: '18%', 
    strengthScore: 76,
    keyProducts: ['Machine Learning Suite', 'DevOps Platform', 'Edge Computing'],
    recentUpdates: 'Announced strategic partnership with cloud provider'
  },
  { 
    name: 'DataForge Solutions', 
    marketShare: '14%', 
    strengthScore: 71,
    keyProducts: ['Data Warehouse', 'Analytics Dashboard', 'Reporting Tools'],
    recentUpdates: 'Released major platform update with improved performance'
  },
];

// Mock data for market reports
const marketReports = [
  { 
    id: 1, 
    title: 'Industry Growth Analysis 2023', 
    source: 'MarketInsight Research',
    date: 'August 15, 2023',
    keyFindings: 'Projected 18% CAGR over next 5 years with emerging markets accounting for 40% of growth'
  },
  { 
    id: 2, 
    title: 'Competitor Landscape Report', 
    source: 'Strategic Analytics Partners',
    date: 'July 28, 2023',
    keyFindings: 'Market consolidation expected with 3-4 major acquisitions likely in next 12 months'
  },
  { 
    id: 3, 
    title: 'Technology Adoption Trends', 
    source: 'TechForesight Institute',
    date: 'July 10, 2023',
    keyFindings: 'AI implementation accelerating with 65% of enterprises planning significant investment'
  },
];

const MarketIntelligence = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-dark-accent border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-md bg-purple/20">
                <Globe className="w-5 h-5 text-purple" />
              </div>
              <h3 className="text-lg font-medium text-white">Market Overview</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Market Size:</span>
                <span className="text-white font-medium">$14.8 Billion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Growth Rate:</span>
                <span className="text-green-400 font-medium">+18.2% YoY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Market Stage:</span>
                <span className="text-white font-medium">Growth</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Competition Level:</span>
                <span className="text-amber-400 font-medium">High</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-accent border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-md bg-purple/20">
                <Users className="w-5 h-5 text-purple" />
              </div>
              <h3 className="text-lg font-medium text-white">Customer Insights</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Satisfaction Score:</span>
                <span className="text-green-400 font-medium">84/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Churn Rate:</span>
                <span className="text-green-400 font-medium">4.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Acquisition Cost:</span>
                <span className="text-white font-medium">$1,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lifetime Value:</span>
                <span className="text-white font-medium">$8,500</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-accent border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-md bg-purple/20">
                <Layers className="w-5 h-5 text-purple" />
              </div>
              <h3 className="text-lg font-medium text-white">Competitive Position</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Market Share:</span>
                <span className="text-white font-medium">22.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Market Rank:</span>
                <span className="text-green-400 font-medium">#2 of 12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price Position:</span>
                <span className="text-white font-medium">Premium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Brand Strength:</span>
                <span className="text-amber-400 font-medium">Strong</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-dark-accent border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-purple" />
                Market Intelligence Dashboard
              </CardTitle>
              <CardDescription>Comprehensive market data and competitive analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6">
                <Input 
                  type="text" 
                  placeholder="Search market data..." 
                  className="bg-dark border-white/10" 
                />
                <Button className="bg-purple hover:bg-purple-dark">Search</Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-4">Competitor Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Company</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Market Share</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Strength Score</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Key Products</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Recent Updates</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competitorData.map((competitor, idx) => (
                          <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                            <td className="py-3 px-4 text-white font-medium">{competitor.name}</td>
                            <td className="py-3 px-4 text-gray-300">{competitor.marketShare}</td>
                            <td className="py-3 px-4">
                              <div className={`px-2 py-1 rounded text-xs inline-block font-medium ${
                                competitor.strengthScore >= 85 ? 'bg-red-900/30 text-red-400' : 
                                competitor.strengthScore >= 75 ? 'bg-amber-900/30 text-amber-400' : 
                                'bg-blue-900/30 text-blue-400'
                              }`}>
                                {competitor.strengthScore}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                {competitor.keyProducts.map((product, i) => (
                                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-dark-600 text-gray-300">
                                    {product}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-xs text-gray-400">{competitor.recentUpdates}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-4">Recent Market Reports</h3>
                  <div className="space-y-3">
                    {marketReports.map((report) => (
                      <Card key={report.id} className="bg-dark border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-white font-medium">{report.title}</h4>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                <span>{report.source}</span>
                                <span>•</span>
                                <span>{report.date}</span>
                              </div>
                              <p className="text-sm mt-2 text-gray-300">{report.keyFindings}</p>
                            </div>
                            <Button size="sm" variant="ghost" className="text-purple flex items-center gap-1">
                              View Report
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-dark-accent border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple" />
                Market Segmentation
              </CardTitle>
              <CardDescription>Breakdown of current market shares</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={marketSegmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {marketSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-accent border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart4 className="w-5 h-5 text-purple" />
                Market Intelligence Tools
              </CardTitle>
              <CardDescription>Available research and analysis tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Competitor Analysis', icon: Users, description: 'Deep dive into competitor strategies' },
                  { name: 'Market Sizing Tool', icon: PieChart, description: 'Calculate TAM, SAM and SOM estimates' },
                  { name: 'Research Database', icon: BookOpen, description: 'Access to industry reports and white papers' },
                  { name: 'Trend Forecasting', icon: TrendingUp, description: 'Predict future market movements' },
                ].map((tool, idx) => (
                  <div key={idx} className="p-3 rounded-md bg-dark hover:bg-dark-600 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-purple/20">
                        <tool.icon className="w-4 h-4 text-purple" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white">{tool.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{tool.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-2 bg-dark hover:bg-dark-600 border border-white/10">
                  View All Tools
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
