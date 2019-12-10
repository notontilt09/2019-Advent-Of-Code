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

// object with keys as each asteroid location, and values of num asteroids it can see
let canSee = {}

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[0].length; j++) {
    let angles = []
    if (arr[i][j] === 0) {
      continue;
    } else {
      for (let k = 0; k < arr.length; k++) {
        for (let l = 0; l < arr[0].length; l++) {
          if (arr[k][l] === 0 || (i === k && j === l)) {
            continue;
          } else {
            angles.push(Math.atan2(l - j, k - i))
          }
        }
      }
    }
    canSee[`${j}, ${i}`] = [...new Set(angles)].length
  }
}

console.log(canSee);

let max = 0;

for (let point in canSee) {
  if (canSee[point] > max) {
    max = canSee[point];
  }
}

console.log(max)



