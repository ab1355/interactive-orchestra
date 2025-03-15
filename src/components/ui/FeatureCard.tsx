
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, className }) => {
  return (
    <div className={cn(
      "feature-card glass-card rounded-lg p-6 border border-white/10 transition-all duration-300",
      className
    )}>
      {icon && <div className="mb-4 text-purple">{icon}</div>}
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
