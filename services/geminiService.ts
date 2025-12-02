import { GoogleGenAI, Type } from "@google/genai";
import { Kit } from "../types";

// Safe access to process.env
const getApiKey = () => {
  try {
    if (typeof process !== "undefined" && process.env) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("process.env access failed", e);
  }
  return undefined;
};

let ai: GoogleGenAI | null = null;
const apiKey = getApiKey();

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateKit = async (styleDescription: string): Promise<Kit> => {
  if (!ai) {
    // Try one more time in case env was injected late
    const lateKey = getApiKey();
    if (lateKey) {
        ai = new GoogleGenAI({ apiKey: lateKey });
    } else {
        throw new Error("API Key not found. Please set process.env.API_KEY.");
    }
  }

  // Double check if initialization succeeded
  if (!ai) {
      throw new Error("Gemini AI client could not be initialized.");
  }

  const model = "gemini-2.5-flash";
  const prompt = `Create a drum kit configuration for an 8-pad MPC. 
  The style is: "${styleDescription}".
  
  Also generate a rhythmic pattern for these pads. 
  The pattern should be 4 bars long (64 steps total). 
  Row 0 is the first pad, Row 7 is the last pad.
  True means hit, False means silence.
  
  Return a valid JSON object matching the schema. 
  - Ensure 'color' is a hex string.
  - 'soundType' must be one of: 'kick', 'snare', 'hihat', 'clap', 'synth'.
  - 'params' should tune the synthesizer to match the sound name.
  - 'waveform' for synths should be 'sine', 'square', 'sawtooth', or 'triangle'.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the drum kit" },
          description: { type: Type.STRING, description: "Short description of the kit style" },
          bpm: { type: Type.NUMBER, description: "Recommended BPM for this style" },
          pads: {
            type: Type.ARRAY,
            description: "Array of 8 pad configurations",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                label: { type: Type.STRING, description: "Short label (max 6 chars)" },
                color: { type: Type.STRING, description: "Hex color code" },
                soundType: { type: Type.STRING, enum: ["kick", "snare", "hihat", "clap", "synth"] },
                params: {
                  type: Type.OBJECT,
                  properties: {
                    frequency: { type: Type.NUMBER },
                    decay: { type: Type.NUMBER },
                    sweep: { type: Type.NUMBER },
                    noiseMix: { type: Type.NUMBER },
                    filterFreq: { type: Type.NUMBER },
                    waveform: { type: Type.STRING, enum: ["sine", "square", "sawtooth", "triangle"] }
                  },
                  required: ["frequency", "decay"]
                }
              },
              required: ["id", "label", "color", "soundType", "params"]
            }
          },
          pattern: {
            type: Type.ARRAY,
            description: "8 rows of boolean steps. Each row must have 64 steps (4 bars).",
            items: {
                type: Type.ARRAY,
                items: { type: Type.BOOLEAN }
            }
          }
        },
        required: ["name", "description", "pads", "bpm", "pattern"]
      }
    }
  });

  if (response.text) {
    try {
        const kitData = JSON.parse(response.text) as Kit;
        // Enforce 8 pads
        if (kitData.pads.length > 8) {
            kitData.pads = kitData.pads.slice(0, 8);
        }
        // Normalize IDs
        kitData.pads.forEach((pad, index) => pad.id = index);
        
        // Normalize Pattern (ensure 8 rows)
        if (kitData.pattern) {
             while (kitData.pattern.length < 8) {
                 kitData.pattern.push(new Array(64).fill(false));
             }
             kitData.pattern = kitData.pattern.slice(0, 8);
        }
        
        return kitData;
    } catch (e) {
        console.error("Failed to parse Gemini response", e);
        throw new Error("Failed to generate valid kit data.");
    }
  }
  
  throw new Error("No response from Gemini.");
};