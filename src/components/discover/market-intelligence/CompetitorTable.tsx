
import React from 'react';

// Mock data for competitors
const competitorData = [
  { 
    name: 'TechGiant Inc', 
    marketShare: '32%', 
    strengthScore: 87,
    keyProducts: ['Enterprise Cloud', 'AI Platform', 'Security Suite'],
    recentUpdates: 'Launched new AI-driven analytics platform last month'
  },
  { 
    name: 'InnovateSoft', 
    marketShare: '24%', 
    strengthScore: 82,
    keyProducts: ['Business Intelligence', 'Data Integration', 'Workflow Automation'],
    recentUpdates: 'Acquired data visualization startup for $50M'
  },
  { 
    name: 'FutureTech Systems', 
    marketShare: '18%', 
    strengthScore: 76,
    keyProducts: ['Machine Learning Suite', 'DevOps Platform', 'Edge Computing'],
    recentUpdates: 'Announced strategic partnership with cloud provider'
  },
  { 
    name: 'DataForge Solutions', 
    marketShare: '14%', 
    strengthScore: 71,
    keyProducts: ['Data Warehouse', 'Analytics Dashboard', 'Reporting Tools'],
    recentUpdates: 'Released major platform update with improved performance'
  },
];

const CompetitorTable = () => {
  return (
    <div>
      <h3 className="text-white font-medium mb-4">Competitor Analysis</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Company</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Market Share</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Strength Score</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Key Products</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Recent Updates</th>
            </tr>
          </thead>
          <tbody>
            {competitorData.map((competitor, idx) => (
              <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 px-4 text-white font-medium">{competitor.name}</td>
                <td className="py-3 px-4 text-gray-300">{competitor.marketShare}</td>
                <td className="py-3 px-4">
                  <div className={`px-2 py-1 rounded text-xs inline-block font-medium ${
                    competitor.strengthScore >= 85 ? 'bg-red-900/30 text-red-400' : 
                    competitor.strengthScore >= 75 ? 'bg-amber-900/30 text-amber-400' : 
                    'bg-blue-900/30 text-blue-400'
                  }`}>
                    {competitor.strengthScore}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {competitor.keyProducts.map((product, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-dark-600 text-gray-300">
                        {product}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-xs text-gray-400">{competitor.recentUpdates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompetitorTable;
