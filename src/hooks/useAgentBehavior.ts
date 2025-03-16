
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  AgentBehaviorParameters, 
  AgentBehaviorProfile, 
  BehaviorParameterKey, 
  AgentBehaviorContext 
} from '@/types/agentBehavior';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Default behavior parameters
const defaultBehaviorParameters: AgentBehaviorParameters = {
  decisionThreshold: 0.7,
  confidenceLevel: 0.8,
  learningRate: 0.5,
  adaptiveResponses: true,
  contextRetention: true,
  multiTasking: false,
  errorRecovery: true,
  adaptiveLearning: true,
  creativity: 0.6,
  precision: 0.7,
  responseSpeed: 0.5,
  resourceConsumption: 0.5
};

// Predefined behavior profiles
const predefinedProfiles: Omit<AgentBehaviorProfile, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Balanced',
    description: 'Balanced behavior suitable for general tasks',
    parameters: defaultBehaviorParameters,
    isDefault: true
  },
  {
    name: 'High Precision',
    description: 'Focused on accuracy and reliability',
    parameters: {
      ...defaultBehaviorParameters,
      decisionThreshold: 0.8,
      confidenceLevel: 0.9,
      creativity: 0.3,
      precision: 0.9,
      responseSpeed: 0.4
    }
  },
  {
    name: 'Creative',
    description: 'Prioritizes creative and novel solutions',
    parameters: {
      ...defaultBehaviorParameters,
      decisionThreshold: 0.6,
      confidenceLevel: 0.7,
      creativity: 0.9,
      precision: 0.5,
      responseSpeed: 0.6
    }
  },
  {
    name: 'Fast Response',
    description: 'Optimized for quick decision making',
    parameters: {
      ...defaultBehaviorParameters,
      decisionThreshold: 0.5,
      confidenceLevel: 0.6,
      responseSpeed: 0.9,
      resourceConsumption: 0.7
    }
  },
  {
    name: 'Resource Efficient',
    description: 'Minimizes resource usage',
    parameters: {
      ...defaultBehaviorParameters,
      multiTasking: false,
      resourceConsumption: 0.2,
      responseSpeed: 0.5
    }
  }
];

