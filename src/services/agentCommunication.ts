// Agent Communication Service
// This service handles the communication between agents using Supabase Realtime
import { supabase } from '@/integrations/supabase/client';
import { MessageOptions, MessageContent, CommunicationChannel, InternalMessage } from '@/types/communication';

class AgentCommunicationService {
  private messageListeners: Array<(message: InternalMessage) => void> = [];
  private channelSubscriptions: Map<string, () => void> = new Map();
  private messageHistory: Map<string, InternalMessage[]> = new Map();
  private connected = true;

  // Initialize the service
  constructor() {
    // Set up the main broadcast channel
    this.setupChannel('broadcast');
  }

  // Set up a Supabase Realtime channel for a specific communication channel
  private setupChannel(channelName: string) {
    try {
      const channel = supabase.channel(`agent-${channelName}`);
      
      // Listen for broadcast messages
      channel
        .on('broadcast', { event: 'message' }, (payload) => {
          const message = payload.payload as InternalMessage;
          
          // Store in history
          if (!this.messageHistory.has(channelName)) {
            this.messageHistory.set(channelName, []);
          }
          this.messageHistory.get(channelName)?.push(message);
          
          // Notify listeners
          this.messageListeners.forEach(listener => listener(message));
        })
        .subscribe((status) => {
          console.log(`Agent communication channel ${channelName} status:`, status);
          this.connected = status === 'SUBSCRIBED';
        });
      
      // Store unsubscribe function
      this.channelSubscriptions.set(channelName, () => {
        supabase.removeChannel(channel);
      });
    } catch (error) {
      console.error(`Error setting up agent communication channel ${channelName}:`, error);
      this.connected = false;
    }
  }

  // Send a message
  sendMessage(options: {
    senderId: string;
    senderRole?: string;
    recipientId?: string;
    content: string;
    channel?: CommunicationChannel;
    priority?: number;
    metadata?: Record<string, any>;
  }): boolean {
    try {
      const { 
        senderId, 
        senderRole = 'Unknown',
        recipientId,
        content, 
        channel = 'broadcast', 
        priority = 3,
        metadata = {}
      } = options;
      
      const timestamp = new Date().toISOString();
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      const message: InternalMessage = {
        id: messageId,
        senderId,
        senderRole,
        recipientId,
        content,
        timestamp,
        channel,
        priority,
        metadata
      };
      
      // Ensure channel exists
      if (!this.channelSubscriptions.has(channel)) {
        this.setupChannel(channel);
      }
      
      // Send to Supabase channel
      const channelObj = supabase.channel(`agent-${channel}`);
      channelObj.send({
        type: 'broadcast',
        event: 'message',
        payload: message
      });
      
      // Store in local history
      if (!this.messageHistory.has(channel)) {
        this.messageHistory.set(channel, []);
      }
      this.messageHistory.get(channel)?.push(message);
      
      // Additionally notify direct listeners
      if (recipientId) {
        this.messageListeners.forEach(listener => listener(message));
      }
      
      return true;
    } catch (error) {
      console.error('Error sending agent message:', error);
      return false;
    }
  }

  // Subscribe to messages
  subscribeToMessages(
    callback: (message: InternalMessage) => void,
    options: {
      channel?: CommunicationChannel | 'all';
      recipientId?: string;
      priority?: number;
    } = {}
  ): () => void {
    const { channel = 'all', recipientId, priority } = options;
    
    // Create new channel subscription if needed
    if (channel !== 'all' && !this.channelSubscriptions.has(channel)) {
      this.setupChannel(channel);
    }
    
    // Create filtered listener
    const filteredCallback = (message: InternalMessage) => {
      // Filter by channel if specified
      if (channel !== 'all' && message.channel !== channel) {
        return;
      }
      
      // Filter by recipient if specified
      if (recipientId && message.recipientId && message.recipientId !== recipientId) {
        return;
      }
      
      // Filter by priority if specified
      if (priority !== undefined && message.priority !== undefined && message.priority < priority) {
        return;
      }
      
      // Call the callback with the filtered message
      callback(message);
    };
    
    // Add to listeners
    this.messageListeners.push(filteredCallback);
    
    // Return unsubscribe function
    return () => {
      const index = this.messageListeners.indexOf(filteredCallback);
      if (index !== -1) {
        this.messageListeners.splice(index, 1);
      }
    };
  }

  // Get message history
  getMessageHistory(options: {
    channel?: CommunicationChannel | 'all';
    recipientId?: string;
    limit?: number;
  } = {}): InternalMessage[] {
    const { channel = 'all', recipientId, limit } = options;
    
    let messages: InternalMessage[] = [];
    
    if (channel === 'all') {
      // Combine all channel messages
      Array.from(this.messageHistory.values()).forEach(channelMessages => {
        messages = [...messages, ...channelMessages];
      });
    } else {
      // Get messages for specific channel
      const channelMessages = this.messageHistory.get(channel) || [];
      messages = [...channelMessages];
    }
    
    // Filter by recipient if specified
    if (recipientId) {
      messages = messages.filter(msg => 
        msg.recipientId === recipientId || 
        msg.channel === 'broadcast'
      );
    }
    
    // Sort by timestamp (newest first)
    messages.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // Apply limit if specified
    if (limit) {
      messages = messages.slice(0, limit);
    }
    
    return messages;
  }

  // Check if connected
  isConnected(): boolean {
    return this.connected;
  }

  // Clean up all channel subscriptions
  cleanup(): void {
    // Unsubscribe from all channels
    this.channelSubscriptions.forEach(unsubscribe => {
      unsubscribe();
    });
    
    // Clear the subscription map
    this.channelSubscriptions.clear();
    
    // Clear listeners
    this.messageListeners = [];
    
    console.log("Agent communication service cleaned up");
  }
}

// Export singleton instance
export const agentCommunication = new AgentCommunicationService();
