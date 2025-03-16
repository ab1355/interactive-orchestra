
import React from 'react';
import { Check, AlertCircle, Wrench } from 'lucide-react';

interface ToolFeedbackProps {
  toolName: string;
  result: {
    success: boolean;
    data?: any;
    message?: string;
  };
}

const ToolFeedback: React.FC<ToolFeedbackProps> = ({ toolName, result }) => {
  const isSuccess = result && result.success;
  
  return (
    <div className="mt-3 pt-3 border-t border-dark-200/50">
      <div className="flex items-center mb-2">
        <Wrench className="h-3.5 w-3.5 mr-1.5 text-purple/70" />
        <span className="text-xs text-gray-400">Tool: {toolName}</span>
        {isSuccess ? (
          <span className="ml-auto flex items-center text-green-500 text-xs">
            <Check className="h-3 w-3 mr-1" />
            Success
          </span>
        ) : (
          <span className="ml-auto flex items-center text-red-400 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            Failed
          </span>
        )}
      </div>
      
      {result && result.data && (
        <div className="bg-dark-accent/30 rounded p-2 text-sm">
          <pre className="text-xs overflow-x-auto">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ToolFeedback;
