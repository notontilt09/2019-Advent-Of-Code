const fs = require('fs');

let input = fs.readFileSync('input1.txt').toString().split('\n');
let wire1 = input[0].split(',')
let wire2 = input[1].split(',');

wire1 = wire1.map(ins => ({direction: ins.slice(0,1), distance: ins.slice(1, ins.length)}));
wire2 = wire2.map(ins => ({direction: ins.slice(0,1), distance: ins.slice(1, ins.length)}));

const getPoints = (wire) => {
  let arr = [];
  let curr = [0, 0];

  for (let instruction of wire) {
    switch(instruction.direction) {
      case 'U':
        for (let i = 1; i <= parseInt(instruction.distance); i++) {
          arr.push(`${curr[0]}, ${curr[1] + i}`)
        }
        curr = [curr[0], curr[1] + parseInt(instruction.distance)]
        break;
      case 'D':
        for (let i = 1; i <= parseInt(instruction.distance); i++) {
          arr.push(`${curr[0]}, ${curr[1] - i}`)
        }
        curr = [curr[0], curr[1] - parseInt(instruction.distance)]
        break;
      case 'R':
        for (let i = 1; i <= parseInt(instruction.distance); i++) {
          arr.push(`${curr[0] + i}, ${curr[1]}`)
        }
        curr = [curr[0] + parseInt(instruction.distance), curr[1]]
        break;
      case 'L':
        for (let i = 1; i <= parseInt(instruction.distance); i++) {
          arr.push(`${curr[0] - i}, ${curr[1]}`)
        }
        curr = [curr[0] - parseInt(instruction.distance), curr[1]]
        break;
    }
  }
  return arr;
}

let wire1Points = getPoints(wire1);
let wire2Points = getPoints(wire2);

let overlap = wire1Points.filter(point => wire2Points.includes(point));

let distances = overlap.map(coordinate => {
  let arr = coordinate.split(', ');
  let x = Math.abs(parseInt(arr[0]));
  let y = Math.abs(parseInt(arr[1]));
  return x + y
});

let answer = Math.min(...distances)
console.log(answer);

