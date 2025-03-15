
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Message Types
export type AgentRole = 'manager' | 'researcher' | 'analyst' | 'strategist' | 'support';
export type CommunicationChannel = 'direct' | 'broadcast' | 'priority';
export type ResourcePriority = 'low' | 'medium' | 'high';

export interface AgentMessage {
  id: string;
  senderId: string;
  senderRole: AgentRole;
  recipientId?: string;
  channel: CommunicationChannel;
  content: string;
  metadata?: Record<string, any>;
  timestamp: Date;
  priority: number;
  read: boolean;
}

export interface AgentResource {
  id: string;
  name: string;
  type: 'computational' | 'data' | 'tool';
  priority: ResourcePriority;
  metadata?: Record<string, any>;
  assignedAgentIds: string[];
}

// Communication Service
class AgentCommunicationService {
  private messages: AgentMessage[] = [];
  private resources: AgentResource[] = [];
  private listeners: Map<string, ((message: AgentMessage) => void)[]> = new Map();
  private channel: any;

  constructor() {
    this.setupRealtimeChannel();
  }

  // Set up realtime channel for instant communication
  private setupRealtimeChannel() {
    this.channel = supabase
      .channel('agent-communication')
      .on('broadcast', { event: 'message' }, (payload) => {
        this.handleIncomingMessage(payload.payload as AgentMessage);
      })
      .subscribe();
  }

  // Handle incoming messages from the channel
  private handleIncomingMessage(message: AgentMessage) {
    this.messages.push(message);
    
    // Notify all listeners
    const allListeners = this.listeners.get('all') || [];
    allListeners.forEach(listener => listener(message));
    
    // Notify channel-specific listeners
    const channelListeners = this.listeners.get(message.channel) || [];
    channelListeners.forEach(listener => listener(message));
    
    // Notify recipient-specific listeners
    if (message.recipientId) {
      const recipientListeners = this.listeners.get(`recipient:${message.recipientId}`) || [];
      recipientListeners.forEach(listener => listener(message));
    }
  }

  // Send a message through the appropriate channel
  async sendMessage(message: Omit<AgentMessage, 'id' | 'timestamp' | 'read'>) {
    const newMessage: AgentMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false
    };

    // Add to local store
    this.messages.push(newMessage);
    
    // Broadcast through the channel
    await this.channel.send({
      type: 'broadcast',
      event: 'message',
      payload: newMessage
    });

    return newMessage;
  }

  // Subscribe to messages with optional filters
  subscribeToMessages(
    callback: (message: AgentMessage) => void,
    options?: {
      channel?: CommunicationChannel;
      recipientId?: string;
    }
  ) {
    const key = options?.channel || 
               (options?.recipientId ? `recipient:${options.recipientId}` : 'all');
    
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    
    this.listeners.get(key)!.push(callback);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(key) || [];
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  // Get all messages, optionally filtered
  getMessages(options?: {
    channel?: CommunicationChannel;
    recipientId?: string;
    senderId?: string;
    limit?: number;
  }) {
    let filteredMessages = [...this.messages];
    
    if (options?.channel) {
      filteredMessages = filteredMessages.filter(m => m.channel === options.channel);
    }
    
    if (options?.recipientId) {
      filteredMessages = filteredMessages.filter(m => 
        m.recipientId === options.recipientId || m.channel === 'broadcast'
      );
    }
    
    if (options?.senderId) {
      filteredMessages = filteredMessages.filter(m => m.senderId === options.senderId);
    }
    
    // Sort by timestamp (newest first) and priority
    filteredMessages.sort((a, b) => {
      // First sort by priority (higher first)
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      // Then by timestamp (newest first)
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
    
    if (options?.limit) {
      filteredMessages = filteredMessages.slice(0, options.limit);
    }
    
    return filteredMessages;
  }

  // Resource management
  assignResource(resource: AgentResource) {
    const existingIndex = this.resources.findIndex(r => r.id === resource.id);
    
    if (existingIndex >= 0) {
      this.resources[existingIndex] = resource;
    } else {
      this.resources.push(resource);
    }
    
    return resource;
  }

  getAssignedResources(agentId: string) {
    return this.resources.filter(resource => 
      resource.assignedAgentIds.includes(agentId)
    );
  }

  // Cleanup
  cleanup() {
    this.channel?.unsubscribe();
  }
}

// Export singleton instance
export const agentCommunication = new AgentCommunicationService();
