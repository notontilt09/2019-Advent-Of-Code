const fs = require('fs');

let data = fs.readFileSync('input.txt').toString().split(',').map(Number);

function reset() {
  return [...data];
}

// main program loop
const run = (x, y) => {
  let tractorInput = x;
  let pc = 0;
  let relBase = 0;
  let input = reset();

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
          input[input[pc+1] + relBase] = tractorInput;
        } else {
          input[input[pc+1]] = tractorInput
        }
        tractorInput = y
        pc += 2;
        break;
      case 4:
        return operandA
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
}

let x = 0;
let y = 99;

// follow bottom of ray until we find a point where up99,right99 is also in beam
while (true) {
  console.log(x, y);
  // if in the beam check up99, right99 point
  if (run(x,y)) {
    // if up99, right99 in beam, we're at bottom left spot
    if (run(x+99, y-99)) {
      console.log(x * 10000 + y - 99);
      break;
    // if up99, right99 not in beam, move down 1
    } else {
      y++;
    }
  // if not in beam, move right
  } else {
    x++;
  }
}





