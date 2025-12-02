import React from 'react';
import { STEPS_PER_BAR } from '../constants';

interface SequencerProps {
  grid: boolean[][]; // This is a slice of the full grid
  currentStep: number; // -1 if not in this bar, else 0-15
  onToggle: (row: number, step: number) => void;
  padColors: string[];
}

export const Sequencer: React.FC<SequencerProps> = ({ grid, currentStep, onToggle, padColors }) => {
  return (
    <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
      <div className="min-w-[600px] w-full grid gap-y-[2px] bg-black/80 p-2 rounded border-2 border-gray-700 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] relative backdrop-blur-sm">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-20"></div>

        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-[2px] h-9 relative z-10">
             {/* Row Label (mobile only usually, but good for context) */}
             <div 
                className="w-1.5 absolute left-[-6px] top-0 bottom-0 rounded-l-sm" 
                style={{ backgroundColor: padColors[rowIndex], boxShadow: `0 0 5px ${padColors[rowIndex]}` }}
             />

            {row.map((isActive, stepIndex) => {
              const isCurrent = stepIndex === currentStep;
              const isBeat = stepIndex % 4 === 0;
              
              return (
                <button
                  key={stepIndex}
                  onClick={() => onToggle(rowIndex, stepIndex)}
                  className={`
                    flex-1 h-full rounded-sm transition-all duration-100 relative group
                    ${isActive 
                        ? 'opacity-100 shadow-[0_0_10px_currentColor]' 
                        : 'bg-mpc-surface hover:bg-white/10 opacity-60'}
                    ${isCurrent ? 'brightness-150 z-20 scale-105' : ''}
                  `}
                  style={{
                    backgroundColor: isActive ? padColors[rowIndex] : undefined,
                    color: padColors[rowIndex],
                    border: isCurrent ? '2px solid white' : (isBeat ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.02)')
                  }}
                >
                    {isCurrent && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    )}
                </button>
              );
            })}
          </div>
        ))}
        
        {/* Playhead Indicator (Bar at top) */}
        {currentStep !== -1 && (
            <div 
                className="absolute top-0 bottom-0 w-[2px] bg-white z-30 pointer-events-none shadow-[0_0_15px_white]"
                style={{
                    left: `calc(${(currentStep / STEPS_PER_BAR) * 100}% + 8px)` // Approximation for visual playhead
                }}
            />
        )}
      </div>
      
      {/* Step Indicators */}
      <div className="flex justify-between px-2 mt-1 min-w-[600px]">
        {Array.from({ length: STEPS_PER_BAR }).map((_, i) => (
             <div key={i} className={`text-[10px] font-mono ${currentStep === i ? 'text-mpc-primary font-black shadow-glow' : 'text-gray-500 font-bold'}`}>
                 {i % 4 === 0 ? (i / 4 + 1) : '.'}
             </div>
        ))}
      </div>
    </div>
  );
};