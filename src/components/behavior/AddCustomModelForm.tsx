
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModelOption, ModelSource, saveCustomModel } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Form schema
const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  source: z.enum(['huggingface', 'custom', 'local', 'open-source']),
  endpoint: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal('')),
  contextSize: z.coerce.number().positive().optional(),
  maxTokens: z.coerce.number().positive().optional(),
  supportsStreaming: z.boolean().default(false),
  supportsVision: z.boolean().default(false),
  requiresApiKey: z.boolean().default(false),
  version: z.string().optional(),
  hostingOptions: z.array(z.enum(['cloud', 'local', 'hybrid'])).default(['local']),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCustomModelFormProps {
  onSuccess?: (newModel: ModelOption) => void;
  onCancel?: () => void;
}

const AddCustomModelForm: React.FC<AddCustomModelFormProps> = ({ onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'regular' | 'huggingface'>('regular');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      source: 'custom',
      endpoint: '',
      supportsStreaming: false,
      supportsVision: false,
      requiresApiKey: false,
      hostingOptions: ['local'],
    },
  });

  const handleSubmit = (values: FormValues) => {
    // Generate a unique ID based on name and timestamp
    const customId = `custom-${values.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    // Prepare the model data
    const newModel: ModelOption = {
      id: customId,
      name: values.name,
      description: values.description,
      source: values.source as ModelSource,
      contextSize: values.contextSize,
      maxTokens: values.maxTokens,
      supportsStreaming: values.supportsStreaming,
      supportsVision: values.supportsVision,
      requiresApiKey: values.requiresApiKey,
      hostingOptions: values.hostingOptions,
      version: values.version,
      endpoint: values.endpoint,
      isCustom: true,
      capabilities: {
        streaming: values.supportsStreaming,
        multimodal: values.supportsVision,
        codeInterpreter: true,
        functionCalling: false,
      },
      parameters: {
        temperature: 0.7,
        topP: 0.9,
        maxTokens: values.maxTokens || 4096,
        presencePenalty: 0.0,
        frequencyPenalty: 0.0,
      }
    };
    
    // Save the model
    const success = saveCustomModel(newModel);
    
    if (success) {
      toast({
        title: "Model Added",
        description: `${values.name} has been added to your models.`,
        variant: "default",
      });
      
      if (onSuccess) {
        onSuccess(newModel);
      }
    } else {
      toast({
        title: "Error",
        description: "Failed to save custom model. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value as 'regular' | 'huggingface');
    
    // Update form defaults based on selected tab
    if (value === 'huggingface') {
      form.setValue('source', 'huggingface');
      form.setValue('requiresApiKey', true);
      form.setValue('hostingOptions', ['cloud']);
    } else {
      form.setValue('source', 'custom');
      form.setValue('requiresApiKey', false);
      form.setValue('hostingOptions', ['local']);
    }
  };

  return (
    <Card className="w-full border-purple-100">
      <CardHeader>
        <CardTitle>Add New Model</CardTitle>
        <CardDescription>
          Add a custom model or connect to HuggingFace's Inference API
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="regular" onValueChange={handleTabChange}>
        <TabsList className="mx-6">
          <TabsTrigger value="regular">Custom Model</TabsTrigger>
          <TabsTrigger value="huggingface">HuggingFace Model</TabsTrigger>
        </TabsList>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Custom Model" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="A brief description of your model's capabilities" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Version</FormLabel>
                      <FormControl>
                        <Input placeholder="1.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="custom">Custom</SelectItem>
                          <SelectItem value="huggingface">HuggingFace</SelectItem>
                          <SelectItem value="local">Local</SelectItem>
                          <SelectItem value="open-source">Open Source</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="endpoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Endpoint</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={selectedTab === 'huggingface' 
                          ? "https://api-inference.huggingface.co/models/model-name" 
                          : "http://localhost:8000/v1/completions"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      {selectedTab === 'huggingface' 
                        ? "The HuggingFace Inference API endpoint for this model" 
                        : "The API endpoint for your custom model"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contextSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Context Size</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Maximum context window size
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="maxTokens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Tokens</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Maximum output tokens
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="supportsStreaming"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Streaming</FormLabel>
                        <FormDescription>
                          Supports token-by-token streaming
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="supportsVision"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Vision</FormLabel>
                        <FormDescription>
                          Supports image processing
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="requiresApiKey"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Requires API Key</FormLabel>
                      <FormDescription>
                        {selectedTab === 'huggingface' 
                          ? "Requires HuggingFace API token" 
                          : "Requires authentication with an API key"}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            
              <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 flex items-start">
                <AlertCircle className="text-yellow-600 h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Important Information</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    {selectedTab === 'huggingface' 
                      ? "You'll need a HuggingFace API token to use this model. Make sure you have access to the model you're connecting to."
                      : "Custom models need to be compatible with your system. Make sure the API endpoint is accessible and uses a format your application supports."}
                  </p>
                </div>
              </div>
              
              <CardFooter className="flex justify-between px-0 pt-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  <Check className="mr-2 h-4 w-4" /> Add Model
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default AddCustomModelForm;
