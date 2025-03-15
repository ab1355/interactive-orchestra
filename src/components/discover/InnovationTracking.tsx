
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Award, 
  Clock, 
  Star,
  Zap,
  BarChart,
  Calendar,
  Compass,
  ArrowUpRight,
  Check,
  Flame,
  PieChart,
  Filter
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data for innovation projects
const innovationProjects = [
  { 
    id: 1, 
    name: 'AI-Driven Customer Experience', 
    category: 'Product Innovation',
    stage: 'Development',
    progress: 68,
    risk: 'Low',
    daysRemaining: 45,
    team: ['Alex Johnson', 'Maria Garcia', 'James Chen'],
    description: 'Platform that uses machine learning to personalize customer interactions in real-time.'
  },
  { 
    id: 2, 
    name: 'Sustainable Supply Chain Initiative', 
    category: 'Process Innovation',
    stage: 'Validation',
    progress: 42,
    risk: 'Medium',
    daysRemaining: 87,
    team: ['Sarah Smith', 'David Wilson', 'Priya Patel'],
    description: 'Redesigning supply chain operations to reduce carbon footprint and increase efficiency.'
  },
  { 
    id: 3, 
    name: 'Blockchain for Secure Transactions', 
    category: 'Technology Innovation',
    stage: 'Prototyping',
    progress: 35,
    risk: 'High',
    daysRemaining: 120,
    team: ['Michael Brown', 'Emma Davis', 'Thomas Wright'],
    description: 'Implementing blockchain technology to ensure secure and transparent transactions.'
  },
  { 
    id: 4, 
    name: 'Remote Collaboration Platform', 
    category: 'Service Innovation',
    stage: 'Scaling',
    progress: 82,
    risk: 'Low',
    daysRemaining: 30,
    team: ['Lisa Chen', 'Robert Kim', 'Julia Martinez'],
    description: 'Advanced platform for seamless remote team collaboration with AI assistance.'
  },
];

// Mock data for innovation metrics
const innovationMetrics = [
  { name: 'Innovation Score', value: 78, trend: '+5', status: 'positive' },
  { name: 'Success Rate', value: 62, trend: '+3', status: 'positive' },
  { name: 'Time to Market', value: 110, trend: '-12', status: 'positive' },
  { name: 'Investment ROI', value: 3.2, trend: '+0.4', status: 'positive' },
];

// Mock data for technology radar
const technologyRadar = [
  { 
    id: 1, 
    name: 'Quantum Computing', 
    category: 'Emerging', 
    relevance: 'High',
    timeframe: '3-5 years',
    description: 'Potential to revolutionize computational capabilities for specific use cases.'
  },
  { 
    id: 2, 
    name: 'Generative AI', 
    category: 'Adopting', 
    relevance: 'High',
    timeframe: 'Now',
    description: 'Ready for implementation in creative and content generation workflows.'
  },
  { 
    id: 3, 
    name: 'Edge Computing', 
    category: 'Scaling', 
    relevance: 'Medium',
    timeframe: '1-2 years',
    description: 'Processing data closer to the source to improve response times and save bandwidth.'
  },
  { 
    id: 4, 
    name: 'Digital Twins', 
    category: 'Assessing', 
    relevance: 'Medium',
    timeframe: '2-3 years',
    description: 'Virtual representations that serve as real-time digital counterparts of physical objects.'
  },
  { 
    id: 5, 
    name: 'Autonomous Vehicles', 
    category: 'Monitoring', 
    relevance: 'Low',
    timeframe: '5+ years',
    description: 'Self-driving technology that could impact logistics and transportation services.'
  },
];

// Mock data for patents and IP
const patentsAndIP = [
  { 
    id: 1, 
    title: 'Advanced Natural Language Processing System', 
    status: 'Approved',
    filingDate: '2023-03-15',
    approvalDate: '2023-07-22',
    inventors: ['Dr. James Chen', 'Dr. Maria Garcia'],
    description: 'System for understanding and processing human language with unprecedented accuracy.'
  },
  { 
    id: 2, 
    title: 'Secure Blockchain Transaction Method', 
    status: 'Pending',
    filingDate: '2023-05-07',
    approvalDate: null,
    inventors: ['Michael Brown', 'Sarah Smith'],
    description: 'Method for ensuring highly secure transactions using advanced cryptographic techniques.'
  },
  { 
    id: 3, 
    title: 'Energy-Efficient Cloud Computing Architecture', 
    status: 'In Review',
    filingDate: '2023-06-30',
    approvalDate: null,
    inventors: ['David Wilson', 'Emma Davis'],
    description: 'Architecture that significantly reduces energy consumption in cloud computing operations.'
  },
];

