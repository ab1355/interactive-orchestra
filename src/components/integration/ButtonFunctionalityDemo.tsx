
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { EnhancedActionButton } from '@/components/ui/enhanced-action-button';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Trash, 
  RefreshCw, 
  Check, 
  X, 
  Download, 
  Upload, 
  Plus, 
  Edit, 
  Search, 
  Github, 
  Mail
} from 'lucide-react';

const ButtonFunctionalityDemo: React.FC = () => {
  const [count, setCount] = useState(0);

  const simulateApiCall = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  };

  const simulateFailedApiCall = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    throw new Error('API call failed');
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Button Functionality Demo</CardTitle>
        <CardDescription className="text-gray-400">
          Showcasing interactive buttons with various states and feedback mechanisms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Button Variants</h3>
          <div className="flex flex-wrap gap-2">
            <EnhancedActionButton variant="default">Default</EnhancedActionButton>
            <EnhancedActionButton variant="secondary">Secondary</EnhancedActionButton>
            <EnhancedActionButton variant="destructive">Destructive</EnhancedActionButton>
            <EnhancedActionButton variant="outline">Outline</EnhancedActionButton>
            <EnhancedActionButton variant="ghost">Ghost</EnhancedActionButton>
            <EnhancedActionButton variant="link">Link</EnhancedActionButton>
            <EnhancedActionButton variant="purple">Purple</EnhancedActionButton>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Loading States</h3>
          <div className="flex flex-wrap gap-2">
            <EnhancedActionButton 
              variant="default"
              onClick={simulateApiCall}
              successMessage="Operation completed successfully"
            >
              Save with Success
            </EnhancedActionButton>
            
            <EnhancedActionButton 
              variant="destructive"
              onClick={simulateFailedApiCall}
              errorMessage="Failed to complete operation"
            >
              Fail with Error
            </EnhancedActionButton>
            
            <EnhancedActionButton 
              variant="outline"
              isLoading={true}
            >
              Always Loading
            </EnhancedActionButton>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Tooltips & Keyboard Shortcuts</h3>
          <div className="flex flex-wrap gap-2">
            <EnhancedActionButton 
              variant="default"
              tooltipText="Save your work"
              keyboardShortcut="Ctrl+S"
              onClick={() => {
                setCount(count + 1);
                return true;
              }}
              successMessage="Saved successfully"
            >
              <Save /> Save
            </EnhancedActionButton>
            
            <EnhancedActionButton 
              variant="destructive"
              tooltipText="Delete permanently"
              keyboardShortcut="Alt+D"
              confirmationMessage="Are you sure you want to delete this item?"
              onClick={simulateApiCall}
              successMessage="Item deleted successfully"
            >
              <Trash /> Delete
            </EnhancedActionButton>
            
            <EnhancedActionButton 
              variant="outline"
              tooltipText="Refresh data"
              keyboardShortcut="Alt+R"
              onClick={simulateApiCall}
              successMessage="Data refreshed"
            >
              <RefreshCw /> Refresh
            </EnhancedActionButton>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Disabled States</h3>
          <div className="flex flex-wrap gap-2">
            <EnhancedActionButton 
              variant="default"
              disabled
              tooltipText="This button is disabled"
            >
              <Check /> Accept
            </EnhancedActionButton>
            
            <EnhancedActionButton 
              variant="destructive"
              disabled
              tooltipText="This action is not available"
            >
              <X /> Reject
            </EnhancedActionButton>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Ripple Effect</h3>
          <div className="flex flex-wrap gap-2">
            <EnhancedActionButton 
              variant="purple"
              hasRipple={true}
              tooltipText="With ripple effect"
            >
              <Download /> Download
            </EnhancedActionButton>
            
            <EnhancedActionButton 
              variant="purple"
              hasRipple={false}
              tooltipText="Without ripple effect"
            >
              <Upload /> Upload
            </EnhancedActionButton>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Icon Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <EnhancedActionButton 
              variant="default"
              size="icon"
              tooltipText="Add new item"
            >
              <Plus />
            </EnhancedActionButton>
            
            <EnhancedActionButton 
              variant="outline"
              size="icon"
              tooltipText="Edit item"
            >
              <Edit />
            </EnhancedActionButton>
            
            <EnhancedActionButton 
              variant="ghost"
              size="icon"
              tooltipText="Search"
            >
              <Search />
            </EnhancedActionButton>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-white">Social Button Examples</h3>
          <div className="flex flex-wrap gap-2">
            <EnhancedActionButton 
              variant="default"
              className="bg-black hover:bg-black/80"
              tooltipText="Continue with GitHub"
            >
              <Github /> Continue with GitHub
            </EnhancedActionButton>
            
            <EnhancedActionButton 
              variant="default"
              className="bg-blue-500 hover:bg-blue-600"
              tooltipText="Continue with Email"
            >
              <Mail /> Continue with Email
            </EnhancedActionButton>
          </div>
        </div>

        <div className="rounded-md bg-dark/30 p-4 mt-8 border border-white/10">
          <p className="text-sm text-gray-400">
            Button click count: <span className="text-white font-medium">{count}</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Try using the keyboard shortcuts: <span className="text-white">Ctrl+S</span>, <span className="text-white">Alt+D</span>, or <span className="text-white">Alt+R</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ButtonFunctionalityDemo;
