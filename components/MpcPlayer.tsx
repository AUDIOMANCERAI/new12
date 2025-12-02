import React, { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw, Wand2, StopCircle, Download, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { DEFAULT_KIT, PADS_COUNT, STEPS_PER_BAR, TOTAL_STEPS, BARS_TOTAL, PRESET_KITS } from '../constants';
import { Kit, PadConfig, SequencerGrid } from '../types';
import { audioEngine } from '../services/audioEngine';
import { generateKit } from '../services/geminiService';
import { Pad } from './Pad';
import { Sequencer } from './Sequencer';
import { Display } from './Display';

export const MpcPlayer: React.FC = () => {
  // --- State ---
  const [kit, setKit] = useState<Kit>(DEFAULT_KIT);
  const [bpm, setBpm] = useState<number>(DEFAULT_KIT.bpm);
  
  // Grid is now 8 x 384 (24 bars * 16 steps)
  // Lazy init to avoid heavy array creation on every render
  const [grid, setGrid] = useState<SequencerGrid>(() => 
    Array(PADS_COUNT).fill(null).map(() => Array(TOTAL_STEPS).fill(false))
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGlobalStep, setCurrentGlobalStep] = useState(0);
  const [currentBar, setCurrentBar] = useState(0); // 0 to 23
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [displayMessage, setDisplayMessage] = useState("SYSTEM READY");
  
  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudioURL, setRecordedAudioURL] = useState<string | null>(null);

  // Track visual triggers separately from grid state
  const [activePads, setActivePads] = useState<boolean[]>(new Array(PADS_COUNT).fill(false));

  // --- Refs for Sequencer Timing ---
  const nextNoteTimeRef = useRef<number>(0);
  const currentStepRef = useRef<number>(0);
  const timerIDRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const recordingTimerRef = useRef<number | null>(null);
  
  // Sync refs with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Ref-based state access for scheduler loop
  const gridRef = useRef(grid);
  const kitRef = useRef(kit);
  const bpmRef = useRef(bpm);
  
  useEffect(() => { gridRef.current = grid; }, [grid]);
  useEffect(() => { kitRef.current = kit; }, [kit]);
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);

  // --- Scheduler Logic ---
  
  const schedulerLoop = () => {
      if (!isPlayingRef.current) return;
      
      const lookahead = 25.0; 
      const scheduleAheadTime = 0.1;

      while (nextNoteTimeRef.current < audioEngine.currentTime + scheduleAheadTime) {
          // Play logic
          const currentGrid = gridRef.current;
          const currentKit = kitRef.current;
          const step = currentStepRef.current;
          
          currentGrid.forEach((row, padIdx) => {
              if (row[step]) {
                  const pad = currentKit.pads.find(p => p.id === padIdx);
                  if (pad) {
                      audioEngine.playSound(pad.soundType, pad.params, nextNoteTimeRef.current);
                      const timeDelta = (nextNoteTimeRef.current - audioEngine.currentTime) * 1000;
                      setTimeout(() => triggerPadVisual(padIdx), Math.max(0, timeDelta));
                  }
              }
          });

          // Advance
          const secondsPerBeat = 60.0 / bpmRef.current;
          nextNoteTimeRef.current += 0.25 * secondsPerBeat;
          
          // Move to next step, wrap around TOTAL_STEPS
          const nextStep = (currentStepRef.current + 1) % TOTAL_STEPS;
          currentStepRef.current = nextStep;
          
          // Update UI
          const timeToUpdate = (nextNoteTimeRef.current - 0.25 * secondsPerBeat - audioEngine.currentTime) * 1000;
          setTimeout(() => {
              setCurrentGlobalStep(nextStep);
              // Auto-follow bar
              const newBar = Math.floor(nextStep / STEPS_PER_BAR);
              setCurrentBar(newBar);
          }, Math.max(0, timeToUpdate));
      }
      
      timerIDRef.current = window.setTimeout(schedulerLoop, lookahead);
  };

  // Re-trigger loop when playing state changes
  useEffect(() => {
      if (isPlaying) {
        audioEngine.init();
        nextNoteTimeRef.current = audioEngine.currentTime + 0.1;
        if (!isPlayingRef.current) {
             currentStepRef.current = 0;
             setCurrentGlobalStep(0);
             setCurrentBar(0);
        }
        schedulerLoop();
      } else {
        if (timerIDRef.current) clearTimeout(timerIDRef.current);
      }
      return () => { if (timerIDRef.current) clearTimeout(timerIDRef.current); };
  }, [isPlaying]);


  // --- Handlers ---

  const handlePadClick = (pad: PadConfig) => {
    audioEngine.playSound(pad.soundType, pad.params);
    triggerPadVisual(pad.id);
  };

  const triggerPadVisual = (id: number) => {
    setActivePads(prev => {
      const next = [...prev];
      next[id] = true;
      return next;
    });
    setTimeout(() => {
        setActivePads(prev => {
            const next = [...prev];
            next[id] = false;
            return next;
        });
    }, 100);
  };

  const toggleStep = (row: number, localStep: number) => {
    const globalStep = currentBar * STEPS_PER_BAR + localStep;
    const newGrid = [...grid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][globalStep] = !newGrid[row][globalStep];
    setGrid(newGrid);
  };

  const clearPattern = () => {
    if (confirm("Clear entire 24-bar sequence?")) {
        setGrid(Array(PADS_COUNT).fill(null).map(() => Array(TOTAL_STEPS).fill(false)));
        setDisplayMessage("MEMORY WIPED");
    }
  };

  const randomizePattern = () => {
    // Randomize only current bar
    const start = currentBar * STEPS_PER_BAR;
    const end = start + STEPS_PER_BAR;
    
    const newGrid = grid.map(row => {
        const newRow = [...row];
        for(let i=start; i<end; i++) {
            newRow[i] = Math.random() > 0.8;
        }
        return newRow;
    });
    // Ensure kick (row 0) is steady in this bar
    for(let i=start; i<end; i++) {
        newGrid[0][i] = (i % 4 === 0);
    }
    
    setGrid(newGrid);
    setDisplayMessage(`BAR ${currentBar + 1} RANDOMIZED`);
  };

  const handleKitSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedName = e.target.value;
      const selectedKit = PRESET_KITS.find(k => k.name === selectedName);
      if (selectedKit) {
          setKit(selectedKit);
          setBpm(selectedKit.bpm);
          setDisplayMessage(`LOADED: ${selectedKit.name.toUpperCase()}`);
      }
  };

  // --- Gemini Generation ---
  const handleGenerate = async () => {
    const hasKey = typeof process !== "undefined" && process.env && process.env.API_KEY;
    if (!hasKey) {
        alert("Please provide an API Key in process.env.API_KEY");
        return;
    }
    if (!promptText.trim()) {
        setDisplayMessage("ENTER PROMPT DATA...");
        return;
    }

    setIsGenerating(true);
    setIsPlaying(false);
    setDisplayMessage("UPLOADING REQUEST...");

    try {
        const newKit = await generateKit(promptText);
        setKit(newKit);
        setBpm(newKit.bpm);
        
        // If the AI returned a pattern, expand it to fill the 24 bars
        if (newKit.pattern && newKit.pattern.length === PADS_COUNT) {
            const patternLength = newKit.pattern[0].length;
            const newGrid = grid.map((_, rowIndex) => {
                const rowPattern = newKit.pattern![rowIndex];
                const fullRow = new Array(TOTAL_STEPS).fill(false);
                for (let i = 0; i < TOTAL_STEPS; i++) {
                    // Loop the AI pattern (usually 64 steps / 4 bars)
                    fullRow[i] = rowPattern[i % patternLength];
                }
                return fullRow;
            });
            setGrid(newGrid);
            setDisplayMessage("KIT & SEQUENCE RECEIVED");
        } else {
             setDisplayMessage("KIT RECEIVED");
        }

    } catch (error) {
        console.error(error);
        setDisplayMessage("DATA CORRUPTION ERROR");
    } finally {
        setIsGenerating(false);
    }
  };

  // --- Recording ---
  const toggleRecording = () => {
      if (isRecording) {
          stopRecording();
      } else {
          startRecording();
      }
  };

  const startRecording = () => {
      if (!audioEngine.isRecordingSupported) {
          setDisplayMessage("REC MODULE MISSING");
          return;
      }
      setIsRecording(true);
      setRecordingTime(0);
      setRecordedAudioURL(null);
      audioEngine.startRecording();
      
      // Auto stop after 60s
      recordingTimerRef.current = window.setInterval(() => {
          setRecordingTime(prev => {
              if (prev >= 60) {
                  stopRecording();
                  return 60;
              }
              return prev + 1;
          });
      }, 1000);
  };

  const stopRecording = async () => {
      if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
      }
      setIsRecording(false);
      const blob = await audioEngine.stopRecording();
      const url = URL.createObjectURL(blob);
      setRecordedAudioURL(url);
      setDisplayMessage("AUDIO BUFFER SAVED");
  };

  // --- Helpers ---
  const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Slice grid for current bar view
  const currentGridSlice = grid.map(row => 
    row.slice(currentBar * STEPS_PER_BAR, (currentBar + 1) * STEPS_PER_BAR)
  );

  // Calculate if the cursor is visible in the current bar view
  const localStepIndicator = (Math.floor(currentGlobalStep / STEPS_PER_BAR) === currentBar) 
    ? (currentGlobalStep % STEPS_PER_BAR) 
    : -1;

  return (
      <div className="max-w-5xl w-full mx-auto bg-mpc-panel rounded border-[3px] border-mpc-border shadow-panel overflow-hidden relative">
        
        {/* Glowing Borders */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mpc-primary to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mpc-accent to-transparent opacity-50"></div>

        {/* Top Metallic Bar */}
        <div className="h-16 bg-[#111] border-b-2 border-mpc-border flex items-center px-6 justify-between relative z-10">
            <div className="flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-mpc-danger shadow-neon-pink animate-pulse"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-mpc-warning shadow-glow"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-mpc-success shadow-neon-green"></div>
            </div>
            <div className="flex items-center gap-6">
                 <select 
                    value={kit.name}
                    onChange={handleKitSelect}
                    className="bg-black border-2 border-mpc-primary/30 text-xs font-bold text-mpc-primary px-3 py-1.5 rounded-sm focus:outline-none focus:border-mpc-primary focus:shadow-neon-cyan uppercase tracking-wider font-mono cursor-pointer hover:bg-mpc-surfaceHighlight transition-colors"
                 >
                     {PRESET_KITS.map(k => (
                         <option key={k.name} value={k.name}>{k.name}</option>
                     ))}
                     {!PRESET_KITS.some(k => k.name === kit.name) && (
                         <option value={kit.name}>{kit.name}</option>
                     )}
                 </select>
                 <div className="hidden md:block text-white font-black text-xl tracking-[0.2em] uppercase italic" style={{textShadow: "0 0 10px rgba(255,255,255,0.5)"}}>
                    CYBER<span className="text-mpc-accent">MPC</span>
                 </div>
            </div>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Background Grid */}
             <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none -z-10"></div>
            
            {/* Left Column: Controls & Display */}
            <div className="lg:col-span-5 flex flex-col gap-6">
                <Display 
                    kitName={kit.name}
                    description={kit.description}
                    bpm={bpm}
                    isLoading={isGenerating}
                    message={isRecording ? `REC ${formatTime(recordingTime)}` : displayMessage}
                />

                {/* AI Prompt Area */}
                <div className="bg-mpc-surface p-5 rounded border-2 border-mpc-border shadow-lg">
                    <label className="text-[10px] font-black text-mpc-primary mb-2 block uppercase tracking-widest">Neural Kit Generation</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                            placeholder="INPUT STYLE DATA..."
                            className="flex-1 bg-black border-2 border-gray-700 rounded-sm px-3 py-2 text-xs font-bold focus:outline-none focus:border-mpc-accent focus:shadow-neon-pink text-white placeholder-gray-600 font-mono uppercase tracking-wide"
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        />
                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="bg-mpc-accent hover:bg-white hover:text-black disabled:opacity-50 text-white p-2 rounded-sm transition-all shadow-neon-pink border-2 border-transparent"
                        >
                            <Wand2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Transport Controls */}
                <div className="bg-mpc-surface p-6 rounded border-2 border-mpc-border flex flex-col gap-6 shadow-lg relative overflow-hidden">
                     {/* Decorative circuit line */}
                     <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-mpc-border rounded-tr-3xl pointer-events-none opacity-50"></div>

                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className={`
                                    w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg border-[3px]
                                    ${isPlaying 
                                        ? 'bg-mpc-success/20 border-mpc-success text-mpc-success shadow-neon-green' 
                                        : 'bg-black border-gray-600 text-gray-500 hover:border-white hover:text-white'}
                                `}
                            >
                                {isPlaying ? <StopCircle size={32} strokeWidth={2.5} /> : <Play size={32} strokeWidth={2.5} className="ml-1" />}
                            </button>
                            
                            <button
                                onClick={toggleRecording}
                                disabled={!audioEngine.isRecordingSupported}
                                className={`
                                    w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg border-[3px]
                                    ${!audioEngine.isRecordingSupported ? 'bg-black opacity-30 cursor-not-allowed border-gray-800' : 
                                      isRecording 
                                        ? 'bg-mpc-danger/20 border-mpc-danger text-mpc-danger animate-blink-red shadow-neon-pink' 
                                        : 'bg-black border-gray-600 text-gray-500 hover:border-mpc-danger hover:text-mpc-danger'}
                                `}
                                title={audioEngine.isRecordingSupported ? "Record (Max 1 min)" : "Recording not supported"}
                            >
                                <div className={`w-4 h-4 rounded-full bg-current ${!isRecording && 'opacity-50'}`} />
                            </button>

                            <div className="flex flex-col ml-2">
                                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Clock Speed</label>
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="range" 
                                        min="60" 
                                        max="200" 
                                        value={bpm}
                                        onChange={(e) => setBpm(Number(e.target.value))}
                                        className="w-24 h-1 bg-mpc-border rounded-lg appearance-none cursor-pointer accent-mpc-primary hover:accent-white transition-colors"
                                    />
                                    <span className="text-xl font-black font-mono text-mpc-primary tracking-tighter">{bpm}</span>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4 mt-2">
                         <button onClick={clearPattern} className="flex items-center justify-center gap-2 bg-black border-2 border-gray-700 hover:border-mpc-danger hover:text-mpc-danger p-2.5 rounded-sm text-[10px] font-black uppercase transition-all tracking-wider hover:shadow-neon-pink">
                             <Trash2 size={14} /> Purge Memory
                         </button>
                         <button onClick={randomizePattern} className="flex items-center justify-center gap-2 bg-black border-2 border-gray-700 hover:border-mpc-primary hover:text-mpc-primary p-2.5 rounded-sm text-[10px] font-black uppercase transition-all tracking-wider hover:shadow-neon-cyan">
                             <RefreshCw size={14} /> Randomize
                         </button>
                     </div>

                     {recordedAudioURL && (
                         <div className="bg-mpc-primary/10 p-3 rounded border-2 border-mpc-primary/30 flex flex-col gap-2 mt-2">
                             <div className="flex justify-between items-center">
                                <span className="text-[10px] text-mpc-primary font-black uppercase tracking-widest">Audio Buffer Ready</span>
                                <a 
                                    href={recordedAudioURL} 
                                    download="cyber-mpc-rec.wav" 
                                    className="flex items-center gap-1 bg-mpc-primary text-black hover:bg-white text-[10px] font-bold px-3 py-1 rounded-sm transition-colors uppercase"
                                >
                                    <Download size={12} /> Save .WAV
                                </a>
                             </div>
                             <audio controls src={recordedAudioURL} className="h-8 w-full opacity-70 hover:opacity-100 transition-opacity" />
                         </div>
                     )}
                </div>
            </div>

            {/* Right Column: Pads & Sequencer */}
            <div className="lg:col-span-7 flex flex-col gap-8">
                
                {/* Pads Grid */}
                <div className="bg-mpc-surface p-6 rounded border-2 border-mpc-border shadow-xl relative backdrop-blur-md">
                    <div className="absolute top-3 left-4 text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-mpc-success rounded-full animate-pulse shadow-neon-green"></div>
                        Trigger Matrix
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {kit.pads.map((pad) => (
                            <Pad 
                                key={pad.id} 
                                pad={pad} 
                                trigger={activePads[pad.id]} 
                                onClick={handlePadClick} 
                            />
                        ))}
                    </div>
                </div>

                {/* Sequencer */}
                <div className="flex-1 bg-mpc-surface p-5 rounded border-2 border-mpc-border relative shadow-lg">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4 w-full justify-between">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-mpc-primary rounded-full animate-pulse shadow-neon-cyan"></div>
                                Sequence Data
                            </span>
                            <div className="flex items-center gap-1 bg-black border-2 border-mpc-border rounded px-2 py-1">
                                <button 
                                    onClick={() => setCurrentBar(Math.max(0, currentBar - 1))}
                                    disabled={currentBar === 0}
                                    className="text-gray-500 hover:text-mpc-primary disabled:opacity-20 transition-colors p-1"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <span className="text-[10px] font-mono font-black w-24 text-center text-mpc-primary">
                                    SECT {currentBar + 1} <span className="text-gray-600">/ {BARS_TOTAL}</span>
                                </span>
                                <button 
                                    onClick={() => setCurrentBar(Math.min(BARS_TOTAL - 1, currentBar + 1))}
                                    disabled={currentBar === BARS_TOTAL - 1}
                                    className="text-gray-500 hover:text-mpc-primary disabled:opacity-20 transition-colors p-1"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                     </div>
                     <Sequencer 
                        grid={currentGridSlice} 
                        currentStep={localStepIndicator} 
                        onToggle={toggleStep}
                        padColors={kit.pads.map(p => p.color)} 
                     />
                </div>
            </div>
        </div>
        
        {/* Footer info */}
        <div className="absolute bottom-3 right-6 text-[9px] text-gray-600 font-mono tracking-widest uppercase font-bold">
            System v2.0 // Powered by Gemini Neural Core
        </div>
      </div>
  );
};