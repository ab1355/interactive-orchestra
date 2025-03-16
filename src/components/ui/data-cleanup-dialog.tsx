
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDataCleanup } from '@/hooks/useDataCleanup';

export function DataCleanupDialog() {
  const [open, setOpen] = useState(false);
  const { resetAllData, isLoading } = useDataCleanup();

  const handleResetData = async () => {
    const success = await resetAllData();
    if (success) {
      setOpen(false);
    }
  };

  return (
    <>
      <Button 
        variant="destructive" 
        onClick={() => setOpen(true)}
      >
        Reset All Data
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-dark border border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This action cannot be undone. It will permanently delete all your projects, 
              tasks, goals, and other data from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              disabled={isLoading} 
              className="bg-dark-accent border border-white/10 text-white hover:bg-dark-accent/80"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleResetData();
              }}
              disabled={isLoading}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isLoading ? 'Resetting...' : 'Reset All Data'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
