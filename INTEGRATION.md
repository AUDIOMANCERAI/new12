# Integration Guide: Audiomancer MPC-8

Follow these steps to import the MPC-8 feature into your main Audiomancer codebase.

## 1. Install Dependencies

The MPC player requires the Google GenAI SDK and Lucide React icons.

```bash
npm install @google/genai lucide-react
```

## 2. Configure Tailwind Theme

The Cyberpunk aesthetic relies on specific colors and box-shadows. 

1. Copy `theme.ts` to your project (e.g., `src/theme.ts`).
2. Update your `tailwind.config.js` or `tailwind.config.ts` to import the theme.

```javascript
// tailwind.config.js
const { AUDIOMANCER_THEME_CONFIG } = require('./src/theme'); // Adjust path as needed

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Merge the Audiomancer theme
      ...AUDIOMANCER_THEME_CONFIG,
      
      // Keep your existing extensions if any
    },
  },
  plugins: [],
}
```

## 3. Copy Feature Files

Copy the following files into your project. We recommend creating a feature directory like `src/features/mpc/`.

**Core Logic & UI:**
- `components/MpcPlayer.tsx` (The main entry point)
- `components/Pad.tsx`
- `components/Sequencer.tsx`
- `components/Display.tsx`

**Services:**
- `services/audioEngine.ts`
- `services/geminiService.ts`

**Shared Config:**
- `constants.ts`
- `types.ts`
- `theme.ts`

*Note: You may need to update the relative import paths (e.g., `../types`) inside these files depending on your folder structure.*

## 4. Usage

Import and render the `<MpcPlayer />` component where you want it to appear (e.g., in a Tab or a Page).

```tsx
import { MpcPlayer } from './features/mpc/components/MpcPlayer';

export default function NeuralSynthPage() {
  return (
    <div className="w-full h-full p-4 bg-mpc-bg text-white">
      <MpcPlayer />
    </div>
  );
}
```

## 5. Environment Variables

Ensure your `.env` file has the API Key for the AI generation features.

```
REACT_APP_API_KEY=your_gemini_api_key_here
# or for Vite
VITE_API_KEY=your_gemini_api_key_here
```
