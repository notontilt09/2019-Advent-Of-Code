const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split(',').map(Number);

let pc = 0;
let relBase = 0;

let view = '';

// main program loop
while (input[pc] !== 99) {
  // convert instruction to string to slice off opCode and operand modes
  let opString = input[pc].toString();

  // grab opCode
  let opCode = parseInt(opString.slice(opString.length - 2));
  
  // determine mode of parameter, 3rd parameter mode always 0
  let modeParam1 = opString.length > 2 ? parseInt(opString[opString.length - 3]) : 0;
  let modeParam2 = opString.length > 3 ? parseInt(opString[opString.length - 4]) : 0;
  let modeParam3 = opString.length > 4 ? parseInt(opString[opString.length - 5]) : 0;

  // determine parameters based on their mode
  let operandA;
  let operandB;
  let operandC;

  switch(modeParam1) {
    case 0:
      operandA = input[input[pc+1]] || 0;
      break;
    case 1:
      operandA = input[pc+1] || 0;
      break;
    case 2:
      operandA = input[input[pc+1] + relBase] || 0;
      break;
  }

  switch(modeParam2) {
    case 0:
      operandB = input[input[pc+2]] || 0;
      break;
    case 1:
      operandB = input[pc+2] || 0;
      break;
    case 2:
      operandB = input[input[pc+2] + relBase] || 0;
      break;
  }

  switch(modeParam3) {
    case 0:
      operandC = input[pc+3] || 0;
      break;
    case 2:
      operandC = input[pc+3] + relBase || 0;
      break;
  }

  // debug trace
  // console.log(`pc: ${pc}, input[pc], ${input[pc]}, opString: ${opString}, opCode: ${opCode}, mode1: ${modeParam1}, mode2: ${modeParam2}, mode3: ${modeParam3}, operandA: ${operandA}, operandB: ${operandB}, operandC: ${operandC}, relBase: ${relBase}`)

  switch(opCode) {
    case 1:
      input[operandC] = operandA + operandB;
      pc += 4;
      break;
    case 2:
      input[operandC] = operandA * operandB;
      pc += 4;
      break;
    case 3:
      if (modeParam1 === 2) {
        input[input[pc+1] + relBase] = programStartInput;
      } else {
        input[input[pc+1]] = programStartInput
      }
      pc += 2;
      break;
    case 4:
      switch (operandA) {
        case 35:
          view += '#';
          break;
        case 46:
          view += '.';
          break;
        case 10:
          view += '\n';
          break;
        default:
          view += String.fromCharCode(operandA);
          break;
      }
      pc += 2;
      break;
    case 5:
      pc = operandA !== 0 ? operandB : pc += 3;;
      break;
    case 6:
      pc = operandA === 0 ? operandB : pc += 3;
      break;
    case 7:
      input[operandC] = operandA < operandB ? 1 : 0
      pc += 4;
      break;
    case 8:
      input[operandC] = operandA === operandB ? 1 : 0;
      pc += 4;
      break;
    case 9:
      relBase += operandA;
      pc += 2;
      break;
    default:
      console.log(`Unhandled instruction ${input[pc]} at position ${pc}`)
      break;
  }
}

console.log(view);

let grid = view.split('\n');
grid = grid.map(row => row.replace(/\./g, 0).replace(/#/g, 1).split('').map(Number));
// console.log(grid)

let intersections = [];

for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[0].length - 1; j++) {
    if (grid[j][i] === 1) {
      if (grid[j+1][i] === 1 && grid[j-1][i] === 1 && grid[j][i+1] === 1 && grid[j][i-1] === 1) {
        intersections.push([i, j])
      }
    }
  }
}

let alignmentParams = intersections.map(intersection => intersection[0] * intersection[1])
console.log(alignmentParams.reduce((a, b) => a + b, 0));