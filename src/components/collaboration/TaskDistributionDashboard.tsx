
import React from 'react';
import { BarChart } from 'lucide-react';

const TaskDistributionDashboard: React.FC = () => {
  return (
    <div className="bg-dark-accent rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium flex items-center">
          <BarChart className="w-4 h-4 mr-2" />
          Task Distribution
        </h3>
        <select className="bg-dark border border-white/10 rounded p-1 text-sm text-white">
          <option>Last 24 Hours</option>
          <option>Last Week</option>
          <option>Last Month</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-dark p-3 rounded-lg">
          <p className="text-gray-400 text-sm">Total Tasks</p>
          <p className="text-white text-xl font-semibold">24</p>
        </div>
        <div className="bg-dark p-3 rounded-lg">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-green-500 text-xl font-semibold">18</p>
        </div>
        <div className="bg-dark p-3 rounded-lg">
          <p className="text-gray-400 text-sm">In Progress</p>
          <p className="text-purple text-xl font-semibold">4</p>
        </div>
        <div className="bg-dark p-3 rounded-lg">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-yellow-500 text-xl font-semibold">2</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Research Agent</span>
          <span className="text-white">8 tasks</span>
        </div>
        <div className="w-full bg-dark rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '33%' }}></div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Analysis Agent</span>
          <span className="text-white">6 tasks</span>
        </div>
        <div className="w-full bg-dark rounded-full h-2">
          <div className="bg-purple h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Writer Agent</span>
          <span className="text-white">5 tasks</span>
        </div>
        <div className="w-full bg-dark rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '21%' }}></div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">QA Agent</span>
          <span className="text-white">5 tasks</span>
        </div>
        <div className="w-full bg-dark rounded-full h-2">
          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '21%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TaskDistributionDashboard;
