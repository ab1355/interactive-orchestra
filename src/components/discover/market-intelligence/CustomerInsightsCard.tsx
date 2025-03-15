
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const CustomerInsightsCard = () => {
  return (
    <Card className="bg-dark-accent border-white/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-md bg-purple/20">
            <Users className="w-5 h-5 text-purple" />
          </div>
          <h3 className="text-lg font-medium text-white">Customer Insights</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Satisfaction Score:</span>
            <span className="text-green-400 font-medium">84/100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Churn Rate:</span>
            <span className="text-green-400 font-medium">4.2%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Acquisition Cost:</span>
            <span className="text-white font-medium">$1,250</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lifetime Value:</span>
            <span className="text-white font-medium">$8,500</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInsightsCard;
