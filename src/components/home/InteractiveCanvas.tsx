import React, { useState, useRef, useEffect } from 'react';
import { Pen, Move, Square, Circle, Trash2, Download, ZoomIn, ZoomOut, MousePointer } from 'lucide-react';
import { CanvasCollaborationContext } from './ChatInterface';

type Tool = 'select' | 'move' | 'pen' | 'square' | 'circle';
type DrawingElement = {
  id: string;
  type: 'path' | 'square' | 'circle';
  color: string;
  points?: { x: number; y: number }[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
};

const InteractiveCanvas: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [activeColor, setActiveColor] = useState('#ffffff');
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Setup canvas dimensions on mount
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setCanvasSize({ width, height });
    }
    
    // Resize handler
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setCanvasSize({ width, height });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Canvas collaboration methods
  const addElementToCanvas = (elementType: string, properties?: any) => {
    const centerX = canvasSize.width / (2 * scale);
    const centerY = canvasSize.height / (2 * scale);
    
    if (elementType === 'square') {
      const newElement: DrawingElement = {
        id: Date.now().toString(),
        type: 'square',
        x: centerX - 50,
        y: centerY - 50,
        width: 100,
        height: 100,
        color: properties?.color || activeColor
      };
      setElements(prev => [...prev, newElement]);
    } else if (elementType === 'circle') {
      const newElement: DrawingElement = {
        id: Date.now().toString(),
        type: 'circle',
        x: centerX,
        y: centerY,
        radius: 50,
        color: properties?.color || activeColor
      };
      setElements(prev => [...prev, newElement]);
    }
  };
  
  const clearCanvas = () => {
    setElements([]);
  };
  
  const updateCanvasZoom = (zoomLevel: number) => {
    setScale(zoomLevel);
  };

  // Redraw canvas when elements change
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.save();
    ctx.scale(scale, scale);
    
    elements.forEach(element => {
      ctx.strokeStyle = element.color;
      ctx.lineWidth = 2;
      
      if (element.type === 'path' && element.points) {
        ctx.beginPath();
        element.points.forEach((point, i) => {
          if (i === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      } else if (element.type === 'square' && element.x !== undefined && element.y !== undefined && element.width !== undefined && element.height !== undefined) {
        ctx.strokeRect(element.x, element.y, element.width, element.height);
      } else if (element.type === 'circle' && element.x !== undefined && element.y !== undefined && element.radius !== undefined) {
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    
    ctx.restore();
  }, [elements, canvasSize, scale]);
  
  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    setIsDrawing(true);
    
    if (activeTool === 'pen') {
      const newElement: DrawingElement = {
        id: Date.now().toString(),
        type: 'path',
        points: [{ x, y }],
        color: activeColor
      };
      
      setCurrentElement(newElement);
      setElements(prev => [...prev, newElement]);
    } else if (activeTool === 'square') {
      const newElement: DrawingElement = {
        id: Date.now().toString(),
        type: 'square',
        x,
        y,
        width: 0,
        height: 0,
        color: activeColor
      };
      
      setCurrentElement(newElement);
      setElements(prev => [...prev, newElement]);
    } else if (activeTool === 'circle') {
      const newElement: DrawingElement = {
        id: Date.now().toString(),
        type: 'circle',
        x,
        y,
        radius: 0,
        color: activeColor
      };
      
      setCurrentElement(newElement);
      setElements(prev => [...prev, newElement]);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentElement || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    if (activeTool === 'pen' && currentElement.type === 'path') {
      setElements(prevElements => 
        prevElements.map(el => {
          if (el.id === currentElement.id && el.points) {
            return {
              ...el,
              points: [...el.points, { x, y }]
            };
          }
          return el;
        })
      );
    } else if (activeTool === 'square' && currentElement.type === 'square') {
      setElements(prevElements => 
        prevElements.map(el => {
          if (el.id === currentElement.id && el.x !== undefined && el.y !== undefined) {
            return {
              ...el,
              width: x - el.x,
              height: y - el.y
            };
          }
          return el;
        })
      );
    } else if (activeTool === 'circle' && currentElement.type === 'circle') {
      setElements(prevElements => 
        prevElements.map(el => {
          if (el.id === currentElement.id && el.x !== undefined && el.y !== undefined) {
            const dx = x - el.x;
            const dy = y - el.y;
            const radius = Math.sqrt(dx * dx + dy * dy);
            
            return {
              ...el,
              radius
            };
          }
          return el;
        })
      );
    }
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
    setCurrentElement(null);
  };
  
  // Clear canvas
  const handleClear = () => {
    setElements([]);
  };
  
  // Zoom controls
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };
  
  // Download canvas as image
  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'canvas.png';
    a.click();
  };
  
  // Color options
  const colorOptions = ['#ffffff', '#ff5555', '#55ff55', '#5555ff', '#ffff55', '#ff55ff', '#55ffff'];
  
  return (
    <CanvasCollaborationContext.Provider value={{ addElementToCanvas, clearCanvas, updateCanvasZoom }}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Interactive Canvas</h2>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs">{Math.round(scale * 100)}%</span>
            <button
              onClick={handleZoomIn}
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
          
          <div className="flex bg-dark rounded overflow-hidden ml-2">
            {colorOptions.map(color => (
              <button
                key={color}
                onClick={() => setActiveColor(color)}
                className={`w-6 h-6 ${activeColor === color ? 'ring-2 ring-white' : ''}`}
                style={{ background: color }}
                title={color}
              />
            ))}
          </div>
          
          <div className="flex ml-auto">
            <button
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Clear Canvas"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
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
