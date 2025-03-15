
import React from 'react';
import MarketOverviewCard from './market-intelligence/MarketOverviewCard';
import CustomerInsightsCard from './market-intelligence/CustomerInsightsCard';
import CompetitivePositionCard from './market-intelligence/CompetitivePositionCard';
import MarketIntelligenceDashboard from './market-intelligence/MarketIntelligenceDashboard';
import MarketSegmentation from './market-intelligence/MarketSegmentation';
import IntelligenceTools from './market-intelligence/IntelligenceTools';

const MarketIntelligence = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MarketOverviewCard />
        <CustomerInsightsCard />
        <CompetitivePositionCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <MarketIntelligenceDashboard />
        </div>
        
        <div className="space-y-6">
          <MarketSegmentation />
          <IntelligenceTools />
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
