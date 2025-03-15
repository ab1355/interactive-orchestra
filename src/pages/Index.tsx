
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ManagerAgent from '@/components/sections/ManagerAgent';

const Index: React.FC = () => {
  // Animation states for elements
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-dark text-white overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <main className={`flex-1 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <ManagerAgent />
        </main>
      </div>
    </div>
  );
};

export default Index;
