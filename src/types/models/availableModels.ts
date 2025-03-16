
import { ModelOption } from './types';

export const availableModels: ModelOption[] = [
  // Proprietary models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    description: 'OpenAI\'s most advanced multimodal model with vision capabilities',
    source: 'proprietary',
    maxTokens: 32768,
    contextSize: 128000,
    supportsStreaming: true,
    supportsVision: true,
    requiresApiKey: true,
    hostingOptions: ['cloud'],
    capabilities: {
      streaming: true,
      multimodal: true,
      codeInterpreter: true,
      functionCalling: true
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '1.0'
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
    hostingOptions: ['cloud'],
    capabilities: {
      streaming: true,
      multimodal: true,
      codeInterpreter: true,
      functionCalling: true
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '1.0'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Anthropic\'s most powerful model for highly complex tasks',
    source: 'proprietary',
    maxTokens: 32768,
    contextSize: 200000,
    supportsStreaming: true,
    supportsVision: true,
    requiresApiKey: true,
    hostingOptions: ['cloud'],
    capabilities: {
      streaming: true,
      multimodal: true,
      codeInterpreter: true,
      functionCalling: true
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.5,
      frequencyPenalty: 0.5
    },
    version: '3.5'
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    description: 'Anthropic\'s balanced model for versatility and performance',
    source: 'proprietary',
    maxTokens: 32768,
    contextSize: 200000,
    supportsStreaming: true,
    supportsVision: true,
    requiresApiKey: true,
    hostingOptions: ['cloud'],
    capabilities: {
      streaming: true,
      multimodal: true,
      codeInterpreter: true,
      functionCalling: true
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.5,
      frequencyPenalty: 0.5
    },
    version: '3.5'
  },
  
  // HuggingFace models
  {
    id: 'hf-llama-3-8b',
    name: 'Llama 3 8B (HuggingFace)',
    description: 'Meta\'s Llama 3 8B model hosted on HuggingFace Inference API',
    source: 'huggingface',
    maxTokens: 8192,
    contextSize: 8192,
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: true,
    hostingOptions: ['cloud'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: true,
      functionCalling: false
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '3.0',
    endpoint: 'https://api-inference.huggingface.co/models/meta-llama/Llama-3-8B-hf'
  },
  {
    id: 'hf-mistral-7b',
    name: 'Mistral 7B (HuggingFace)',
    description: 'Mistral 7B model hosted on HuggingFace Inference API',
    source: 'huggingface',
    maxTokens: 8192,
    contextSize: 8192,
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: true,
    hostingOptions: ['cloud'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: true,
      functionCalling: false
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '1.0',
    endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1'
  },
  {
    id: 'hf-gemma-7b',
    name: 'Gemma 7B (HuggingFace)',
    description: 'Google\'s Gemma 7B model hosted on HuggingFace Inference API',
    source: 'huggingface',
    maxTokens: 8192,
    contextSize: 8192,
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: true,
    hostingOptions: ['cloud'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: true,
      functionCalling: false
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '1.0',
    endpoint: 'https://api-inference.huggingface.co/models/google/gemma-7b'
  },
  
  // Open source models
  {
    id: 'llama-3-70b',
    name: 'Llama 3 70B',
    description: 'Meta\'s latest open-source large language model with 70 billion parameters',
    source: 'open-source',
    maxTokens: 8192,
    contextSize: 8192,
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['cloud', 'local', 'hybrid'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: true,
      functionCalling: true
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 8192,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '3.0'
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
    hostingOptions: ['cloud', 'local', 'hybrid'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: true,
      functionCalling: true
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 8192,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '3.0'
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
    hostingOptions: ['cloud', 'local', 'hybrid'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: true,
      functionCalling: false
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 8192,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '1.0'
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
    hostingOptions: ['cloud', 'local', 'hybrid'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: true,
      functionCalling: true
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 8192,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '1.0'
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
    hostingOptions: ['local'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: true,
      functionCalling: false
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '3.0'
  },
  {
    id: 'local-mistral',
    name: 'Local Mistral',
    description: 'Run Mistral locally with minimal hardware requirements',
    source: 'local',
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['local'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: true,
      functionCalling: false
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: '1.0'
  },
  {
    id: 'local-custom',
    name: 'Local Custom Model',
    description: 'Set up and run your own custom model through a local API endpoint',
    source: 'local',
    supportsStreaming: true,
    supportsVision: false,
    requiresApiKey: false,
    hostingOptions: ['local'],
    capabilities: {
      streaming: true,
      multimodal: false,
      codeInterpreter: false,
      functionCalling: false
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.0,
      frequencyPenalty: 0.0
    },
    version: 'custom'
  }
];
