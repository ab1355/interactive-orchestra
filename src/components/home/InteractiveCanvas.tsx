
import React from 'react';
import { CanvasCollaborationContext } from './ChatInterface';
import CanvasToolbar from './canvas/CanvasToolbar';
import ColorPicker from './canvas/ColorPicker';
import { useCanvas } from './canvas/useCanvas';
import { Tool } from './canvas/types';

const InteractiveCanvas: React.FC = () => {
  const {
    activeTool,
    setActiveTool,
    activeColor,
    setActiveColor,
    scale,
    canvasSize,
    containerRef,
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    clearCanvas,
    handleDownload,
    handleZoomIn,
    handleZoomOut,
    addElementToCanvas,
    updateCanvasZoom
  } = useCanvas();
  
  // Enhanced context provider value with new tool and color setters
  const providerValue = {
    addElementToCanvas,
    clearCanvas,
    updateCanvasZoom,
    setCanvasTool: (tool: Tool) => setActiveTool(tool),
    setCanvasColor: (color: string) => setActiveColor(color)
  };
  
  return (
    <CanvasCollaborationContext.Provider value={providerValue}>
      <div className="h-full flex flex-col">
        <CanvasToolbar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          onClear={clearCanvas}
          onDownload={handleDownload}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          scale={scale}
        />
        
        <div className="flex items-center mb-4 gap-2">
          <ColorPicker activeColor={activeColor} setActiveColor={setActiveColor} />
        </div>
        
        <div 
          ref={containerRef}
          className="flex-1 bg-dark-accent rounded-lg border border-white/10 overflow-hidden relative"
        >
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="absolute inset-0 cursor-crosshair"
          />
        </div>
      </div>
    </CanvasCollaborationContext.Provider>
  );
};

export default InteractiveCanvas;
