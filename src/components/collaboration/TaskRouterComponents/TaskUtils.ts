
import { toast } from 'sonner';
import { MessageOptions } from '@/types/communication';

export const simulateProposalFromAgent = (
  taskId: string, 
  agentId: string,
  availableAgents: Array<{ id: string, name: string }>,
  sendMessage: (content: string, options: MessageOptions) => void
) => {
  const task = { id: taskId, name: `Task ${taskId}` }; // Simplified for the function
  if (!task) return;

  const agent = availableAgents.find(a => a.id === agentId);
  if (!agent) return;

  toast({
    title: "New Proposal",
    description: `${agent.name} has submitted a proposal for task "${task.name}"`,
  });

  sendMessage(`I've submitted a proposal for task "${task.name}" with ${70 + Math.floor(Math.random() * 30)}% confidence`, {
    recipientId: agentId,
    channel: 'broadcast',
    priority: 5
  });
};

export const simulateProposals = (
  taskId: string, 
  availableAgents: Array<{ id: string, name: string }>,
  sendMessage: (content: string, options: MessageOptions) => void
) => {
  const numProposals = 1 + Math.floor(Math.random() * 3);
  const possibleAgents = [...availableAgents];
  
  for (let i = 0; i < numProposals; i++) {
    if (possibleAgents.length === 0) break;
    
    const agentIndex = Math.floor(Math.random() * possibleAgents.length);
    const agent = possibleAgents.splice(agentIndex, 1)[0];
    
    setTimeout(() => {
      simulateProposalFromAgent(taskId, agent.id, availableAgents, sendMessage);
    }, 800 * (i + 1));
  }
};
