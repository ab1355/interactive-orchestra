
export enum MessageType {
  TEXT = 'text',
  SYSTEM = 'system',
  COMMAND = 'command',
  CANVAS = 'canvas',
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  type: MessageType;
  timestamp?: string;
}
