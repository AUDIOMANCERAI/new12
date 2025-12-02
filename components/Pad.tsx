import React, { useEffect, useState } from 'react';
import { PadConfig } from '../types';

interface PadProps {
  pad: PadConfig;
  trigger: boolean; // prop to programmatically trigger visuals
  onClick: (pad: PadConfig) => void;
}

export const Pad: React.FC<PadProps> = ({ pad, trigger, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      flash();
    }
  }, [trigger]);

  const flash = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 150);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent double firing on touch devices
    flash();
    onClick(pad);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      className={`
        relative w-full aspect-square rounded-sm select-none transition-all duration-75
        flex flex-col items-center justify-center
        group overflow-hidden border-[3px]
      `}
      style={{
        backgroundColor: isActive ? pad.color : 'rgba(10, 10, 12, 0.6)',
        borderColor: isActive ? '#fff' : pad.color,
        boxShadow: isActive 
          ? `0 0 30px ${pad.color}, inset 0 0 20px ${pad.color}, 0 0 15px white` 
          : `0 0 12px ${pad.color}, inset 0 0 5px ${pad.color}40`, // Permanent glow
        transform: isActive ? 'scale(0.98)' : 'scale(1)',
      }}
    >
      {/* Scanline texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
      
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none" />

      <span className={`
        relative z-10 font-bold text-sm md:text-xl uppercase tracking-widest font-mono
        transition-all duration-75
        ${isActive ? 'text-white' : 'text-gray-200'}
      `}
      style={{ 
        textShadow: isActive ? `0 0 15px white` : `0 0 10px ${pad.color}`
      }}
      >
        {pad.label}
      </span>
      
      <span className={`
        relative z-10 text-[10px] font-mono mt-1 opacity-80 text-white/70
      `}
      style={{ textShadow: `0 0 5px black` }}
      >
        PAD {pad.id + 1}
      </span>
      
      {/* Tech Markers */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 shadow-[0_0_5px_white]" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/60 shadow-[0_0_5px_white]" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/60 shadow-[0_0_5px_white]" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white/60 shadow-[0_0_5px_white]" />
    </button>
  );
};