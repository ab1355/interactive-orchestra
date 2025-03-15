
import React from 'react';
import { Trash2 } from 'lucide-react';
import { FileWithPath } from './types';

interface FileUploadListProps {
  files: FileWithPath[];
  onRemoveFile: (index: number) => void;
}

const FileUploadList: React.FC<FileUploadListProps> = ({ files, onRemoveFile }) => {
  if (files.length === 0) return null;

  return (
    <div className="mb-4 p-2 bg-dark-accent rounded-lg border border-white/10">
      <div className="text-xs font-medium mb-2">Uploaded Files:</div>
      <div className="max-h-24 overflow-y-auto">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between py-1 px-2 text-sm">
            <div className="truncate flex-1">
              {file.webkitRelativePath ? file.webkitRelativePath : file.name}
            </div>
            <button 
              onClick={() => onRemoveFile(index)}
              className="ml-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadList;
