
import React, { useState, useContext, createContext } from 'react';
import { FileUp } from 'lucide-react';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import { ChatMessage, FileWithPath } from './types';

// Create a context for canvas collaboration
export interface CanvasCollaborationContextType {
  addElementToCanvas: (elementType: string, properties?: any) => void;
  clearCanvas: () => void;
  updateCanvasZoom: (zoomLevel: number) => void;
}

export const CanvasCollaborationContext = createContext<CanvasCollaborationContextType | null>(null);

export const useCanvasCollaboration = () => {
  const context = useContext(CanvasCollaborationContext);
  if (!context) {
    throw new Error('useCanvasCollaboration must be used within a CanvasCollaborationProvider');
  }
  return context;
};

const ChatInterface: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { type: 'ai', content: 'Hello! I am your AI assistant. How can I help you today?' },
  ]);

  // Try to get the canvas collaboration context
  const canvasContext = useContext(CanvasCollaborationContext);

  const handleSendMessage = (message: string, files: FileWithPath[]) => {
    // Add user message to chat if there's text
    if (message.trim()) {
      setChatHistory(prev => [...prev, { type: 'user', content: message }]);
    }
    
    // Process canvas commands
    if (message.toLowerCase().includes('/canvas')) {
      processCanvasCommand(message, files);
    } else {
      // Simulate AI response for regular messages
      setTimeout(() => {
        let responseContent = 'I\'ve received your message.';
        
        if (files.length > 0) {
          const fileNames = files.map(file => {
            if (file.webkitRelativePath) {
              return file.webkitRelativePath;
            }
            return file.name;
          }).join(', ');
          responseContent += ` I've also processed the following files: ${fileNames}`;
        }
        
        setChatHistory(prev => [...prev, { type: 'ai', content: responseContent }]);
      }, 1000);
    }
  };

  const processCanvasCommand = (message: string, files: FileWithPath[]) => {
    const lowerMessage = message.toLowerCase();
    let response = '';

    // Process canvas-related commands
    if (canvasContext) {
      if (lowerMessage.includes('/canvas clear')) {
        canvasContext.clearCanvas();
        response = "Canvas cleared successfully.";
      } else if (lowerMessage.includes('/canvas add square')) {
        canvasContext.addElementToCanvas('square', { color: '#ffffff' });
        response = "Added a square to the canvas.";
      } else if (lowerMessage.includes('/canvas add circle')) {
        canvasContext.addElementToCanvas('circle', { color: '#ffffff' });
        response = "Added a circle to the canvas.";
      } else if (lowerMessage.includes('/canvas zoom')) {
        const zoomMatch = lowerMessage.match(/\/canvas zoom (\d+)/);
        if (zoomMatch && zoomMatch[1]) {
          const zoomLevel = parseInt(zoomMatch[1]) / 100;
          canvasContext.updateCanvasZoom(zoomLevel);
          response = `Canvas zoom set to ${zoomMatch[1]}%.`;
        } else {
          response = "Please specify a zoom level (e.g., /canvas zoom 150).";
        }
      } else {
        response = "Available canvas commands: /canvas clear, /canvas add square, /canvas add circle, /canvas zoom [percentage]";
      }
    } else {
      response = "Canvas collaboration is not available. Please make sure you're on a page with an interactive canvas.";
    }

    // Add AI response with canvas command result
    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'ai', content: response }]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Chat Interface</h2>
        <div className="text-sm text-gray-400">
          Connected to AI Agent
        </div>
      </div>
      
      <ChatHistory messages={chatHistory} />
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
