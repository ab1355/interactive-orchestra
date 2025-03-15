
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Code, Users, Wrench, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ElementType;
  text: string;
  isActive?: boolean;
  path: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, text, isActive, path, onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(path);
    if (onClick) onClick();
  };
  
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer group",
        isActive 
          ? "bg-purple/10 text-purple"
          : "hover:bg-white/5 text-gray-300 hover:text-white"
      )}
      onClick={handleClick}
    >
      <Icon className={cn(
        "w-5 h-5 transition-all duration-200",
        isActive ? "text-purple" : "text-gray-400 group-hover:text-white"
      )} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const sidebarItems = [
    { text: "Simple Agent Workflow", icon: Code, path: "/simple-agent-workflow" },
    { text: "Multi-Agent Collaboration", icon: Users, path: "/multi-agent-collaboration" },
    { text: "Tool Integration", icon: Wrench, path: "/tool-integration" },
    { text: "Customizable Agent Behavior", icon: Settings, path: "/customizable-agent-behavior" }
  ];

  return (
    <div className={cn(
      "relative flex flex-col h-screen border-r border-white/10 bg-dark-accent transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="absolute top-4 -right-3 z-10">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-6 h-6 rounded-full bg-purple shadow-lg text-white transition-all hover:bg-purple-dark"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="flex items-center gap-3 py-6 px-4 border-b border-white/10">
        <div 
          className="flex items-center justify-center w-8 h-8 rounded-md bg-purple text-white cursor-pointer"
          onClick={() => navigate('/')}
        >
          AI
        </div>
        {!collapsed && (
          <h1 
            className="text-lg font-semibold text-white tracking-tight animate-fade-in cursor-pointer"
            onClick={() => navigate('/')}
          >
            Agent Platform
          </h1>
        )}
      </div>
      
      <div className="flex-1 py-6 px-2 overflow-y-auto">
        {sidebarItems.map((item) => (
          <div key={item.text} className={collapsed ? "mb-4" : "mb-1"}>
            {collapsed ? (
              <div 
                className={cn(
                  "flex items-center justify-center p-2 mx-auto rounded-lg transition-all duration-200 cursor-pointer",
                  location.pathname === item.path 
                    ? "bg-purple/10 text-purple"
                    : "hover:bg-white/5 text-gray-400"
                )}
                onClick={() => navigate(item.path)}
                title={item.text}
              >
                <item.icon className="w-5 h-5" />
              </div>
            ) : (
              <SidebarItem 
                icon={item.icon} 
                text={item.text} 
                path={item.path}
                isActive={location.pathname === item.path}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-white/10">
        {!collapsed && (
          <div className="glass-card rounded-lg p-3 text-sm text-gray-300">
            <p className="mb-2 font-medium">Need help?</p>
            <p className="opacity-80 text-xs">Check our documentation or contact support for assistance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
