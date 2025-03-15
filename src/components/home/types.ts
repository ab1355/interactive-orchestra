
export type ChatMessageType = 'user' | 'ai';

export interface ChatMessage {
  type: ChatMessageType;
  content: string;
}

export interface FileWithPath extends File {
  path?: string;
  webkitRelativePath: string;
}
