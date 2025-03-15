
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Message Types
export type AgentRole = 'manager' | 'researcher' | 'analyst' | 'strategist' | 'support';
export type CommunicationChannel = 'direct' | 'broadcast' | 'priority';
export type ResourcePriority = 'low' | 'medium' | 'high' | 'critical';

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

export interface TaskPriority {
  level: number;
  label: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  urgency: number; // 0-10 scale
  importance: number; // 0-10 scale
}

// New interfaces for autonomous agent creation
export interface AgentBlueprint {
  id: string;
  name: string;
  role: string;
  confidence: number;
  justification: string;
  skills: string[];
  requiredResources: AgentResource[];
  status: 'proposed' | 'training' | 'ready' | 'deployed' | 'rejected';
}

export interface AutoCreationConfig {
  enabled: boolean;
  confidenceThreshold: number;
  maxConcurrentTraining: number;
  autoApproveThreshold: number;
}

// Communication Service
class AgentCommunicationService {
  private messages: AgentMessage[] = [];
  private resources: AgentResource[] = [];
  private priorityThresholds = {
    critical: 9,
    high: 7,
    medium: 4,
    low: 1
  };
  private listeners: Map<string, ((message: AgentMessage) => void)[]> = new Map();
  private channel: any;
  
  // Autonomous agent creation
  private blueprints: AgentBlueprint[] = [];
  private autoCreationConfig: AutoCreationConfig = {
    enabled: false,
    confidenceThreshold: 0.75,
    maxConcurrentTraining: 2,
    autoApproveThreshold: 0.9
  };

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

  // Get priority label based on numeric priority level
  getPriorityDetails(priority: number): TaskPriority {
    if (priority >= this.priorityThresholds.critical) {
      return {
        level: priority,
        label: 'critical',
        description: 'Requires immediate attention',
        urgency: 10,
        importance: 10
      };
    } else if (priority >= this.priorityThresholds.high) {
      return {
        level: priority,
        label: 'high',
        description: 'Should be handled soon',
        urgency: 8,
        importance: 8
      };
    } else if (priority >= this.priorityThresholds.medium) {
      return {
        level: priority,
        label: 'medium',
        description: 'Normal priority task',
        urgency: 5,
        importance: 5
      };
    } else {
      return {
        level: priority,
        label: 'low',
        description: 'Can be handled when resources are available',
        urgency: 2,
        importance: 3
      };
    }
  }

  // Update priority thresholds if needed
  updatePriorityThresholds(thresholds: Partial<Record<ResourcePriority, number>>) {
    this.priorityThresholds = {
      ...this.priorityThresholds,
      ...thresholds
    };
  }

  // Send a message through the appropriate channel
  async sendMessage(message: Omit<AgentMessage, 'id' | 'timestamp' | 'read'>) {
    const newMessage: AgentMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false
    };

    // For high-priority messages, automatically set channel to 'priority'
    if (newMessage.priority >= this.priorityThresholds.high && newMessage.channel !== 'priority') {
      console.log(`Auto-elevating message to priority channel due to high priority level (${newMessage.priority})`);
      newMessage.channel = 'priority';
    }

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
      minPriority?: number;
    }
  ) {
    const key = options?.channel || 
               (options?.recipientId ? `recipient:${options.recipientId}` : 'all');
    
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    
    // Store the original callback
    const originalCallback = callback;
    
    // Create a wrapper that filters by priority if needed
    const callbackWithPriorityFilter = (message: AgentMessage) => {
      if (options?.minPriority !== undefined && message.priority < options.minPriority) {
        return; // Skip messages below the minimum priority
      }
      originalCallback(message);
    };
    
    this.listeners.get(key)!.push(callbackWithPriorityFilter);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(key) || [];
      const index = listeners.indexOf(callbackWithPriorityFilter);
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
    minPriority?: number;
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
    
    if (options?.minPriority !== undefined) {
      filteredMessages = filteredMessages.filter(m => m.priority >= options.minPriority);
    }
    
    // Sort by priority (higher first) and then by timestamp (newest first)
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

  // Autonomous Agent Creation Methods
  setAutoCreationEnabled(enabled: boolean) {
    this.autoCreationConfig.enabled = enabled;
    return this.autoCreationConfig;
  }

  updateAutoCreationConfig(config: Partial<AutoCreationConfig>) {
    this.autoCreationConfig = {
      ...this.autoCreationConfig,
      ...config
    };
    return this.autoCreationConfig;
  }

  getAutoCreationConfig(): AutoCreationConfig {
    return { ...this.autoCreationConfig };
  }

  // Propose a new agent based on workload analysis
  proposeNewAgent(blueprint: Omit<AgentBlueprint, 'id' | 'status'>): AgentBlueprint {
    const newBlueprint: AgentBlueprint = {
      ...blueprint,
      id: crypto.randomUUID(),
      status: 'proposed',
      requiredResources: blueprint.requiredResources || []
    };
    
    this.blueprints.push(newBlueprint);
    
    // If auto-approval is enabled and confidence is high enough, automatically approve
    if (this.autoCreationConfig.enabled && 
        blueprint.confidence >= this.autoCreationConfig.autoApproveThreshold) {
      this.approveAgentBlueprint(newBlueprint.id);
      
      // Notify about auto-approval
      this.sendMessage({
        senderId: 'system',
        senderRole: 'manager',
        channel: 'priority',
        content: `Agent blueprint "${blueprint.name}" automatically approved due to high confidence (${(blueprint.confidence * 100).toFixed(0)}%)`,
        priority: 7
      });
    }
    
    return newBlueprint;
  }

  // Get all agent blueprints, optionally filtered by status
  getAgentBlueprints(status?: AgentBlueprint['status']) {
    if (status) {
      return this.blueprints.filter(bp => bp.status === status);
    }
    return [...this.blueprints];
  }

  // Approve an agent blueprint for training
  approveAgentBlueprint(blueprintId: string) {
    const blueprint = this.blueprints.find(bp => bp.id === blueprintId);
    if (blueprint && blueprint.status === 'proposed') {
      blueprint.status = 'training';
      return true;
    }
    return false;
  }

  // Reject an agent blueprint
  rejectAgentBlueprint(blueprintId: string) {
    const blueprint = this.blueprints.find(bp => bp.id === blueprintId);
    if (blueprint && blueprint.status === 'proposed') {
      blueprint.status = 'rejected';
      return true;
    }
    return false;
  }

  // Mark agent training as complete
  completeAgentTraining(blueprintId: string) {
    const blueprint = this.blueprints.find(bp => bp.id === blueprintId);
    if (blueprint && blueprint.status === 'training') {
      blueprint.status = 'ready';
      return true;
    }
    return false;
  }

  // Deploy agent to the system
  deployAgent(blueprintId: string) {
    const blueprint = this.blueprints.find(bp => bp.id === blueprintId);
    if (blueprint && blueprint.status === 'ready') {
      blueprint.status = 'deployed';
      
      // Notify about deployment
      this.sendMessage({
        senderId: 'system',
        senderRole: 'manager',
        channel: 'broadcast',
        content: `New agent "${blueprint.name}" has been deployed to the system`,
        priority: 6
      });
      
      return true;
    }
    return false;
  }

  // Cleanup
  cleanup() {
    this.channel?.unsubscribe();
  }
}

// Export singleton instance
export const agentCommunication = new AgentCommunicationService();
