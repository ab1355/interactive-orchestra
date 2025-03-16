
export interface AgentBehaviorParameters {
  // Decision making parameters
  decisionThreshold: number;        // 0-1: Threshold for making autonomous decisions
  confidenceLevel: number;          // 0-1: Required confidence level before taking action
  learningRate: number;             // 0-1: How quickly the agent adapts based on feedback
  
  // Behavioral flags
  adaptiveResponses: boolean;       // Whether agent modifies approach based on context
  contextRetention: boolean;        // Whether agent remembers previous interactions
  multiTasking: boolean;            // Whether agent can handle multiple tasks simultaneously
  errorRecovery: boolean;           // Whether agent can recover from errors automatically
  adaptiveLearning: boolean;        // Whether agent adjusts behavior based on outcomes
  
  // Operational parameters
  creativity: number;               // 0-1: Level of creative thinking in responses
  precision: number;                // 0-1: Focus on accuracy vs. generalization
  responseSpeed: number;            // 0-1: Prioritize speed vs. thoroughness
  resourceConsumption: number;      // 0-1: Resource usage limit
}

export interface AgentBehaviorProfile {
  id: string;
  name: string;
  description: string;
  parameters: AgentBehaviorParameters;
  createdAt: Date;
  updatedAt: Date;
  isDefault?: boolean;
}

export type BehaviorParameterKey = keyof AgentBehaviorParameters;

export interface AgentBehaviorContext {
  currentProfile: AgentBehaviorProfile;
  availableProfiles: AgentBehaviorProfile[];
  updateParameter: (key: BehaviorParameterKey, value: number | boolean) => void;
  saveProfile: (name: string, description: string) => Promise<AgentBehaviorProfile>;
  loadProfile: (profileId: string) => void;
  createProfile: (profile: Omit<AgentBehaviorProfile, 'id' | 'createdAt' | 'updatedAt'>) => Promise<AgentBehaviorProfile>;
  deleteProfile: (profileId: string) => Promise<boolean>;
}
