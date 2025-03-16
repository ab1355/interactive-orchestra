
export type Tool = 'select' | 'move' | 'pen' | 'square' | 'circle';

export type DrawingElement = {
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
