
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Loader2 } from 'lucide-react';
import GoalManagement from '@/components/space/GoalManagement';
import ResourceAllocation from '@/components/space/ResourceAllocation';
import TimelinePlanning from '@/components/space/TimelinePlanning';
import PerformanceMetrics from '@/components/space/PerformanceMetrics';
import { getProjects, createProject } from '@/integrations/supabase/client';
import Sidebar from '@/components/layout/Sidebar';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  name: string;
}

const SpaceSystem = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { toast } = useToast();

  // Get current user
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user?.id) {
        setCurrentUser(data.session.user.id);
      }
    };

    fetchUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user?.id || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProject.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive"
      });
      return;
    }

    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to create a project",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const createdProject = await createProject({
        name: newProject.name,
        description: newProject.description,
        user_id: currentUser
      });
      
      setProjects([...projects, createdProject]);
      setSelectedProjectId(createdProject.id);
      
      toast({
        title: "Project created",
        description: `Project "${createdProject.name}" has been created successfully.`
      });
      
      // Reset form and close dialog
      setNewProject({ name: '', description: '' });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error creating project",
        description: "Could not create the project. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleCreateProject}>
                  <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                      Add a new project to manage with the SPACE system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({...newProject, name: e.target.value})}
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
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Project
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {!selectedProjectId && projects.length === 0 && !isLoading ? (
            <div className="mt-8 text-center p-8 border border-dashed border-gray-500 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
              <p className="text-gray-400 mb-4">Create your first project to get started with the SPACE system.</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GoalManagement projectId={selectedProjectId} />
              <ResourceAllocation projectId={selectedProjectId} />
              <TimelinePlanning projectId={selectedProjectId} />
              <PerformanceMetrics projectId={selectedProjectId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceSystem;