const InnovationTracking = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Innovation Tracking Dashboard</h3>
          <p className="text-gray-400 text-sm">Monitor innovation projects, trends, and intellectual property</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-white/10 gap-1.5">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-white/10 gap-1.5">
            <Calendar className="w-4 h-4" />
            2023
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {innovationMetrics.map((metric, idx) => (
          <Card key={idx} className="bg-dark-accent border-white/10">
            <CardContent className="p-4">
              <div className="text-xs text-gray-400 mb-1">{metric.name}</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-white">
                  {typeof metric.value === 'number' && metric.value % 1 === 0 ? `${metric.value}%` : metric.value}
                </div>
                <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
                  metric.status === 'positive' 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {metric.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-dark-accent border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-purple" />
                Innovation Projects
              </CardTitle>
              <CardDescription>Track and manage innovation initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {innovationProjects.map((project) => (
                  <Card key={project.id} className="bg-dark border-white/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-medium">{project.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded bg-purple/20 text-purple">
                              {project.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              {project.daysRemaining} days remaining
                            </span>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          project.risk === 'Low' ? 'bg-green-900/30 text-green-400' : 
                          project.risk === 'Medium' ? 'bg-amber-900/30 text-amber-400' : 
                          'bg-red-900/30 text-red-400'
                        }`}>
                          {project.risk} Risk
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                      
                      <div className="mb-1 flex justify-between items-center">
                        <span className="text-xs text-gray-400">Progress ({project.progress}%)</span>
                        <span className="text-xs text-white">{project.stage}</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                          Team: {project.team.join(', ')}
                        </div>
                        <Button size="sm" variant="ghost" className="text-purple">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 flex justify-between">
              <div className="text-sm text-gray-400">
                Showing <span className="font-medium text-white">4</span> of <span className="font-medium text-white">12</span> projects
              </div>
              <Button className="bg-purple hover:bg-purple-dark">
                Add New Project
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-dark-accent border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-purple" />
                Technology Radar
              </CardTitle>
              <CardDescription>Emerging technologies and adoption stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {technologyRadar.map((tech) => (
                  <div key={tech.id} className="p-3 rounded-md bg-dark hover:bg-dark-600">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium text-white">{tech.name}</h4>
                      <div className={`px-2 py-0.5 rounded-full text-xs ${
                        tech.category === 'Emerging' ? 'bg-blue-900/30 text-blue-400' : 
                        tech.category === 'Adopting' ? 'bg-green-900/30 text-green-400' :
                        tech.category === 'Scaling' ? 'bg-purple/20 text-purple' :
                        tech.category === 'Assessing' ? 'bg-amber-900/30 text-amber-400' :
                        'bg-gray-900/30 text-gray-400'
                      }`}>
                        {tech.category}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className={`${
                        tech.relevance === 'High' ? 'text-green-400' :
                        tech.relevance === 'Medium' ? 'text-amber-400' :
                        'text-gray-400'
                      }`}>
                        {tech.relevance} Relevance
                      </span>
                      <span className="text-gray-400">{tech.timeframe}</span>
                    </div>
                    <p className="text-xs text-gray-400">{tech.description}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full border-white/10">
                  View Full Radar
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-accent border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple" />
                Patents & IP
              </CardTitle>
              <CardDescription>Intellectual property portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="approved">
                <TabsList className="mb-4">
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                
                <TabsContent value="approved" className="space-y-3">
                  {patentsAndIP.filter(p => p.status === 'Approved').map((patent) => (
                    <div key={patent.id} className="p-3 rounded-md bg-dark hover:bg-dark-600">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1 rounded-full bg-green-900/30">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <h4 className="text-sm font-medium text-white">{patent.title}</h4>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{patent.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Filed: {patent.filingDate}</span>
                        <span>Approved: {patent.approvalDate}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="pending" className="space-y-3">
                  {patentsAndIP.filter(p => p.status !== 'Approved').map((patent) => (
                    <div key={patent.id} className="p-3 rounded-md bg-dark hover:bg-dark-600">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="p-1 rounded-full bg-amber-900/30">
                          <Clock className="w-3 h-3 text-amber-400" />
                        </div>
                        <h4 className="text-sm font-medium text-white">{patent.title}</h4>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{patent.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Filed: {patent.filingDate}</span>
                        <span>Status: {patent.status}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="all" className="space-y-3">
                  {patentsAndIP.map((patent) => (
                    <div key={patent.id} className="p-3 rounded-md bg-dark hover:bg-dark-600">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`p-1 rounded-full ${
                          patent.status === 'Approved' ? 'bg-green-900/30' : 'bg-amber-900/30'
                        }`}>
                          {patent.status === 'Approved' ? 
                            <Check className="w-3 h-3 text-green-400" /> : 
                            <Clock className="w-3 h-3 text-amber-400" />
                          }
                        </div>
                        <h4 className="text-sm font-medium text-white">{patent.title}</h4>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Filed: {patent.filingDate}</span>
                        <span>{patent.status}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
              <Button variant="outline" size="sm" className="w-full mt-3 border-white/10">
                IP Portfolio Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InnovationTracking;
