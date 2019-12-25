const fs = require('fs');

let input = fs.readFileSync('test.txt').toString();
console.log(input, '\n');

function getCounts(phaseStr) {
  let phase = phaseStr.split('\n')
  let result = [];
  for (let i = 0; i < phase.length; i++) {
    let row = [];
    for (let j = 0; j < phase[0].length; j++) {
      let surrounding = 0;
      if (phase[i-1] && phase[i-1][j] === '#') {
        surrounding++;
      }
      if (phase[i+1] && phase[i+1][j] === '#') {
        surrounding++;
      }
      if (phase[i][j-1] && phase[i][j-1] === '#') {
        surrounding++;
      }
      if (phase[i][j+1] && phase[i][j+1] === '#') {
        surrounding++;
      }
      row.push(surrounding);
    }
    result.push(row);
  }
  return result;
}

function getNextPhase(oldPhase) {
  let result = ''
  let counts = getCounts(oldPhase);
  let phase = oldPhase.split('\n')
  for (let i = 0; i < counts.length; i++) {
    for (let j = 0; j < counts[0].length; j++) {
      // if bug, dies unless surrounding is 1 bug
      if (phase[i][j] === '#') {
        if (counts[i][j] === 1) {
          result += '#';
        } else {
          result += '.'
        }
      } else {
        // empty becomes bug if surrounding is 1 or 2 bugs
        if (counts[i][j] === 1 || counts[i][j] === 2) {
          result += '#'
        } else {
          result += '.'
        }
      }
    }
    if (i < counts.length - 1) {
      result += '\n'
    }
  }
  return result
}

function getFirstRepeated(phase) {
  // set of all configuration we've seen, will stop lifecycles when we repeat
  let seen = new Set();
  seen.add(phase);
  console.log(phase);

  while (true) {
    console.clear()
    phase = getNextPhase(phase);
    console.log(phase);
    if (seen.has(phase)) {
      return phase
    } else {
      seen.add(phase);
    }
  }
}

getFirstRepeated(input);

function getBioRating(phase) {
  let phaseStr = phase.split('\n').join('');
  let result = 0;
  for (let i = 0; i < phaseStr.length; i++) {
    if (phaseStr[i] === '#') {
      result += Math.pow(2, i);
    }
  }
  return result;
}


function part1(inputPhase) {
  return getBioRating(getFirstRepeated(input))
}

// console.log(part1(input))