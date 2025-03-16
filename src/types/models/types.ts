
export type ModelSource = 'proprietary' | 'open-source' | 'local' | 'huggingface' | 'custom';

export interface ModelCapabilities {
  streaming?: boolean;
  multimodal?: boolean;
  codeInterpreter?: boolean;
  functionCalling?: boolean;
}

export interface ModelParameters {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
}

export interface ModelOption {
  id: string;
  name: string;
  description: string;
  source: ModelSource;
  maxTokens?: number;
  contextSize?: number;
  supportsStreaming?: boolean;
  supportsVision?: boolean;
  requiresApiKey?: boolean;
  hostingOptions?: ('cloud' | 'local' | 'hybrid')[];
  capabilities?: ModelCapabilities;
  parameters?: ModelParameters;
  version?: string;
  endpoint?: string;
  isCustom?: boolean;
}
