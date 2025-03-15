
import React, { useState, useRef } from 'react';
import { PaperclipIcon, SendIcon, Mic, Image, FileText, FileSpreadsheet, Code, FileX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status: 'sending' | 'sent' | 'seen' | 'error';
};

type UploadedFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
};

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && uploadedFiles.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setUploadedFiles([]);
    
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => msg.id === newMessage.id ? {...msg, status: 'sent'} : msg)
      );
      
      // Simulate agent typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: 'I received your message and files. How else can I assist you today?',
          sender: 'agent',
          timestamp: new Date(),
          status: 'sent',
        };
        setMessages(prev => [...prev, agentResponse]);
        scrollToBottom();
      }, 2000);
    }, 1000);

    scrollToBottom();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    processFiles(Array.from(files));
  };

  const processFiles = (files: File[]) => {
    const allowedTypes = [
      'application/pdf', 
      'text/plain', 
      'text/csv', 
      'image/jpeg', 
      'image/png', 
      'image/gif',
      'text/markdown',
      'text/x-typescript',
      'text/javascript',
      'application/json'
    ];
    
    const validFiles = files.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length !== files.length) {
      toast({
        title: "Unsupported file type",
        description: "Some files were not uploaded because they are not supported.",
        variant: "destructive",
      });
    }
    
    const newFiles = validFiles.map(file => ({
      id: Date.now().toString() + file.name,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  
  const removeFile = (id: string) => {
    setUploadedFiles(files => files.filter(file => file.id !== id));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) return <Image className="w-4 h-4" />;
    if (fileType.includes('pdf')) return <FileText className="w-4 h-4" />;
    if (fileType.includes('csv')) return <FileSpreadsheet className="w-4 h-4" />;
    if (fileType.includes('javascript') || fileType.includes('typescript') || fileType.includes('json')) 
      return <Code className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="flex flex-col h-full bg-dark-accent rounded-lg border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-medium">Chat with AI Assistant</h2>
        <p className="text-sm text-gray-400">Upload files or type your message below</p>
      </div>

      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 bg-purple/10 border-2 border-dashed border-purple rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <p className="text-xl font-semibold text-purple">Drop files to upload</p>
              <p className="text-sm text-gray-400">Supported formats: PDF, CSV, TXT, Images, Markdown, Code files</p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === 'user' 
                  ? 'bg-purple text-white rounded-tr-none' 
                  : 'bg-dark border border-white/10 text-white rounded-tl-none'
              }`}
            >
              <div className="text-sm">{msg.content}</div>
              <div className="text-xs mt-1 flex justify-end items-center">
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                {msg.sender === 'user' && (
                  <span className="ml-1">
                    {msg.status === 'sending' && <span className="opacity-50">Sending...</span>}
                    {msg.status === 'sent' && <span className="opacity-50">Sent</span>}
                    {msg.status === 'seen' && <span className="opacity-50">Seen</span>}
                    {msg.status === 'error' && <span className="text-red-500">Error</span>}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-dark border border-white/10 text-white rounded-lg rounded-tl-none p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="px-4 py-2 border-t border-white/10 bg-dark/50 flex flex-wrap gap-2">
          {uploadedFiles.map(file => (
            <div key={file.id} className="flex items-center bg-dark border border-white/10 rounded px-2 py-1 text-xs">
              {getFileIcon(file.type)}
              <span className="ml-1 mr-2 max-w-[150px] truncate">{file.name}</span>
              <button onClick={() => removeFile(file.id)} className="text-gray-400 hover:text-white">
                <FileX className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
        <div className="flex items-center">
          <button 
            type="button" 
            onClick={openFileDialog}
            className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <PaperclipIcon className="w-5 h-5" />
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              multiple 
              accept=".pdf,.csv,.txt,.jpg,.jpeg,.png,.gif,.md,.ts,.js,.json"
            />
          </button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-dark border border-white/10 rounded-md px-4 py-2 mx-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple"
          />
          
          <button 
            type="button" 
            className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors mr-1"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <button
            type="submit"
            className="bg-purple hover:bg-purple/80 text-white rounded-full p-2 transition-colors"
            disabled={!message.trim() && uploadedFiles.length === 0}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
