
import React from 'react';
import { MousePointer, Move, Pen, Square, Circle, Trash2, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { Tool } from './types';

interface CanvasToolbarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  onClear: () => void;
  onDownload: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  scale: number;
}

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  activeTool,
  setActiveTool,
  onClear,
  onDownload,
  onZoomIn,
  onZoomOut,
  scale
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Interactive Canvas</h2>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onZoomOut}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs">{Math.round(scale * 100)}%</span>
          <button
            onClick={onZoomIn}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center mb-4 gap-2">
        <div className="flex bg-dark rounded overflow-hidden">
          <button
            onClick={() => setActiveTool('select')}
            className={`p-2 ${activeTool === 'select' ? 'bg-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-colors`}
            title="Select"
          >
            <MousePointer className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('move')}
            className={`p-2 ${activeTool === 'move' ? 'bg-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-colors`}
            title="Move"
          >
            <Move className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('pen')}
            className={`p-2 ${activeTool === 'pen' ? 'bg-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-colors`}
            title="Pen"
          >
            <Pen className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('square')}
            className={`p-2 ${activeTool === 'square' ? 'bg-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-colors`}
            title="Square"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool('circle')}
            className={`p-2 ${activeTool === 'circle' ? 'bg-purple text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'} transition-colors`}
            title="Circle"
          >
            <Circle className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex ml-auto">
          <button
            onClick={onClear}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Clear Canvas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDownload}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CanvasToolbar;
