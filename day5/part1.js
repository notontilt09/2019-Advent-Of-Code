// ! Run `node part1.js 1` to run this as it needs command line input of 1

const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split(',').map(item => parseInt(item));
console.log(input);
// program counter
let pc = 0;

let programStartInput = parseInt(process.argv[2]);

// main program loop
while (input[pc] !== 99) {
  // convert instruction to string to slice off opCode and operand modes
  let opString = input[pc].toString();

  // grab opCode
  let opCode = parseInt(opString.slice(opString.length - 2));
  
  // determine mode of parameter, 3rd parameter mode always 0
  let modeParam1 = opString.length > 2 ? parseInt(opString[opString.length - 3]) : 0;
  let modeParam2 = opString.length > 3 ? parseInt(opString[opString.length - 4]) : 0;

  // determine parameters based on their mode
  let operandA = modeParam1 ? input[pc + 1] : input[input[pc + 1]];
  let operandB = modeParam2 ? input[pc + 2] : input[input[pc + 2]];
  let operandC = input[pc + 3];

  // debug trace
  // console.log(`pc: ${pc}, input[pc], ${input[pc]}, opString: ${opString}, opCode: ${opCode}, mode1: ${modeParam1}, mode2: ${modeParam2}`)

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
      input[input[pc+1]] = programStartInput;
      pc += 2;
      break;
    case 4:
      console.log('output', operandA)
      pc += 2;
      break;
    default:
      console.log(`Unhandled instruction ${input[pc]} at position ${pc}`)
  }
}
