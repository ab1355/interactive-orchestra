
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export const ConversationList = () => {
  // Sample conversation history items
  const conversations = [
    { id: '1', title: 'Project Discussion', date: 'Today' },
    { id: '2', title: 'API Integration', date: 'Yesterday' },
    { id: '3', title: 'UI Design Feedback', date: '3 days ago' },
    { id: '4', title: 'Bug Troubleshooting', date: 'Last week' },
    { id: '5', title: 'Feature Planning', date: '2 weeks ago' }
  ];

  return (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <Button 
          key={conv.id}
          variant="ghost" 
          className="w-full justify-start text-left"
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate">{conv.title}</p>
              <p className="text-xs text-gray-400">{conv.date}</p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default ConversationList;
