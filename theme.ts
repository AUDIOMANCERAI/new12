// This file serves as the Source of Truth for the Audiomancer Design System.
// To integrate into the main project, copy 'AUDIOMANCER_THEME_CONFIG' into your tailwind.config.js 'theme.extend' block.

export const THEME = {
  colors: {
    bg: '#020202',        // Main app background (Void)
    panel: '#0a0a0a',     // Sidebar/Panel background
    surface: '#121215',   // Card/Container background
    surfaceHighlight: '#1a1a20', // Hover states
    border: '#27272a',    // Global border color (Zinc-800 equivalent but themed)
    
    screen: '#050505',    // Display screens
    screenText: '#00f3ff',// Cyan readout text
    
    primary: '#00f3ff',   // Cyan (Action/Active)
    secondary: '#d600ff', // Purple (Accent)
    accent: '#ff0055',    // Hot Pink (Highlight/Record)
    
    success: '#00ff9d',   // Green (Status OK)
    warning: '#ffea00',   // Yellow (Alert)
    danger: '#ff0055',    // Red/Pink (Error/Delete)
  }
};

// Ready-to-copy Tailwind Configuration
// In your main tailwind.config.js:
// const { AUDIOMANCER_THEME_CONFIG } = require('./path/to/theme');
// module.exports = { theme: { extend: AUDIOMANCER_THEME_CONFIG } }

export const AUDIOMANCER_THEME_CONFIG = {
  colors: {
    mpc: {
      ...THEME.colors
    }
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  boxShadow: {
    'neon-pink': '0 0 5px #ff0055, 0 0 10px #ff0055, 0 0 20px #ff0055',
    'neon-cyan': '0 0 5px #00f3ff, 0 0 10px #00f3ff, 0 0 20px #00f3ff',
    'neon-green': '0 0 5px #00ff9d, 0 0 10px #00ff9d',
    'glass': 'inset 0 0 20px rgba(255,255,255,0.05)',
    'panel': '0 0 50px rgba(0,0,0,0.8)',
    'glow': '0 0 15px rgba(255,255,255,0.1)',
  },
  backgroundImage: {
    'cyber-grid': 'linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px)',
    'scanlines': 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))',
  }
};