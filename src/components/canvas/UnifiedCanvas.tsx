
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageType } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProjectStore } from '@/stores/projectStore';
import { Send } from 'lucide-react';

const UnifiedCanvas: React.FC = () => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat();
  const { currentProject } = useProjectStore();

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

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-dark">
      <header className="border-b border-dark-200 p-4">
        <h1 className="text-xl font-semibold text-white">
          {currentProject ? currentProject.name : 'AI Agent Framework'}
        </h1>
        <p className="text-sm text-gray-400">
          {currentProject ? currentProject.description : 'Create a new project to get started'}
        </p>
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
                className={`max-w-[80%] rounded-lg p-3 ${
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
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="border-t border-dark-200 p-4 flex gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message your CEO assistant..."
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

export default UnifiedCanvas;
