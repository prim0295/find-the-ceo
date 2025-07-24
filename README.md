# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
Design the full UI flow for a meme-inspired tap game called **“Spot the CEO”**, inspired by a viral concert scandal.

🎯 **Gameplay Goal**: Tap to find the CEO and his mistress in a concert crowd within 30 seconds. Each correct tap triggers a kiss-cam animation; incorrect taps show a meme flash.

💡 Design 3 Screens:
1. **Welcome Screen**:
   - Meme-style title (e.g., "Where’s the CEO?")
   - “Start Game” button
   - Optional: Toggle for sound

2. **Gameplay Screen**:
   - Full-screen crowd image (updates each session)
   - 30-second countdown timer
   - Tapping mechanic:
     - Correct tap → zoom + kiss-cam + funny animation
     - Incorrect tap → flash meme image for 1 sec
   - Score counter updates live

3. **Result Screen**:
   - Number of correct taps
   - Time used
   - Points scored
   - Button: “Play Next Session”
   - Optional: Share meme reaction

🎨 **Visual Style**:
- Comic Sans/meme typography
- Bright colors: neon blue, pink, yellow
- Fun animations: spotlight, camera zoom, shake
- Audio FX: gasp, violin, buzzer (optional)

⚙️ **UX Considerations**:
- Use visual hints as timer runs out (blinking, pulsing)
- Mobile & desktop-friendly layout
- Meme humor over punishment for mistakes

---

## **Recommended React Component Structure**

```
<code_block_to_apply_changes_from>
```

---

### **Component Breakdown**

- **App.tsx**  
  Main app component, manages which screen is shown (welcome, game, result).

- **components/WelcomeScreen.tsx**  
  - Meme-style title
  - Start button
  - Sound toggle

- **components/GameScreen.tsx**  
  - Full-screen crowd image
  - Timer (uses `<Timer />`)
  - Score counter (uses `<ScoreCounter />`)
  - Handles tap/click logic
  - Shows `<MemeFlash />` on incorrect tap
  - Shows `<KissCamAnimation />` on correct tap
  - Shows `<VisualHint />` as timer runs out

- **components/ResultScreen.tsx**  
  - Shows stats (correct taps, time, score)
  - Play again/share buttons

- **components/Timer.tsx**  
  - Countdown timer, blinks/pulses as time runs out

- **components/ScoreCounter.tsx**  
  - Displays current score

- **components/MemeFlash.tsx**  
  - Shows meme image for 1 second on incorrect tap

- **components/KissCamAnimation.tsx**  
  - Handles zoom/spotlight/funny animation on correct tap

- **components/SoundToggle.tsx**  
  - Button to toggle sound FX

- **components/VisualHint.tsx**  
  - Visual hints (e.g., pulsing, blinking) as timer runs out

---

## **How to Start**

1. **Create the folders and files:**
   - In your `src/components/` directory, create the files listed above.

2. **Set up `App.tsx` to manage screen state:**
   - Use React state to switch between Welcome, Game, and Result screens.

3. **Stub out each component:**
   - Start with simple placeholder content for each (e.g., `<div>Welcome Screen</div>`).

---

## **Example: App.tsx Skeleton**

```tsx
import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";

type Screen = "welcome" | "game" | "result";

const App = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({ correct: 0, time: 0 });

  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen on
