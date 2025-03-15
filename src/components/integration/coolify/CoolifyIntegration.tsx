
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Database, GitBranch, Key } from 'lucide-react';
import ServerList from './ServerList';
import ApplicationList from './ApplicationList';
import DatabaseList from './DatabaseList';
import CredentialList from './CredentialList';
import ConnectionForm from './ConnectionForm';
import CoolifyFooter from './CoolifyFooter';

const CoolifyIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("servers");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Mock data - in a real app these would come from API
  const servers = [
    { 
      id: "srv1", 
      name: "Production Server", 
      url: "https://prod.example.com", 
      status: "online" as const,
      resources: { cpu: "4 cores", memory: "8GB", storage: "250GB" }
    },
    { 
      id: "srv2", 
      name: "Staging Server", 
      url: "https://staging.example.com", 
      status: "online" as const,
      resources: { cpu: "2 cores", memory: "4GB", storage: "100GB" }
    }
  ];

  const applications = [
    {
      id: "app1",
      name: "Frontend App",
      status: "running" as const,
      repository: "github.com/user/frontend",
      destination: "/var/www/frontend",
      lastDeployed: "2023-10-15T14:30:00Z",
      serverId: "srv1"
    },
    {
      id: "app2",
      name: "Backend API",
      status: "running" as const,
      repository: "github.com/user/backend",
      destination: "/var/www/api",
      lastDeployed: "2023-10-14T09:15:00Z",
      serverId: "srv1"
    }
  ];

  const databases = [
    {
      id: "db1",
      name: "Main Database",
      type: "postgresql" as const,
      status: "running" as const,
      serverId: "srv1",
      version: "14.5"
    },
    {
      id: "db2",
      name: "Cache",
      type: "redis" as const,
      status: "running" as const,
      serverId: "srv1",
      version: "6.2"
    }
  ];

  const credentials = [
    {
      id: "cred1",
      name: "Production Coolify",
      url: "https://coolify.example.com",
      apiKey: "••••••••••••••••",
      isAvailableToAgents: false
    }
  ];

  const handleConnect = (url: string, apiKey: string) => {
    console.log("Connecting to Coolify instance:", url);
    // In a real app, this would make an API call to validate the connection
    setIsConnected(true);
  };

  const toggleCredentialAccess = (credentialId: string) => {
    console.log("Toggling credential access for:", credentialId);
    // In a real app, this would update the credential's access status
  };

  return (
    <Card className="bg-dark-accent rounded-lg border border-white/10">
      <CardHeader>
        <CardTitle className="text-white font-medium flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mr-2 text-blue-400"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 9v6" />
            <path d="M8 12h8" />
          </svg>
          Coolify Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <ConnectionForm onConnect={handleConnect} />
        ) : (
          <>
            <Tabs defaultValue="servers" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-dark border border-white/10 mb-4">
                <TabsTrigger value="servers" className="data-[state=active]:bg-purple data-[state=active]:text-white">
                  <Server className="w-4 h-4 mr-1" />
                  Servers
                </TabsTrigger>
                <TabsTrigger value="applications" className="data-[state=active]:bg-purple data-[state=active]:text-white">
                  <GitBranch className="w-4 h-4 mr-1" />
                  Applications
                </TabsTrigger>
                <TabsTrigger value="databases" className="data-[state=active]:bg-purple data-[state=active]:text-white">
                  <Database className="w-4 h-4 mr-1" />
                  Databases
                </TabsTrigger>
                <TabsTrigger value="credentials" className="data-[state=active]:bg-purple data-[state=active]:text-white">
                  <Key className="w-4 h-4 mr-1" />
                  Credentials
                </TabsTrigger>
              </TabsList>

              <TabsContent value="servers" className="mt-0">
                <ServerList servers={servers} />
              </TabsContent>

              <TabsContent value="applications" className="mt-0">
                <ApplicationList applications={applications} servers={servers} />
              </TabsContent>

              <TabsContent value="databases" className="mt-0">
                <DatabaseList databases={databases} servers={servers} />
              </TabsContent>

              <TabsContent value="credentials" className="mt-0">
                <CredentialList 
                  credentials={credentials} 
                  onToggle={toggleCredentialAccess} 
                  isRefreshing={false}
                />
              </TabsContent>
            </Tabs>
            <CoolifyFooter />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CoolifyIntegration;
