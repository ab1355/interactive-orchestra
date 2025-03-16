
export type ModelSource = 'proprietary' | 'open-source' | 'local';

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
}

export const availableModels: ModelOption[] = [
  // Proprietary models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'OpenAI's most advanced multimodal model with vision capabilities',
    source: 'proprietary',
    maxTokens: 32768,
    contextSize: 128000,
    supportsStreaming: true,
    supportsVision: true,
    requiresApiKey: true,
    hostingOptions: ['cloud']
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    description: 'Smaller, faster, and more cost-effective version of GPT-4o',
    source: 'proprietary',
    maxTokens: 32768,
    contextSize: 128000,
    supportsStreaming: true,
    supportsVision: true,
    requiresApiKey: true,
    hostingOptions: ['cloud']
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Anthropic's most powerful model for highly complex tasks',
    source: 'proprietary',
    maxTokens: 32768,
    contextSize: 200000,
    supportsStreaming: true,
    supportsVision: true,
    requiresApiKey: true,
    hostingOptions: ['cloud']
  },
  
  // Open source models
  {
    id: 'llama-3-70b',
    name: 'Llama 3 70B',
    description: 'Meta's latest open-source large language model with 70 billion parameters',
    source: 'open-source',
    maxTokens: 8192,
    contextSize: 8192,
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['cloud', 'local', 'hybrid']
  },
  {
    id: 'llama-3-8b',
    name: 'Llama 3 8B',
    description: 'Compact version of Llama 3 with 8 billion parameters, suitable for less powerful hardware',
    source: 'open-source',
    maxTokens: 8192,
    contextSize: 8192,
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['cloud', 'local', 'hybrid']
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    description: 'Efficient open-source model with strong performance for its size',
    source: 'open-source',
    maxTokens: 8192,
    contextSize: 8192,
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['cloud', 'local', 'hybrid']
  },
  {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    description: 'A mixture-of-experts model with powerful capabilities and reasonable resource requirements',
    source: 'open-source',
    maxTokens: 8192,
    contextSize: 32768,
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['cloud', 'local', 'hybrid']
  },
  
  // Local models
  {
    id: 'local-llama-3',
    name: 'Local Llama 3',
    description: 'Run Llama 3 locally on your hardware with Ollama',
    source: 'local',
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['local']
  },
  {
    id: 'local-mistral',
    name: 'Local Mistral',
    description: 'Run Mistral locally with minimal hardware requirements',
    source: 'local',
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['local']
  },
  {
    id: 'local-custom',
    name: 'Local Custom Model',
    description: 'Set up and run your own custom model through a local API endpoint',
    source: 'local',
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['local']
  }
];

export const getModelById = (id: string): ModelOption | undefined => {
  return availableModels.find(model => model.id === id);
};

export const getModelsBySource = (source: ModelSource): ModelOption[] => {
  return availableModels.filter(model => model.source === source);
};
