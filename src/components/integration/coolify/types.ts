
export interface CoolifyServer {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline' | 'maintenance';
  resources: {
    cpu: string;
    memory: string;
    storage: string;
  };
}

export interface CoolifyApplication {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'deploying' | 'failed';
  repository: string;
  destination: string;
  lastDeployed?: string;
  serverId: string;
}

export interface CoolifyDatabase {
  id: string;
  name: string;
  type: 'mysql' | 'postgresql' | 'mongodb' | 'redis';
  status: 'running' | 'stopped';
  serverId: string;
  version: string;
}

export interface CoolifyCredential {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  isAvailableToAgents: boolean;
}
