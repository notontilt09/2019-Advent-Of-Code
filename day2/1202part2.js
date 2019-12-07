const fs = require('fs');

let input = fs.readFileSync('input1.txt').toString().split(',').map(num => parseInt(num));

const reset = () => {
  return [...input];
}

// loop through all combos of ram[0], ram[1] (0-99 inc.) until result of instructions is 19690720
const findAnswer = () => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let ram = reset();
      let pc = 0;
      ram[1] = i;
      ram[2] = j;
      while (ram[pc] !== 99) {
        if (ram[pc] === 1) {
          ram[ram[pc + 3]] = ram[ram[pc + 1]] + ram[ram[pc + 2]];
        } else if (ram[pc] === 2) {
          ram[ram[pc + 3]] = ram[ram[pc + 1]] * ram[ram[pc + 2]];
        }
        pc += 4;
      }
      if (ram[0] === 19690720) {
        return 100 * i + j; 
      }
    }
  }
}

console.log(findAnswer());