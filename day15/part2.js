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
    grid[`${j},${i}`] = {'n': '?', 's': '?', 'e': '?', 'w': '?', 'goal': false, 'me': '#'}
  }
}
X = 0;
Y = 0;
grid[`${X},${Y}`]['me'] = 'S'
// console.log(grid)
let move;
// main program loop
const findGoal = () => {
  while (true) {
    // console.log('currentMove', move);
    // console.log(`X: ${X}, Y: ${Y}`);
    // console.log(grid[`${X},${Y}`])
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
        const unknowns = Object.keys(grid[`${X},${Y}`]).filter(move => grid[`${X},${Y}`][move] === '?')
        // console.log(`currently at ${X},${Y}`);
        // console.log(`grid[here]: ${JSON.stringify(grid[`${X},${Y}`])}`);
        if (unknowns.length) {
          move = unknowns[Math.floor(Math.random() * unknowns.length)]
          // console.log('attempting to move', move);
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
          // console.log(`fully explored room ${X}, ${Y}, making a random move`)
          // if we get here, we know everything about the current room.  let's just move in a random possible direction
          const possibleMoves = Object.keys(grid[`${X},${Y}`]).filter(move => grid[`${X},${Y}`][move] === '.' && move !== 'me')
          move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
          // console.log(possibleMoves, move)
          // console.log('moving randomly at', X, Y);
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
        // console.log('output', operandA, 'move', move);
        if (operandA === 0) {
          // console.log('hit a wall')
          switch(move) {
            case 'n':
              // console.log('inside output switch');
              grid[`${X},${Y}`]['n'] = '#'
              grid[`${X},${Y+1}`]['me'] = '#'
              break;
            case 's':
              grid[`${X},${Y}`]['s'] = '#'
              grid[`${X},${Y-1}`]['me'] = '#'
              break;
            case 'e':
              grid[`${X},${Y}`]['e'] = '#'
              grid[`${X+1},${Y}`]['me'] = '#'
              break;
            case 'w':
              grid[`${X},${Y}`]['w']= '#'
              grid[`${X-1},${Y}`]['me'] = '#'
              break;
          }
        } else if (operandA === 1) {
          // console.log(`succesful move to the ${move}`)
          switch(move) {
            case 'n':
              grid[`${X},${Y+1}`]['me']= '.'
              grid[`${X},${Y}`][move]= '.'
              grid[`${X},${Y+1}`][reverse(move)] = '.'
              Y += 1;
              break;
            case 's':
              grid[`${X},${Y-1}`]['me']= '.'
              grid[`${X},${Y}`][move]= '.'
              grid[`${X},${Y-1}`][reverse(move)] = '.'
              Y -= 1;
              break;
            case 'e':
              grid[`${X+1},${Y}`]['me']= '.'
              grid[`${X},${Y}`][move]= '.'
              grid[`${X+1},${Y}`][reverse(move)] = '.'
              X += 1;
              break;
            case 'w':
              grid[`${X-1},${Y}`]['me']= '.'
              grid[`${X},${Y}`][move]= '.'
              grid[`${X-1},${Y}`][reverse(move)] = '.'
              X -= 1;
              break;
          }
        } else if (operandA === 2) {
          // console.log('FOUND GOAL')
          switch(move) {
            case 'n':
              grid[`${X},${Y+1}`]['goal']= true
              Y += 1;
              return grid;
              break;
            case 's':
              grid[`${X},${Y-1}`]['goal']= true
              Y -= 1;
              return grid;
              break;
            case 'e':
              grid[`${X+1},${Y}`]['goal']= true
              X += 1;
              return grid;
              break;
            case 'w':
              grid[`${X-1},${Y}`]['goal']= true
              X -=1;
              return grid;
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


for (let room in grid) {
  if (grid[room]['goal']) {
    console.log(`goal at ${room}`)
    grid[room]['me'] = 'O'
  }
}

const printGrid = () => {
  let ret = ''
  
  for (let i = 29; i > -30; i--) {
    for (let j = -29; j < 30; j++) {
      ret += grid[`${j},${i}`]['me']
    }
    ret += '\n'
  }

  console.log(ret);

}

printGrid();


// now flood-fill the grid starting at oxygen and count how many iterations to finish to get time to fill entire grid

class Queue {
  constructor() {
    this.storage = []
  }

  enqueue(element) {
    this.storage.push(element)
  }

  dequeue() {
    if (!this.storage.length) {
      return 'Empty Queue'
    } else {
      return this.storage.shift();
    }
  }
}

const floodFill = start => {
  const visited = new Set();
  const q = new Queue()
  let time = 0;

  q.enqueue([start])

  let totalSpots = 0;
  let totalOxygen = 0;

  for (let room in grid) {
    if (grid[room]['me'] !== '#') {
      totalSpots++;
    }
  }
  
  for (let room in grid) {
    if (grid[room]['me'] == 'O') {
      totalOxygen++;
    }
  }
  console.log(totalSpots, totalOxygen);

  while(totalOxygen !== totalSpots) {
    let v = q.dequeue();
    let node = v[v.length - 1]

    if (!visited.has(node) && grid[node]) {
      let nodeArr = node.split(',').map(Number);
        // console.log(nodeArr);
      let neighbors = [
        `${nodeArr[0]},${nodeArr[1]+1}`,
        `${nodeArr[0]},${nodeArr[1]-1}`,
        `${nodeArr[0]+1},${nodeArr[1]}`,
        `${nodeArr[0]-1},${nodeArr[1]}`,
      ];

      for (let neighbor of neighbors) {
        if (!['#', 'O'].includes(grid[neighbor]['me'])) {
          let path = [...v]
          path.push(neighbor)
          q.enqueue(path)
          grid[neighbor]['me'] = 'O'
          totalOxygen++;
        }
      }
      visited.add(node);
      time++;
      // printGrid();
      
    }
  }
  
  return time

}

console.log(floodFill('-20,-18'));