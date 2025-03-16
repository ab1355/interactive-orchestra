
import React, { useState } from 'react';
import { availableModels, ModelOption, ModelSource } from '@/types/agentModels';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cloud, Server, Lock, Unlock, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import LocalModelSetupGuide from './LocalModelSetupGuide';

interface ModelSelectorProps {
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModelId,
  onSelectModel
}) => {
  const [activeTab, setActiveTab] = useState<ModelSource>('proprietary');
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  
  const handleSelectModel = (model: ModelOption) => {
    onSelectModel(model.id);
  };
  
  const renderModelCard = (model: ModelOption) => {
    const isSelected = model.id === selectedModelId;
    
    return (
      <Card 
        key={model.id} 
        className={`cursor-pointer hover:border-purple-400 transition-all ${isSelected ? 'border-purple-500 bg-purple-50/5' : 'border-gray-200'}`}
        onClick={() => handleSelectModel(model)}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base">{model.name}</CardTitle>
            {model.requiresApiKey ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Lock className="h-4 w-4 text-amber-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Requires API key</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Unlock className="h-4 w-4 text-green-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>No API key required</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <CardDescription className="line-clamp-2 h-10">
            {model.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-1">
            {model.supportsVision && (
              <Badge variant="outline" className="text-xs">Vision</Badge>
            )}
            {model.supportsStreaming && (
              <Badge variant="outline" className="text-xs">Streaming</Badge>
            )}
            {model.contextSize && (
              <Badge variant="outline" className="text-xs">{Math.round(model.contextSize / 1000)}K context</Badge>
            )}
            {model.hostingOptions?.map(option => (
              <Badge 
                key={option} 
                variant="outline" 
                className={`text-xs ${option === 'local' ? 'border-green-500 text-green-600' : ''}`}
              >
                {option === 'cloud' ? <Cloud className="h-3 w-3 mr-1" /> : 
                 option === 'local' ? <Server className="h-3 w-3 mr-1" /> : null}
                {option}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant={isSelected ? "default" : "outline"} 
            size="sm" 
            className={isSelected ? "bg-purple-600 hover:bg-purple-700 w-full" : "w-full"}
          >
            {isSelected ? "Selected" : "Select Model"}
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <div className="w-full">
      <Tabs defaultValue="proprietary" onValueChange={(value) => setActiveTab(value as ModelSource)}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="proprietary">Proprietary</TabsTrigger>
          <TabsTrigger value="open-source">Open Source</TabsTrigger>
          <TabsTrigger value="local">Local</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proprietary" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableModels
              .filter(model => model.source === 'proprietary')
              .map(renderModelCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="open-source" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableModels
              .filter(model => model.source === 'open-source')
              .map(renderModelCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="local" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableModels
              .filter(model => model.source === 'local')
              .map(renderModelCard)}
            
            <Card className="border-dashed border-gray-300 flex items-center justify-center p-6">
              <Button 
                variant="outline" 
                className="border-gray-300"
                onClick={() => setShowSetupGuide(!showSetupGuide)}
              >
                <Info className="h-4 w-4 mr-2" />
                {showSetupGuide ? 'Hide Setup Guide' : 'Local Model Setup Guide'}
              </Button>
            </Card>
          </div>
          
          {showSetupGuide && (
            <div className="mt-4">
              <LocalModelSetupGuide />
            </div>
          )}
          
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <h4 className="font-medium text-amber-800 flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Local Model Requirements
            </h4>
            <p className="text-sm text-amber-700 mt-1">
              Running models locally requires additional setup. Make sure your hardware meets the minimum requirements 
              and you have installed the necessary software (like Ollama or a local model server).
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
