
import React from 'react';
import { Code, Users, Wrench, Settings } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';
import CodeBlock from '../ui/CodeBlock';
import { cn } from '@/lib/utils';

const sampleCode = `import { Swarm, Agent } from 'ai-agent-sdk';

const client = new Swarm();

const transferToAgentB = (): Agent => {
  return agentB;
};

const agentA = new Agent({
  name: "Agent A",
  instructions: "You are a helpful agent.",
  functions: [transferToAgentB],
});

const agentB = new Agent({
  name: "Agent B",
  instructions: "Only speak in Haikus.",
});`;

interface FeaturesProps {
  className?: string;
}

const Features: React.FC<FeaturesProps> = ({ className }) => {
  return (
    <div className={cn("py-20", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard 
                title="Simple Agent Workflow" 
                description="Create a basic AI agent workflow with multiple agents."
                icon={<Code className="w-6 h-6" />}
              />
              <FeatureCard 
                title="Multi-Agent Collaboration" 
                description="Set up multiple AI agents to work together on a complex task."
                icon={<Users className="w-6 h-6" />}
              />
              <FeatureCard 
                title="Tool Integration" 
                description="Integrate external tools and APIs into an AI agent workflow."
                icon={<Wrench className="w-6 h-6" />}
              />
              <FeatureCard 
                title="Customizable Agent Behavior" 
                description="Design a specialized AI agent with custom behavior patterns."
                icon={<Settings className="w-6 h-6" />}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <CodeBlock code={sampleCode} language="typescript" className="w-full max-w-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
