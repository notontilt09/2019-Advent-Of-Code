const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split(',').map(num => parseInt(num));

console.log(input);

class Tile {
  constructor(x, y, id) {
    this.x = x
    this.y = y
    this.id = id
  }
}

// set memory[0] to 2 as per instructions to play for free
input[0] = 2;
let pc = 0;
let relBase = 0;

let score = 0;

// output type will go from x-coord to y-coord to tildId
let output = [];

let tiles = []

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
  
  let ball = tiles.find(tile => tile.id === 4);
  let paddle = tiles.find(tile => tile.id === 3);

  if (ball && paddle) {
    // console.log(`ballX: ${ball.x}, ballY: ${ball.y}, paddleX: ${paddle.x}`)
  }

  // debug trace
  // console.log(`pc: ${pc}, input[pc], ${input[pc]}, opString: ${opString}, opCode: ${opCode}, mode1: ${modeParam1}, mode2: ${modeParam2}, mode3: ${modeParam3}, operandA: ${operandA}, operandB: ${operandB}, operandC: ${operandC}, relBase: ${relBase}`)
  // console.log(`x: ${x}, y: ${y}`)
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
      let ball = tiles.find(tile => tile.id === 4);
      let paddle = tiles.find(tile => tile.id === 3);
      let inputNum;
      ball.x > paddle.x ? inputNum = 1 : ball.x < paddle.x ? inputNum = -1 : inputNum = 0;
      // console.log(inputNum);
      if (modeParam1 === 2) {
        input[input[pc+1] + relBase] = inputNum;
      } else {
        input[input[pc+1]] = inputNum;
      }
      pc += 2;
      break;
    case 4:
      // console.log('output', operandA);
      output.push(operandA);

      if (output.length === 3) {
        // console.log('output', output);
        x = output[0];
        y = output[1];

        if (x === -1 && y === 0) {
          score = output[2]
          // console.log('score', operandA);
        } else {
          let t = tiles.find(tile => tile.x === x && tile.y === y)
          if (!t) {
            tiles.push(new Tile(x, y, operandA))
          } else {
            t.id = operandA
          } 
          if (operandA === 3) {
            // console.log('moving paddle');
            let paddle = tiles.find(tile => tile.id === 3)
            paddle.x = x;
            paddle.y = y
          } else if (operandA === 4) {
            let ball = tiles.find(tile => tile.id === 4)
            ball.x = x;
            ball.y = y;
          }
        }
        output = [];
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
  console.log(score);
  drawGrid();
}



// console.log(tiles);

function drawGrid() {
  let ret = ''
  for (let y = 0; y <= 22; y++) {
    for (let x = 0; x <= 42; x++) {
      let tile = tiles.find(tile => tile.x === x && tile.y === y)
      if (tile) {
        switch(tile.id) {
          case 0:
            ret+= ' ';
            break;
          case 1:
            ret+= '|';
            break;
          case 2:
            ret += '#';
            break;
          case 3:
            ret += '_'
            break;
          case 4:
            ret += 'o';
            break;
        }
      }
    }
    ret+= '\n'
  }
  console.log(ret);
}



console.log(score);