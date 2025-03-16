
import React from 'react';
import { Play, Check, AlertCircle, Copy } from 'lucide-react';

const BehaviorTestingEnvironment: React.FC = () => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Testing Environment</h3>
        <div className="flex items-center space-x-2">
          <button className="bg-dark hover:bg-dark-accent text-white py-1 px-3 rounded text-sm border border-white/10">
            Clear
          </button>
          <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center">
            <Play className="w-3 h-3 mr-1" />
            Run Test
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex-1">
          <label className="text-sm text-gray-300 block mb-2">Test Input</label>
          <textarea 
            className="w-full bg-dark border border-white/10 rounded p-2 text-white h-36"
            placeholder="Enter a test prompt for the agent to process..."
            defaultValue="Generate a brief summary of quantum computing for a high school student."
          ></textarea>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-300">Agent Response</label>
            <div className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Passed QA Check</div>
          </div>
          <div className="w-full bg-dark border border-white/10 rounded p-3 text-gray-300 h-36 overflow-y-auto">
            <p>Quantum computing is like a super-powered way of processing information that uses the weird rules of quantum physics. Unlike normal computers that use bits (0s and 1s), quantum computers use "qubits" that can be 0, 1, or both at the same time!</p>
            <p className="mt-2">This special property lets quantum computers solve certain problems much faster than regular computers. Scientists are excited about quantum computers because they might help us discover new medicines, better understand climate change, and solve complex math problems that are currently impossible.</p>
            <p className="mt-2">While quantum computers exist today, they're still experimental and not ready to replace your laptop. But in the future, they could revolutionize fields like cryptography, materials science, and artificial intelligence!</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-gray-300">Coherence</span>
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-gray-300">Relevance</span>
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-gray-300">Safety</span>
          </div>
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm text-gray-300">Verbosity</span>
          </div>
        </div>
        
        <button className="text-sm text-gray-300 hover:text-white flex items-center">
          <Copy className="w-4 h-4 mr-1" />
          Copy Response
        </button>
      </div>
    </div>
  );
};

export default BehaviorTestingEnvironment;
