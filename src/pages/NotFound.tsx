
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center max-w-md px-6">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-purple/20 rounded-2xl transform rotate-12 animate-pulse-light"></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">404</div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white">Page not found</h1>
        <p className="text-gray-300 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 bg-purple/10 hover:bg-purple/20 text-purple hover:text-purple-light px-6 py-3 rounded-lg font-medium transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
