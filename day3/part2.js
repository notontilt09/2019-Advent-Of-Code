const fs = require('fs');

let input = fs.readFileSync('input1.txt').toString().split('\n');
let wire1 = input[0].split(',')
let wire2 = input[1].split(',');

wire1 = wire1.map(ins => ({direction: ins.slice(0,1), distance: ins.slice(1, ins.length)}));
wire2 = wire2.map(ins => ({direction: ins.slice(0,1), distance: ins.slice(1, ins.length)}));

const getPointsAndSteps = (wire) => {
  let arr = [];
  let curr = [0, 0];
  let steps = 0;

  for (let instruction of wire) {
    switch(instruction.direction) {
      case 'U':
        for (let i = 1; i <= parseInt(instruction.distance); i++) {
          steps++;
          arr.push([`${curr[0]}, ${curr[1] + i}`, steps]);
        }
        curr = [curr[0], curr[1] + parseInt(instruction.distance)]
        break;
      case 'D':
        for (let i = 1; i <= parseInt(instruction.distance); i++) {
          steps++;
          arr.push([`${curr[0]}, ${curr[1] - i}`, steps]);
        }
        curr = [curr[0], curr[1] - parseInt(instruction.distance)]
        break;
      case 'R':
        for (let i = 1; i <= parseInt(instruction.distance); i++) {
          steps++;
          arr.push([`${curr[0] + i}, ${curr[1]}`, steps]);
        }
        curr = [curr[0] + parseInt(instruction.distance), curr[1]]
        break;
      case 'L':
        for (let i = 1; i <= parseInt(instruction.distance); i++) {
          steps++;
          arr.push([`${curr[0] - i}, ${curr[1]}`, steps]);
        }
        curr = [curr[0] - parseInt(instruction.distance), curr[1]]
        break;
    }
  }
  return arr;
}

let wire1Steps = getPointsAndSteps(wire1);
let wire2Steps = getPointsAndSteps(wire2);

let wire1Points = wire1Steps.map(step => step[0]);
let wire2Points = wire2Steps.map(step => step[0]);

let overlap = wire1Points.filter(point => wire2Points.includes(point));

wire1Steps = wire1Steps.filter(step => overlap.includes(step[0]));
wire2Steps = wire2Steps.filter(step => overlap.includes(step[0]));

console.log(wire1Steps);
console.log(wire2Steps);

let totalSteps = [];

for (let step1 of wire1Steps) {
  for (let step2 of wire2Steps) {
    if (step1[0] === step2[0]) {
      totalSteps.push(step1[1] + step2[1])
    }
  }
}

console.log(totalSteps);
console.log(Math.min(...totalSteps));