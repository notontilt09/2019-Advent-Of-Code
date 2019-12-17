const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split(',').map(num => parseInt(num));

console.log(input)



const turnLeft = direction => {
  switch(direction) {
    case 'up':
      return 'left';
    case 'left':
      return 'down';
    case 'down':
      return 'right';
    case 'right':
      return 'up'
  }
}

const turnRight = direction => {
  switch(direction) {
    case 'up':
      return 'right';
    case 'left':
      return 'up';
    case 'down':
      return 'left';
    case 'right':
      return 'down'
  }
}

const move = (direction, start) => {
  switch(direction) {
    case 'up':
      return [start[0], start[1] + 1];
    case 'right':
      return [start[0] + 1, start[1]];
    case 'down':
      return [start[0], start[1] - 1]
    case 'left':
      return [start[0] - 1, start[1]]
    }
}


let panelMap = {};

// put robot in center of grid facing up
let x = 50;
let y = 50;
let currentDirection = 'up';

for (let x = 0; x < 200; x++) {
  for (let y = 0; y < 200; y++) {
    panelMap[`${x}, ${y}`] = {
      painted: false,
      color: 'black'
    }
  }
}

let currentPanel = [x, y]

// first outputType is color, then toggles between color and direction
let outputType = 'color';

// console.log(panelMap);

let pc = 0;
let relBase = 0;
// main program loop
while (input[pc] !== 99) {
  // console.log(currentPanel);
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

  // this will toggle between color and direction for the two outputs for each painting instruction

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
      let robotInput;
      if (panelMap[`${currentPanel[0]}, ${currentPanel[1]}`].color === 'black') {
        robotInput = 0;
      } else if (panelMap[`${currentPanel[0]}, ${currentPanel[1]}`].color === 'white') {
        robotInput = 1;
      }
      if (modeParam1 === 2) {
        input[input[pc+1] + relBase] = robotInput;
      } else if (modeParam1 === 0) {
        input[input[pc+1]] = robotInput
      } 
      pc += 2;
      break;
    case 4:
      // console.log(`output type ${outputType}:`, operandA)
      if (outputType === 'color') {
        panelMap[`${currentPanel[0]}, ${currentPanel[1]}`].color = operandA ? 'white' : 'black'
        panelMap[`${currentPanel[0]}, ${currentPanel[1]}`].painted = true;
      } else if (outputType === 'direction') {
        currentDirection = operandA ? turnRight(currentDirection) : turnLeft(currentDirection)
        currentPanel = move(currentDirection, currentPanel);
      }
      outputType = outputType === 'color' ? 'direction' : 'color'
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

let painted = new Set()

for (let panel in panelMap) {
  if (panelMap[panel].painted) {
    painted.add(panel)
  }
}

console.log(panelMap);

console.log(painted.size);