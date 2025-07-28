import { Howl } from 'howler';

export const bgMusic = new Howl({
  src: ['/assets/bg-music.mp3'],
  loop: true,
  volume: 0.5,
});

export const correctSound = new Howl({
  src: ['/assets/correct.mp3'],
  volume: 1,
});

export const wrongSound = new Howl({
  src: ['/assets/wrong.mp3'],
  volume: 1,
});

export const levelupSound = new Howl({
  src: ['/assets/levelup.mp3'],
  volume: 1,
});

export const beepSound = new Howl({
  src: ['/assets/beep.wav'], // Use .wav extension
  volume: 1,
});
