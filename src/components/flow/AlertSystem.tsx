
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Bell, AlertCircle, CheckCircle, Clock, X, Filter, Settings, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { getProjectAlerts, dismissAlert } from '@/integrations/supabase/client';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'critical' | 'info';
  created_at: string;
  is_read: boolean;
  source: string;
  project_id: string;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'critical':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'warning':
      return <Clock className="h-5 w-5 text-amber-500" />;
    case 'info':
      return <Bell className="h-5 w-5 text-blue-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const getAlertBadge = (type: string) => {
  switch (type) {
    case 'critical':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'warning':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'info':
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    default:
      return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

const AlertSystem = ({ projectId }: { projectId?: string }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    email: true,
    inApp: true,
    critical: true,
    warning: true,
    info: true,
    resourceAlerts: true,
    taskAlerts: true,
    performanceAlerts: true
  });
  
  useEffect(() => {
    const fetchAlerts = async () => {
      if (!projectId) {
        setAlerts([]);
        setFilteredAlerts([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // In a real application, this would fetch from the API
        // For now, we'll use mock data or static alerts
        const alertsData = await getProjectAlerts(projectId);
        setAlerts(alertsData);
        setFilteredAlerts(alertsData);
      } catch (error) {
        console.error('Error fetching alerts:', error);
        
        // Generate mock alerts for demonstration
        const mockAlerts = generateMockAlerts(projectId);
        setAlerts(mockAlerts);
        setFilteredAlerts(mockAlerts);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAlerts();
  }, [projectId]);
  
  useEffect(() => {
    if (filterType === 'all') {
      setFilteredAlerts(alerts);
    } else {
      setFilteredAlerts(alerts.filter(alert => alert.type === filterType));
    }
  }, [filterType, alerts]);
  
  const generateMockAlerts = (projectId: string): Alert[] => {
    return [
      {
        id: '1',
        title: 'Resource bottleneck detected',
        description: 'Design team is over-allocated for the next sprint, which might delay project delivery',
        type: 'critical',
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        is_read: false,
        source: 'Resource Allocation',
        project_id: projectId,
      },
      {
        id: '2',
        title: 'Task deadline approaching',
        description: 'The "Create UI wireframes" task is due in 24 hours with no progress update',
        type: 'warning',
        created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        is_read: false,
        source: 'Task Management',
        project_id: projectId,
      },
      {
        id: '3',
        title: 'Performance decline detected',
        description: 'Task completion rate has dropped by 15% in the last week',
        type: 'warning',
        created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        is_read: true,
        source: 'Performance Metrics',
        project_id: projectId,
      },
      {
        id: '4',
        title: 'New team member added',
        description: 'Sarah Johnson has been added to the project team',
        type: 'info',
        created_at: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
        is_read: true,
        source: 'Team Management',
        project_id: projectId,
      }
    ];
  };
  
  const handleDismissAlert = async (alertId: string) => {
    try {
      await dismissAlert(alertId);
      
      // Update local state
      setAlerts(alerts.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      ));
      
      // Also update filtered alerts
      setFilteredAlerts(filteredAlerts.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      ));
    } catch (error) {
      console.error('Error dismissing alert:', error);
      
      // For mock data, update state directly
      setAlerts(alerts.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      ));
      
      setFilteredAlerts(filteredAlerts.map(alert => 
        alert.id === alertId ? { ...alert, is_read: true } : alert
      ));
    }
  };
  
  const formatAlertTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffMins < 1440) {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffMins / 1440);
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  const unreadCount = alerts.filter(alert => !alert.is_read).length;

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple" />
              Alert System
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white ml-2 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Monitor critical events and issues</CardDescription>
          </div>
          
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Alert Preferences</DialogTitle>
                <DialogDescription>
                  Customize how you receive alerts and notifications.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Notification Channels</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-alerts">Email Notifications</Label>
                      <Switch 
                        id="email-alerts"
                        checked={alertSettings.email}
                        onCheckedChange={(checked) => setAlertSettings({...alertSettings, email: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="inapp-alerts">In-App Notifications</Label>
                      <Switch 
                        id="inapp-alerts"
                        checked={alertSettings.inApp}
                        onCheckedChange={(checked) => setAlertSettings({...alertSettings, inApp: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Alert Types</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        <Label htmlFor="critical-alerts">Critical Alerts</Label>
                      </div>
                      <Switch 
                        id="critical-alerts"
                        checked={alertSettings.critical}
                        onCheckedChange={(checked) => setAlertSettings({...alertSettings, critical: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-amber-500 mr-2" />
                        <Label htmlFor="warning-alerts">Warning Alerts</Label>
                      </div>
                      <Switch 
                        id="warning-alerts"
                        checked={alertSettings.warning}
                        onCheckedChange={(checked) => setAlertSettings({...alertSettings, warning: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 text-blue-500 mr-2" />
                        <Label htmlFor="info-alerts">Info Alerts</Label>
                      </div>
                      <Switch 
                        id="info-alerts"
                        checked={alertSettings.info}
                        onCheckedChange={(checked) => setAlertSettings({...alertSettings, info: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Alert Sources</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="resource-alerts">Resource Alerts</Label>
                      <Switch 
                        id="resource-alerts"
                        checked={alertSettings.resourceAlerts}
                        onCheckedChange={(checked) => setAlertSettings({...alertSettings, resourceAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="task-alerts">Task Alerts</Label>
                      <Switch 
                        id="task-alerts"
                        checked={alertSettings.taskAlerts}
                        onCheckedChange={(checked) => setAlertSettings({...alertSettings, taskAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="performance-alerts">Performance Alerts</Label>
                      <Switch 
                        id="performance-alerts"
                        checked={alertSettings.performanceAlerts}
                        onCheckedChange={(checked) => setAlertSettings({...alertSettings, performanceAlerts: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setSettingsOpen(false)}>Save Preferences</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter alerts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alerts</SelectItem>
                <SelectItem value="critical">Critical Only</SelectItem>
                <SelectItem value="warning">Warnings Only</SelectItem>
                <SelectItem value="info">Info Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading alerts...</div>
        ) : !projectId ? (
          <div className="text-center py-8 text-gray-400">
            Please select a project to view alerts.
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <BellOff className="h-12 w-12 mb-3 opacity-20" />
            <p>No alerts found</p>
            {filterType !== 'all' && (
              <p className="text-sm mt-1">Try changing your filter settings</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-md border ${
                  alert.is_read ? 'border-white/10 bg-dark/50' : 'border-purple/30 bg-purple/5'
                } hover:bg-dark/80 transition-colors`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start">
                    {getAlertIcon(alert.type)}
                    <div className="ml-3">
                      <h3 className="text-md font-medium">{alert.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span>{alert.source}</span>
                        <span className="mx-2">•</span>
                        <span>{formatAlertTime(alert.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className={getAlertBadge(alert.type)}>
                      {alert.type}
                    </Badge>
                    {!alert.is_read && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 mt-2" 
                        onClick={() => handleDismissAlert(alert.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertSystem;
