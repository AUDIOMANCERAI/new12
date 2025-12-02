import { Kit, SoundType } from './types';

export const STEPS_PER_BAR = 16;
export const BARS_TOTAL = 24;
export const TOTAL_STEPS = STEPS_PER_BAR * BARS_TOTAL;
export const PADS_COUNT = 8;

export const DEFAULT_KIT: Kit = {
  name: "Neon 808",
  description: "Standard electronic drum kit",
  bpm: 120,
  pads: [
    { id: 0, label: "KICK", color: "#ff0055", soundType: SoundType.KICK, params: { frequency: 150, decay: 0.5, sweep: 100 } }, // Hot Pink
    { id: 1, label: "SNARE", color: "#00f3ff", soundType: SoundType.SNARE, params: { frequency: 200, decay: 0.2, noiseMix: 0.8, filterFreq: 3000 } }, // Cyan
    { id: 2, label: "CLAP", color: "#ffea00", soundType: SoundType.CLAP, params: { frequency: 800, decay: 0.15, noiseMix: 1, filterFreq: 1200 } }, // Yellow
    { id: 3, label: "CHAT", color: "#d600ff", soundType: SoundType.HIHAT, params: { frequency: 8000, decay: 0.05, noiseMix: 1, filterFreq: 8000 } }, // Purple
    { id: 4, label: "OHAT", color: "#9d4edd", soundType: SoundType.HIHAT, params: { frequency: 8000, decay: 0.2, noiseMix: 1, filterFreq: 7000 } }, // Light Purple
    { id: 5, label: "TOM L", color: "#00ff9d", soundType: SoundType.SYNTH, params: { frequency: 100, decay: 0.3, waveform: 'sine' } }, // Green
    { id: 6, label: "TOM H", color: "#00ff9d", soundType: SoundType.SYNTH, params: { frequency: 200, decay: 0.3, waveform: 'sine' } }, // Green
    { id: 7, label: "COWBELL", color: "#ff9100", soundType: SoundType.SYNTH, params: { frequency: 800, decay: 0.1, waveform: 'triangle' } }, // Orange
  ]
};

