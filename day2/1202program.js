const fs = require('fs');

let input = fs.readFileSync('input1.txt').toString().split(',').map(num => parseInt(num));

input[1] = 12;
input[2] = 2;

// program counter
let pc = 0;

while (input[pc] !== 99) {
  if (input[pc] === 1) {
    input[input[pc + 3]] = input[input[pc + 1]] + input[input[pc + 2]];
  } else if (input[pc] === 2) {
    input[input[pc + 3]] = input[input[pc + 1]] * input[input[pc + 2]];
  }
  pc += 4;
}

console.log(input[0]);