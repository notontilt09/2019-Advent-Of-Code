const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split(',').map(Number);

input = input.concat(Array(10000).fill(0));

let pc = 0;
let relBase = 0;
input[0] = 2;
console.log(input);

// movement routines calculated by hand
// ASCII CONVERSIONS: 
    // 'R' = 82
    // ',' = 44
    // 'L' = 76
    // '6' = 54
    // '8' = 56
    // '1' = 49
    // '0' = 48
    // '2' = 50
    // \n   = 10
    // 'A' = 65
    // 'B' = 66
    // 'C' = 67

// A = 'R,12,L,6,R,12';
// B = 'L,8,L,6,L,10'
// C = 'R,12,L,10,L,6,R,10'
// ROUTINE = 'A,B,A,C,B,C,B,C,A,C'

let asciiA = '82,44,49,50,44,76,44,54,44,82,44,49,50,10';
let asciiB = '76,44,56,44,76,44,54,44,76,49,48,10';
let asciiC = '82,44,49,50,44,76,44,49,48,44,76,44,54,44,82,44,49,48,10';
let asciiMain = '65,44,66,44,65,44,67,44,66,44,67,44,66,44,67,44,65,44,67,10'

let inputIndex = 0;
let inputArray = [];

let outputs = [];

let view = '';

for (let i = 0; i < asciiMain.split(',').length; i++) {
  inputArray.push(Number(asciiMain.split(',')[i]))
}
for (let i = 0; i < asciiA.split(',').length; i++) {
  inputArray.push(Number(asciiA.split(',')[i]))
}
for (let i = 0; i < asciiB.split(',').length; i++) {
  inputArray.push(Number(asciiB.split(',')[i]))
}
for (let i = 0; i < asciiC.split(',').length; i++) {
  inputArray.push(Number(asciiC.split(',')[i]))
}

// add ascii of 'n\n' for video feed.  Change 110 to 121 to enable
inputArray.push(110)
inputArray.push(10)

// console.log(inputArray);


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
      let moveInput = inputArray[inputIndex]
      // console.log('moveInput', moveInput);
      inputIndex++;
      if (modeParam1 === 2) {
        input[input[pc+1] + relBase] = moveInput;
      } else {
        input[input[pc+1]] = moveInput
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
      // console.log(operandA);
      outputs.push(operandA);
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

console.log(outputs[outputs.length - 1])



