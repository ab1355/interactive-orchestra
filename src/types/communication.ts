
// Communication-related types for the agent communication system
export type CommunicationChannel = 'broadcast' | 'direct' | 'priority';

export interface MessageContent {
  senderId: string;
  senderRole?: string;
  recipientId?: string;
  content: string;
  channel?: CommunicationChannel;
  priority?: number;
  metadata?: Record<string, any>;
  timestamp?: Date;
  id?: string;
}

export interface AgentMessage {
  id: string;
  senderId: string;
  senderRole?: string;
  recipientId?: string;
  content: string;
  channel: CommunicationChannel;
  priority: number;
  timestamp: Date;
}

export interface SubscriptionOptions {
  channel?: CommunicationChannel | 'all';
  senderId?: string;
  recipientId?: string;
  priority?: number | 'any';
}

// Adding this interface to match what's used in TaskRouter component
export interface MessageOptions {
  senderId?: string;
  senderRole?: string;
  recipientId?: string;
  channel?: CommunicationChannel;
  priority?: number;
  metadata?: Record<string, any>;
}

export interface CommunicationOptions {
  senderId: string;
  recipientId?: string;
  channel?: CommunicationChannel;
  priority?: number;
  metadata?: Record<string, any>;
}
