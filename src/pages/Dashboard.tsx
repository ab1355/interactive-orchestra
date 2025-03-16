
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Agent Framework Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Tool Integration"
          description="Connect and manage external tools and APIs"
          link="/tool-integration"
        />
        <DashboardCard 
          title="Agent Behavior System"
          description="Configure and manage agent behavior parameters"
          link="/agent-behavior-system"
        />
        <DashboardCard 
          title="Customizable Agent Behavior"
          description="Fine-tune how agents respond and make decisions"
          link="/customizable-agent-behavior"
        />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, link }) => {
  return (
    <Link to={link} className="block">
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4 text-blue-600 font-medium">
          Explore →
        </div>
      </div>
    </Link>
  );
};

export default Dashboard;
