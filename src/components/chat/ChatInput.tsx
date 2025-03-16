
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip as PaperclipIcon, Mic as MicrophoneIcon } from 'lucide-react';

export const ChatInput = () => {
  return (
    <div className="relative">
      <Textarea 
        placeholder="Type your message..."
        className="min-h-[100px] pr-12 border-dark-200 focus:border-primary-300 transition-colors"
      />
      <div className="absolute bottom-2 right-2 flex gap-2">
        <Button variant="ghost" size="icon" className="text-dark-500 hover:text-dark-700">
          <PaperclipIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-dark-500 hover:text-dark-700">
          <MicrophoneIcon className="h-5 w-5" />
        </Button>
        <Button className="bg-primary hover:bg-primary-600 transition-colors">Send</Button>
      </div>
    </div>
  );
};

export default ChatInput;
