const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split('').map(num => parseInt(num));

// layer dimensions 25x6 defined in problem
let layerWidth = 25;
let layerHeight = 6;

let layers = [];
while (input.length) {
  layers.push(input.slice(0, layerWidth * layerHeight))
  input = input.slice(layerWidth * layerHeight + 1)
}

console.log(layers.length);

let layerZeroes = {};

const countZeroes = layer => {
  let count = 0;
  for (let i = 0; i < layer.length; i++) {
    if (layer[i] === 0) {
      count++;
    }
  }
  return count;
}

let maxLayerZeroes = Infinity;
let maxLayer;

for (let i = 1; i < layers.length; i++) {
  layerZeroes[i] = countZeroes(layers[i-1])
  if (layerZeroes[i] < maxLayerZeroes) {
    maxLayerZeroes = layerZeroes[i]
    maxLayer = i;
  }
}

// console.log(layerZeroes);
// console.log(maxLayerZeroes);
// console.log(maxLayer);

let maxLayerCounts = {}

for (let num of layers[maxLayer-1]) {
  if (maxLayerCounts[num]) {
    maxLayerCounts[num]++;
  } else {
    maxLayerCounts[num] = 1;
  }
}

// console.log(maxLayerCounts);

console.log(maxLayerCounts[1] * maxLayerCounts[2])