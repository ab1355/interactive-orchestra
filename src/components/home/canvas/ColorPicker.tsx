
import React from 'react';

interface ColorPickerProps {
  activeColor: string;
  setActiveColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ activeColor, setActiveColor }) => {
  const colorOptions = ['#ffffff', '#ff5555', '#55ff55', '#5555ff', '#ffff55', '#ff55ff', '#55ffff'];
  
  return (
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
  );
};

export default ColorPicker;
