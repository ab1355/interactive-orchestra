
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from '@/components/ui/progress';

const ResourceUtilization: React.FC = () => {
  const utilizationData = [
    {
      time: '00:00',
      CPU: 30,
      Memory: 40,
      API: 10,
    },
    {
      time: '04:00',
      CPU: 25,
      Memory: 35,
      API: 8,
    },
    {
      time: '08:00',
      CPU: 45,
      Memory: 55,
      API: 25,
    },
    {
      time: '12:00',
      CPU: 65,
      Memory: 70,
      API: 45,
    },
    {
      time: '16:00',
      CPU: 85,
      Memory: 80,
      API: 60,
    },
    {
      time: '20:00',
      CPU: 60,
      Memory: 65,
      API: 35,
    },
    {
      time: '23:59',
      CPU: 40,
      Memory: 50,
      API: 20,
    },
  ];

  const currentResources = [
    { name: 'API Rate Limit', used: 68, total: 100, unit: 'req/min' },
    { name: 'Memory Usage', used: 4.2, total: 8, unit: 'GB' },
    { name: 'CPU Utilization', used: 45, total: 100, unit: '%' },
    { name: 'Storage', used: 8.5, total: 20, unit: 'GB' },
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-dark-accent/30 border-dark-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Resource Utilization Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={utilizationData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1F2C', 
                    borderColor: '#374151',
                    color: 'white' 
                  }} 
                  formatter={(value) => [`${value}%`, '']}
                />
                <Area type="monotone" dataKey="CPU" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="Memory" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="API" stackId="3" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Current Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentResources.map((resource) => (
                <div key={resource.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{resource.name}</span>
                    <span className="text-sm font-medium">
                      {resource.used} / {resource.total} {resource.unit}
                    </span>
                  </div>
                  <Progress 
                    value={(resource.used / resource.total) * 100} 
                    className="h-2" 
                    indicatorClassName={
                      (resource.used / resource.total) * 100 > 80 
                        ? "bg-red-500" 
                        : (resource.used / resource.total) * 100 > 60 
                          ? "bg-yellow-500" 
                          : "bg-green-500"
                    } 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">External API Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">OpenAI API</span>
                  <span className="text-sm font-medium">2,450 / 5,000 tokens</span>
                </div>
                <Progress value={49} className="h-2" indicatorClassName="bg-purple" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Google Search</span>
                  <span className="text-sm font-medium">87 / 100 queries</span>
                </div>
                <Progress value={87} className="h-2" indicatorClassName="bg-yellow-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Weather API</span>
                  <span className="text-sm font-medium">23 / 100 queries</span>
                </div>
                <Progress value={23} className="h-2" indicatorClassName="bg-green-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Database Queries</span>
                  <span className="text-sm font-medium">156 / 500 queries</span>
                </div>
                <Progress value={31.2} className="h-2" indicatorClassName="bg-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourceUtilization;
