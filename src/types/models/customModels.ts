
import { ModelOption } from './types';

// Create a custom storage key for storing custom models in localStorage
const CUSTOM_MODELS_STORAGE_KEY = 'custom-models';

// Load custom models from localStorage if available
export const loadCustomModels = (): ModelOption[] => {
  try {
    const storedModels = localStorage.getItem(CUSTOM_MODELS_STORAGE_KEY);
    if (storedModels) {
      return JSON.parse(storedModels);
    }
  } catch (error) {
    console.error("Error loading custom models:", error);
  }
  return [];
};

// Save custom models to localStorage
export const saveCustomModel = (model: ModelOption): boolean => {
  try {
    const customModels = loadCustomModels();
    
    // Check if model with same ID already exists
    const existingIndex = customModels.findIndex(m => m.id === model.id);
    
    if (existingIndex >= 0) {
      // Update existing model
      customModels[existingIndex] = model;
    } else {
      // Add new model
      customModels.push(model);
    }
    
    localStorage.setItem(CUSTOM_MODELS_STORAGE_KEY, JSON.stringify(customModels));
    return true;
  } catch (error) {
    console.error("Error saving custom model:", error);
    return false;
  }
};

// Delete a custom model
export const deleteCustomModel = (modelId: string): boolean => {
  try {
    const customModels = loadCustomModels();
    const updatedModels = customModels.filter(model => model.id !== modelId);
    localStorage.setItem(CUSTOM_MODELS_STORAGE_KEY, JSON.stringify(updatedModels));
    return true;
  } catch (error) {
    console.error("Error deleting custom model:", error);
    return false;
  }
};
