
import React, { useState, useEffect } from 'react';
import { Users, Briefcase, HandCoins, Plus, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { getResources, createResource } from '@/integrations/supabase/client';

interface Resource {
  id: string;
  name: string;
  type: string;
  quantity: number;
  availability: string;
}

const getResourceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'human':
      return <Users className="w-4 h-4 text-blue-400" />;
    case 'financial':
      return <HandCoins className="w-4 h-4 text-green-400" />;
    case 'equipment':
      return <Briefcase className="w-4 h-4 text-amber-400" />;
    default:
      return <Briefcase className="w-4 h-4 text-gray-400" />;
  }
};

const calculateAllocationPercentage = (resources: Resource[], type: string) => {
  const filteredResources = resources.filter(r => r.type.toLowerCase() === type.toLowerCase());
  if (filteredResources.length === 0) return 0;
  
  const availableResources = filteredResources.filter(r => r.availability === 'available');
  return Math.round((availableResources.length / filteredResources.length) * 100);
};

const ResourceAllocation = ({ projectId }: { projectId?: string }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newResource, setNewResource] = useState({
    name: '',
    type: 'human',
    quantity: 1,
    availability: 'available',
    allocation_details: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const fetchResources = async () => {
      if (!projectId) {
        setResources([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const resourcesData = await getResources(projectId);
        setResources(resourcesData);
      } catch (error) {
        console.error('Error fetching resources:', error);
        toast({
          title: "Error fetching resources",
          description: "Could not load resources from the database.",
          variant: "destructive"
        });
        // Set empty array if error occurs
        setResources([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [projectId, toast]);

  const handleAddNewResource = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectId) {
      toast({
        title: "Error",
        description: "No project selected",
        variant: "destructive"
      });
      return;
    }

    if (!newResource.name.trim()) {
      toast({
        title: "Error",
        description: "Resource name is required",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const resourceData = {
        project_id: projectId,
        name: newResource.name,
        type: newResource.type,
        quantity: newResource.quantity,
        availability: newResource.availability,
        allocation_details: newResource.allocation_details
      };
      
      const createdResource = await createResource(resourceData);
      setResources([...resources, createdResource]);
      
      toast({
        title: "Resource created",
        description: `Resource "${createdResource.name}" has been created successfully.`
      });
      
      // Reset form and close dialog
      setNewResource({
        name: '',
        type: 'human',
        quantity: 1,
        availability: 'available',
        allocation_details: ''
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating resource:', error);
      toast({
        title: "Error creating resource",
        description: "Could not create the resource. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateAllocation = (resource: Resource) => {
    // For simplicity, we're just returning a fixed percentage
    // In a real scenario, this would be calculated based on resource allocation data
    return resource.availability === 'available' ? 100 : 0;
  };

  const getUnit = (type: string) => {
    switch (type.toLowerCase()) {
      case 'human':
        return 'members';
      case 'financial':
        return 'USD';
      case 'equipment':
        return 'units';
      default:
        return 'units';
    }
  };

  return (
    <Card className="bg-dark-accent border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple" />
          Resource Allocation
        </CardTitle>
        <CardDescription>Optimize resource distribution across initiatives</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">Available Resources</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                disabled={!projectId}
                onClick={() => projectId ? setIsDialogOpen(true) : null}
              >
                <Plus className="w-4 h-4 mr-1" /> New Resource
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddNewResource}>
                <DialogHeader>
                  <DialogTitle>Add New Resource</DialogTitle>
                  <DialogDescription>
                    Add a new resource to your project.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newResource.name}
                      onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select
                      value={newResource.type}
                      onValueChange={(value) => setNewResource({...newResource, type: value})}
                    >
                      <SelectTrigger id="type" className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="human">Human</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={newResource.quantity}
                      onChange={(e) => setNewResource({...newResource, quantity: parseInt(e.target.value)})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="availability" className="text-right">
                      Availability
                    </Label>
                    <Select
                      value={newResource.availability}
                      onValueChange={(value) => setNewResource({...newResource, availability: value})}
                    >
                      <SelectTrigger id="availability" className="col-span-3">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="allocated">Allocated</SelectItem>
                        <SelectItem value="unavailable">Unavailable</SelectItem>
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
                    Add Resource
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      
        {isLoading ? (
          <div className="text-center py-4">Loading resources...</div>
        ) : !projectId ? (
          <div className="text-center py-4 text-gray-400">
            Please select a project to view resources.
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-4 text-gray-400">
            No resources found. Add resources to start tracking allocation.
          </div>
        ) : (
          <div className="space-y-5">
            {resources.map((resource) => (
              <div key={resource.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getResourceIcon(resource.type)}
                    <span className="font-medium">{resource.name}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {resource.quantity} {getUnit(resource.type)}
                  </span>
                </div>
                <Progress 
                  value={calculateAllocation(resource)} 
                  className="h-2"
                />
              </div>
            ))}
            
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-medium mb-2">Resource Allocation Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-black/20 rounded-md">
                  <div className="text-blue-400 flex justify-center mb-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-gray-400">Human</div>
                  <div className="text-sm font-medium">{calculateAllocationPercentage(resources, 'human')}% Allocated</div>
                </div>
                <div className="p-2 bg-black/20 rounded-md">
                  <div className="text-green-400 flex justify-center mb-1">
                    <HandCoins className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-gray-400">Financial</div>
                  <div className="text-sm font-medium">{calculateAllocationPercentage(resources, 'financial')}% Allocated</div>
                </div>
                <div className="p-2 bg-black/20 rounded-md">
                  <div className="text-amber-400 flex justify-center mb-1">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-gray-400">Equipment</div>
                  <div className="text-sm font-medium">{calculateAllocationPercentage(resources, 'equipment')}% Allocated</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourceAllocation;
