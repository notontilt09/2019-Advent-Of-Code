let min = 372304;
let max = 847060;

const hasDouble = str => {
  return str[0] === str[1] || str[1] === str[2] || str[2] === str[3] || str[3] === str[4] || str[4] === str[5]
}

const noDecrease = str => {
  return str === str.split('').sort((a, b) => a - b).join('');
}

let count = 0;

for (let i = min; i <= max; i++) {
  let str = i.toString();
  if (hasDouble(str) && noDecrease(str)) {
    count++;
  }
}

console.log(count);