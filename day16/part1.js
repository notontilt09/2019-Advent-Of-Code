const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split('').map(Number);

const findPatternForIndex = (index, reqLength) => {
  let first = Array(index+1).fill(0);
  let second = Array(index+1).fill(1);
  let third = Array(index+1).fill(0);
  let fourth = Array(index+1).fill(-1);
  let base = first.concat(second).concat(third).concat(fourth)

  let pattern = [];
  
  while (pattern.length < reqLength + 1) {
    pattern = pattern.concat(base);
  }
  
  return pattern.slice(1, reqLength + 1);
}

const performPhase = input => {
  let output = [];
  for (let i = 0; i < input.length; i++) {
    let pattern = findPatternForIndex(i, input.length);
    let res = 0;
    for (let j = 0; j < pattern.length; j++) {
      res += input[j] * pattern[j]
    }
    output.push(Math.abs(res % 10))
  }

  return output
}

const recurseNtimes = (start, n, curr) => {
  // console.log('start', start);
  if (n === curr) {
    return start
  } else {
    curr += 1
    let out = performPhase(start)
    // console.log('out', out);
    return recurseNtimes(out, n, curr);
  }
}

const answer = recurseNtimes(input, 100, 0);
// console.log(answer)
console.log(Number(answer.slice(0, 8).join('')));



