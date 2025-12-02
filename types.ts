export enum SoundType {
  KICK = 'kick',
  SNARE = 'snare',
  HIHAT = 'hihat',
  CLAP = 'clap',
  SYNTH = 'synth'
}

export interface SoundParams {
  frequency: number; // Base frequency in Hz
  decay: number; // Decay time in seconds
  sweep?: number; // Frequency sweep amount (for kicks)
  noiseMix?: number; // 0-1, amount of white noise (for snares/hats)
  filterFreq?: number; // Filter cutoff for noise
  waveform?: 'sine' | 'square' | 'sawtooth' | 'triangle';
}

export interface PadConfig {
  id: number;
  label: string;
  color: string;
  soundType: SoundType;
  params: SoundParams;
}

export interface Kit {
  name: string;
  description: string;
  bpm: number;
  pads: PadConfig[];
  pattern?: boolean[][]; // 8 rows x N steps
}

export type SequencerGrid = boolean[][]; // 8 rows x TOTAL_STEPS