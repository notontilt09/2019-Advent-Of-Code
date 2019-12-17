const fs = require('fs');
const Combinatorics = require('js-combinatorics');

let input = [[-1, 7, 3], [12, 2, -13], [14, 18, -8], [17, 4, -4]];

let data = input.map(moon => ({
  x: moon[0],
  y: moon[1],
  z: moon[2],
  dx: 0,
  dy: 0,
  dz: 0
}))

console.log(data);

const getPairsForIndex = (arr, index) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) {
      result.push([arr[index], arr[i]])
    }
  }

  return result;
}

const updateVelocities = pair => {
  for (let axis of ['x', 'y', 'z']) {
    if (pair[0][axis] > pair[1][axis]) {
      // use 0.5 instead of 1 to account for each pair counted twice
      pair[0][`d${axis}`] -= 0.5
      pair[1][`d${axis}`] += 0.5
    } else if (pair[0][axis] < pair[1][axis]) {
      pair[0][`d${axis}`] += 0.5
      pair[1][`d${axis}`] -= 0.5
    }
  }
}

// update state 1000 times
for (let step = 0; step < 1000; step++) {
  // update the velocities
  for (let i = 0; i < data.length; i++) {
    let pairs = getPairsForIndex(data, i);
    for (let pair of pairs) {
      updateVelocities(pair);
    }
  }

  // update the positions
  for (let moon of data) {
    moon['x'] += moon['dx'];
    moon['y'] += moon['dy'];
    moon['z'] += moon['dz'];
  }
}

let energy = 0;
for (let moon of data) {
  let potential = Math.abs(moon['x']) + Math.abs(moon['y']) + Math.abs(moon['z'])
  let kinetic = Math.abs(moon['dx']) + Math.abs(moon['dy']) + Math.abs(moon['dz'])
  energy += potential * kinetic;
}

console.log(energy);
