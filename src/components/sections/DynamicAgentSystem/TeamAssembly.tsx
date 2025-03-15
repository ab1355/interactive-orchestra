
import React from 'react';
import { 
  Crown, 
  Users, 
  CircleDollarSign, 
  BarChart3, 
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TeamAssembly: React.FC = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Dynamic Team Assembly</h3>
      
      <Card className="bg-dark border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5 text-blue-400" />
            Assembly Process Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative py-6">
            {/* Vertical line connecting all steps */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-gray-700 -translate-x-1/2 -z-10"></div>
            
            {/* Executive Decision */}
            <div className="flex flex-col items-center mb-12 relative">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40 mb-3">
                <Crown className="w-6 h-6 text-blue-400" />
              </div>
              <div className="bg-dark/60 border border-blue-500/30 rounded-lg p-4 max-w-md text-center">
                <h4 className="text-lg font-medium text-white mb-2">Executive Decision</h4>
                <p className="text-sm text-gray-300">High-level mission objectives and strategic directives from human decision makers</p>
              </div>
              <div className="absolute bottom-0 left-1/2 h-6 w-px bg-gray-700 -translate-x-1/2 translate-y-3"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Manager Agent */}
            <div className="flex flex-col items-center mb-12 relative">
              <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center border border-purple/40 mb-3">
                <Users className="w-6 h-6 text-purple" />
              </div>
              <div className="bg-dark/60 border border-purple/30 rounded-lg p-4 max-w-md text-center">
                <h4 className="text-lg font-medium text-white mb-2">Manager Agent</h4>
                <p className="text-sm text-gray-300">Universal orchestrator that translates executive decisions into actionable team structures</p>
              </div>
              <div className="absolute bottom-0 left-1/2 h-6 w-px bg-gray-700 -translate-x-1/2 translate-y-3"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Team Formation */}
            <div className="flex flex-col items-center mb-12 relative">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/40 mb-3">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div className="bg-dark/60 border border-green-500/30 rounded-lg p-4 max-w-md text-center">
                <h4 className="text-lg font-medium text-white mb-2">Team Formation</h4>
                <p className="text-sm text-gray-300">Optimal agent selection and pod structure design based on mission requirements</p>
              </div>
              <div className="absolute bottom-0 left-1/2 h-6 w-px bg-gray-700 -translate-x-1/2 translate-y-3"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Resource Allocation */}
            <div className="flex flex-col items-center mb-12 relative">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/40 mb-3">
                <CircleDollarSign className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="bg-dark/60 border border-yellow-500/30 rounded-lg p-4 max-w-md text-center">
                <h4 className="text-lg font-medium text-white mb-2">Resource Allocation</h4>
                <p className="text-sm text-gray-300">Efficient distribution of computational resources, tools, and data access</p>
              </div>
              <div className="absolute bottom-0 left-1/2 h-6 w-px bg-gray-700 -translate-x-1/2 translate-y-3"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Performance Monitoring */}
            <div className="flex flex-col items-center mb-12 relative">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40 mb-3">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div className="bg-dark/60 border border-blue-500/30 rounded-lg p-4 max-w-md text-center">
                <h4 className="text-lg font-medium text-white mb-2">Performance Monitoring</h4>
                <p className="text-sm text-gray-300">Real-time tracking of team efficiency, output quality, and goal alignment</p>
              </div>
              <div className="absolute bottom-0 left-1/2 h-6 w-px bg-gray-700 -translate-x-1/2 translate-y-3"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                  <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Dynamic Adjustment */}
            <div className="flex flex-col items-center relative">
              <div className="w-12 h-12 rounded-full bg-purple/20 flex items-center justify-center border border-purple/40 mb-3">
                <RefreshCw className="w-6 h-6 text-purple" />
              </div>
              <div className="bg-dark/60 border border-purple/30 rounded-lg p-4 max-w-md text-center">
                <h4 className="text-lg font-medium text-white mb-2">Dynamic Adjustment</h4>
                <p className="text-sm text-gray-300">Continuous optimization of team composition and resource allocation based on performance data</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamAssembly;
