
import React from 'react';
import { 
  BehaviorParameterKey, 
  AgentBehaviorParameters 
} from '@/types/agentBehavior';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface BehaviorParameterProps {
  paramKey: BehaviorParameterKey;
  value: number | boolean;
  onChange: (key: BehaviorParameterKey, value: number | boolean) => void;
  disabled?: boolean;
}

const parameterLabels: Record<BehaviorParameterKey, string> = {
  decisionThreshold: 'Decision Threshold',
  confidenceLevel: 'Confidence Level',
  learningRate: 'Learning Rate',
  adaptiveResponses: 'Adaptive Responses',
  contextRetention: 'Context Retention',
  multiTasking: 'Multi-Tasking',
  errorRecovery: 'Error Recovery',
  adaptiveLearning: 'Adaptive Learning',
  creativity: 'Creativity',
  precision: 'Precision',
  responseSpeed: 'Response Speed',
  resourceConsumption: 'Resource Consumption'
};

const parameterDescriptions: Record<BehaviorParameterKey, string> = {
  decisionThreshold: 'Threshold for making autonomous decisions without human input',
  confidenceLevel: 'Required confidence before taking action or providing responses',
  learningRate: 'How quickly the agent adapts to new information and feedback',
  adaptiveResponses: 'Agent modifies its approach based on context and situation',
  contextRetention: 'Agent remembers and utilizes information from previous interactions',
  multiTasking: 'Agent can handle multiple tasks or requests simultaneously',
  errorRecovery: 'Agent can detect and recover from errors without human intervention',
  adaptiveLearning: 'Agent adjusts its learning strategy based on outcomes',
  creativity: 'Level of creative thinking and novel approaches in responses',
  precision: 'Balance between accuracy/precision and generalization',
  responseSpeed: 'Priority between speed and thoroughness of responses',
  resourceConsumption: 'Limit on computational resources the agent can utilize'
};

export const BehaviorParameterSlider: React.FC<BehaviorParameterProps> = ({
  paramKey,
  value,
  onChange,
  disabled = false
}) => {
  const isBoolean = typeof value === 'boolean';
  const label = parameterLabels[paramKey] || paramKey;
  const description = parameterDescriptions[paramKey] || '';
  
  const handleSliderChange = (newValue: number[]) => {
    onChange(paramKey, newValue[0]);
  };
  
  const handleSwitchChange = (checked: boolean) => {
    onChange(paramKey, checked);
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <Label className="text-sm font-medium">{label}</Label>
        {isBoolean ? (
          <Switch 
            checked={value as boolean} 
            onCheckedChange={handleSwitchChange} 
            disabled={disabled}
          />
        ) : (
          <span className="text-sm">{Math.round((value as number) * 100)}%</span>
        )}
      </div>
      <div className="text-xs text-gray-400 mb-2">{description}</div>
      {!isBoolean && (
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[value as number]}
          onValueChange={handleSliderChange}
          disabled={disabled}
        />
      )}
    </div>
  );
};
