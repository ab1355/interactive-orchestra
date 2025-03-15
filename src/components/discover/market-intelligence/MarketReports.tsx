
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Mock data for market reports
const marketReports = [
  { 
    id: 1, 
    title: 'Industry Growth Analysis 2023', 
    source: 'MarketInsight Research',
    date: 'August 15, 2023',
    keyFindings: 'Projected 18% CAGR over next 5 years with emerging markets accounting for 40% of growth'
  },
  { 
    id: 2, 
    title: 'Competitor Landscape Report', 
    source: 'Strategic Analytics Partners',
    date: 'July 28, 2023',
    keyFindings: 'Market consolidation expected with 3-4 major acquisitions likely in next 12 months'
  },
  { 
    id: 3, 
    title: 'Technology Adoption Trends', 
    source: 'TechForesight Institute',
    date: 'July 10, 2023',
    keyFindings: 'AI implementation accelerating with 65% of enterprises planning significant investment'
  },
];

const MarketReports = () => {
  return (
    <div>
      <h3 className="text-white font-medium mb-4">Recent Market Reports</h3>
      <div className="space-y-3">
        {marketReports.map((report) => (
          <Card key={report.id} className="bg-dark border-white/10">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-white font-medium">{report.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{report.source}</span>
                    <span>•</span>
                    <span>{report.date}</span>
                  </div>
                  <p className="text-sm mt-2 text-gray-300">{report.keyFindings}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-purple flex items-center gap-1">
                  View Report
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketReports;