export const PRESET_KITS: Kit[] = [
  DEFAULT_KIT,
  {
    name: "909 Techno",
    description: "Punchy techno drums",
    bpm: 135,
    pads: [
      { id: 0, label: "KICK", color: "#ff2a6d", soundType: SoundType.KICK, params: { frequency: 100, decay: 0.4, sweep: 50 } },
      { id: 1, label: "SNARE", color: "#05d9e8", soundType: SoundType.SNARE, params: { frequency: 250, decay: 0.25, noiseMix: 0.6, filterFreq: 2000 } },
      { id: 2, label: "CLAP", color: "#ffc857", soundType: SoundType.CLAP, params: { frequency: 900, decay: 0.2, noiseMix: 0.9, filterFreq: 1000 } },
      { id: 3, label: "OHAT", color: "#d200ff", soundType: SoundType.HIHAT, params: { frequency: 9000, decay: 0.3, noiseMix: 0.9, filterFreq: 6000 } },
      { id: 4, label: "CHAT", color: "#e0aaff", soundType: SoundType.HIHAT, params: { frequency: 10000, decay: 0.05, noiseMix: 1, filterFreq: 8000 } },
      { id: 5, label: "RIDE", color: "#00ffff", soundType: SoundType.SYNTH, params: { frequency: 5000, decay: 0.8, waveform: 'sawtooth' } },
      { id: 6, label: "RIM", color: "#00ff9d", soundType: SoundType.SYNTH, params: { frequency: 800, decay: 0.05, waveform: 'square' } },
      { id: 7, label: "CRASH", color: "#ff00cc", soundType: SoundType.SYNTH, params: { frequency: 400, decay: 1.2, waveform: 'sawtooth' } },
    ]
  },
  {
    name: "Lo-Fi Chill",
    description: "Mellow and dusty",
    bpm: 85,
    pads: [
      { id: 0, label: "KICK", color: "#7f1d1d", soundType: SoundType.KICK, params: { frequency: 60, decay: 0.3, sweep: 20 } },
      { id: 1, label: "SNARE", color: "#1e3a8a", soundType: SoundType.SNARE, params: { frequency: 180, decay: 0.15, noiseMix: 0.4, filterFreq: 800 } },
      { id: 2, label: "SNAP", color: "#713f12", soundType: SoundType.CLAP, params: { frequency: 1200, decay: 0.05, noiseMix: 0.3, filterFreq: 2000 } },
      { id: 3, label: "HAT", color: "#581c87", soundType: SoundType.HIHAT, params: { frequency: 4000, decay: 0.05, noiseMix: 0.7, filterFreq: 4000 } },
      { id: 4, label: "SHAKE", color: "#6b21a8", soundType: SoundType.HIHAT, params: { frequency: 6000, decay: 0.1, noiseMix: 0.9, filterFreq: 5000 } },
      { id: 5, label: "VIBE", color: "#064e3b", soundType: SoundType.SYNTH, params: { frequency: 440, decay: 0.6, waveform: 'sine' } },
      { id: 6, label: "PERC", color: "#14532d", soundType: SoundType.SYNTH, params: { frequency: 880, decay: 0.1, waveform: 'triangle' } },
      { id: 7, label: "NOISE", color: "#831843", soundType: SoundType.SYNTH, params: { frequency: 200, decay: 0.5, waveform: 'square' } },
    ]
  },
  {
    name: "Trap Hard",
    description: "Heavy bass and fast hats",
    bpm: 140,
    pads: [
      { id: 0, label: "808", color: "#dc2626", soundType: SoundType.KICK, params: { frequency: 45, decay: 1.2, sweep: 50 } },
      { id: 1, label: "SNARE", color: "#2563eb", soundType: SoundType.SNARE, params: { frequency: 400, decay: 0.15, noiseMix: 0.5, filterFreq: 2500 } },
      { id: 2, label: "CLAP", color: "#d97706", soundType: SoundType.CLAP, params: { frequency: 1000, decay: 0.1, noiseMix: 0.9, filterFreq: 1500 } },
      { id: 3, label: "HAT 1", color: "#7c3aed", soundType: SoundType.HIHAT, params: { frequency: 9000, decay: 0.03, noiseMix: 1, filterFreq: 8000 } },
      { id: 4, label: "HAT 2", color: "#9333ea", soundType: SoundType.HIHAT, params: { frequency: 8000, decay: 0.06, noiseMix: 1, filterFreq: 7000 } },
      { id: 5, label: "CHANT", color: "#059669", soundType: SoundType.SYNTH, params: { frequency: 300, decay: 0.2, waveform: 'square' } },
      { id: 6, label: "FX", color: "#10b981", soundType: SoundType.SYNTH, params: { frequency: 1200, decay: 0.3, waveform: 'sawtooth' } },
      { id: 7, label: "BELL", color: "#db2777", soundType: SoundType.SYNTH, params: { frequency: 1500, decay: 0.4, waveform: 'sine' } },
    ]
  },
  {
    name: "Synthwave",
    description: "Retro 80s futuristic",
    bpm: 110,
    pads: [
      { id: 0, label: "KICK", color: "#b91c1c", soundType: SoundType.KICK, params: { frequency: 120, decay: 0.6, sweep: 80 } },
      { id: 1, label: "GATE", color: "#1d4ed8", soundType: SoundType.SNARE, params: { frequency: 220, decay: 0.4, noiseMix: 0.7, filterFreq: 1800 } },
      { id: 2, label: "CLAP", color: "#b45309", soundType: SoundType.CLAP, params: { frequency: 900, decay: 0.25, noiseMix: 0.8, filterFreq: 1100 } },
      { id: 3, label: "HH CL", color: "#6d28d9", soundType: SoundType.HIHAT, params: { frequency: 7000, decay: 0.1, noiseMix: 1, filterFreq: 6000 } },
      { id: 4, label: "HH OP", color: "#7e22ce", soundType: SoundType.HIHAT, params: { frequency: 6000, decay: 0.4, noiseMix: 0.9, filterFreq: 5000 } },
      { id: 5, label: "TOM 1", color: "#047857", soundType: SoundType.SYNTH, params: { frequency: 150, decay: 0.3, waveform: 'triangle' } },
      { id: 6, label: "TOM 2", color: "#059669", soundType: SoundType.SYNTH, params: { frequency: 100, decay: 0.3, waveform: 'triangle' } },
      { id: 7, label: "LASER", color: "#be185d", soundType: SoundType.SYNTH, params: { frequency: 1000, decay: 0.2, waveform: 'sawtooth' } },
    ]
  },
  {
    name: "Industrial",
    description: "Distorted and mechanical",
    bpm: 128,
    pads: [
      { id: 0, label: "STOMP", color: "#450a0a", soundType: SoundType.KICK, params: { frequency: 80, decay: 0.3, sweep: 150 } },
      { id: 1, label: "SLAM", color: "#172554", soundType: SoundType.SNARE, params: { frequency: 300, decay: 0.1, noiseMix: 0.9, filterFreq: 500 } },
      { id: 2, label: "CLANK", color: "#451a03", soundType: SoundType.SYNTH, params: { frequency: 400, decay: 0.1, waveform: 'square' } },
      { id: 3, label: "HISS", color: "#4c1d95", soundType: SoundType.HIHAT, params: { frequency: 5000, decay: 0.1, noiseMix: 1, filterFreq: 2000 } },
      { id: 4, label: "STEAM", color: "#581c87", soundType: SoundType.HIHAT, params: { frequency: 4000, decay: 0.5, noiseMix: 1, filterFreq: 1000 } },
      { id: 5, label: "GRIND", color: "#064e3b", soundType: SoundType.SYNTH, params: { frequency: 50, decay: 1.0, waveform: 'sawtooth' } },
      { id: 6, label: "PULSE", color: "#065f46", soundType: SoundType.SYNTH, params: { frequency: 100, decay: 0.1, waveform: 'square' } },
      { id: 7, label: "ALARM", color: "#831843", soundType: SoundType.SYNTH, params: { frequency: 1200, decay: 0.5, waveform: 'triangle' } },
    ]
  },
  {
    name: "Acoustic Rock",
    description: "Real drums simulation",
    bpm: 110,
    pads: [
      { id: 0, label: "KICK", color: "#7f1d1d", soundType: SoundType.KICK, params: { frequency: 80, decay: 0.2, sweep: 50 } },
      { id: 1, label: "SNARE", color: "#fef3c7", soundType: SoundType.SNARE, params: { frequency: 180, decay: 0.15, noiseMix: 0.7, filterFreq: 1500 } },
      { id: 2, label: "TOM 1", color: "#92400e", soundType: SoundType.SYNTH, params: { frequency: 130, decay: 0.3, waveform: 'sine' } },
      { id: 3, label: "TOM 2", color: "#b45309", soundType: SoundType.SYNTH, params: { frequency: 100, decay: 0.4, waveform: 'sine' } },
      { id: 4, label: "HH CL", color: "#d1d5db", soundType: SoundType.HIHAT, params: { frequency: 6000, decay: 0.05, noiseMix: 1, filterFreq: 5000 } },
      { id: 5, label: "HH OP", color: "#9ca3af", soundType: SoundType.HIHAT, params: { frequency: 5500, decay: 0.4, noiseMix: 0.9, filterFreq: 4500 } },
      { id: 6, label: "CRASH", color: "#fcd34d", soundType: SoundType.SYNTH, params: { frequency: 4000, decay: 1.5, waveform: 'sawtooth' } },
      { id: 7, label: "RIDE", color: "#fbbf24", soundType: SoundType.SYNTH, params: { frequency: 5000, decay: 1.0, waveform: 'triangle' } },
    ]
  },
  {
    name: "Deep House",
    description: "Groovy and soulful",
    bpm: 124,
    pads: [
      { id: 0, label: "KICK", color: "#be123c", soundType: SoundType.KICK, params: { frequency: 55, decay: 0.4, sweep: 20 } },
      { id: 1, label: "CLAP", color: "#f59e0b", soundType: SoundType.CLAP, params: { frequency: 800, decay: 0.2, noiseMix: 0.8, filterFreq: 1200 } },
      { id: 2, label: "SNARE", color: "#f43f5e", soundType: SoundType.SNARE, params: { frequency: 250, decay: 0.1, noiseMix: 0.5, filterFreq: 2500 } },
      { id: 3, label: "HAT 1", color: "#c026d3", soundType: SoundType.HIHAT, params: { frequency: 8000, decay: 0.04, noiseMix: 1, filterFreq: 7000 } },
      { id: 4, label: "HAT 2", color: "#a21caf", soundType: SoundType.HIHAT, params: { frequency: 7500, decay: 0.1, noiseMix: 0.9, filterFreq: 6000 } },
      { id: 5, label: "CHORD", color: "#4f46e5", soundType: SoundType.SYNTH, params: { frequency: 440, decay: 0.8, waveform: 'sawtooth' } },
      { id: 6, label: "BASS", color: "#1e1b4b", soundType: SoundType.SYNTH, params: { frequency: 60, decay: 0.5, waveform: 'square' } },
      { id: 7, label: "PERC", color: "#0ea5e9", soundType: SoundType.SYNTH, params: { frequency: 1200, decay: 0.1, waveform: 'triangle' } },
    ]
  },
  {
    name: "Dubstep Wobble",
    description: "Heavy bass music",
    bpm: 140,
    pads: [
      { id: 0, label: "KICK", color: "#450a0a", soundType: SoundType.KICK, params: { frequency: 50, decay: 0.5, sweep: 80 } },
      { id: 1, label: "SNARE", color: "#dc2626", soundType: SoundType.SNARE, params: { frequency: 200, decay: 0.3, noiseMix: 0.8, filterFreq: 1500 } },
      { id: 2, label: "HAT", color: "#fca5a5", soundType: SoundType.HIHAT, params: { frequency: 9000, decay: 0.05, noiseMix: 1, filterFreq: 8000 } },
      { id: 3, label: "WOBBLE", color: "#4f46e5", soundType: SoundType.SYNTH, params: { frequency: 55, decay: 0.8, waveform: 'sawtooth' } },
      { id: 4, label: "GROWL", color: "#4338ca", soundType: SoundType.SYNTH, params: { frequency: 80, decay: 0.6, waveform: 'square' } },
      { id: 5, label: "FX", color: "#10b981", soundType: SoundType.SYNTH, params: { frequency: 2000, decay: 0.2, waveform: 'sawtooth' } },
      { id: 6, label: "VOX", color: "#f472b6", soundType: SoundType.SYNTH, params: { frequency: 500, decay: 0.1, waveform: 'triangle' } },
      { id: 7, label: "DROP", color: "#881337", soundType: SoundType.KICK, params: { frequency: 40, decay: 1.5, sweep: 100 } },
    ]
  },
  {
    name: "Reggaeton Fire",
    description: "Dem Bow rhythm",
    bpm: 96,
    pads: [
      { id: 0, label: "BOOM", color: "#b91c1c", soundType: SoundType.KICK, params: { frequency: 70, decay: 0.4, sweep: 40 } },
      { id: 1, label: "SNARE", color: "#1d4ed8", soundType: SoundType.SNARE, params: { frequency: 300, decay: 0.15, noiseMix: 0.6, filterFreq: 3000 } },
      { id: 2, label: "TIMBAL", color: "#f59e0b", soundType: SoundType.SYNTH, params: { frequency: 400, decay: 0.1, waveform: 'triangle' } },
      { id: 3, label: "HAT", color: "#fbbf24", soundType: SoundType.HIHAT, params: { frequency: 8000, decay: 0.05, noiseMix: 0.8, filterFreq: 6000 } },
      { id: 4, label: "PALITO", color: "#84cc16", soundType: SoundType.SYNTH, params: { frequency: 1200, decay: 0.05, waveform: 'square' } },
      { id: 5, label: "VOICE", color: "#ec4899", soundType: SoundType.SYNTH, params: { frequency: 600, decay: 0.2, waveform: 'sine' } },
      { id: 6, label: "BASS", color: "#4c1d95", soundType: SoundType.SYNTH, params: { frequency: 80, decay: 0.5, waveform: 'sine' } },
      { id: 7, label: "AIRHORN", color: "#ef4444", soundType: SoundType.SYNTH, params: { frequency: 800, decay: 0.8, waveform: 'sawtooth' } },
    ]
  },
  {
    name: "DnB Jungle",
    description: "Fast breakbeats",
    bpm: 174,
    pads: [
      { id: 0, label: "KICK", color: "#1e3a8a", soundType: SoundType.KICK, params: { frequency: 90, decay: 0.2, sweep: 60 } },
      { id: 1, label: "SNARE", color: "#fbbf24", soundType: SoundType.SNARE, params: { frequency: 280, decay: 0.15, noiseMix: 0.7, filterFreq: 2200 } },
      { id: 2, label: "GHOST", color: "#fcd34d", soundType: SoundType.SNARE, params: { frequency: 280, decay: 0.05, noiseMix: 0.5, filterFreq: 2200 } },
      { id: 3, label: "HAT", color: "#9ca3af", soundType: SoundType.HIHAT, params: { frequency: 8000, decay: 0.04, noiseMix: 1, filterFreq: 7000 } },
      { id: 4, label: "RIDE", color: "#d1d5db", soundType: SoundType.SYNTH, params: { frequency: 5000, decay: 0.5, waveform: 'sawtooth' } },
      { id: 5, label: "AMEN", color: "#b45309", soundType: SoundType.SYNTH, params: { frequency: 400, decay: 0.2, waveform: 'square' } },
      { id: 6, label: "BASS", color: "#312e81", soundType: SoundType.SYNTH, params: { frequency: 55, decay: 0.6, waveform: 'sine' } },
      { id: 7, label: "STAB", color: "#be185d", soundType: SoundType.SYNTH, params: { frequency: 1500, decay: 0.1, waveform: 'sawtooth' } },
    ]
  },
  {
    name: "R&B Smooth",
    description: "Slow jams",
    bpm: 75,
    pads: [
      { id: 0, label: "KICK", color: "#7f1d1d", soundType: SoundType.KICK, params: { frequency: 60, decay: 0.6, sweep: 30 } },
      { id: 1, label: "SNAP", color: "#d97706", soundType: SoundType.CLAP, params: { frequency: 1000, decay: 0.1, noiseMix: 0.2, filterFreq: 2000 } },
      { id: 2, label: "RIM", color: "#b45309", soundType: SoundType.SYNTH, params: { frequency: 600, decay: 0.05, waveform: 'square' } },
      { id: 3, label: "HAT", color: "#a78bfa", soundType: SoundType.HIHAT, params: { frequency: 7000, decay: 0.05, noiseMix: 0.5, filterFreq: 5000 } },
      { id: 4, label: "SHAKE", color: "#c084fc", soundType: SoundType.HIHAT, params: { frequency: 6000, decay: 0.2, noiseMix: 0.8, filterFreq: 4000 } },
      { id: 5, label: "CHIME", color: "#34d399", soundType: SoundType.SYNTH, params: { frequency: 2000, decay: 0.8, waveform: 'sine' } },
      { id: 6, label: "KEY", color: "#60a5fa", soundType: SoundType.SYNTH, params: { frequency: 440, decay: 0.6, waveform: 'triangle' } },
      { id: 7, label: "VOX", color: "#f472b6", soundType: SoundType.SYNTH, params: { frequency: 300, decay: 0.4, waveform: 'sine' } },
    ]
  },
  {
    name: "Pop Hits",
    description: "Radio ready drums",
    bpm: 120,
    pads: [
      { id: 0, label: "KICK", color: "#ef4444", soundType: SoundType.KICK, params: { frequency: 90, decay: 0.3, sweep: 50 } },
      { id: 1, label: "SNARE", color: "#3b82f6", soundType: SoundType.SNARE, params: { frequency: 220, decay: 0.2, noiseMix: 0.6, filterFreq: 1800 } },
      { id: 2, label: "CLAP", color: "#eab308", soundType: SoundType.CLAP, params: { frequency: 900, decay: 0.15, noiseMix: 1, filterFreq: 1200 } },
      { id: 3, label: "HAT", color: "#d8b4fe", soundType: SoundType.HIHAT, params: { frequency: 9000, decay: 0.05, noiseMix: 1, filterFreq: 8000 } },
      { id: 4, label: "TOM", color: "#22d3ee", soundType: SoundType.SYNTH, params: { frequency: 150, decay: 0.25, waveform: 'sine' } },
      { id: 5, label: "PERC", color: "#86efac", soundType: SoundType.SYNTH, params: { frequency: 600, decay: 0.1, waveform: 'triangle' } },
      { id: 6, label: "SNAP", color: "#f9a8d4", soundType: SoundType.CLAP, params: { frequency: 1500, decay: 0.05, noiseMix: 0.5, filterFreq: 2500 } },
      { id: 7, label: "FX", color: "#f472b6", soundType: SoundType.SYNTH, params: { frequency: 3000, decay: 0.4, waveform: 'sawtooth' } },
    ]
  },
  {
    name: "Jazz Swing",
    description: "Soft brushes and rides",
    bpm: 140,
    pads: [
      { id: 0, label: "KICK", color: "#78350f", soundType: SoundType.KICK, params: { frequency: 70, decay: 0.3, sweep: 20 } },
      { id: 1, label: "SNARE", color: "#d97706", soundType: SoundType.SNARE, params: { frequency: 180, decay: 0.2, noiseMix: 0.8, filterFreq: 1000 } },
      { id: 2, label: "GHOST", color: "#b45309", soundType: SoundType.SNARE, params: { frequency: 180, decay: 0.1, noiseMix: 0.6, filterFreq: 1000 } },
      { id: 3, label: "RIDE 1", color: "#fbbf24", soundType: SoundType.SYNTH, params: { frequency: 4000, decay: 0.8, waveform: 'triangle' } },
      { id: 4, label: "RIDE 2", color: "#fcd34d", soundType: SoundType.SYNTH, params: { frequency: 4200, decay: 0.6, waveform: 'triangle' } },
      { id: 5, label: "PEDAL", color: "#9ca3af", soundType: SoundType.HIHAT, params: { frequency: 3000, decay: 0.1, noiseMix: 0.8, filterFreq: 2000 } },
      { id: 6, label: "TOM", color: "#92400e", soundType: SoundType.SYNTH, params: { frequency: 120, decay: 0.3, waveform: 'sine' } },
      { id: 7, label: "CRASH", color: "#fef3c7", soundType: SoundType.SYNTH, params: { frequency: 3500, decay: 1.2, waveform: 'sawtooth' } },
    ]
  },
  {
    name: "Minimal Techno",
    description: "Clicks and cuts",
    bpm: 126,
    pads: [
      { id: 0, label: "KICK", color: "#0f172a", soundType: SoundType.KICK, params: { frequency: 50, decay: 0.15, sweep: 80 } },
      { id: 1, label: "CLICK", color: "#334155", soundType: SoundType.SYNTH, params: { frequency: 800, decay: 0.02, waveform: 'square' } },
      { id: 2, label: "POP", color: "#475569", soundType: SoundType.SYNTH, params: { frequency: 400, decay: 0.05, waveform: 'sine' } },
      { id: 3, label: "TICK", color: "#64748b", soundType: SoundType.HIHAT, params: { frequency: 9000, decay: 0.01, noiseMix: 1, filterFreq: 8000 } },
      { id: 4, label: "HISS", color: "#94a3b8", soundType: SoundType.HIHAT, params: { frequency: 8000, decay: 0.08, noiseMix: 0.8, filterFreq: 6000 } },
      { id: 5, label: "BEEP", color: "#3b82f6", soundType: SoundType.SYNTH, params: { frequency: 1200, decay: 0.05, waveform: 'sine' } },
      { id: 6, label: "SUB", color: "#1e1b4b", soundType: SoundType.SYNTH, params: { frequency: 40, decay: 0.3, waveform: 'sine' } },
      { id: 7, label: "GLITCH", color: "#06b6d4", soundType: SoundType.SYNTH, params: { frequency: 2000, decay: 0.05, waveform: 'sawtooth' } },
    ]
  },
  {
    name: "Garage UK",
    description: "Skippy beats",
    bpm: 132,
    pads: [
      { id: 0, label: "KICK", color: "#312e81", soundType: SoundType.KICK, params: { frequency: 65, decay: 0.3, sweep: 40 } },
      { id: 1, label: "SNARE", color: "#4f46e5", soundType: SoundType.SNARE, params: { frequency: 260, decay: 0.15, noiseMix: 0.6, filterFreq: 2500 } },
      { id: 2, label: "CLAP", color: "#818cf8", soundType: SoundType.CLAP, params: { frequency: 1100, decay: 0.1, noiseMix: 0.9, filterFreq: 1500 } },
      { id: 3, label: "HAT 1", color: "#c7d2fe", soundType: SoundType.HIHAT, params: { frequency: 8500, decay: 0.05, noiseMix: 1, filterFreq: 7500 } },
      { id: 4, label: "HAT 2", color: "#e0e7ff", soundType: SoundType.HIHAT, params: { frequency: 8000, decay: 0.1, noiseMix: 1, filterFreq: 7000 } },
      { id: 5, label: "VOX", color: "#a5b4fc", soundType: SoundType.SYNTH, params: { frequency: 500, decay: 0.2, waveform: 'triangle' } },
      { id: 6, label: "BASS", color: "#1e1b4b", soundType: SoundType.SYNTH, params: { frequency: 50, decay: 0.6, waveform: 'square' } },
      { id: 7, label: "FX", color: "#6366f1", soundType: SoundType.SYNTH, params: { frequency: 1500, decay: 0.3, waveform: 'sawtooth' } },
    ]
  },
  {
    name: "Latin Percussion",
    description: "Salsa and Bossa",
    bpm: 105,
    pads: [
      { id: 0, label: "CONGA L", color: "#78350f", soundType: SoundType.SYNTH, params: { frequency: 150, decay: 0.2, waveform: 'sine' } },
      { id: 1, label: "CONGA H", color: "#92400e", soundType: SoundType.SYNTH, params: { frequency: 250, decay: 0.2, waveform: 'sine' } },
      { id: 2, label: "BONGO", color: "#b45309", soundType: SoundType.SYNTH, params: { frequency: 400, decay: 0.1, waveform: 'triangle' } },
      { id: 3, label: "CLAVE", color: "#d97706", soundType: SoundType.SYNTH, params: { frequency: 2200, decay: 0.05, waveform: 'square' } },
      { id: 4, label: "COWBELL", color: "#f59e0b", soundType: SoundType.SYNTH, params: { frequency: 800, decay: 0.2, waveform: 'triangle' } },
      { id: 5, label: "SHAKER", color: "#fbbf24", soundType: SoundType.HIHAT, params: { frequency: 6000, decay: 0.1, noiseMix: 0.9, filterFreq: 4000 } },
      { id: 6, label: "GUIRO", color: "#fcd34d", soundType: SoundType.HIHAT, params: { frequency: 4000, decay: 0.3, noiseMix: 0.8, filterFreq: 3000 } },
      { id: 7, label: "TIMBAL", color: "#fef3c7", soundType: SoundType.SYNTH, params: { frequency: 600, decay: 0.15, waveform: 'sine' } },
    ]
  },
  {
    name: "Ambient Glitch",
    description: "Textural and strange",
    bpm: 90,
    pads: [
      { id: 0, label: "THUD", color: "#064e3b", soundType: SoundType.KICK, params: { frequency: 40, decay: 0.8, sweep: 10 } },
      { id: 1, label: "CRACKLE", color: "#065f46", soundType: SoundType.HIHAT, params: { frequency: 9000, decay: 0.5, noiseMix: 1, filterFreq: 100 } },
      { id: 2, label: "POP", color: "#047857", soundType: SoundType.SYNTH, params: { frequency: 800, decay: 0.01, waveform: 'sine' } },
      { id: 3, label: "DRIP", color: "#059669", soundType: SoundType.SYNTH, params: { frequency: 1200, decay: 0.2, waveform: 'sine' } },
      { id: 4, label: "STATIC", color: "#10b981", soundType: SoundType.HIHAT, params: { frequency: 5000, decay: 1.0, noiseMix: 0.8, filterFreq: 2000 } },
      { id: 5, label: "TONE", color: "#34d399", soundType: SoundType.SYNTH, params: { frequency: 440, decay: 1.5, waveform: 'sine' } },
      { id: 6, label: "WARP", color: "#6ee7b7", soundType: SoundType.SYNTH, params: { frequency: 200, decay: 0.5, waveform: 'sawtooth' } },
      { id: 7, label: "NOISE", color: "#a7f3d0", soundType: SoundType.SNARE, params: { frequency: 100, decay: 1.0, noiseMix: 1, filterFreq: 500 } },
    ]
  },
  {
    name: "Hardstyle",
    description: "Distorted kicks",
    bpm: 150,
    pads: [
      { id: 0, label: "GONG", color: "#831843", soundType: SoundType.KICK, params: { frequency: 50, decay: 0.8, sweep: 150 } },
      { id: 1, label: "CLAP", color: "#be185d", soundType: SoundType.CLAP, params: { frequency: 900, decay: 0.2, noiseMix: 0.9, filterFreq: 1200 } },
      { id: 2, label: "SNARE", color: "#db2777", soundType: SoundType.SNARE, params: { frequency: 300, decay: 0.15, noiseMix: 0.7, filterFreq: 2000 } },
      { id: 3, label: "OHAT", color: "#f472b6", soundType: SoundType.HIHAT, params: { frequency: 7000, decay: 0.3, noiseMix: 1, filterFreq: 6000 } },
      { id: 4, label: "CHAT", color: "#f9a8d4", soundType: SoundType.HIHAT, params: { frequency: 8000, decay: 0.05, noiseMix: 1, filterFreq: 7000 } },
      { id: 5, label: "SCREECH", color: "#fbcfe8", soundType: SoundType.SYNTH, params: { frequency: 2000, decay: 0.5, waveform: 'sawtooth' } },
      { id: 6, label: "PUNCH", color: "#9d174d", soundType: SoundType.KICK, params: { frequency: 100, decay: 0.1, sweep: 50 } },
      { id: 7, label: "CRASH", color: "#ec4899", soundType: SoundType.SYNTH, params: { frequency: 3000, decay: 1.0, waveform: 'sawtooth' } },
    ]
  },
  {
    name: "Afrobeat",
    description: "Polyrhythmic texture",
    bpm: 115,
    pads: [
      { id: 0, label: "KICK", color: "#7f1d1d", soundType: SoundType.KICK, params: { frequency: 75, decay: 0.3, sweep: 30 } },
      { id: 1, label: "RIM", color: "#991b1b", soundType: SoundType.SYNTH, params: { frequency: 600, decay: 0.05, waveform: 'square' } },
      { id: 2, label: "SHAKER", color: "#b91c1c", soundType: SoundType.HIHAT, params: { frequency: 7000, decay: 0.15, noiseMix: 0.8, filterFreq: 5000 } },
      { id: 3, label: "CONGA", color: "#dc2626", soundType: SoundType.SYNTH, params: { frequency: 250, decay: 0.2, waveform: 'sine' } },
      { id: 4, label: "CLAVE", color: "#ef4444", soundType: SoundType.SYNTH, params: { frequency: 1800, decay: 0.05, waveform: 'triangle' } },
      { id: 5, label: "BELL", color: "#f87171", soundType: SoundType.SYNTH, params: { frequency: 1200, decay: 0.4, waveform: 'sine' } },
      { id: 6, label: "LOG", color: "#fca5a5", soundType: SoundType.SYNTH, params: { frequency: 300, decay: 0.1, waveform: 'sine' } },
      { id: 7, label: "SNARE", color: "#fecaca", soundType: SoundType.SNARE, params: { frequency: 220, decay: 0.1, noiseMix: 0.5, filterFreq: 1500 } },
    ]
  },
  {
    name: "Funk Soul",
    description: "Tight and dry",
    bpm: 100,
    pads: [
      { id: 0, label: "KICK", color: "#3f6212", soundType: SoundType.KICK, params: { frequency: 85, decay: 0.2, sweep: 40 } },
      { id: 1, label: "SNARE", color: "#4d7c0f", soundType: SoundType.SNARE, params: { frequency: 240, decay: 0.1, noiseMix: 0.6, filterFreq: 2000 } },
      { id: 2, label: "CHAT", color: "#65a30d", soundType: SoundType.HIHAT, params: { frequency: 6000, decay: 0.05, noiseMix: 0.8, filterFreq: 5000 } },
      { id: 3, label: "OHAT", color: "#84cc16", soundType: SoundType.HIHAT, params: { frequency: 5500, decay: 0.2, noiseMix: 0.7, filterFreq: 4500 } },
      { id: 4, label: "GHOST", color: "#a3e635", soundType: SoundType.SNARE, params: { frequency: 240, decay: 0.05, noiseMix: 0.4, filterFreq: 2000 } },
      { id: 5, label: "CLAP", color: "#bef264", soundType: SoundType.CLAP, params: { frequency: 900, decay: 0.1, noiseMix: 0.8, filterFreq: 1100 } },
      { id: 6, label: "COWBELL", color: "#d9f99d", soundType: SoundType.SYNTH, params: { frequency: 700, decay: 0.1, waveform: 'triangle' } },
      { id: 7, label: "CRASH", color: "#ecfccb", soundType: SoundType.SYNTH, params: { frequency: 3500, decay: 0.8, waveform: 'sawtooth' } },
    ]
  }
];