
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
  timestamp?: Date | string; // Changed to accept both Date and string
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
  metadata?: Record<string, any>; // Added metadata field
}

export interface InternalMessage {
  id: string;
  senderId: string;
  senderRole?: string;
  recipientId?: string;
  content: string;
  timestamp: Date | string; // Changed to accept both Date and string
  channel: CommunicationChannel;
  priority: number;
  metadata?: Record<string, any>;
}

export interface SubscriptionOptions {
  channel?: CommunicationChannel | 'all';
  senderId?: string;
  recipientId?: string;
  priority?: number | 'any';
}

export interface MessageOptions {
  recipientId?: string;
  channel?: CommunicationChannel;
  priority?: number;
  metadata?: Record<string, any>;
  senderId?: string;
  senderRole?: string;
}

export interface CommunicationOptions {
  senderId: string;
  senderRole?: string;
  recipientId?: string;
  channel?: CommunicationChannel;
  priority?: number;
  metadata?: Record<string, any>;
}
