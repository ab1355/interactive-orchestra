
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AgentPerformance: React.FC = () => {
  const performanceData = [
    {
      day: 'Day 1',
      'Research Agent': 4,
      'Analysis Agent': 6,
      'Development Agent': 3,
      'QA Agent': 2,
    },
    {
      day: 'Day 2',
      'Research Agent': 6,
      'Analysis Agent': 4,
      'Development Agent': 5,
      'QA Agent': 3,
    },
    {
      day: 'Day 3',
      'Research Agent': 8,
      'Analysis Agent': 7,
      'Development Agent': 4,
      'QA Agent': 5,
    },
    {
      day: 'Day 4',
      'Research Agent': 9,
      'Analysis Agent': 8,
      'Development Agent': 7,
      'QA Agent': 6,
    },
    {
      day: 'Day 5',
      'Research Agent': 7,
      'Analysis Agent': 9,
      'Development Agent': 8,
      'QA Agent': 7,
    },
    {
      day: 'Day 6',
      'Research Agent': 10,
      'Analysis Agent': 8,
      'Development Agent': 9,
      'QA Agent': 8,
    },
    {
      day: 'Day 7',
      'Research Agent': 12,
      'Analysis Agent': 10,
      'Development Agent': 9,
      'QA Agent': 10,
    },
  ];

  const agentColors = {
    'Research Agent': '#8b5cf6',
    'Analysis Agent': '#3b82f6',
    'Development Agent': '#10b981',
    'QA Agent': '#f59e0b',
  };

  const agentScores = [
    { name: 'Research Agent', score: 92, tasks: 32 },
    { name: 'Analysis Agent', score: 87, tasks: 28 },
    { name: 'Development Agent', score: 84, tasks: 24 },
    { name: 'QA Agent', score: 79, tasks: 18 },
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-dark-accent/30 border-dark-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Agent Performance (Tasks Completed)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1F2C', 
                    borderColor: '#374151',
                    color: 'white' 
                  }} 
                />
                <Legend />
                {Object.keys(agentColors).map((agent) => (
                  <Line
                    key={agent}
                    type="monotone"
                    dataKey={agent}
                    stroke={agentColors[agent as keyof typeof agentColors]}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Agent Effectiveness Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentScores.map((agent) => (
                <div key={agent.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{agent.name}</span>
                    <span className="text-sm font-medium">{agent.score}%</span>
                  </div>
                  <div className="w-full bg-dark-accent h-2 rounded-full">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${agent.score}%`,
                        backgroundColor: agentColors[agent.name as keyof typeof agentColors]
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent/30 border-dark-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Agent Workload Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={agentScores.map(agent => ({ name: agent.name, value: agent.tasks }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderCustomizedLabel}
                  >
                    {agentScores.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={agentColors[entry.name as keyof typeof agentColors]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1F2C', 
                      borderColor: '#374151',
                      color: 'white' 
                    }} 
                    formatter={(value, name) => [`${value} tasks`, name]}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default AgentPerformance;
