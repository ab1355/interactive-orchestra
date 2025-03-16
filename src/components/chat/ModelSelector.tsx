
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllModels } from '@/types/models';

export const ModelSelector = () => {
  const allModels = getAllModels();

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Model" />
        </SelectTrigger>
        <SelectContent>
          {allModels.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{model.name}</span>
                {model.version && <Badge variant="outline">v{model.version}</Badge>}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
