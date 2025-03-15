
import React from 'react';
import { Clock, Calendar, Flag } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface TimelineEvent {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dependencies?: string[];
}

const SAMPLE_TIMELINE: TimelineEvent[] = [
  { id: 't1', name: 'Market Research', startDate: '2023-07-01', endDate: '2023-07-15', status: 'completed' },
  { id: 't2', name: 'Product Design', startDate: '2023-07-16', endDate: '2023-08-15', status: 'completed', dependencies: ['t1'] },
  { id: 't3', name: 'Development Phase 1', startDate: '2023-08-16', endDate: '2023-09-30', status: 'in-progress', dependencies: ['t2'] },
  { id: 't4', name: 'User Testing', startDate: '2023-10-01', endDate: '2023-10-15', status: 'upcoming', dependencies: ['t3'] },
  { id: 't5', name: 'Launch Preparation', startDate: '2023-10-16', endDate: '2023-11-01', status: 'upcoming', dependencies: ['t4'] },
];

const getStatusColor = (status: TimelineEvent['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'upcoming':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const TimelinePlanning = () => {
  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple" />
          Timeline Planning
        </CardTitle>
        <CardDescription>Schedule and track project milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-8">
          {SAMPLE_TIMELINE.map((event, index) => (
            <div key={event.id} className="mb-6 relative">
              {/* Timeline connector */}
              {index < SAMPLE_TIMELINE.length - 1 && (
                <div className="absolute left-[-15px] top-4 h-full w-0.5 bg-gray-700"></div>
              )}
              
              {/* Event node */}
              <div className={`absolute left-[-20px] top-0.5 w-4 h-4 rounded-full ${getStatusColor(event.status)}`}></div>
              
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{event.name}</h4>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(event.startDate)} - {formatDate(event.endDate)}
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-400">
                  {event.dependencies && (
                    <span className="text-xs bg-gray-800 px-2 py-0.5 rounded">
                      Depends on: {event.dependencies.join(', ')}
                    </span>
                  )}
                </div>
                <div className={`text-xs px-2 py-0.5 rounded ${
                  event.status === 'completed' ? 'bg-green-900/30 text-green-400' : 
                  event.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400' : 
                  'bg-gray-800 text-gray-400'
                }`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Critical Path</div>
              <div className="text-xs text-gray-400">Estimated completion: Nov 1, 2023</div>
            </div>
            <div className="flex items-center mt-1">
              <div className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                <Flag className="w-3 h-3" />
                <span>Market Research → Product Design → Development → Testing → Launch</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelinePlanning;
