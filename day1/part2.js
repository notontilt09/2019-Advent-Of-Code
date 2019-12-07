const fs = require('fs');

let input = fs.readFileSync('input2.txt').toString().split('\n');
input = input.map(num => parseInt(num));

let result = 0;

const recurseMe = fuel => {
  if (fuel < 9) {
    return 0
  } else {
    let current = Math.floor(fuel / 3) - 2;
    return current + recurseMe(current);
  }
}

const dontRecurse = fuel => {
  let result = 0;
  while (fuel > 9) {
    let temp = Math.floor(fuel / 3) - 2;
    result += temp;
    fuel = temp;
  }

  return result
}

input.forEach(val => {
  result += dontRecurse(val);
})

console.log(result);