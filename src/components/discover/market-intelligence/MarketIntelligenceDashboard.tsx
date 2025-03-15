
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Database } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CompetitorTable from './CompetitorTable';
import MarketReports from './MarketReports';

const MarketIntelligenceDashboard = () => {
  return (
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
          <CompetitorTable />
          <MarketReports />
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIntelligenceDashboard;
