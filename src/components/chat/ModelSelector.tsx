
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllModels } from '@/types/models';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cloud, Server, Lock, Unlock } from 'lucide-react';

export const ModelSelector = () => {
  const allModels = getAllModels();
  const [selectedModel, setSelectedModel] = useState<string>(allModels[0]?.id || '');

  const handleSelectModel = (modelId: string) => {
    setSelectedModel(modelId);
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-4">Select Model</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {allModels.slice(0, 6).map((model) => {
          const isSelected = model.id === selectedModel;
          
          return (
            <Card 
              key={model.id} 
              className={`cursor-pointer border hover:border-purple-400 transition-all ${
                isSelected ? 'border-purple-500 bg-purple-50/5' : 'border-dark-200'
              } model-card h-full`}
              onClick={() => handleSelectModel(model.id)}
            >
              <CardHeader className="p-3 pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-sm model-title">{model.name}</CardTitle>
                  {model.requiresApiKey ? (
                    <Lock className="h-3 w-3 text-amber-500" />
                  ) : (
                    <Unlock className="h-3 w-3 text-green-500" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-3 pt-2 pb-1">
                <div className="flex flex-wrap gap-1">
                  {model.supportsVision && (
                    <Badge variant="outline" className="text-xs">Vision</Badge>
                  )}
                  {model.supportsStreaming && (
                    <Badge variant="outline" className="text-xs">Stream</Badge>
                  )}
                  {model.contextSize && (
                    <Badge variant="outline" className="text-xs">{Math.round(model.contextSize / 1000)}K</Badge>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-3 pt-0">
                <Button 
                  variant={isSelected ? "default" : "outline"} 
                  size="sm" 
                  className={`w-full text-xs h-7 ${isSelected ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                >
                  {isSelected ? "Selected" : "Select"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-4">
        <Select>
          <SelectTrigger className="w-full bg-dark-accent text-sm">
            <SelectValue placeholder="More models..." />
          </SelectTrigger>
          <SelectContent>
            {allModels.slice(6).map((model) => (
              <SelectItem key={model.id} value={model.id} onClick={() => handleSelectModel(model.id)}>
                <div className="flex items-center gap-2 text-sm">
                  <span>{model.name}</span>
                  {model.version && <Badge variant="outline" className="text-xs">v{model.version}</Badge>}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ModelSelector;
