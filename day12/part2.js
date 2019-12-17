const fs = require('fs');
const Combinatorics = require('js-combinatorics');
const mathjs = require('mathjs');

let input = [[-1, 7, 3], [12, 2, -13], [14, 18, -8], [17, 4, -4]];
// let input = [[-1, 0, 2], [2, -10, -7], [4, -8, 8], [3, 5, -1]];

const resetData = () => {
  return input.map(moon => ({
    x: moon[0],
    y: moon[1],
    z: moon[2],
    dx: 0,
    dy: 0,
    dz: 0
  }))
}

let initialData = input.map(moon => ({
  x: moon[0],
  y: moon[1],
  z: moon[2],
  dx: 0,
  dy: 0,
  dz: 0
}))

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

const getPeriodOfAxis = axis => {
  let data = resetData();
  // console.log('initial state', data);
  let noRepeats = true;
  let states = new Set();
  let steps = 0;

  // keep adding complete state to states until 
  while (noRepeats) {
    // update the velocities
    for (let i = 0; i < data.length; i++) {
      let pairs = getPairsForIndex(data, i);
      for (let pair of pairs) {
        updateVelocities(pair);
      }
    }
  
    // update the positions
    for (let moon of data) {
      moon[axis] += moon[`d${axis}`];
    }
  
    let test = [];

    for (let moon of data) {
      test.push({
        [axis]: moon[axis],
        [`d${axis}`] : moon[`d${axis}`]
      })
    }

    // console.log(test);
    test = JSON.stringify(test);
    
    if (!states.has(test)) {
      // increment steps
      steps++;
      // add data to states
      states.add(test);
      // console.log('states', states);
    } else {
      // console.log('here');
      noRepeats = false;
    }
  }

  return steps
}



const px = getPeriodOfAxis('x')
const py = getPeriodOfAxis('y')
const pz = getPeriodOfAxis('z')

console.log(mathjs.lcm(px, py, pz));
