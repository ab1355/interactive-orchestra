
import React from 'react';
import { EnhancedChatInterface } from '@/components/chat/EnhancedChatInterface';
import { EnhancedSidebar } from '@/components/chat/EnhancedSidebar';

const EnhancedChatPage = () => {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <EnhancedSidebar />
      <main className="flex-1">
        <EnhancedChatInterface />
      </main>
    </div>
  );
};

export default EnhancedChatPage;
