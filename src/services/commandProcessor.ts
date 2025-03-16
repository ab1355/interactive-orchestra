
import { useUnifiedStore, Tool } from '@/stores/unifiedStore';

export interface CommandResult {
  content: string;
  type: 'text' | 'status' | 'error' | 'tool-result';
  metadata?: Record<string, any>;
}

class CommandProcessor {
  private toolRegistry: Map<string, Tool> = new Map();
  
  registerTool(tool: Tool): void {
    this.toolRegistry.set(tool.id, tool);
    console.log(`Tool registered: ${tool.name}`);
  }
  
  getAvailableTools(): Tool[] {
    return Array.from(this.toolRegistry.values()).filter(tool => tool.isEnabled);
  }
  
  async processCommand(command: string): Promise<CommandResult> {
    console.log(`Processing command: ${command}`);
    
    const { currentProject, ceoAgent } = useUnifiedStore.getState();
    
    if (!currentProject || !ceoAgent) {
      return {
        content: "I'm not connected to any project yet. Please create a project first.",
        type: 'error'
      };
    }
    
    // Basic command handling
    const lowerCommand = command.toLowerCase();
    
    // Project status commands
    if (lowerCommand.includes('status') || lowerCommand.includes('progress')) {
      return {
        content: `Current status: All systems operational. Project "${currentProject.name}" is in progress.`,
        type: 'status',
        metadata: {
          projectId: currentProject.id,
          progress: 72,
          tasksCompleted: 5,
          tasksRemaining: 2
        }
      };
    }
    
    // Task management commands
    if (lowerCommand.includes('create task') || lowerCommand.includes('add task')) {
      const taskName = command.replace(/create task|add task/i, '').trim();
      return {
        content: `Task created: "${taskName}"`,
        type: 'text',
        metadata: {
          taskName,
          taskId: `task-${Date.now()}`
        }
      };
    }
    
    // Agent commands
    if (lowerCommand.includes('assign agent') || lowerCommand.includes('delegate to')) {
      return {
        content: `Agent assignment processed. I'll handle the delegation for: "${command}"`,
        type: 'text'
      };
    }
    
    // Tool commands
    if (lowerCommand.includes('list tools') || lowerCommand.includes('show tools')) {
      const tools = this.getAvailableTools();
      if (tools.length === 0) {
        return {
          content: "No tools are currently available. You can add tools through the tool integration panel.",
          type: 'text'
        };
      }
      
      return {
        content: `Available tools:\n${tools.map(t => `• ${t.name}: ${t.description}`).join('\n')}`,
        type: 'text',
        metadata: {
          tools
        }
      };
    }
    
    // Default response
    return {
      content: `I've processed your request: "${command}". How can I assist you further?`,
      type: 'text'
    };
  }
}

// Export a singleton instance
export const commandProcessor = new CommandProcessor();
export default commandProcessor;
