
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart4, Users, PieChart, BookOpen, TrendingUp } from 'lucide-react';

const IntelligenceTools = () => {
  return (
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
  );
};

export default IntelligenceTools;
