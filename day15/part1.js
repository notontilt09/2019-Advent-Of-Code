const fs = require('fs')

let input = fs.readFileSync('input.txt').toString().split(',').map(Number)

const reverse = direction => {
  switch(direction) {
    case 'n':
      return 's';
    case 's':
      return 'n';
    case 'e':
      return 'w';
    case 'w':
      return 'e';
  }
}

let pc = 0;
let relBase = 0;

// grid containing information of where robot has been and what is at each location
let grid = {}
for (let i = -30; i < 30; i++) {
  for (let j = -30; j < 30; j++) {
    grid[`${i},${j}`] = {'n': '?', 's': '?', 'e': '?', 'w': '?', 'goal': false, 'me': '#'}
  }
}
currX = 0;
currY = 0;
grid[`${currX},${currY}`]['me'] = 'S'
// console.log(grid)
let move;
// main program loop
const findGoal = () => {
  while (true) {
    // console.log('currentMove', move);
    // console.log(`currX: ${currX}, currY: ${currY}`);
    // console.log(grid[`${currX},${currY}`])
    // console.log(grid);
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
        let moveInput;
        const possibleMoves = Object.keys(grid[`${currX},${currY}`]).filter(move => grid[`${currX},${currY}`][move] === '?')
        if (possibleMoves.length) {
          move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
          switch (move) {
            case 'n':
              moveInput = 1;
              break;
            case 's':
              moveInput = 2;
              break;
            case 'w':
              moveInput = 3;
              break;
            case 'e':
              moveInput = 4;
              break;
          }
        } else {
          // console.log(`fully explored room ${currX}, ${currY}, making a random move`)
          // if we get here, we know everything about the current room.  let's just move in a random possible direction
          const possibleMoves = Object.keys(grid[`${currX},${currY}`]).filter(move => grid[`${currX},${currY}`][move] === '.')
          move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
          console.log('moving randomly at', currX, currY);
          switch (move) {
            case 'n':
              moveInput = 1;
              break;
            case 's':
              moveInput = 2;
              break;
            case 'w':
              moveInput = 3;
              break;
            case 'e':
              moveInput = 4;
              break;
          }
        }


        if (modeParam1 === 2) {
          input[input[pc+1] + relBase] = moveInput;
        } else {
          input[input[pc+1]] = moveInput;
        }
        pc += 2;
        break;
      case 4:
        // console.log('output', operandA)
        if (operandA === 0) {
          // console.log('hit a wall')
          switch(move) {
            case 'n':
              // console.log('inside output switch');
              grid[`${currX},${currY}`]['n'] = '#'
              break;
            case 's':
              grid[`${currX},${currY}`]['s'] = '#'
              break;
            case 'e':
              grid[`${currX},${currY}`]['e'] = '#'
              break;
            case 'w':
              grid[`${currX},${currY}`]['w']= '#'
              break;
          }
        } else if (operandA === 1) {
          // console.log(`succesful move to the ${move}`)
          switch(move) {
            case 'n':
              if (currX !== 0 && currY !== 0) {
                grid[`${currX},${currY}`]['me']= '.'
              }
              grid[`${currX},${currY}`][move]= '.'
              grid[`${currX},${currY+1}`][reverse(move)] = '.'
              currY += 1;
              break;
            case 's':
              if (currX !== 0 && currY !== 0) {
                grid[`${currX},${currY}`]['me']= '.'
              }
              grid[`${currX},${currY}`][move]= '.'
              grid[`${currX},${currY-1}`][reverse(move)] = '.'
              currY -= 1;
              break;
            case 'e':
              if (currX !== 0 && currY !== 0) {
                grid[`${currX},${currY}`]['me']= '.'
              }
              grid[`${currX},${currY}`][move]= '.'
              grid[`${currX+1},${currY}`][reverse(move)] = '.'
              currX += 1;
              break;
            case 'w':
              if (currX !== 0 && currY !== 0) {
                grid[`${currX},${currY}`]['me']= '.'
              }
              grid[`${currX},${currY}`][move]= '.'
              grid[`${currX-1},${currY}`][reverse(move)] = '.'
              currX -= 1;
              break;
          }
        } else if (operandA === 2) {
          // console.log('FOUND GOAL')
          switch(move) {
            case 'n':
              grid[`${currX},${currY+1}`]['goal']= true
              break;
            case 's':
              grid[`${currX},${currY-1}`]['goal']= true
              break;
            case 'e':
              grid[`${currX+1},${currY}`]['goal']= true
              break;
            case 'w':
              grid[`${currX-1},${currY}`]['goal']= true
              break;
          }
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
      case 99:
        console.log('HALT INSTRUCTION RECEIVED');
        for (let room in grid) {
          if (grid[room]['goal']) {
            console.log(`GOAL AT ${room}`)
          }
        }
        return grid;
      default:
        console.log(`Unhandled instruction ${input[pc]} at position ${pc}`)
        break;
    }
  }
}



findGoal();
// console.log(grid);

let ret = ''

for (let i = -30; i < 30; i++) {
  for (let j = -30; j < 30; j++) {
    ret += grid[`${i},${j}`]['me']
  }
  ret += '\n'
}

console.log(ret);