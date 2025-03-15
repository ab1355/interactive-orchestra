
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onOpenChange }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // In a real app, we would save these settings to a database or localStorage
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Dark Theme</h4>
              <p className="text-xs text-gray-400">Use dark mode for UI</p>
            </div>
            <Switch 
              checked={darkTheme} 
              onCheckedChange={setDarkTheme} 
              className="data-[state=checked]:bg-purple"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Notifications</h4>
              <p className="text-xs text-gray-400">Enable system notifications</p>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
              className="data-[state=checked]:bg-purple"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Auto-Save</h4>
              <p className="text-xs text-gray-400">Automatically save changes</p>
            </div>
            <Switch 
              checked={autoSave} 
              onCheckedChange={setAutoSave}
              className="data-[state=checked]:bg-purple"
            />
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm font-medium mb-2">About</h4>
            <p className="text-xs text-gray-400">AI Agent Framework</p>
            <p className="text-xs text-gray-400">Version 0.1.0</p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="border-white/10 text-white">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            onClick={handleSaveSettings}
            className="bg-purple hover:bg-purple/90 text-white"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
