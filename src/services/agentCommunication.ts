
import { EventEmitter } from 'events';

interface MessageContent {
  senderId?: string;
  senderRole?: string;
  recipientId?: string;
  content: string;
  channel?: 'direct' | 'broadcast' | 'priority';
  priority?: number;
  metadata?: Record<string, any>;
}

type MessageListener = (message: MessageContent) => void;

interface SubscriptionOptions {
  channel?: 'direct' | 'broadcast' | 'priority' | 'all';
  senderId?: string;
  recipientId?: string;
  priority?: number | 'any'; // Priority threshold or 'any'
}

class AgentCommunicationSystem {
  private eventEmitter: EventEmitter;
  private messageHistory: MessageContent[];
  
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.messageHistory = [];
    
    // Increase the maximum number of listeners to avoid warnings
    this.eventEmitter.setMaxListeners(50);
  }
  
  sendMessage(message: MessageContent) {
    // Default values for message properties
    const processedMessage: MessageContent = {
      ...message,
      senderId: message.senderId || 'system',
      channel: message.channel || 'broadcast',
      priority: message.priority || 3,
      timestamp: new Date()
    };
    
    // Store in history
    this.messageHistory.push(processedMessage);
    
    // Emit to general message event
    this.eventEmitter.emit('message', processedMessage);
    
    // Emit to specific channel
    if (processedMessage.channel) {
      this.eventEmitter.emit(`message:${processedMessage.channel}`, processedMessage);
    }
    
    // Emit to specific recipient if direct message
    if (processedMessage.recipientId) {
      this.eventEmitter.emit(`message:recipient:${processedMessage.recipientId}`, processedMessage);
    }
    
    // Emit to priority threshold events
    if (processedMessage.priority) {
      for (let i = 1; i <= 10; i++) {
        if (processedMessage.priority >= i) {
          this.eventEmitter.emit(`message:priority:${i}`, processedMessage);
        }
      }
    }
    
    console.log(`Agent Communication: [${processedMessage.channel}] ${processedMessage.senderRole || processedMessage.senderId} sent a message with priority ${processedMessage.priority}`);
    
    return processedMessage;
  }
  
  subscribeToMessages(callback: MessageListener, options: SubscriptionOptions = {}): () => void {
    const { channel = 'all', senderId, recipientId, priority } = options;
    
    let eventName = 'message';
    
    // Determine event name based on options
    if (channel !== 'all') {
      eventName = `message:${channel}`;
    }
    
    if (recipientId) {
      eventName = `message:recipient:${recipientId}`;
    }
    
    if (typeof priority === 'number') {
      eventName = `message:priority:${priority}`;
    }
    
    // Wrap callback to filter messages based on criteria
    const wrappedCallback = (message: MessageContent) => {
      let shouldProcess = true;
      
      // Filter by senderId if specified
      if (senderId && message.senderId !== senderId) {
        shouldProcess = false;
      }
      
      // Filter by specific conditions when not already filtered by event name
      if (channel === 'all' && options.channel && options.channel !== 'all' && message.channel !== options.channel) {
        shouldProcess = false;
      }
      
      if (shouldProcess) {
        callback(message);
      }
    };
    
    // Register the event listener
    this.eventEmitter.on(eventName, wrappedCallback);
    
    // Return unsubscribe function
    return () => {
      this.eventEmitter.off(eventName, wrappedCallback);
    };
  }
  
  getMessageHistory(options: SubscriptionOptions = {}): MessageContent[] {
    const { channel, senderId, recipientId, priority } = options;
    
    return this.messageHistory.filter(message => {
      if (channel && channel !== 'all' && message.channel !== channel) {
        return false;
      }
      
      if (senderId && message.senderId !== senderId) {
        return false;
      }
      
      if (recipientId && message.recipientId !== recipientId) {
        return false;
      }
      
      if (typeof priority === 'number' && (message.priority || 0) < priority) {
        return false;
      }
      
      return true;
    });
  }
  
  cleanup() {
    this.eventEmitter.removeAllListeners();
    this.messageHistory = [];
  }
}

// Singleton instance
export const agentCommunication = new AgentCommunicationSystem();
