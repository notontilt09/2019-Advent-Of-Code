const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split('').map(num => parseInt(num));

// layer dimensions 25x6 defined in problem
let layerWidth = 25;
let layerHeight = 6;

let layers = [];

while (input.length) {
  layers.push(input.slice(0, layerWidth * layerHeight))
  input = input.slice(layerWidth * layerHeight)
}

layers[0].map((color, i) => {
  let j = 0;
  while (color === 2) {
    color = layers[j][i];
    j++;
  }
  process.stdout.write(color === 0 ? " " : "*");
  (i + 1) % 25 === 0 && console.log("");
});

