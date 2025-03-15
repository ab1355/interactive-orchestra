
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Flag, Plus, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { getTimelineEvents, createTimelineEvent } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface TimelineEvent {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  status: string;
  description?: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-500';
    case 'in_progress':
      return 'bg-blue-500';
    case 'upcoming':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMM d');
  } catch (e) {
    return dateString;
  }
};

const TimelinePlanning = ({ projectId }: { projectId?: string }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'upcoming'
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchTimelineEvents = async () => {
      if (!projectId) {
        setEvents([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const eventsData = await getTimelineEvents(projectId);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching timeline events:', error);
        toast({
          title: "Error fetching timeline",
          description: "Could not load timeline events from the database.",
          variant: "destructive"
        });
        // Set empty array if error occurs
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimelineEvents();
  }, [projectId, toast]);

  const handleAddNewEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectId) {
      toast({
        title: "Error",
        description: "No project selected",
        variant: "destructive"
      });
      return;
    }

    if (!newEvent.title.trim() || !newEvent.start_date || !newEvent.end_date) {
      toast({
        title: "Error",
        description: "Title, start date, and end date are required",
        variant: "destructive"
      });
      return;
    }

    // Validate that end date is after start date
    if (new Date(newEvent.end_date) < new Date(newEvent.start_date)) {
      toast({
        title: "Error",
        description: "End date must be after start date",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const eventData = {
        project_id: projectId,
        title: newEvent.title,
        description: newEvent.description,
        start_date: newEvent.start_date,
        end_date: newEvent.end_date,
        status: newEvent.status
      };
      
      const createdEvent = await createTimelineEvent(eventData);
      
      // Sort events by start date after adding the new one
      const updatedEvents = [...events, createdEvent].sort((a, b) => 
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      );
      
      setEvents(updatedEvents);
      
      toast({
        title: "Event created",
        description: `Event "${createdEvent.title}" has been added to the timeline.`
      });
      
      // Reset form and close dialog
      setNewEvent({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        status: 'upcoming'
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating timeline event:', error);
      toast({
        title: "Error creating event",
        description: "Could not create the timeline event. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get the estimated completion date (the latest end_date among all events)
  const getEstimatedCompletion = () => {
    if (events.length === 0) return 'N/A';
    
    const latestEvent = events.reduce((latest, event) => {
      const eventDate = new Date(event.end_date);
      const latestDate = new Date(latest.end_date);
      return eventDate > latestDate ? event : latest;
    }, events[0]);
    
    return formatDate(latestEvent.end_date);
  };

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
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">Project Timeline</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                disabled={!projectId}
                onClick={() => projectId ? setIsDialogOpen(true) : null}
              >
                <Plus className="w-4 h-4 mr-1" /> New Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddNewEvent}>
                <DialogHeader>
                  <DialogTitle>Add Timeline Event</DialogTitle>
                  <DialogDescription>
                    Schedule a new event or milestone for your project.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="start_date" className="text-right">
                      Start Date
                    </Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={newEvent.start_date}
                      onChange={(e) => setNewEvent({...newEvent, start_date: e.target.value})}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="end_date" className="text-right">
                      End Date
                    </Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={newEvent.end_date}
                      onChange={(e) => setNewEvent({...newEvent, end_date: e.target.value})}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={newEvent.status}
                      onValueChange={(value) => setNewEvent({...newEvent, status: value})}
                    >
                      <SelectTrigger id="status" className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Add Event
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      
        {isLoading ? (
          <div className="text-center py-4">Loading timeline...</div>
        ) : !projectId ? (
          <div className="text-center py-4 text-gray-400">
            Please select a project to view timeline.
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-4 text-gray-400">
            No timeline events found. Add events to visualize your project timeline.
          </div>
        ) : (
          <div className="relative pl-8">
            {events.map((event, index) => (
              <div key={event.id} className="mb-6 relative">
                {/* Timeline connector */}
                {index < events.length - 1 && (
                  <div className="absolute left-[-15px] top-4 h-full w-0.5 bg-gray-700"></div>
                )}
                
                {/* Event node */}
                <div className={`absolute left-[-20px] top-0.5 w-4 h-4 rounded-full ${getStatusColor(event.status)}`}></div>
                
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(event.start_date)} - {formatDate(event.end_date)}
                  </div>
                </div>
                
                {event.description && (
                  <p className="text-sm text-gray-400 mb-2">{event.description}</p>
                )}
                
                <div className="flex justify-end items-center text-sm">
                  <div className={`text-xs px-2 py-0.5 rounded ${
                    event.status.toLowerCase() === 'completed' ? 'bg-green-900/30 text-green-400' : 
                    event.status.toLowerCase() === 'in_progress' ? 'bg-blue-900/30 text-blue-400' : 
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
                <div className="text-xs text-gray-400">Estimated completion: {getEstimatedCompletion()}</div>
              </div>
              <div className="flex items-center mt-1">
                <div className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Flag className="w-3 h-3" />
                  <span>
                    {events.map(event => event.title).join(' → ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimelinePlanning;
