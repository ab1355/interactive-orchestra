
import React from 'react';
import { GitBranch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const CommunicationPatterns: React.FC = () => {
  return (
    <Card className="bg-dark border-purple/20 shadow-lg shadow-purple/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white text-xl">
          <GitBranch className="w-5 h-5 text-purple" />
          Hierarchical Communication
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-medium mb-2">Vertical Communication</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Manager Agent → Primary Agents
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Primary Agents → Support Agents
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Support Agents → Specialized Tools
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-2">Horizontal Communication</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12H16M16 12C16 10.5 15 8 12 8M16 12C16 13.5 15 16 12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Inter-framework Collaboration
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12H16M16 12C16 10.5 15 8 12 8M16 12C16 13.5 15 16 12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Peer Agent Consultation
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple/20 text-purple rounded-full p-0.5 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12H16M16 12C16 10.5 15 8 12 8M16 12C16 13.5 15 16 12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Resource Sharing
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationPatterns;
