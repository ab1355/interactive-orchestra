
import React from 'react';
import { Crown, ServerCog, Laptop, Users, Smartphone, ListChecks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CommandLayerProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}

const CommandLayer: React.FC<CommandLayerProps> = ({ title, icon, color, items }) => {
  const iconComponent = 
    color === 'blue' ? <ServerCog className="w-4 h-4" /> :
    color === 'green' ? <Users className="w-4 h-4" /> :
    <ListChecks className="w-4 h-4" />;
  
  const bgColorClass = 
    color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
    color === 'green' ? 'bg-green-500/20 text-green-400' :
    'bg-purple/20 text-purple';
  
  const borderClass = 
    color === 'blue' ? 'border-blue-500/20 shadow-blue-500/5' :
    color === 'green' ? 'border-green-500/20 shadow-green-500/5' :
    'border-purple/20 shadow-purple/5';
  
  return (
    <Card className={`bg-dark ${borderClass} shadow-lg`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ul className="space-y-3">
              {items.slice(0, Math.ceil(items.length / 2)).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${bgColorClass} rounded-full p-1 mt-0.5`}>
                    {iconComponent}
                  </span>
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <ul className="space-y-3">
              {items.slice(Math.ceil(items.length / 2)).map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${bgColorClass} rounded-full p-1 mt-0.5`}>
                    {iconComponent}
                  </span>
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandLayer;
