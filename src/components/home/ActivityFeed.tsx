import React, { useState } from 'react';
import { Activity, Clock, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

type ActivityItem = {
  id: string;
  type: 'info' | 'success' | 'error' | 'warning';
  agent: string;
  action: string;
  timestamp: Date;
  details?: string;
};

const ActivityFeed: React.FC = () => {
  // Use state to manage activities so we can clear them
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'success',
      agent: 'Research Agent',
      action: 'Completed data collection',
      timestamp: new Date(Date.now() - 5 * 60000),
      details: 'Successfully gathered 15 market reports'
    },
    {
      id: '2',
      type: 'info',
      agent: 'Analysis Agent',
      action: 'Processing data',
      timestamp: new Date(Date.now() - 12 * 60000),
    },
    {
      id: '3',
      type: 'warning',
      agent: 'QA Agent',
      action: 'Resource constraint detected',
      timestamp: new Date(Date.now() - 25 * 60000),
      details: 'Memory usage approaching threshold'
    },
    {
      id: '4',
      type: 'error',
      agent: 'Writer Agent',
      action: 'Failed to generate report',
      timestamp: new Date(Date.now() - 45 * 60000),
      details: 'API rate limit exceeded'
    },
    {
      id: '5',
      type: 'success',
      agent: 'Research Agent',
      action: 'Initialized new task',
      timestamp: new Date(Date.now() - 60 * 60000),
    },
  ]);

  const clearAllActivities = () => {
    setActivities([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const getAgentColor = (agent: string) => {
    if (agent.includes('Research')) return 'text-blue-400';
    if (agent.includes('Analysis')) return 'text-purple';
    if (agent.includes('QA')) return 'text-yellow-500';
    if (agent.includes('Writer')) return 'text-green-500';
    return 'text-white';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          Activity Feed
        </h2>
        <button 
          className="text-xs text-gray-400 hover:text-white transition-colors"
          onClick={clearAllActivities}
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No activities to display
          </div>
        ) : (
          activities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-dark-accent p-3 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start">
                <div className="mt-0.5 mr-2">
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className={`font-medium ${getAgentColor(activity.agent)}`}>
                      {activity.agent}
                    </span>
                    {' '}
                    <span className="text-white">{activity.action}</span>
                  </p>
                  {activity.details && (
                    <p className="text-xs text-gray-400 mt-1">{activity.details}</p>
                  )}
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {getTimeAgo(activity.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
