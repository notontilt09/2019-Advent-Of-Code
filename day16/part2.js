const fs = require('fs');

let input = fs.readFileSync('input.txt').toString()
input = [...input.repeat(10000)].map(Number);
const offset = Number(input.slice(0,7).join(''))
input = input.slice(offset);


const phaseOffset = start => {
  for (let i = start.length - 1; i >= 0; i--) {
    start[i] = ((start[i+1]  || 0) + start[i]) % 10
  }
  return start
}

for (let i = 0; i < 100; i++) {
  input = phaseOffset(input);
}

console.log(Number(input.slice(0, 8).join('')))




