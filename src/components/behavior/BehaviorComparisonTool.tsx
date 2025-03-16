
import React from 'react';
import { Info } from 'lucide-react';

const BehaviorComparisonTool: React.FC = () => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">Behavior Comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-white text-sm font-medium mb-2">Version 1.1</h4>
          <div className="bg-dark border border-white/10 rounded-lg p-3 text-gray-300 text-sm h-48 overflow-y-auto">
            <div className="mb-2">
              <span className="text-gray-400">Temperature:</span> 0.9
            </div>
            <div className="mb-2">
              <span className="text-gray-400">Max Tokens:</span> 1024
            </div>
            <div className="mb-2">
              <span className="text-gray-400">Top-p:</span> 0.95
            </div>
            <div className="mb-2">
              <span className="text-gray-400">Frequency Penalty:</span> 0.2
            </div>
            <div className="mb-2">
              <span className="text-gray-400">Presence Penalty:</span> 0.1
            </div>
            <div>
              <span className="text-gray-400">System Message:</span> You are a helpful, detailed, and technical assistant who provides in-depth explanations with examples.
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-white text-sm font-medium mb-2">Version 1.2 (Current)</h4>
          <div className="bg-dark border border-white/10 rounded-lg p-3 text-gray-300 text-sm h-48 overflow-y-auto">
            <div className="mb-2">
              <span className="text-gray-400">Temperature:</span> 0.7
            </div>
            <div className="mb-2 bg-green-500/10 -mx-1 px-1 py-0.5 rounded">
              <span className="text-gray-400">Max Tokens:</span> <span className="text-green-400">2048</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-400">Top-p:</span> 0.9
            </div>
            <div className="mb-2 bg-green-500/10 -mx-1 px-1 py-0.5 rounded">
              <span className="text-gray-400">Frequency Penalty:</span> <span className="text-green-400">0.5</span>
            </div>
            <div className="mb-2 bg-green-500/10 -mx-1 px-1 py-0.5 rounded">
              <span className="text-gray-400">Presence Penalty:</span> <span className="text-green-400">0.2</span>
            </div>
            <div className="bg-green-500/10 -mx-1 px-1 py-0.5 rounded">
              <span className="text-gray-400">System Message:</span> <span className="text-green-400">You are a helpful, creative, and concise assistant.</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">Test Results Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark border border-white/10 rounded p-2 text-xs">
            <div className="mb-2 text-gray-400">Version 1.1 Response (328 tokens)</div>
            <p className="text-gray-300">Quantum computing represents a paradigm shift from classical computing by leveraging quantum mechanical phenomena such as superposition and entanglement. Unlike classical bits which are binary (0 or 1), quantum bits or "qubits" can exist in multiple states simultaneously, enabling quantum computers to process complex calculations with unprecedented efficiency...</p>
          </div>
          <div className="bg-dark border border-white/10 rounded p-2 text-xs">
            <div className="mb-2 text-gray-400">Version 1.2 Response (187 tokens)</div>
            <p className="text-gray-300">Quantum computing is like a super-powered way of processing information that uses the weird rules of quantum physics. Unlike normal computers that use bits (0s and 1s), quantum computers use "qubits" that can be 0, 1, or both at the same time!...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehaviorComparisonTool;
