const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, 'public/crowd-images/crowd3.png');
const outputBg = path.join(__dirname, 'public/crowd-images/crowd3_bg.png');
const outputFg = path.join(__dirname, 'public/crowd-images/crowd3_fg.png');

// How many pixels from the bottom should be foreground?
const splitY = 400; // Adjust this value as needed

sharp(input)
  .metadata()
  .then(({ width, height }) => {
    // Background: erase bottom splitY pixels (make transparent)
    sharp(input)
      .extract({ left: 0, top: 0, width, height: height - splitY })
      .extend({
        top: 0,
        bottom: splitY,
        left: 0,
        right: 0,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(outputBg, (err) => {
        if (err) console.error('Error creating background:', err);
        else console.log('Background layer saved:', outputBg);
      });

    // Foreground: erase top (height - splitY) pixels (make transparent)
    sharp(input)
      .extract({ left: 0, top: height - splitY, width, height: splitY })
      .extend({
        top: height - splitY,
        bottom: 0,
        left: 0,
        right: 0,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(outputFg, (err) => {
        if (err) console.error('Error creating foreground:', err);
        else console.log('Foreground layer saved:', outputFg);
      });
  });