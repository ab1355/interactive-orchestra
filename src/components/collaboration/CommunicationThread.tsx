
import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAgentCommunication } from '@/hooks/useAgentCommunication';
import { formatDistanceToNow } from 'date-fns';
import { AgentMessage } from '@/services/agentCommunication';

const CommunicationThread: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const [activeAgent, setActiveAgent] = useState({
    id: 'analysis-agent-1',
    name: 'Analysis Agent',
    role: 'analyst' as const
  });
  const [activeTask, setActiveTask] = useState('Market Analysis');
  
  const { 
    messages, 
    sendMessage, 
    broadcastMessage 
  } = useAgentCommunication({
    agentId: activeAgent.id,
    agentRole: activeAgent.role,
    channels: ['direct', 'broadcast', 'priority']
  });

  // Initial messages for demo purposes
  useEffect(() => {
    if (messages.length === 0) {
      const demoMessages = [
        { 
          senderId: 'research-agent-1', 
          senderRole: 'researcher' as const,
          content: "I've gathered the competitive analysis data you requested.", 
          timestamp: new Date(Date.now() - 360000) 
        },
        { 
          senderId: activeAgent.id, 
          senderRole: activeAgent.role,
          content: "Thanks, I'll start processing that information to identify market gaps.", 
          timestamp: new Date(Date.now() - 340000) 
        },
        { 
          senderId: 'research-agent-1', 
          senderRole: 'researcher' as const,
          content: "Also found some relevant customer testimonials that might help with sentiment analysis.", 
          timestamp: new Date(Date.now() - 240000) 
        },
        { 
          senderId: activeAgent.id, 
          senderRole: activeAgent.role,
          content: "Perfect. I'll incorporate those as well for a more comprehensive report.", 
          timestamp: new Date(Date.now() - 120000) 
        },
      ];
      
      // We're not actually sending these, just simulating initial state
      demoMessages.forEach(msg => {
        sendMessage(msg.content, {
          recipientId: msg.senderId !== activeAgent.id ? activeAgent.id : 'research-agent-1',
          metadata: { 
            demo: true,
            timestamp: msg.timestamp 
          }
        });
      });
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    sendMessage(newMessage, {
      recipientId: 'research-agent-1'  // Default recipient for demo
    });
    
    setNewMessage('');
  };

  // Format the agent name from the message
  const getAgentName = (message: AgentMessage) => {
    if (message.senderId === activeAgent.id) {
      return activeAgent.name;
    }
    
    // Map roles to names for demo
    const roleToName: Record<string, string> = {
      'researcher': 'Research Agent',
      'analyst': 'Analysis Agent',
      'strategist': 'Strategy Agent',
      'support': 'Support Agent',
      'manager': 'Manager Agent'
    };
    
    return roleToName[message.senderRole] || message.senderRole;
  };

  // Format time from timestamp
  const formatMessageTime = (message: AgentMessage) => {
    if (message.metadata?.timestamp) {
      return formatDistanceToNow(new Date(message.metadata.timestamp), { addSuffix: true });
    }
    return formatDistanceToNow(message.timestamp, { addSuffix: true });
  };

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Inter-Agent Communication
        </h3>
        <div className="text-sm text-gray-400">Task: {activeTask}</div>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto p-1">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.channel === 'priority' ? 'bg-red-500' : 
              msg.senderId === activeAgent.id ? 'bg-blue-500' : 'bg-purple'
            }`}>
              <span className="text-white text-xs font-bold">
                {getAgentName(msg).charAt(0)}
              </span>
            </div>
            <div className="ml-3 bg-dark p-3 rounded-lg rounded-tl-none flex-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className={`font-medium text-sm ${
                    msg.channel === 'priority' ? 'text-red-400' : 
                    msg.senderId === activeAgent.id ? 'text-blue-400' : 'text-purple'
                  }`}>
                    {getAgentName(msg)}
                  </span>
                  {msg.channel === 'priority' && (
                    <span className="ml-2 bg-red-500/20 text-red-400 text-xs px-1.5 py-0.5 rounded-full flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Priority
                    </span>
                  )}
                  {msg.channel === 'broadcast' && (
                    <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded-full">
                      Broadcast
                    </span>
                  )}
                </div>
                <span className="text-gray-500 text-xs">{formatMessageTime(msg)}</span>
              </div>
              <p className="text-gray-300 text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex">
          <input 
            type="text" 
            className="flex-1 bg-dark border border-white/10 rounded-l p-2 text-white" 
            placeholder="Send a message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-purple hover:bg-purple/80 text-white py-2 px-4 rounded-r"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunicationThread;
