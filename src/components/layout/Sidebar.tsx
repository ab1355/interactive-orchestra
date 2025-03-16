import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Settings, MessageSquare, Lightbulb, Target, TrendingUp, Brain } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const links = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      description: 'Overview of all systems'
    },
    {
      name: 'Enhanced Chat',
      href: '/enhanced-chat',
      icon: MessageSquare,
      description: 'AI-powered chat interface'
    },
    {
      name: 'Tool Integration',
      href: '/tool-integration',
      icon: Settings,
      description: 'Manage external tool integrations'
    },
    {
      name: 'Customizable Agent Behavior',
      href: '/customizable-agent-behavior',
      icon: Settings,
      description: 'Configure agent personalities and responses'
    },
    {
      name: 'Agent Behavior System',
      href: '/agent-behavior-system',
      icon: Settings,
      description: 'Advanced agent behavior customization'
    },
    {
      name: 'Discover System',
      href: '/discover-system',
      icon: Lightbulb,
      description: 'Explore insights and discover new patterns'
    },
    {
      name: 'Space System',
      href: '/space-system',
      icon: Target,
      description: 'Organize and visualize your work in spatial environments'
    },
    {
      name: 'Flow System',
      href: '/flow-system',
      icon: TrendingUp,
      description: 'Optimize processes and workflows for maximum efficiency'
    },
    {
      name: 'Autonomous Agent System',
      href: '/autonomous-agent-system',
      icon: Brain,
      description: 'Autonomous agent execution and coordination'
    },
  ];

  return (
    <aside className="w-64 bg-dark-accent border-r border-dark-200 h-full flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white">AI Agent Framework</h2>
        <p className="text-sm text-gray-400 mt-1">Navigation</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark hover:text-white transition-colors ${
                    isActive
                      ? 'bg-purple/20 text-white font-medium'
                      : ''
                  }`
                }
              >
                <link.icon className="w-4 h-4 mr-2" />
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-dark-200">
        <p className="text-xs text-gray-500">
          AI Agent Framework <br />
          Version 0.1.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
