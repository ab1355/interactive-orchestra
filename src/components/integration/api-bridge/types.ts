
export interface ApiCredential {
  id: string;
  name: string;
  type: string;
  isAvailableToAgents: boolean;
}

export interface CredentialToggleProps {
  credential: ApiCredential;
  onToggle: (credentialId: string) => void;
}

export interface CredentialListProps {
  credentials: ApiCredential[];
  onToggle: (credentialId: string) => void;
  isRefreshing: boolean;
}

export interface ApiCredentialBridgeProps {
  initialCredentials?: ApiCredential[];
}

export interface AgentToolCapability {
  type: 'api' | 'download' | 'terminal';
  description: string;
  isEnabled: boolean;
}

export interface AgentToolPermissions {
  allowDownloads: boolean;
  allowTerminalCommands: boolean;
  allowedDomains: string[];
  restrictedCommands: string[];
}
