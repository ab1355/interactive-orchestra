
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
  TrendingUp, 
  BarChart, 
  AlertCircle, 
  ArrowUp, 
  ArrowDown,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar
} from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

// Mock data for trend analysis
const trendData = [
  { month: 'Jan', industry: 42, competitors: 38, forecast: 40 },
  { month: 'Feb', industry: 47, competitors: 42, forecast: 45 },
  { month: 'Mar', industry: 55, competitors: 45, forecast: 48 },
  { month: 'Apr', industry: 50, competitors: 52, forecast: 51 },
  { month: 'May', industry: 63, competitors: 58, forecast: 56 },
  { month: 'Jun', industry: 68, competitors: 62, forecast: 61 },
  { month: 'Jul', industry: 72, competitors: 68, forecast: 65 },
  { month: 'Aug', industry: 78, competitors: 73, forecast: 70 },
];

const keywordTrends = [
  { keyword: 'Artificial Intelligence', trend: '+32%', sentiment: 'positive', volume: 8750 },
  { keyword: 'Machine Learning', trend: '+28%', sentiment: 'positive', volume: 7320 },
  { keyword: 'Blockchain', trend: '-12%', sentiment: 'neutral', volume: 2930 },
  { keyword: 'Sustainability', trend: '+45%', sentiment: 'positive', volume: 6540 },
  { keyword: 'Remote Work', trend: '+8%', sentiment: 'neutral', volume: 5280 },
  { keyword: 'Cybersecurity', trend: '+22%', sentiment: 'mixed', volume: 4980 },
];

const patternAlerts = [
  { 
    id: 1, 
    title: 'Significant increase in sustainable technology adoption', 
    significance: 'High',
    description: 'Pattern indicates 43% faster adoption rate compared to previous quarter',
    type: 'Emerging Trend'
  },
  { 
    id: 2, 
    title: 'Decline in traditional market segments', 
    significance: 'Medium',
    description: 'Consistent downward pattern in 3 major segments over 6 months',
    type: 'Market Shift'
  },
  { 
    id: 3, 
    title: 'Correlation detected between remote work and productivity metrics', 
    significance: 'Medium',
    description: 'Statistical significance p<0.001 across industry sectors',
    type: 'Correlation Pattern'
  },
];

const chartConfig = {
  industry: {
    label: 'Industry Trend',
    theme: {
      light: '#8B5CF6',
      dark: '#8B5CF6',
    },
  },
  competitors: {
    label: 'Competitor Trend',
    theme: {
      light: '#60A5FA',
      dark: '#60A5FA',
    },
  },
  forecast: {
    label: 'Forecast',
    theme: {
      light: '#10B981',
      dark: '#10B981',
    },
  },
};

const TrendAnalysis = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-white">Trend Analysis Dashboard</h3>
          <p className="text-gray-400 text-sm">Pattern recognition and predictive trend analysis</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-dark-accent border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple" />
              Market Trend Analysis
            </CardTitle>
            <CardDescription>Industry vs. competitor trend comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <ChartTooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="industry" 
                      stroke="#8B5CF6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      name="Industry"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="competitors" 
                      stroke="#60A5FA" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      name="Competitors"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#10B981" 
                      strokeWidth={2} 
                      strokeDasharray="5 5" 
                      dot={false} 
                      name="Forecast"
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
              Keyword Trend Analysis
            </CardTitle>
            <CardDescription>Trending keywords and search volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keywordTrends.map((keyword, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-md bg-dark hover:bg-dark-600">
                  <div>
                    <h4 className="text-sm font-medium text-white">{keyword.keyword}</h4>
                    <p className="text-xs text-gray-400">Volume: {keyword.volume.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      keyword.sentiment === 'positive' ? 'bg-green-900/30 text-green-400' : 
                      keyword.sentiment === 'negative' ? 'bg-red-900/30 text-red-400' : 
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {keyword.sentiment}
                    </span>
                    <span className={`inline-flex items-center gap-1 ${
                      keyword.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {keyword.trend.startsWith('+') ? 
                        <ArrowUp className="w-3 h-3" /> : 
                        <ArrowDown className="w-3 h-3" />
                      }
                      {keyword.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-dark-accent border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-purple" />
            Pattern Recognition Alerts
          </CardTitle>
          <CardDescription>AI-detected patterns and anomalies in market data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patternAlerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-md bg-dark border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium">{alert.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.significance === 'High' ? 'bg-red-900/30 text-red-400' : 
                    alert.significance === 'Medium' ? 'bg-amber-900/30 text-amber-400' : 
                    'bg-blue-900/30 text-blue-400'
                  }`}>
                    {alert.significance}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-purple/20 text-purple">
                    {alert.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    Detected 2 days ago
                  </span>
                </div>
                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="ghost" className="text-purple">
                    Analyze Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;
