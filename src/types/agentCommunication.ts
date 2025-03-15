
import { CommunicationChannel, AgentMessage, MessageContent, MessageOptions, SubscriptionOptions } from './communication';

export interface UseAgentCommunicationOptions {
  agentId: string;
  agentRole?: string;
  channels?: CommunicationChannel[];
  priorityThreshold?: number;
}

export interface UseAgentCommunicationResult {
  messages: AgentMessage[];
  sendMessage: (content: string, options: MessageOptions) => void;
  isConnected: boolean;
}
