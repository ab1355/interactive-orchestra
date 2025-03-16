
import React, { useState, useEffect } from 'react';
import { getAllModels, ModelOption, ModelSource, deleteCustomModel } from '@/types/models';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cloud, Server, Lock, Unlock, Info, Plus, Trash, Globe, Edit } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import LocalModelSetupGuide from './LocalModelSetupGuide';
import AddCustomModelForm from './AddCustomModelForm';
import { useToast } from '@/hooks/use-toast';

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
  const [showAddModelDialog, setShowAddModelDialog] = useState(false);
  const [models, setModels] = useState<ModelOption[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Log component mounting for debugging
    console.log('ModelSelector component mounted', import.meta.env.MODE);
    
    // Load all models including custom ones
    setModels(getAllModels());
  }, []);
  
  const handleSelectModel = (model: ModelOption) => {
    console.log('Model selected in component:', model.id);
    onSelectModel(model.id);
  };
  
  const handleAddModelSuccess = (newModel: ModelOption) => {
    setShowAddModelDialog(false);
    // Refresh models list
    setModels(getAllModels());
    // Switch to appropriate tab
    setActiveTab(newModel.source);
    
    toast({
      title: "Model Added",
      description: `${newModel.name} has been added to your models.`,
    });
  };
  
  const handleDeleteModel = (modelId: string, modelName: string) => {
    const success = deleteCustomModel(modelId);
    
    if (success) {
      // If the deleted model was selected, select a default model
      if (selectedModelId === modelId) {
        onSelectModel('gpt-4o');
      }
      
      // Refresh models list
      setModels(getAllModels());
      
      toast({
        title: "Model Deleted",
        description: `${modelName} has been removed from your models.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the model. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const renderModelCard = (model: ModelOption) => {
    const isSelected = model.id === selectedModelId;
    const isCustom = model.isCustom === true;
    
    return (
      <Card 
        key={model.id} 
        className={`model-card cursor-pointer hover:border-purple-400 transition-all ${isSelected ? 'model-selected' : 'border-gray-200'}`}
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
            {model.source === 'huggingface' && (
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                <Globe className="h-3 w-3 mr-1" />
                HuggingFace
              </Badge>
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
            {model.version && (
              <Badge variant="outline" className="text-xs">v{model.version}</Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant={isSelected ? "default" : "outline"} 
            size="sm" 
            className={isSelected ? "bg-purple-600 hover:bg-purple-700 flex-grow" : "flex-grow"}
          >
            {isSelected ? "Selected" : "Select Model"}
          </Button>
          
          {isCustom && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Custom Model</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{model.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleDeleteModel(model.id, model.name)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <div className="w-full">
      <Tabs defaultValue="proprietary" onValueChange={(value) => setActiveTab(value as ModelSource)}>
        <TabsList className="model-selector-tabs">
          <TabsTrigger value="proprietary" className="model-selector-tab">Proprietary</TabsTrigger>
          <TabsTrigger value="open-source" className="model-selector-tab">Open Source</TabsTrigger>
          <TabsTrigger value="huggingface" className="model-selector-tab">HuggingFace</TabsTrigger>
          <TabsTrigger value="local" className="model-selector-tab">Local</TabsTrigger>
          <TabsTrigger value="custom" className="model-selector-tab">Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proprietary" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models
              .filter(model => model.source === 'proprietary')
              .map(renderModelCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="open-source" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models
              .filter(model => model.source === 'open-source')
              .map(renderModelCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="huggingface" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models
              .filter(model => model.source === 'huggingface')
              .map(renderModelCard)}
            
            <Dialog open={showAddModelDialog} onOpenChange={setShowAddModelDialog}>
              <DialogTrigger asChild>
                <Card className="border-dashed border-gray-300 flex items-center justify-center p-6 cursor-pointer hover:bg-gray-50">
                  <div className="text-center">
                    <Plus className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-gray-600">Add HuggingFace Model</p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <AddCustomModelForm 
                  onSuccess={handleAddModelSuccess}
                  onCancel={() => setShowAddModelDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-800 flex items-center">
              <Info className="h-4 w-4 mr-2" />
              HuggingFace API Access
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              To use HuggingFace models, you'll need an API token from your HuggingFace account. 
              Make sure you have the necessary permissions to access the models you want to use.
            </p>
            <div className="mt-2">
              <a 
                href="https://huggingface.co/settings/tokens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
              >
                Get HuggingFace API Token <External className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="local" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models
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
        
        <TabsContent value="custom" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models
              .filter(model => model.source === 'custom')
              .map(renderModelCard)}
            
            <Dialog open={showAddModelDialog} onOpenChange={setShowAddModelDialog}>
              <DialogTrigger asChild>
                <Card className="border-dashed border-gray-300 flex items-center justify-center p-6 cursor-pointer hover:bg-gray-50">
                  <div className="text-center">
                    <Plus className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-gray-600">Add Custom Model</p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <AddCustomModelForm 
                  onSuccess={handleAddModelSuccess}
                  onCancel={() => setShowAddModelDialog(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-800 flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Custom Model Integration
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              Custom models should have APIs compatible with standard LLM interfaces. Make sure your model endpoint 
              is accessible and properly configured. You can add models from various sources including self-hosted
              servers, cloud deployments, or specialized services.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Simple External link icon component
const External = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
