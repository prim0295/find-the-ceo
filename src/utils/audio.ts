import { Howl } from 'howler';

// Optimized audio loading with preload disabled for faster initial load
export const bgMusic = new Howl({
  src: ['/assets/bg-music.mp3'],
  loop: true,
  volume: 0.5,
  preload: false, // Don't preload to speed up initial load
});

export const correctSound = new Howl({
  src: ['/assets/correct.wav'],
  volume: 1,
  preload: false,
});

export const wrongSound = new Howl({
  src: ['/assets/wrong.mp3'],
  volume: 1,
  preload: false,
});

export const levelupSound = new Howl({
  src: ['/assets/levelup.mp3'],
  volume: 1,
  preload: false,
});

export const beepSound = new Howl({
  src: ['/assets/beep.wav'],
  volume: 1,
  preload: false,
});

// Function to preload audio when needed
export const preloadAudio = () => {
  bgMusic.load();
  correctSound.load();
  wrongSound.load();
  beepSound.load();
};
