import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, AlertTriangle, Check, Clock, Database, Server, Wrench, Users, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUnifiedStore } from '@/stores/unifiedStore';

const StatusMonitor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { agents, availableTools } = useUnifiedStore();
  
  // Simulate changing stats
  const [systemStats, setSystemStats] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    apiRate: 28,
    latency: 180,
    uptime: '3d 14h 22m',
    toolsReady: 7,
    agentsActive: 4,
    taskQueue: 12,
    incidentCount: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        cpuUsage: Math.min(95, Math.max(15, prev.cpuUsage + (Math.random() > 0.5 ? 3 : -2))),
        memoryUsage: Math.min(90, Math.max(40, prev.memoryUsage + (Math.random() > 0.5 ? 2 : -1))),
        apiRate: Math.min(65, Math.max(10, prev.apiRate + (Math.random() > 0.5 ? 4 : -3))),
        latency: Math.min(400, Math.max(80, prev.latency + (Math.random() > 0.5 ? 20 : -15))),
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (metric: number, thresholds: { low: number, medium: number }) => {
    if (metric < thresholds.low) return 'bg-green-500';
    if (metric < thresholds.medium) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="m-0 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-dark-accent/20 border-dark-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-green-500" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2 flex items-center">
                  <span className={systemStats.cpuUsage > 75 ? 'text-red-400' : 'text-green-400'}>
                    {systemStats.cpuUsage > 75 ? 'Degraded' : 'Healthy'}
                  </span>
                  {systemStats.cpuUsage > 75 ? (
                    <AlertTriangle className="ml-2 h-5 w-5 text-red-400" />
                  ) : (
                    <Check className="ml-2 h-5 w-5 text-green-400" />
                  )}
                </div>
                <div className="text-sm text-gray-400">Last updated: just now</div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-accent/20 border-dark-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-400" />
                  System Uptime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{systemStats.uptime}</div>
                <div className="text-sm text-gray-400">Since last restart</div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-dark-accent/20 border-dark-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Resource Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm flex items-center">
                      <Server className="h-3 w-3 mr-1" /> CPU Usage
                    </span>
                    <span className="text-sm">{systemStats.cpuUsage}%</span>
                  </div>
                  <Progress 
                    value={systemStats.cpuUsage} 
                    className="h-2" 
                    indicatorClassName={getStatusColor(systemStats.cpuUsage, { low: 50, medium: 75 })} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm flex items-center">
                      <Database className="h-3 w-3 mr-1" /> Memory Usage
                    </span>
                    <span className="text-sm">{systemStats.memoryUsage}%</span>
                  </div>
                  <Progress 
                    value={systemStats.memoryUsage} 
                    className="h-2" 
                    indicatorClassName={getStatusColor(systemStats.memoryUsage, { low: 60, medium: 80 })} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm flex items-center">
                      <Zap className="h-3 w-3 mr-1" /> API Rate
                    </span>
                    <span className="text-sm">{systemStats.apiRate} req/min</span>
                  </div>
                  <Progress 
                    value={(systemStats.apiRate / 100) * 100} 
                    className="h-2" 
                    indicatorClassName={getStatusColor(systemStats.apiRate, { low: 30, medium: 60 })} 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm flex items-center">
                      <Activity className="h-3 w-3 mr-1" /> Latency
                    </span>
                    <span className="text-sm">{systemStats.latency} ms</span>
                  </div>
                  <Progress 
                    value={(systemStats.latency / 500) * 100} 
                    className="h-2" 
                    indicatorClassName={getStatusColor(systemStats.latency, { low: 150, medium: 300 })} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-dark-accent/20 border-dark-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 bg-purple/20 p-2 rounded-full">
                      <Users className="h-5 w-5 text-purple" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Agents</div>
                      <div className="text-2xl font-bold">{systemStats.agentsActive}</div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">Active</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-accent/20 border-dark-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 bg-blue-500/20 p-2 rounded-full">
                      <Wrench className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Tools</div>
                      <div className="text-2xl font-bold">{systemStats.toolsReady}</div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">Ready</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-accent/20 border-dark-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 bg-yellow-500/20 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Tasks</div>
                      <div className="text-2xl font-bold">{systemStats.taskQueue}</div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-500">Queue</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="agents" className="m-0 space-y-4">
          <Card className="bg-dark-accent/20 border-dark-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Agent Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <div className="font-medium">CEO Assistant</div>
                      <div className="text-xs text-gray-400">Primary orchestration agent</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-500">Active</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <div className="font-medium">Research Agent</div>
                      <div className="text-xs text-gray-400">Data collection specialist</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-500">Active</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div>
                      <div className="font-medium">Analysis Agent</div>
                      <div className="text-xs text-gray-400">Data processing specialist</div>
                    </div>
                  </div>
                  <div className="text-sm text-yellow-500">Busy</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 w-3 h-3 rounded-full bg-green-500"></div>
                    <div>
                      <div className="font-medium">QA Agent</div>
                      <div className="text-xs text-gray-400">Validation specialist</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-500">Active</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 w-3 h-3 rounded-full bg-gray-500"></div>
                    <div>
                      <div className="font-medium">Deployment Agent</div>
                      <div className="text-xs text-gray-400">Implementation specialist</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Idle</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tools" className="m-0 space-y-4">
          <Card className="bg-dark-accent/20 border-dark-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Integrated Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 bg-blue-500/20 p-1.5 rounded">
                      <Wrench className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">Data Analysis Tool</div>
                      <div className="text-xs text-gray-400">v2.1.0</div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">Ready</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 bg-purple/20 p-1.5 rounded">
                      <Wrench className="h-4 w-4 text-purple" />
                    </div>
                    <div>
                      <div className="font-medium">Web Search Integration</div>
                      <div className="text-xs text-gray-400">v1.4.2</div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">Ready</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 bg-green-500/20 p-1.5 rounded">
                      <Wrench className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium">Document Parser</div>
                      <div className="text-xs text-gray-400">v3.0.1</div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">Ready</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 bg-yellow-500/20 p-1.5 rounded">
                      <Wrench className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <div className="font-medium">Code Generator</div>
                      <div className="text-xs text-gray-400">v2.2.3</div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500">Updating</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200">
                  <div className="flex items-center">
                    <div className="mr-3 bg-red-500/20 p-1.5 rounded">
                      <Wrench className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <div className="font-medium">API Connector</div>
                      <div className="text-xs text-gray-400">v1.1.0</div>
                    </div>
                  </div>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-500">Error</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-dark-accent/20 border-dark-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Tool Integration Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 bg-dark-accent/30 rounded-lg border border-dark-200 mb-4">
                <div className="flex items-center">
                  <div className="mr-3 bg-green-500/20 p-2 rounded-full">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium">Tool System Status</div>
                    <div className="text-xs text-gray-400">4 of 5 tools operational</div>
                  </div>
                </div>
                <div className="text-sm text-green-500">80% Healthy</div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Tool Integration Rate</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-1.5" indicatorClassName="bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>API Connection Status</span>
                    <span>70%</span>
                  </div>
                  <Progress value={70} className="h-1.5" indicatorClassName="bg-yellow-500" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Tool Response Time</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-1.5" indicatorClassName="bg-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatusMonitor;
