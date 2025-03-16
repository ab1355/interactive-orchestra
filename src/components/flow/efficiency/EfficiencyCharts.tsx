
import React from 'react';
import { PieChart as RechartsPC, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { EfficiencyMetrics, TaskCompletionRate } from '@/types/flow';

// Chart color constants
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#9cafff'];

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

interface EfficiencyChartsProps {
  efficiency: EfficiencyMetrics | null;
  completionRate: TaskCompletionRate | null;
}

const EfficiencyCharts: React.FC<EfficiencyChartsProps> = ({ efficiency, completionRate }) => {
  const pieChartData = [
    { name: 'Completed', value: completionRate?.completed || 0 },
    { name: 'Remaining', value: (completionRate?.total || 0) - (completionRate?.completed || 0) },
  ];

  const barChartData = [
    { name: 'Resource Utilization', value: efficiency?.resourceUtilization || 0 },
  ];

  const lineChartData = [
    { name: 'Week 1', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Week 2', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Week 3', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Week 4', uv: 2780, pv: 3908, amt: 2000 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 rounded-md border border-white/10 bg-dark/50">
        <h4 className="text-md font-medium mb-2">Task Completion</h4>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPC width={400} height={300} >
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </RechartsPC>
        </ResponsiveContainer>
      </div>
      
      <div className="p-4 rounded-md border border-white/10 bg-dark/50">
        <h4 className="text-md font-medium mb-2">Resource Utilization</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="p-4 rounded-md border border-white/10 bg-dark/50">
        <h4 className="text-md font-medium mb-2">Weekly Performance</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EfficiencyCharts;
