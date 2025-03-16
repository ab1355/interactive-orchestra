
import React from 'react';
import { Save, GitBranch, Trash } from 'lucide-react';

const VersionControl: React.FC = () => {
  const versions = [
    { id: 'v1.2', name: 'Improved Conciseness', date: '2 hours ago', current: true },
    { id: 'v1.1', name: 'Added Technical Details', date: '1 day ago', current: false },
    { id: 'v1.0', name: 'Initial Configuration', date: '3 days ago', current: false },
  ];

  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Version Control</h3>
        <button className="bg-purple hover:bg-purple/80 text-white py-1 px-3 rounded text-sm flex items-center">
          <Save className="w-3 h-3 mr-1" />
          Save Version
        </button>
      </div>
      
      <div className="space-y-3">
        {versions.map((version, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg border ${version.current ? 'border-purple bg-purple/10' : 'border-white/10 bg-dark'}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <GitBranch className="w-4 h-4 text-gray-400 mr-2" />
                <div>
                  <h4 className="text-white font-medium">{version.id}: {version.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">Created {version.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {version.current ? (
                  <span className="px-2 py-1 bg-purple/20 text-purple text-xs rounded">Current</span>
                ) : (
                  <>
                    <button className="text-sm text-purple hover:text-purple-light">
                      Restore
                    </button>
                    <button className="text-sm text-red-400 hover:text-red-300">
                      <Trash className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Auto-save every 10 minutes</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="relative w-9 h-5 bg-gray-600 peer-checked:bg-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default VersionControl;
