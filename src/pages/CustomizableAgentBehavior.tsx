import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ChevronRight, Save, Play, GitBranch, Trash, Check, AlertCircle, Copy, BookOpen, Code } from 'lucide-react';
import { ModelSelector } from '@/components/behavior/ModelSelector';
import { AgentBehaviorProvider } from '@/contexts/AgentBehaviorContext';
import { AgentBehaviorConfiguration } from '@/components/behavior/AgentBehaviorConfiguration';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

// Parameter Adjustment Interface Component
const ParameterAdjustmentInterface = () => {
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

// Behavior Template Library Component
const BehaviorTemplateLibrary = () => {
  const templates = [
    { name: 'Customer Support Agent', description: 'Polite, helpful, focuses on solving customer issues quickly.', active: true },
    { name: 'Data Analyst', description: 'Analytical, delivers insights from data, provides visualizations.', active: false },
    { name: 'Creative Writer', description: 'Imaginative, generates engaging and creative content.', active: false },
    { name: 'Technical Expert', description: 'Detailed, provides technical explanations with code examples.', active: false },
    { name: 'Executive Summarizer', description: 'Concise, extracts key points for busy executives.', active: false },
  ];

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-medium mb-4">Behavior Templates</h3>
      
      <div className="space-y-3">
        {templates.map((template, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border ${template.active ? 'border-purple bg-purple/10' : 'border-white/10 bg-dark'}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-medium">{template.name}</h4>
                <p className="text-sm text-gray-300 mt-1">{template.description}</p>
              </div>
              {template.active ? (
                <span className="px-2 py-1 bg-purple/20 text-purple text-xs rounded">Active</span>
              ) : (
                <button className="text-sm text-purple hover:text-purple-light">
                  Apply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="text-sm text-purple hover:text-purple-light">
          + Create New Template
        </button>
      </div>
    </div>
  );
};

// Behavior Testing Environment Component
const BehaviorTestingEnvironment = () => {
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

// Version Control Component
const VersionControl = () => {
  const versions = [
    { id: 'v1.2', name: 'Improved Conciseness', date: '2 hours ago', current: true },
    { id: 'v1.1', name: 'Added Technical Details', date: '1 day ago', current: false },
    { id: 'v1.0', name: 'Initial Configuration', date: '3 days ago', current: false },
  ];

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Version Control</h3>
        <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center">
          <Save className="w-3 h-3 mr-1" />
          Save Version
        </button>
      </div>
      
      <div className="space-y-3">
        {versions.map((version, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border ${version.current ? 'border-purple bg-purple/10' : 'border-white/10 bg-dark'}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <GitBranch className="w-4 h-4 text-gray-400 mr-2" />
                <div>
                  <h4 className="text-white font-medium">{version.id}: {version.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">Created {version.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {version.current ? (
                  <span className="px-2 py-1 bg-purple/20 text-purple text-xs rounded">Current</span>
                ) : (
                  <>
                    <button className="text-sm text-purple hover:text-purple-light">
                      Restore
                    </button>
                    <button className="text-sm text-red-400 hover:text-red-300">
                      <Trash className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Auto-save every 10 minutes</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked />
            <div className="relative w-9 h-5 bg-gray-600 peer-checked:bg-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

// Behavior Comparison Tool
const BehaviorComparisonTool = () => {
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

const CustomizableAgentBehavior: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('gpt-4o');
  const { toast } = useToast();
  
  useEffect(() => {
    // Add a small delay to ensure smoother transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Show a toast when the page loads successfully
      toast({
        title: "Page loaded",
        description: "Agent behavior configuration system is ready",
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Customizable Agent Behavior</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-dark hover:bg-dark-accent text-white py-1 px-3 rounded text-sm border border-white/10 flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              Documentation
            </button>
            <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center"
              onClick={() => toast({
                title: "Settings saved",
                description: "Your agent behavior settings have been saved"
              })}>
              <Save className="w-4 h-4 mr-1" />
              Save Changes
            </button>
          </div>
        </div>
        
        <main className={`flex-1 p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-4 flex items-center text-sm text-gray-400">
            <a href="/" className="hover:text-white">Dashboard</a>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-white">Customizable Agent Behavior</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Editor */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-medium flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Agent Configuration
                  </h2>
                  <div className="text-sm text-gray-400">ID: agent-cus-2491</div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Agent Name</label>
                    <input 
                      type="text"
                      className="w-full bg-dark border border-white/10 rounded p-2 text-white"
                      defaultValue="Customer Support Agent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Model Selection</label>
                    <ModelSelector 
                      selectedModelId={selectedModelId}
                      onSelectModel={setSelectedModelId}
                    />
                  </div>
                </div>
              </div>
              
              <AgentBehaviorConfiguration />
              <BehaviorTemplateLibrary />
            </div>
            
            {/* Right Panel - Testing & Version Control */}
            <div className="lg:col-span-2 space-y-6">
              <BehaviorTestingEnvironment />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VersionControl />
                <BehaviorComparisonTool />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default CustomizableAgentBehavior;
