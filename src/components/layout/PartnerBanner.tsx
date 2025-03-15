
import React from 'react';
import { cn } from '@/lib/utils';

interface PartnerProps {
  name: string;
  icon: string; // This should be a component reference in a real app
}

const partners: PartnerProps[] = [
  { name: 'Spotify', icon: 'spotify' },
  { name: 'Dropbox', icon: 'dropbox' },
  { name: 'Tinder', icon: 'tinder' },
  { name: 'Slack', icon: 'slack' },
  { name: 'Zoom', icon: 'zoom' },
  { name: 'Shopify', icon: 'shopify' }
];

const PartnerIcon: React.FC<{ name: string }> = ({ name }) => {
  const iconClasses = "w-full h-8 md:h-10 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300";
  
  // For this demo, we'll use simple text as placeholder, in a real app we would use actual SVG icons
  return (
    <div className={cn(iconClasses, "flex items-center justify-center text-gray-400")}>
      {name}
    </div>
  );
};

interface PartnerBannerProps {
  className?: string;
}

const PartnerBanner: React.FC<PartnerBannerProps> = ({ className }) => {
  return (
    <div className={cn("w-full py-8 border-y border-white/10 bg-dark-accent", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              <PartnerIcon name={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerBanner;
