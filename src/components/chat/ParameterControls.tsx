
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

export const ParameterControls = () => {
  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <div className="space-y-2">
        <Label>Temperature</Label>
        <Slider 
          min={0} 
          max={1} 
          step={0.1} 
          defaultValue={[0.7]}
        />
      </div>
      <div className="space-y-2">
        <Label>Max Tokens</Label>
        <Input 
          type="number" 
          min={1} 
          max={4096} 
          defaultValue={2048}
        />
      </div>
    </div>
  );
};

export default ParameterControls;
