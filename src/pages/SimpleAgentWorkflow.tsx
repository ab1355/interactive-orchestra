
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { ChevronRight, Terminal, Play, Save, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Agent Configuration Panel Component
const AgentConfigPanel = () => {
  return (
    <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
      <h2 className="text-xl font-semibold mb-4 text-white">Agent Configuration</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Agent Name</label>
          <input 
            type="text" 
            className="w-full bg-dark border border-white/10 rounded p-2 text-white"
            defaultValue="Task Assistant"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Model</label>
          <select className="w-full bg-dark border border-white/10 rounded p-2 text-white">
            <option>GPT-4</option>
            <option>Claude-3</option>
            <option>Llama-3</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Temperature</label>
          <div className="flex items-center">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              defaultValue="0.7"
              className="w-full"
            />
            <span className="ml-2 text-white">0.7</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Max Tokens</label>
          <input 
            type="number" 
            className="w-full bg-dark border border-white/10 rounded p-2 text-white"
            defaultValue="2048"
          />
        </div>
        <button className="w-full bg-purple hover:bg-purple/80 text-white py-2 px-4 rounded flex items-center justify-center">
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </button>
      </div>
    </div>
  );
};

// Task Input Form Component
const TaskInputForm = () => {
  return (
    <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
      <h2 className="text-xl font-semibold mb-4 text-white">Task Input</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Task Description</label>
          <textarea 
            className="w-full bg-dark border border-white/10 rounded p-2 text-white h-32"
            placeholder="Describe the task you want the agent to perform..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Task Type</label>
          <select className="w-full bg-dark border border-white/10 rounded p-2 text-white">
            <option>Text Generation</option>
            <option>Data Analysis</option>
            <option>Question Answering</option>
            <option>Summarization</option>
          </select>
        </div>
        <button className="w-full bg-purple hover:bg-purple/80 text-white py-2 px-4 rounded flex items-center justify-center">
          <Play className="w-4 h-4 mr-2" />
          Execute Task
        </button>
      </div>
    </div>
  );
};

// Execution Progress Tracker Component
const ExecutionProgressTracker = () => {
  const steps = [
    { id: 1, name: 'Task Analysis', completed: true, current: false },
    { id: 2, name: 'Knowledge Retrieval', completed: true, current: false },
    { id: 3, name: 'Execution', completed: false, current: true },
    { id: 4, name: 'Result Formatting', completed: false, current: false },
    { id: 5, name: 'Delivery', completed: false, current: false },
  ];

  return (
    <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
      <h2 className="text-xl font-semibold mb-4 text-white">Execution Progress</h2>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center mr-3",
              step.completed ? "bg-green-500" : step.current ? "bg-purple animate-pulse" : "bg-gray-700"
            )}>
              {step.completed ? (
                <span className="text-white text-xs">✓</span>
              ) : (
                <span className="text-white text-xs">{step.id}</span>
              )}
            </div>
            <div className="flex-1">
              <p className={cn(
                "text-sm",
                step.completed ? "text-green-500" : step.current ? "text-purple" : "text-gray-400"
              )}>
                {step.name}
              </p>
            </div>
            {step.current && (
              <div className="text-xs text-purple flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Processing...
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Elapsed Time:</span>
          <span className="text-white">00:01:23</span>
        </div>
      </div>
    </div>
  );
};

// Results Display Area Component
const ResultsDisplayArea = () => {
  return (
    <div className="bg-dark-accent p-4 rounded-lg border border-white/10 h-full">
      <h2 className="text-xl font-semibold mb-4 text-white">Results</h2>
      <div className="bg-dark border border-white/10 rounded-lg p-4 h-64 overflow-y-auto text-gray-300">
        <p>The agent is currently processing your task. Results will appear here once completed.</p>
        <p className="mt-2 text-purple">Working on task analysis...</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="bg-dark hover:bg-dark-accent text-white py-1 px-3 rounded text-sm border border-white/10">
          Copy
        </button>
        <button className="bg-dark hover:bg-dark-accent text-white py-1 px-3 rounded text-sm border border-white/10">
          Save
        </button>
        <button className="bg-dark hover:bg-dark-accent text-white py-1 px-3 rounded text-sm border border-white/10">
          Export
        </button>
      </div>
    </div>
  );
};

// Action History Log Component
const ActionHistoryLog = () => {
  const logs = [
    { time: '14:32:45', message: 'Task received: Generate a market research report' },
    { time: '14:32:50', message: 'Analyzing task requirements' },
    { time: '14:33:05', message: 'Retrieving relevant market data' },
    { time: '14:33:45', message: 'Processing information' },
  ];

  return (
    <div className="bg-dark-accent p-4 rounded-lg border border-white/10">
      <h2 className="text-xl font-semibold mb-4 text-white">Action History</h2>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index} className="text-sm border-l-2 border-purple pl-2 py-1">
            <span className="text-gray-400">{log.time}</span>
            <p className="text-white">{log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SimpleAgentWorkflow: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center">
          <h1 className="text-xl font-semibold">Simple Agent Workflow</h1>
        </div>
        
        <main className={`flex-1 p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-4 flex items-center text-sm text-gray-400">
            <a href="/" className="hover:text-white">Dashboard</a>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-white">Simple Agent Workflow</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Configuration & Input */}
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-6 self-start">
              <AgentConfigPanel />
              <TaskInputForm />
            </div>
            
            {/* Right Column - Progress, Results & History */}
            <div className="lg:col-span-2 space-y-6">
              <ExecutionProgressTracker />
              <ResultsDisplayArea />
              <ActionHistoryLog />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SimpleAgentWorkflow;
