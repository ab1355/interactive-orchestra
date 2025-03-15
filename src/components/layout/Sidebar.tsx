
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Code, Users, Wrench, Settings } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, text, isActive, onClick }) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer group",
        isActive 
          ? "bg-purple/10 text-purple"
          : "hover:bg-white/5 text-gray-300 hover:text-white"
      )}
      onClick={onClick}
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
  const [activeItem, setActiveItem] = useState<string>("Simple Agent Workflow");
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const sidebarItems = [
    { text: "Simple Agent Workflow", icon: Code },
    { text: "Multi-Agent Collaboration", icon: Users },
    { text: "Tool Integration", icon: Wrench },
    { text: "Customizable Agent Behavior", icon: Settings }
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
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple text-white">
          AI
        </div>
        {!collapsed && (
          <h1 className="text-lg font-semibold text-white tracking-tight animate-fade-in">
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
                  activeItem === item.text 
                    ? "bg-purple/10 text-purple"
                    : "hover:bg-white/5 text-gray-400"
                )}
                onClick={() => setActiveItem(item.text)}
                title={item.text}
              >
                <item.icon className="w-5 h-5" />
              </div>
            ) : (
              <SidebarItem 
                icon={item.icon} 
                text={item.text} 
                isActive={activeItem === item.text}
                onClick={() => setActiveItem(item.text)}
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
