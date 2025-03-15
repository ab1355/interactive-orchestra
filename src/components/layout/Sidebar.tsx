
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMobile } from '@/hooks/use-mobile';
import { 
  BrainCircuit, 
  Users, 
  Wrench, 
  Settings, 
  Home, 
  Menu, 
  X,
  UserCheck,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useMobile();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleFeedbackClick = () => {
    toast({
      title: "Feedback",
      description: "Thanks for your interest! The feedback feature is coming soon.",
    });
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/simple-agent-workflow', label: 'Simple Agent', icon: <BrainCircuit className="w-5 h-5" /> },
    { path: '/multi-agent-collaboration', label: 'Multi-Agent', icon: <Users className="w-5 h-5" /> },
    { path: '/tool-integration', label: 'Tool Integration', icon: <Wrench className="w-5 h-5" /> },
    { path: '/customizable-agent-behavior', label: 'Agent Behavior', icon: <Settings className="w-5 h-5" /> },
    { path: '/elevate-system', label: 'ELEVATE System', icon: <UserCheck className="w-5 h-5" /> },
    { path: '/discover-system', label: 'DISCOVER System', icon: <Lightbulb className="w-5 h-5" /> },
  ];

  return (
    <>
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-dark z-20 flex items-center justify-between p-4 border-b border-gray-800">
          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="text-white font-semibold">AI Agent Framework</span>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>
      )}

      <div 
        className={cn(
          "bg-dark text-white w-64 flex-shrink-0 border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out",
          isMobile ? "fixed inset-y-0 left-0 z-10 pt-16" : "h-screen",
          isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        {!isMobile && (
          <div className="p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold">AI Agent Framework</h1>
            <p className="text-xs text-gray-400 mt-1">Development Platform</p>
          </div>
        )}
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive 
                      ? "bg-purple text-white" 
                      : "text-gray-300 hover:bg-gray-800"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-white/10"
            onClick={handleFeedbackClick}
          >
            Send Feedback
          </Button>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>AI Agent Framework</p>
            <p>Version 0.1.0</p>
          </div>
        </div>
      </div>
      
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
