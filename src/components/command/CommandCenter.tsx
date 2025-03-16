
import React, { useState, useRef, useEffect } from 'react';
import { Send, SparkleIcon, Zap } from 'lucide-react';
import { useUnifiedStore } from '@/stores/unifiedStore';
import { useChat } from '@/hooks/useChat';
import { MessageType } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CommandSuggestion from './CommandSuggestion';
import ToolFeedback from './ToolFeedback';

interface CommandCenterProps {
  compact?: boolean;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ compact = false }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat();
  const { currentProject, ceoAgent, availableTools } = useUnifiedStore();
  
  const [suggestedCommands, setSuggestedCommands] = useState<string[]>([
    'Create task: Research market trends',
    'Assign agent to analyze competitor data',
    'Show project status',
    'List available tools'
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage({
      role: 'user',
      content: input,
      type: MessageType.TEXT,
      timestamp: new Date().toISOString(),
    });
    
    setInput('');
  };

  const handleCommandSelect = (command: string) => {
    setInput(command);
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`flex flex-col ${compact ? 'h-full' : 'h-full'} bg-dark rounded-lg ${compact ? '' : 'border border-dark-200'}`}>
      <header className={`${compact ? 'py-2 px-3' : 'p-4'} border-b border-dark-200 flex items-center`}>
        <Terminal className="h-5 w-5 mr-2 text-purple" />
        <h2 className={`${compact ? 'text-base' : 'text-lg'} font-medium`}>Command Center</h2>
        {!compact && ceoAgent && (
          <div className="ml-auto flex items-center">
            <div className="flex items-center px-2 py-1 rounded-full bg-purple/10 text-purple text-xs">
              <Zap className="h-3 w-3 mr-1" />
              <span>CEO Assistant Active</span>
            </div>
          </div>
        )}
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-purple text-white rounded-tr-none'
                    : message.role === 'system'
                    ? 'bg-dark-accent/50 text-gray-300'
                    : 'bg-dark-accent text-white rounded-tl-none'
                }`}
              >
                {message.type === MessageType.SYSTEM && message.content === 'message received' ? (
                  <div className="animate-pulse">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 bg-purple rounded-full"></div>
                      <div className="w-2 h-2 bg-purple rounded-full"></div>
                      <div className="w-2 h-2 bg-purple rounded-full"></div>
                      <span className="text-xs text-purple-300 ml-2">Thinking...</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.metadata?.toolUsed && (
                      <ToolFeedback 
                        toolName={message.metadata.toolUsed} 
                        result={message.metadata.toolResult} 
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {!compact && (
        <div className="p-2 border-t border-dark-200">
          <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
            {suggestedCommands.map((command, index) => (
              <CommandSuggestion 
                key={index} 
                command={command} 
                onClick={() => handleCommandSelect(command)} 
              />
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`border-t border-dark-200 ${compact ? 'p-2' : 'p-4'} flex gap-2`}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={compact ? "Command..." : "Enter command for CEO assistant..."}
          className="flex-1 bg-dark-accent/50 border-dark-200 text-white"
        />
        <Button type="submit" disabled={isLoading} variant="outline" className="bg-purple/10 text-purple border-purple/20 hover:bg-purple/20">
          {isLoading ? (
            <div className="animate-pulse flex items-center">
              <div className="h-1 w-1 bg-purple rounded-full mr-1"></div>
              <div className="h-1 w-1 bg-purple rounded-full mr-1"></div>
              <div className="h-1 w-1 bg-purple rounded-full"></div>
            </div>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

// Importing Terminal icon
import { Terminal } from 'lucide-react';

export default CommandCenter;
