
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Layers } from 'lucide-react';

const CompetitivePositionCard = () => {
  return (
    <Card className="bg-dark-accent border-white/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-md bg-purple/20">
            <Layers className="w-5 h-5 text-purple" />
          </div>
          <h3 className="text-lg font-medium text-white">Competitive Position</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Market Share:</span>
            <span className="text-white font-medium">22.4%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Market Rank:</span>
            <span className="text-green-400 font-medium">#2 of 12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Price Position:</span>
            <span className="text-white font-medium">Premium</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Brand Strength:</span>
            <span className="text-amber-400 font-medium">Strong</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitivePositionCard;
