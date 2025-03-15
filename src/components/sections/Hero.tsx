
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div className={cn("relative py-20 overflow-hidden", className)}>
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white animate-fade-in">
            Create powerful AI agent workflows with just a few lines of code
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Enable complex task automation and decision-making processes with our intuitive AI agent platform.
          </p>
          <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button className="flex items-center gap-2 bg-purple hover:bg-purple-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-button button-glow">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-gray-400">Available for all major programming languages</p>
          </div>
        </div>
      </div>
      
      {/* Abstract 3D boxes */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none select-none">
        <div className="relative w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple/20 rounded-lg transform rotate-12 animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-pink/20 rounded-lg transform -rotate-12 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/6 w-40 h-40 bg-purple/10 rounded-lg transform rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-purple/10 via-transparent to-transparent opacity-40"></div>
    </div>
  );
};

export default Hero;
