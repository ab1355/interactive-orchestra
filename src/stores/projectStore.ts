
import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  description: string;
  timestamp: string;
}

interface ProjectStore {
  projects: Project[];
  currentProject: Project | null;
  createProject: (projectData: Omit<Project, 'id'>) => Promise<Project>;
  setCurrentProject: (project: Project) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  currentProject: null,
  
  createProject: async (projectData) => {
    // In a real app, this would make an API call to create the project
    const newProject = {
      id: `project-${Date.now()}`,
      ...projectData
    };
    
    set(state => ({
      projects: [...state.projects, newProject],
      currentProject: newProject
    }));
    
    return newProject;
  },
  
  setCurrentProject: (project) => {
    set({ currentProject: project });
  }
}));
