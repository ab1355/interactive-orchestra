
import React from 'react';
import { 
  Code, 
  AlertTriangle, 
  Workflow, 
  PlusCircle,
  ArrowRight, 
  CheckCircle, 
  List, 
  Vote, 
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Custom Workflow icon
const WorkflowIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>;

const TeamFormationProtocols: React.FC = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Team Formation Protocols</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formation Triggers Card */}
        <Card className="bg-dark border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Formation Triggers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Executive Initiated */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-white">Executive Initiated</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 rounded-full p-1.5 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Strategic needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 rounded-full p-1.5 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">New project requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 rounded-full p-1.5 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Resource optimization</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 rounded-full p-1.5 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Performance enhancement</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Agent Initiated */}
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-white">Agent Initiated</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="bg-green-500/20 rounded-full p-1.5 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Performance bottlenecks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500/20 rounded-full p-1.5 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Resource constraints</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500/20 rounded-full p-1.5 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Optimization opportunities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-500/20 rounded-full p-1.5 mt-0.5">
                    <ArrowRight className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Task requirements</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Formation Process Card */}
        <Card className="bg-dark border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <WorkflowIcon className="w-5 h-5 text-purple" />
              Formation Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-code-background p-4 rounded-md border border-white/10 font-mono text-sm text-gray-300 mb-5">
              <div className="text-purple">Formation_Process:</div>
              <div className="pl-4 text-white">Initiation:</div>
              <div className="pl-8 text-gray-300">- Need_Identification</div>
              <div className="pl-8 text-gray-300">- Resource_Assessment</div>
              <div className="pl-8 text-gray-300">- Team_Proposal</div>
              <div className="pl-4 text-white">Approval:</div>
              <div className="pl-8 text-gray-300">- Executive_Review</div>
              <div className="pl-8 text-gray-300">- Resource_Validation</div>
              <div className="pl-8 text-gray-300">- Impact_Analysis</div>
              <div className="pl-4 text-white">Implementation:</div>
              <div className="pl-8 text-gray-300">- Team_Assembly</div>
              <div className="pl-8 text-gray-300">- Resource_Allocation</div>
              <div className="pl-8 text-gray-300">- Performance_Monitoring</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <PlusCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Initiation Phase</h4>
                  <p className="text-sm text-gray-400">Identifying needs and assessing available resources</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Vote className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Approval Phase</h4>
                  <p className="text-sm text-gray-400">Executive review and impact analysis of proposed teams</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Implementation Phase</h4>
                  <p className="text-sm text-gray-400">Team assembly and continuous performance monitoring</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamFormationProtocols;