export const useAgentBehavior = (): AgentBehaviorContext => {
  const { toast } = useToast();
  const [currentProfile, setCurrentProfile] = useState<AgentBehaviorProfile>({
    id: 'default',
    name: 'Default',
    description: 'Default agent behavior',
    parameters: defaultBehaviorParameters,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDefault: true
  });
  
  const [availableProfiles, setAvailableProfiles] = useState<AgentBehaviorProfile[]>([]);
  
  // Load profiles from localStorage or create defaults
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        // Try to load from localStorage first
        const savedProfilesJson = localStorage.getItem('agentBehaviorProfiles');
        let profiles: AgentBehaviorProfile[] = [];
        
        if (savedProfilesJson) {
          const parsedProfiles = JSON.parse(savedProfilesJson);
          // Convert string dates back to Date objects
          profiles = parsedProfiles.map((profile: any) => ({
            ...profile,
            createdAt: new Date(profile.createdAt),
            updatedAt: new Date(profile.updatedAt)
          }));
        } else {
          // Create predefined profiles if none exist
          profiles = predefinedProfiles.map(profile => ({
            ...profile,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date()
          }));
          
          // Save to localStorage
          localStorage.setItem('agentBehaviorProfiles', JSON.stringify(profiles));
        }
        
        setAvailableProfiles(profiles);
        
        // Set current profile to the default one
        const defaultProfile = profiles.find(p => p.isDefault) || profiles[0];
        if (defaultProfile) {
          setCurrentProfile(defaultProfile);
        }
      } catch (error) {
        console.error('Error loading agent behavior profiles:', error);
        toast({
          title: 'Error',
          description: 'Failed to load agent behavior profiles',
          variant: 'destructive'
        });
      }
    };
    
    loadProfiles();
  }, [toast]);
  
  // Update a single parameter in the current profile
  const updateParameter = useCallback((key: BehaviorParameterKey, value: number | boolean) => {
    setCurrentProfile(prev => {
      const updated = {
        ...prev,
        parameters: {
          ...prev.parameters,
          [key]: value
        },
        updatedAt: new Date()
      };
      
      // If this is a default profile, create a custom one based on it
      if (prev.isDefault) {
        return {
          ...updated,
          id: uuidv4(),
          name: `Custom (Based on ${prev.name})`,
          description: `Customized version of ${prev.name}`,
          isDefault: false
        };
      }
      
      return updated;
    });
  }, []);
  
  // Save the current profile
  const saveProfile = useCallback(async (name: string, description: string): Promise<AgentBehaviorProfile> => {
    const updatedProfile = {
      ...currentProfile,
      name,
      description,
      updatedAt: new Date()
    };
    
    try {
      // Update in available profiles
      setAvailableProfiles(prev => {
        const updated = prev.map(p => 
          p.id === updatedProfile.id ? updatedProfile : p
        );
        
        // Save to localStorage
        localStorage.setItem('agentBehaviorProfiles', JSON.stringify(updated));
        
        return updated;
      });
      
      setCurrentProfile(updatedProfile);
      
      toast({
        title: 'Profile Saved',
        description: `Behavior profile "${name}" has been saved`
      });
      
      return updatedProfile;
    } catch (error) {
      console.error('Error saving agent behavior profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to save behavior profile',
        variant: 'destructive'
      });
      throw error;
    }
  }, [currentProfile, toast]);
  
  // Load a profile by ID
  const loadProfile = useCallback((profileId: string) => {
    const profile = availableProfiles.find(p => p.id === profileId);
    if (profile) {
      setCurrentProfile(profile);
      toast({
        title: 'Profile Loaded',
        description: `Behavior profile "${profile.name}" has been loaded`
      });
    } else {
      toast({
        title: 'Error',
        description: 'Profile not found',
        variant: 'destructive'
      });
    }
  }, [availableProfiles, toast]);
  
  // Create a new profile
  const createProfile = useCallback(async (profile: Omit<AgentBehaviorProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<AgentBehaviorProfile> => {
    const newProfile: AgentBehaviorProfile = {
      ...profile,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    try {
      // Add to available profiles
      setAvailableProfiles(prev => {
        const updated = [...prev, newProfile];
        
        // Save to localStorage
        localStorage.setItem('agentBehaviorProfiles', JSON.stringify(updated));
        
        return updated;
      });
      
      toast({
        title: 'Profile Created',
        description: `New behavior profile "${profile.name}" has been created`
      });
      
      return newProfile;
    } catch (error) {
      console.error('Error creating agent behavior profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to create behavior profile',
        variant: 'destructive'
      });
      throw error;
    }
  }, [toast]);
  
  // Delete a profile
  const deleteProfile = useCallback(async (profileId: string): Promise<boolean> => {
    try {
      // Remove from available profiles
      setAvailableProfiles(prev => {
        const profileToDelete = prev.find(p => p.id === profileId);
        
        if (!profileToDelete) {
          throw new Error('Profile not found');
        }
        
        if (profileToDelete.isDefault) {
          throw new Error('Cannot delete default profile');
        }
        
        const updated = prev.filter(p => p.id !== profileId);
        
        // Save to localStorage
        localStorage.setItem('agentBehaviorProfiles', JSON.stringify(updated));
        
        return updated;
      });
      
      // If current profile was deleted, switch to default
      if (currentProfile.id === profileId) {
        const defaultProfile = availableProfiles.find(p => p.isDefault) || availableProfiles[0];
        if (defaultProfile) {
          setCurrentProfile(defaultProfile);
        }
      }
      
      toast({
        title: 'Profile Deleted',
        description: 'Behavior profile has been deleted'
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting agent behavior profile:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete behavior profile',
        variant: 'destructive'
      });
      return false;
    }
  }, [availableProfiles, currentProfile, toast]);
  
  return {
    currentProfile,
    availableProfiles,
    updateParameter,
    saveProfile,
    loadProfile,
    createProfile,
    deleteProfile
  };
};

// Context provider will be implemented in a separate file
