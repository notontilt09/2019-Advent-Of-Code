const fs = require('fs');

let input = fs.readFileSync('input1.txt').toString().split('\n');
input = input.map(num => parseInt(num));

let result = 0;

input.forEach(val => {
  result += Math.floor(val / 3) - 2;
})

console.log(result);


