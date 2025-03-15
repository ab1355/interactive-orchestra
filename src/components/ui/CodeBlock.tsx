
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript', className }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting function
  const highlightCode = (code: string): React.ReactNode => {
    // Split the code by lines
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Apply syntax highlighting to different parts of the code
      let highlightedLine = line
        // Keywords
        .replace(/(import|from|const|new|return|=>|\(|\)|;|\{|\})/g, '<span class="keyword">$1</span>')
        // Strings
        .replace(/(".*?")/g, '<span class="string">$1</span>')
        // Function names
        .replace(/(\w+)(?=\s*\()/g, '<span class="function">$1</span>')
        // Types
        .replace(/(Agent|Swarm)/g, '<span class="type">$1</span>');
      
      return (
        <div key={lineIndex} className="code-line" dangerouslySetInnerHTML={{ __html: highlightedLine }} />
      );
    });
  };

  return (
    <div className={cn(
      "rounded-lg overflow-hidden shadow-xl transition-all duration-300 bg-code-background border border-white/10",
      className
    )}>
      <div className="flex items-center justify-between px-4 py-2 bg-black/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-xs font-mono text-gray-400">{language}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-auto">
        <pre className="text-sm font-mono text-gray-300 code-syntax">
          {highlightCode(code)}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
