
import { availableModels } from './availableModels';
import { loadCustomModels, saveCustomModel, deleteCustomModel } from './customModels';
import type { ModelOption, ModelSource, ModelCapabilities, ModelParameters } from './types';

// Get all available models including custom ones
export const getAllModels = (): ModelOption[] => {
  return [...availableModels, ...loadCustomModels()];
};

export const getModelById = (id: string): ModelOption | undefined => {
  return getAllModels().find(model => model.id === id);
};

export const getModelsBySource = (source: ModelSource): ModelOption[] => {
  return getAllModels().filter(model => model.source === source);
};

export const getModelByName = (name: string): ModelOption | undefined => {
  return getAllModels().find(model => 
    model.name.toLowerCase() === name.toLowerCase()
  );
};

// Re-export everything for backwards compatibility
// Use `export type` for type exports when isolatedModules is enabled
export type { ModelOption, ModelSource, ModelCapabilities, ModelParameters };
export { availableModels, saveCustomModel, deleteCustomModel };
