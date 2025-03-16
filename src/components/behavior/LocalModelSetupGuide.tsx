
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Info, Download, Terminal, Server, Code, Settings } from 'lucide-react';
import CodeBlock from '@/components/ui/CodeBlock';

const LocalModelSetupGuide: React.FC = () => {
  return (
    <Card className="border border-gray-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Server className="h-5 w-5 mr-2 text-purple-500" />
          Local Model Setup Guide
        </CardTitle>
        <CardDescription>
          Learn how to set up and run AI models locally on your own hardware
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ollama">Ollama</TabsTrigger>
            <TabsTrigger value="llama-cpp">llama.cpp</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
              <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Hardware Requirements
              </h3>
              <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                <li>Minimum 8GB RAM for smaller models (7B parameters)</li>
                <li>16GB+ RAM recommended for medium-sized models (13B parameters)</li>
                <li>32GB+ RAM for larger models (70B parameters)</li>
                <li>NVIDIA GPU with 8GB+ VRAM for optimal performance</li>
                <li>SSD storage with at least 20GB free space</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Available Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Ollama</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-500">
                      Run Llama, Mistral, and other models locally with a simple API. Supports Mac, Windows, and Linux.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => window.open('https://ollama.ai', '_blank')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Ollama
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">llama.cpp</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-500">
                      Lightweight C++ implementation for inference of LLaMA model. More technical but highly optimized.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => window.open('https://github.com/ggerganov/llama.cpp', '_blank')}>
                      <Code className="h-4 w-4 mr-2" />
                      GitHub Repository
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ollama" className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-2">Setting Up Ollama</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">1. Install Ollama</h4>
                <CodeBlock 
                  code="# macOS or Linux\ncurl -fsSL https://ollama.ai/install.sh | sh\n\n# Or download from https://ollama.ai for Windows" 
                  language="bash"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">2. Pull a Model</h4>
                <CodeBlock 
                  code="# Pull Llama 3 8B\nollama pull llama3\n\n# Pull Mistral 7B\nollama pull mistral" 
                  language="bash"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">3. Run the Model Server</h4>
                <CodeBlock 
                  code="# Start the Ollama server (runs on http://localhost:11434)\nollama serve" 
                  language="bash"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">4. Configure Connection</h4>
                <p className="text-sm text-gray-600 mb-2">
                  In this application, select "Local Llama 3" or "Local Mistral" and set the endpoint to:
                </p>
                <CodeBlock 
                  code="http://localhost:11434/api/generate" 
                  language="text"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="llama-cpp" className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-2">Setting Up llama.cpp</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">1. Clone and Build</h4>
                <CodeBlock 
                  code="git clone https://github.com/ggerganov/llama.cpp\ncd llama.cpp\nmake" 
                  language="bash"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">2. Download a Model</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Download a GGUF format model from Hugging Face (e.g., Mistral, Llama 3)
                </p>
                <Button variant="outline" size="sm" onClick={() => window.open('https://huggingface.co/models?sort=downloads&search=gguf', '_blank')}>
                  Browse GGUF Models
                </Button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">3. Run the Server</h4>
                <CodeBlock 
                  code="./server -m models/llama-3-8b.Q5_K_M.gguf -c 2048 --host 0.0.0.0 --port 8080" 
                  language="bash"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">4. Configure Connection</h4>
                <p className="text-sm text-gray-600 mb-2">
                  In this application, select "Local Custom Model" and set the endpoint to:
                </p>
                <CodeBlock 
                  code="http://localhost:8080/completion" 
                  language="text"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="config" className="space-y-4">
            <h3 className="font-medium text-gray-900 mb-2">Model Configuration</h3>
            <div>
              <h4 className="text-sm font-medium mb-1">Sample Model Configuration</h4>
              <CodeBlock 
                code={`interface ModelConfig {
  name: string;
  version: string;
  capabilities: {
    streaming: boolean;
    multimodal: boolean;
    codeInterpreter: boolean;
    functionCalling: boolean;
  };
  parameters: {
    temperature: number;
    topP: number;
    maxTokens: number;
    presencePenalty: number;
    frequencyPenalty: number;
  };
  contextWindow: number;
}

// Example configurations
const modelConfig: ModelConfig[] = [
  {
    name: "CLAUDE-3-SONNET",
    version: "3.5",
    capabilities: {
      streaming: true,
      multimodal: true,
      codeInterpreter: true,
      functionCalling: true,
    },
    parameters: {
      temperature: 0.7,
      topP: 0.9,
      maxTokens: 4096,
      presencePenalty: 0.5,
      frequencyPenalty: 0.5,
    },
    contextWindow: 200000
  },
  // Additional models...
];`} 
                language="typescript"
              />
            </div>
            
            <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Configuration
              </h4>
              <p className="text-sm text-blue-700">
                Local models can be further optimized by adjusting quantization levels, thread count, and context size
                based on your hardware capabilities. Refer to the documentation of your chosen solution for detailed 
                configuration options.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-between">
        <span className="text-sm text-gray-500 flex items-center">
          <Terminal className="h-4 w-4 mr-1" />
          Terminal commands may vary by OS
        </span>
        <Button variant="link" size="sm" onClick={() => window.open('https://github.com/ollama/ollama#documentation', '_blank')}>
          Full Documentation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocalModelSetupGuide;
