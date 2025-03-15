
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, AlertCircle, Bot, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { agentCommunication } from '@/services/agentCommunication';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  senderId: string;
  senderRole: string;
  content: string;
  timestamp: Date;
  channel: string;
  priority: number;
}

const CommunicationThread: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'research-agent',
      senderRole: 'Research Agent',
      content: 'I've started gathering data for the market analysis task.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      channel: 'broadcast',
      priority: 3
    },
    {
      id: '2',
      senderId: 'manager',
      senderRole: 'Manager Agent',
      content: 'Good. Analysis Agent, please prepare to process the data once it's ready.',
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
      channel: 'direct',
      priority: 4
    },
    {
      id: '3',
      senderId: 'analysis-agent',
      senderRole: 'Analysis Agent',
      content: 'Ready to process. What format will the data be in?',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      channel: 'direct',
      priority: 3
    },
    {
      id: '4',
      senderId: 'research-agent',
      senderRole: 'Research Agent',
      content: 'CSV and JSON files. Should be ready in about 10 minutes.',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      channel: 'direct',
      priority: 3
    },
    {
      id: '5',
      senderId: 'system',
      senderRole: 'System',
      content: 'Warning: API rate limit approaching for data gathering.',
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      channel: 'priority',
      priority: 7
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Subscribe to agent communication system
    const unsubscribe = agentCommunication.subscribeToMessages((message) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        senderId: message.senderId || 'unknown',
        senderRole: message.senderRole || 'Unknown Agent',
        content: message.content,
        timestamp: new Date(),
        channel: message.channel || 'broadcast',
        priority: message.priority || 3
      }]);
      
      // Show toast for high priority messages
      if (message.priority && message.priority >= 7) {
        toast({
          title: `High Priority: ${message.senderRole || 'System'}`,
          description: message.content,
          variant: "destructive",
        });
      }
    });
    
    return () => unsubscribe();
  }, [toast]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const filteredMessages = activeChannel === 'all' 
    ? messages 
    : messages.filter(m => m.channel === activeChannel);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      senderId: 'user',
      senderRole: 'Human Operator',
      content: newMessage,
      timestamp: new Date(),
      channel: 'broadcast',
      priority: 5
    };
    
    setMessages(prev => [...prev, message]);
    
    // Also send through agent communication system
    agentCommunication.sendMessage({
      senderId: message.senderId,
      senderRole: message.senderRole,
      content: message.content,
      channel: message.channel,
      priority: message.priority
    });
    
    setNewMessage('');
  };
  
  const getChannelColor = (channel: string) => {
    switch(channel) {
      case 'priority': return 'text-red-400';
      case 'direct': return 'text-blue-400';
      case 'broadcast': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };
  
  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />
          Communication Thread
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            className={`text-xs ${activeChannel === 'all' ? 'bg-white/10' : ''}`}
            onClick={() => setActiveChannel('all')}
          >
            All
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={`text-xs ${activeChannel === 'broadcast' ? 'bg-white/10' : ''}`}
            onClick={() => setActiveChannel('broadcast')}
          >
            Broadcast
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={`text-xs ${activeChannel === 'direct' ? 'bg-white/10' : ''}`}
            onClick={() => setActiveChannel('direct')}
          >
            Direct
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={`text-xs ${activeChannel === 'priority' ? 'bg-white/10' : ''}`}
            onClick={() => setActiveChannel('priority')}
          >
            Priority
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] overflow-y-auto mb-4 border border-white/10 rounded-md p-3 space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <AlertCircle className="h-8 w-8 mb-2" />
              <p>No messages in this channel</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark flex items-center justify-center">
                  {msg.senderId === 'system' ? (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  ) : msg.senderId === 'user' ? (
                    <User className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Bot className="h-4 w-4 text-purple" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-semibold text-sm">
                      {msg.senderRole}
                    </span>
                    <span className={`ml-2 text-xs ${getChannelColor(msg.channel)}`}>
                      {msg.channel}
                    </span>
                    {msg.priority >= 7 && (
                      <Badge variant="outline" className="ml-2 text-xs border-red-500 text-red-400">
                        Priority {msg.priority}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{msg.content}</p>
                  <span className="text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationThread;
