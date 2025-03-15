
import React, { useState, useRef, ChangeEvent } from 'react';
import { Send, Paperclip, FileUp, Trash2, Folder } from 'lucide-react';

interface FileWithPath extends File {
  path?: string;
  webkitRelativePath: string;
}

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', content: string}>>([
    { type: 'ai', content: 'Hello! I am your AI assistant. How can I help you today?' },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (message.trim() === '' && uploadedFiles.length === 0) return;
    
    // Add user message to chat
    const updatedHistory = [...chatHistory, { type: 'user', content: message }];
    setChatHistory(updatedHistory);
    
    // Clear input field
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      let responseContent = 'I\'ve received your message.';
      
      if (uploadedFiles.length > 0) {
        const fileNames = uploadedFiles.map(file => {
          if (file.webkitRelativePath) {
            return file.webkitRelativePath;
          }
          return file.name;
        }).join(', ');
        responseContent += ` I've also processed the following files: ${fileNames}`;
      }
      
      setChatHistory(prev => [...prev, { type: 'ai', content: responseContent }]);
      
      // Clear uploaded files after sending
      setUploadedFiles([]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files) as FileWithPath[];
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleFolderUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files) as FileWithPath[];
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files) as FileWithPath[];
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOpenFolderDialog = () => {
    if (folderInputRef.current) {
      folderInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Chat Interface</h2>
        <div className="text-sm text-gray-400">
          Connected to AI Agent
        </div>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 pr-2 space-y-4"
      >
        {chatHistory.map((chat, index) => (
          <div 
            key={index} 
            className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                chat.type === 'user' 
                  ? 'bg-purple text-white rounded-tr-none' 
                  : 'bg-dark-accent text-white rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{chat.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="mb-4 p-2 bg-dark-accent rounded-lg border border-white/10">
          <div className="text-xs font-medium mb-2">Uploaded Files:</div>
          <div className="max-h-24 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between py-1 px-2 text-sm">
                <div className="truncate flex-1">
                  {file.webkitRelativePath ? file.webkitRelativePath : file.name}
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="ml-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div 
        className={`p-1 border rounded-lg transition-colors ${
          isDragging 
            ? 'border-purple bg-purple/10' 
            : 'border-white/10 bg-dark'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark/80 rounded-lg z-10">
            <div className="text-center">
              <FileUp className="w-8 h-8 mx-auto mb-2 text-purple" />
              <p className="text-white">Drop files to upload</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2 p-2">
          <button 
            className="text-gray-400 hover:text-white"
            onClick={handleOpenFileDialog}
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button 
            className="text-gray-400 hover:text-white"
            onClick={handleOpenFolderDialog}
          >
            <Folder className="w-5 h-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          <input
            type="file"
            ref={folderInputRef}
            onChange={handleFolderUpload}
            className="hidden"
            multiple
            directory=""
            webkitdirectory=""
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 text-white placeholder-gray-500"
            rows={1}
          />
          <button 
            className={`p-2 rounded-full ${
              message.trim() || uploadedFiles.length > 0
                ? 'bg-purple text-white' 
                : 'bg-gray-700 text-gray-400'
            }`}
            onClick={handleSendMessage}
            disabled={message.trim() === '' && uploadedFiles.length === 0}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
