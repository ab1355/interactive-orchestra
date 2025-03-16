
import { useUnifiedStore, Tool } from '@/stores/unifiedStore';
import commandProcessor from './commandProcessor';

export interface ToolExecutionResult {
  success: boolean;
  message: string;
  data?: any;
}

// Interface for tool implementations
export interface ToolImplementation {
  id: string;
  name: string;
  description: string;
  execute: (params: any) => Promise<ToolExecutionResult>;
  getUsageInfo: () => string;
  getCategory: () => string;
  isAvailable: () => boolean;
}

class ToolIntegrationService {
  private tools: Map<string, ToolImplementation> = new Map();
  
  registerTool(tool: ToolImplementation): void {
    this.tools.set(tool.id, tool);
    
    // Also register with the command processor
    const { registerTool } = useUnifiedStore.getState();
    const toolData = {
      id: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.getCategory(),
      isEnabled: true,
    };
    
    const registeredTool = registerTool(toolData);
    commandProcessor.registerTool(registeredTool);
    
    console.log(`Tool registered: ${tool.name}`);
  }
  
  async executeTool(toolId: string, params: any): Promise<ToolExecutionResult> {
    const tool = this.tools.get(toolId);
    
    if (!tool) {
      return {
        success: false,
        message: `Tool with ID ${toolId} not found`
      };
    }
    
    if (!tool.isAvailable()) {
      return {
        success: false,
        message: `Tool ${tool.name} is not currently available`
      };
    }
    
    try {
      console.log(`Executing tool: ${tool.name} with params:`, params);
      return await tool.execute(params);
    } catch (error) {
      console.error(`Error executing tool ${tool.name}:`, error);
      return {
        success: false,
        message: `Error executing tool: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
  
  getAvailableTools(): ToolImplementation[] {
    return Array.from(this.tools.values()).filter(tool => tool.isAvailable());
  }
  
  getToolById(toolId: string): ToolImplementation | undefined {
    return this.tools.get(toolId);
  }
  
  getToolSuggestions(context: string): ToolImplementation[] {
    // Simple context-based tool suggestion algorithm
    // This will be enhanced in future implementations
    const lowerContext = context.toLowerCase();
    return this.getAvailableTools().filter(tool => {
      const relevanceScore = this.calculateToolRelevance(tool, lowerContext);
      return relevanceScore > 0.5; // Only suggest highly relevant tools
    }).sort((a, b) => {
      // Sort by relevance
      const scoreA = this.calculateToolRelevance(a, lowerContext);
      const scoreB = this.calculateToolRelevance(b, lowerContext);
      return scoreB - scoreA;
    });
  }
  
  private calculateToolRelevance(tool: ToolImplementation, context: string): number {
    // Simple relevance calculation based on keyword matching
    // This will be enhanced with more sophisticated NLP in future implementations
    const keywords = [
      tool.name.toLowerCase(),
      tool.description.toLowerCase(),
      tool.getCategory().toLowerCase()
    ];
    
    let score = 0;
    keywords.forEach(keyword => {
      if (context.includes(keyword)) {
        score += 0.3;
      }
    });
    
    return Math.min(score, 1); // Cap at 1.0
  }
}

// Export a singleton instance
export const toolIntegration = new ToolIntegrationService();
export default toolIntegration;
