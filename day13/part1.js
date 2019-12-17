const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split(',').map(num => parseInt(num));

console.log(input);

class Tile {
  constructor(x, y, char) {
    this.x = x
    this.y = y
    this.char = char
  }
}


let pc = 0;
let relBase = 0;

let programStartInput = parseInt(process.argv[2]);

// output type will go from x-coord to y-coord to tildId
let outputType = 'x'
let numBlocks = 0;
let tiles = [];

let x;
let y;

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
      } else if (modeParam1 === 1) {
        input[input[pc+1]] = programStartInput
      }
      pc += 2;
      break;
    case 4:
      // console.log('output', operandA)
      if (outputType === 'x') {
        x = operandA;
        outputType = 'y';
      } else if (outputType === 'y') {
        y = operandA
        outputType = 'id';
      } else if (outputType === 'id') {
        if (operandA === 2) {
          tiles.push(new Tile(x, y, '#'))
        } else if (operandA === 0) {
          tiles.push(new Tile(x, y, ' '))
        } else if (operandA === 1) {
          tiles.push(new Tile(x, y, '|'))
        } else if (operandA === 3) {
          tiles.push(new Tile(x, y, '_'))
        } else if (operandA === 4) {
          tiles.push(new Tile(x, y, 'o'))
        }
        outputType = 'x';
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

// console.log(numBlocks);
// console.log(tiles);

let ret = ''

let maxX = tiles.sort((a, b) => b.x - a.x)[0]
let maxY = tiles.sort((a, b) => b.y - a.y)[0]


for (let y = 0; y <= maxY.y; y++) {
  for (let x = 0; x <= maxX.x; x++) {
    let tile = tiles.find(tile => tile.x === x && tile.y === y)
    if (tile) {
      console.log(tile);
      ret+= tile.char
    }
  }
  ret+= '\n'
}

console.log(ret);
