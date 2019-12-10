const fs = require('fs');

let data = fs.readFileSync('input.txt').toString().split('\n')

let arr = []

for (row of data) {
  let bin = row.split('').map(item => {
    if (item === '#') {
      return 1
    } else {
      return 0
    }
  })
  arr.push(bin)
}

// console.log(arr);

// object with keys as angles and values a set of asteroids on that angle
let angles = {}

// ! ANSWER FROM PART 1, for the asteroid to begin at
let x = 20;
let y = 21;

for (let i = 0; i < arr[0].length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // console.log(i, j);
    if (arr[j][i] === 0 || (i === x && j === y)) {
      continue
    } else {
      let angle = Math.atan2(j - y, i - x) / Math.PI * 180 + 90;
      if (angle < 0) {
        angle+= 360;
      }
      if (!angles[angle]) {
        angles[angle] = new Set()
      }
      angles[angle].add([i , j])
    }
  }
}

let keys = Object.keys(angles).sort((a, b) => a - b)

let totalAsteroids = 0;
for (key of keys) {
  totalAsteroids += angles[key].size
}

let destructionOrder = []

const distanceFromCenter = (cx, cy, x, y) => {
  return Math.sqrt(Math.pow(Math.abs(cy - y), 2) + Math.pow(Math.abs(cx - x), 2))
}

// start the "LAZER"
while (totalAsteroids) {
  for (let i = 0; i < keys.length; i++) {
    if (angles[keys[i]].size > 0) {
      let inLineForDestruction = [];
      for (asteroid of angles[keys[i]]) {
        inLineForDestruction.push(asteroid);
      }
      inLineForDestruction = inLineForDestruction.sort((a, b) => distanceFromCenter(x, y, a[0], a[1]) - distanceFromCenter(x, y, b[0], b[1]))
      // inLineForDestruction = inLineForDestruction.sort((a, b) => a - b)
      // console.log(inLineForDestruction);
      let destroyed = inLineForDestruction[0]
      destructionOrder.push(destroyed);
      angles[keys[i]].delete(destroyed)
      totalAsteroids--;
    }
  }
}

// console.log(destructionOrder);

console.log(destructionOrder[0])
console.log(destructionOrder[1])
console.log(destructionOrder[2])
console.log(destructionOrder[9])
console.log(destructionOrder[19])
console.log(destructionOrder[49])
console.log(destructionOrder[99])
console.log(destructionOrder[198])
console.log(destructionOrder[199])


let twoHund = destructionOrder[199];
console.log(100 * twoHund[0] + twoHund[1])
