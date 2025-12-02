import { SoundParams, SoundType } from '../types';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  
  // Recording (WAV implementation)
  private recorderNode: ScriptProcessorNode | null = null;
  private leftChannel: Float32Array[] = [];
  private rightChannel: Float32Array[] = [];
  private recordingLength: number = 0;
  private sampleRate: number = 0;

  constructor() {
    // Lazy initialization
  }

  public init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.value = 0.8;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public get currentTime() {
    return this.ctx?.currentTime || 0;
  }

  public get isRecordingSupported() {
    return true; // ScriptProcessorNode is widely supported
  }

  public playSound(type: SoundType, params: SoundParams, time: number = 0) {
    if (!this.ctx || !this.masterGain) {
      this.init();
      if (!this.ctx || !this.masterGain) return;
    }

    const t = time || this.ctx.currentTime;

    switch (type) {
      case SoundType.KICK:
        this.playKick(params, t);
        break;
      case SoundType.SNARE:
      case SoundType.CLAP:
        this.playSnare(params, t);
        break;
      case SoundType.HIHAT:
        this.playHiHat(params, t);
        break;
      case SoundType.SYNTH:
        this.playSynth(params, t);
        break;
    }
  }

  public startRecording() {
    if (!this.ctx || !this.masterGain) this.init();
    if (!this.ctx || !this.masterGain) return;

    this.leftChannel = [];
    this.rightChannel = [];
    this.recordingLength = 0;
    this.sampleRate = this.ctx.sampleRate;

    // Create a ScriptProcessorNode with a bufferSize of 4096 and 2 input/output channels
    // 4096 gives a good balance between performance and latency
    this.recorderNode = this.ctx.createScriptProcessor(4096, 2, 2);

    this.recorderNode.onaudioprocess = (e) => {
      // The master gain is connected to the recorder.
      // We grab the input buffer (what is being played).
      const left = e.inputBuffer.getChannelData(0);
      const right = e.inputBuffer.getChannelData(1);

      // We clone the data because the buffer is reused
      this.leftChannel.push(new Float32Array(left));
      this.rightChannel.push(new Float32Array(right));
      this.recordingLength += 4096;
      
      // Note: We do NOT copy input to output buffer, so this node outputs silence.
      // This avoids doubling the audio volume since masterGain is already connected to destination.
    };

    // Connect master to recorder
    this.masterGain.connect(this.recorderNode);
    // Connect recorder to destination to ensure the process event fires (even though it outputs silence)
    this.recorderNode.connect(this.ctx.destination);
  }

  public stopRecording(): Promise<Blob> {
      return new Promise((resolve) => {
          if (!this.recorderNode || !this.ctx || !this.masterGain) {
              resolve(new Blob([], { type: 'audio/wav' }));
              return;
          }

          // Disconnect
          this.recorderNode.disconnect();
          this.masterGain.disconnect(this.recorderNode);
          this.recorderNode = null;

          // Merge buffers
          const leftBuffer = this.mergeBuffers(this.leftChannel, this.recordingLength);
          const rightBuffer = this.mergeBuffers(this.rightChannel, this.recordingLength);
          
          // Interleave
          const interleaved = this.interleave(leftBuffer, rightBuffer);
          
          // Encode to WAV
          const dataview = this.encodeWAV(interleaved, this.sampleRate);
          const blob = new Blob([dataview], { type: 'audio/wav' });
          
          // Cleanup
          this.leftChannel = [];
          this.rightChannel = [];
          this.recordingLength = 0;

          resolve(blob);
      });
  }

  // --- WAV Encoding Helpers ---

  private mergeBuffers(channelBuffer: Float32Array[], recordingLength: number) {
    const result = new Float32Array(recordingLength);
    let offset = 0;
    for (let i = 0; i < channelBuffer.length; i++) {
      result.set(channelBuffer[i], offset);
      offset += channelBuffer[i].length;
    }
    return result;
  }

  private interleave(left: Float32Array, right: Float32Array) {
    const length = left.length + right.length;
    const result = new Float32Array(length);
    let inputIndex = 0;
    for (let index = 0; index < length; ) {
      result[index++] = left[inputIndex];
      result[index++] = right[inputIndex];
      inputIndex++;
    }
    return result;
  }

  private encodeWAV(samples: Float32Array, sampleRate: number) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    /* RIFF identifier */
    this.writeString(view, 0, 'RIFF');
    /* RIFF chunk length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    this.writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    this.writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, 2, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * 4, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 4, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    this.writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    this.floatTo16BitPCM(view, 44, samples);

    return view;
  }

  private floatTo16BitPCM(output: DataView, offset: number, input: Float32Array) {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }

  private writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // --- Sound Synthesis ---

  private playKick(params: SoundParams, t: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(params.frequency, t);
    osc.frequency.exponentialRampToValueAtTime(0.01, t + params.decay);

    gain.gain.setValueAtTime(1, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + params.decay);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + params.decay);
  }

  private playSnare(params: SoundParams, t: number) {
    if (!this.ctx || !this.masterGain) return;
    
    // Tone
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.frequency.setValueAtTime(params.frequency, t);
    oscGain.gain.setValueAtTime(0.3, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    // Noise
    const noiseConfig = this.createNoiseBuffer();
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseConfig;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = params.filterFreq || 1000;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(params.noiseMix || 0.5, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + params.decay);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + params.decay);
    noise.start(t);
    noise.stop(t + params.decay);
  }

  private playHiHat(params: SoundParams, t: number) {
    if (!this.ctx || !this.masterGain) return;

    const noiseConfig = this.createNoiseBuffer();
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseConfig;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = params.filterFreq || 7000;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.6, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + params.decay);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + params.decay);
  }

  private playSynth(params: SoundParams, t: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = params.waveform || 'sine';
    osc.frequency.setValueAtTime(params.frequency, t);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + params.decay);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + params.decay);
  }

  private noiseBuffer: AudioBuffer | null = null;
  
  private createNoiseBuffer(): AudioBuffer {
    if (this.noiseBuffer) return this.noiseBuffer;
    if (!this.ctx) throw new Error("Audio Context not initialized");

    const bufferSize = this.ctx.sampleRate * 2; // 2 seconds of noise
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    this.noiseBuffer = buffer;
    return buffer;
  }
}

export const audioEngine = new AudioEngine();