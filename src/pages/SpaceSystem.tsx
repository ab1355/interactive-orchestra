
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GoalManagement from '@/components/space/GoalManagement';
import ResourceAllocation from '@/components/space/ResourceAllocation';
import TimelinePlanning from '@/components/space/TimelinePlanning';
import PerformanceMetrics from '@/components/space/PerformanceMetrics';
import { getProjects } from '@/integrations/supabase/client';
import Sidebar from '@/components/layout/Sidebar';

interface Project {
  id: string;
  name: string;
}

const SpaceSystem = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const projectsData = await getProjects();
        setProjects(projectsData);
        
        // Select the first project by default if available
        if (projectsData.length > 0) {
          setSelectedProjectId(projectsData[0].id);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error fetching projects",
          description: "Could not load projects from the database.",
          variant: "destructive"
        });
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  return (
    <div className="flex h-screen bg-dark">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">SPACE System</h1>
            <p className="text-muted-foreground">
              Strategic Planning And Capacity Evaluation system for resource management and goal tracking.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Select Project:</span>
              <Select
                value={selectedProjectId}
                onValueChange={setSelectedProjectId}
                disabled={isLoading || projects.length === 0}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder={isLoading ? "Loading projects..." : "Select a project"} />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GoalManagement projectId={selectedProjectId} />
            <ResourceAllocation projectId={selectedProjectId} />
            <TimelinePlanning projectId={selectedProjectId} />
            <PerformanceMetrics projectId={selectedProjectId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceSystem;
