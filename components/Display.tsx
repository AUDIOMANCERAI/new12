import React from 'react';
import { Loader2 } from 'lucide-react';

interface DisplayProps {
  kitName: string;
  bpm: number;
  description: string;
  isLoading: boolean;
  message?: string;
}

export const Display: React.FC<DisplayProps> = ({ kitName, bpm, description, isLoading, message }) => {
  return (
    <div className="bg-mpc-screen p-4 rounded border-[3px] border-gray-700 shadow-[0_0_15px_rgba(0,243,255,0.1),inset_0_0_20px_rgba(0,0,0,1)] font-mono text-mpc-screenText h-32 flex flex-col justify-between relative overflow-hidden group">
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10"></div>
        
        {/* CRT Flicker */}
        <div className="absolute inset-0 bg-white/5 opacity-10 animate-pulse pointer-events-none"></div>

        <div className="flex justify-between items-start z-20 relative">
          <div>
            <h2 className="text-xl font-black tracking-widest uppercase drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">
                {isLoading ? "INITIALIZING..." : kitName}
            </h2>
            <p className="text-xs font-bold text-mpc-primary/70 mt-1 truncate max-w-[200px] uppercase tracking-wide">
                {description}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black block text-mpc-accent tracking-widest mb-1">BPM</span>
            <span className="text-3xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] tracking-tighter">{bpm}</span>
          </div>
        </div>

        <div className="flex justify-between items-end z-20 relative border-t-2 border-mpc-primary/20 pt-2">
            <div className="text-xs font-bold uppercase tracking-widest text-mpc-warning animate-pulse">
                {message || "SYSTEM READY"}
            </div>
             {isLoading && <Loader2 className="animate-spin h-5 w-5 text-mpc-accent" />}
        </div>
    </div>
  );
};