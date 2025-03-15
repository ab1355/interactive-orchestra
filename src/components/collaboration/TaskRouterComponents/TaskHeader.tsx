
import React from 'react';

const TaskHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center text-sm mb-2">
      <span className="text-gray-400">Task</span>
      <div className="flex gap-4">
        <span className="text-gray-400 w-24 text-center">Complexity</span>
        <span className="text-gray-400 w-24 text-center">Priority</span>
        <span className="text-gray-400 w-24 text-center">Status</span>
        <span className="text-gray-400 w-32 text-center">Assigned Agent</span>
        <span className="text-gray-400 w-24 text-center">Actions</span>
      </div>
    </div>
  );
};

export default TaskHeader;
