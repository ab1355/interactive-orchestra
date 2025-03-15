
import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';

const CommunicationThread: React.FC = () => {
  const messages = [
    { agent: 'Research Agent', message: 'I\'ve gathered the competitive analysis data you requested.', time: '10:32 AM' },
    { agent: 'Analysis Agent', message: 'Thanks, I\'ll start processing that information to identify market gaps.', time: '10:34 AM' },
    { agent: 'Research Agent', message: 'Also found some relevant customer testimonials that might help with sentiment analysis.', time: '10:36 AM' },
    { agent: 'Analysis Agent', message: 'Perfect. I\'ll incorporate those as well for a more comprehensive report.', time: '10:38 AM' },
  ];

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Inter-Agent Communication
        </h3>
        <div className="text-sm text-gray-400">Task: Market Analysis</div>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto p-1">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-purple flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{msg.agent.charAt(0)}</span>
            </div>
            <div className="ml-3 bg-dark p-3 rounded-lg rounded-tl-none flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-purple font-medium text-sm">{msg.agent}</span>
                <span className="text-gray-500 text-xs">{msg.time}</span>
              </div>
              <p className="text-gray-300 text-sm">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex">
          <input type="text" className="flex-1 bg-dark border border-white/10 rounded-l p-2 text-white" placeholder="Send a message..." />
          <button className="bg-purple hover:bg-purple/80 text-white py-2 px-4 rounded-r">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationThread;
