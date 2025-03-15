
import React from 'react';
import { ArrowRight, Router } from 'lucide-react';

const CollaborationFlowDiagram: React.FC = () => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">Collaboration Flow</h3>
      <div className="bg-dark border border-white/10 rounded-lg p-4 flex flex-col items-center">
        <p className="text-gray-400 text-sm mb-4">Current Active Workflow: Market Research Report</p>
        
        <div className="w-full max-w-lg">
          <div className="flex justify-center items-center mb-2">
            <div className="bg-purple/20 border border-purple/50 rounded-lg p-3 text-center w-40">
              <p className="text-purple font-medium">Task Router</p>
              <p className="text-xs text-gray-400">Dynamic Assignment</p>
            </div>
          </div>
          
          <div className="flex justify-center mb-2">
            <div className="h-8 w-0.5 bg-white/20"></div>
          </div>
          <div className="flex justify-center mb-2">
            <Router className="w-5 h-5 text-purple" />
          </div>
          
          <div className="flex justify-between items-center my-4">
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 text-center w-40">
              <p className="text-blue-400 font-medium">Research Agent</p>
              <p className="text-xs text-gray-400">Data Collection</p>
            </div>
            
            <div className="bg-purple/20 border border-purple/50 rounded-lg p-3 text-center w-40">
              <p className="text-purple font-medium">Analysis Agent</p>
              <p className="text-xs text-gray-400">Data Processing</p>
            </div>
            
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center w-40">
              <p className="text-green-400 font-medium">Writer Agent</p>
              <p className="text-xs text-gray-400">Report Generation</p>
            </div>
          </div>
          
          <div className="flex justify-evenly mb-2">
            <div className="h-8 w-0.5 bg-white/20"></div>
            <div className="h-8 w-0.5 bg-white/20"></div>
            <div className="h-8 w-0.5 bg-white/20"></div>
          </div>
          <div className="flex justify-evenly">
            <ArrowRight className="w-5 h-5 text-white/50" />
            <ArrowRight className="w-5 h-5 text-white/50" />
            <ArrowRight className="w-5 h-5 text-white/50" />
          </div>
          
          <div className="flex justify-center items-center mt-4">
            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 text-center w-40">
              <p className="text-yellow-400 font-medium">QA Agent</p>
              <p className="text-xs text-gray-400">Quality Verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationFlowDiagram;
