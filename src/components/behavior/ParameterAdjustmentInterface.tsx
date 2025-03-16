
import React from 'react';

const ParameterAdjustmentInterface: React.FC = () => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">Parameter Adjustment</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-300">Temperature</label>
            <span className="text-white text-sm">0.7</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            defaultValue="0.7"
            className="w-full"
          />
          <p className="text-xs text-gray-400">Controls randomness: Lower values are more deterministic, higher values more creative.</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-300">Max Output Tokens</label>
            <span className="text-white text-sm">2048</span>
          </div>
          <input 
            type="range" 
            min="256" 
            max="4096" 
            step="256" 
            defaultValue="2048"
            className="w-full"
          />
          <p className="text-xs text-gray-400">Maximum length of generated text.</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-300">Top-p Sampling</label>
            <span className="text-white text-sm">0.9</span>
          </div>
          <input 
            type="range" 
            min="0.1" 
            max="1" 
            step="0.1" 
            defaultValue="0.9"
            className="w-full"
          />
          <p className="text-xs text-gray-400">Nucleus sampling - considers the top p% of probability mass.</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-300">Frequency Penalty</label>
            <span className="text-white text-sm">0.5</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1" 
            defaultValue="0.5"
            className="w-full"
          />
          <p className="text-xs text-gray-400">Reduces repetition by penalizing tokens already used.</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-300">Presence Penalty</label>
            <span className="text-white text-sm">0.2</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1" 
            defaultValue="0.2"
            className="w-full"
          />
          <p className="text-xs text-gray-400">Encourages diversity by penalizing tokens already present in text.</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-300">System Message</label>
          <textarea 
            className="w-full bg-dark border border-white/10 rounded p-2 text-white h-24"
            defaultValue="You are a helpful, creative, and concise assistant."
          />
          <p className="text-xs text-gray-400">Defines the agent's character and operating guidelines.</p>
        </div>
      </div>
    </div>
  );
};

export default ParameterAdjustmentInterface;
