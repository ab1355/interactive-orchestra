
import React, { useState, useEffect } from 'react';
import { Users, Briefcase, HandCoins } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { getResources } from '@/integrations/supabase/client';

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
  const { toast } = useToast();

  useEffect(() => {
    const fetchResources = async () => {
      // Use a demo project ID if none is provided
      const demoProjectId = "00000000-0000-0000-0000-000000000000";
      const activeProjectId = projectId || demoProjectId;
      
      try {
        setIsLoading(true);
        const resourcesData = await getResources(activeProjectId);
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
        {isLoading ? (
          <div className="text-center py-4">Loading resources...</div>
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
