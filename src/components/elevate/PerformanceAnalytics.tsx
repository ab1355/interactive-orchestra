
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  TrendingUp, 
  Activity, 
  Users, 
  Calendar, 
  Filter, 
  Download 
} from 'lucide-react';
import { 
  LineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

// Mock performance data for charts
const performanceOverTime = [
  { month: 'Jan', teamPerformance: 78, individualAvg: 72, goal: 80 },
  { month: 'Feb', teamPerformance: 75, individualAvg: 76, goal: 80 },
  { month: 'Mar', teamPerformance: 82, individualAvg: 78, goal: 80 },
  { month: 'Apr', teamPerformance: 87, individualAvg: 80, goal: 80 },
  { month: 'May', teamPerformance: 84, individualAvg: 82, goal: 85 },
  { month: 'Jun', teamPerformance: 88, individualAvg: 85, goal: 85 },
  { month: 'Jul', teamPerformance: 92, individualAvg: 87, goal: 85 },
  { month: 'Aug', teamPerformance: 90, individualAvg: 88, goal: 90 },
];

const skillDistribution = [
  { skill: 'Communication', team: 82, benchmark: 75 },
  { skill: 'Technical', team: 88, benchmark: 80 },
  { skill: 'Problem Solving', team: 76, benchmark: 78 },
  { skill: 'Teamwork', team: 90, benchmark: 82 },
  { skill: 'Leadership', team: 72, benchmark: 70 },
];

const keyMetrics = [
  { name: 'Project Completion', value: '92%', trend: '+5%', status: 'positive' },
  { name: 'Quality Assurance', value: '87%', trend: '+2%', status: 'positive' },
  { name: 'Customer Satisfaction', value: '94%', trend: '+7%', status: 'positive' },
  { name: 'Employee Engagement', value: '78%', trend: '-3%', status: 'negative' },
];

const chartConfig = {
  team: {
    label: 'Team',
    theme: {
      light: '#8B5CF6',
      dark: '#8B5CF6',
    },
  },
  individual: {
    label: 'Individual Avg',
    theme: {
      light: '#60A5FA',
      dark: '#60A5FA',
    },
  },
  goal: {
    label: 'Goal',
    theme: {
      light: '#10B981',
      dark: '#10B981',
    },
  },
  benchmark: {
    label: 'Benchmark',
    theme: {
      light: '#F59E0B',
      dark: '#F59E0B',
    },
  },
};

const PerformanceAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Performance Dashboard</h3>
          <p className="text-gray-400 text-sm">Real-time performance analytics and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-white/10 gap-1.5">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-white/10 gap-1.5">
            <Calendar className="w-4 h-4" />
            Q3 2023
          </Button>
          <Button variant="outline" size="sm" className="border-white/10 gap-1.5">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric, idx) => (
          <Card key={idx} className="bg-dark-accent border-white/10">
            <CardContent className="p-4">
              <div className="text-xs text-gray-400 mb-1">{metric.name}</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-white">{metric.value}</div>
                <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
                  metric.status === 'positive' 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  {metric.status === 'positive' ? <TrendingUp className="w-3 h-3 mr-1" /> : <Activity className="w-3 h-3 mr-1" />}
                  {metric.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple" />
              Performance Trends
            </CardTitle>
            <CardDescription>Team and individual performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <ChartTooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="teamPerformance" 
                      stroke="#8B5CF6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      name="Team"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="individualAvg" 
                      stroke="#60A5FA" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      name="Individual Avg"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="goal" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                      strokeDasharray="5 5" 
                      dot={false} 
                      name="Goal"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-purple" />
              Skill Comparison
            </CardTitle>
            <CardDescription>Team skills vs. industry benchmark</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={skillDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="skill" stroke="#666" />
                    <YAxis stroke="#666" />
                    <ChartTooltip />
                    <Legend />
                    <Bar 
                      dataKey="team" 
                      fill="#8B5CF6" 
                      name="Team" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      dataKey="benchmark" 
                      fill="#F59E0B" 
                      name="Benchmark" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-dark-accent border-white/10">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple" />
                Team Member Performance
              </CardTitle>
              <CardDescription>Individual performance metrics</CardDescription>
            </div>
            <Button size="sm" className="bg-purple hover:bg-purple-dark">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Team Member</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Role</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Performance Score</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Trend</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Top Skill</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Development Area</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Alex Johnson', role: 'Developer', score: 92, trend: 'up', topSkill: 'Problem Solving', developmentArea: 'Communication' },
                  { name: 'Jamie Smith', role: 'Designer', score: 87, trend: 'stable', topSkill: 'Creativity', developmentArea: 'Technical Knowledge' },
                  { name: 'Taylor Brown', role: 'Manager', score: 94, trend: 'up', topSkill: 'Leadership', developmentArea: 'Delegation' },
                  { name: 'Casey Davis', role: 'Analyst', score: 89, trend: 'up', topSkill: 'Data Analysis', developmentArea: 'Presentation' },
                  { name: 'Morgan Wilson', role: 'Developer', score: 82, trend: 'down', topSkill: 'Technical', developmentArea: 'Teamwork' },
                ].map((member, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{member.name}</td>
                    <td className="py-3 px-4 text-gray-300">{member.role}</td>
                    <td className="py-3 px-4">
                      <div className={`text-${member.score >= 90 ? 'green' : member.score >= 80 ? 'blue' : 'yellow'}-400 font-medium`}>
                        {member.score}%
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        member.trend === 'up' ? 'bg-green-900/30 text-green-400' : 
                        member.trend === 'down' ? 'bg-red-900/30 text-red-400' : 
                        'bg-blue-900/30 text-blue-400'
                      }`}>
                        {member.trend}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-purple">{member.topSkill}</td>
                    <td className="py-3 px-4 text-amber-400">{member.developmentArea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceAnalytics;
