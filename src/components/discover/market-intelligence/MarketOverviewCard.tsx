
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react';

const MarketOverviewCard = () => {
  return (
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
  );
};

export default MarketOverviewCard;
