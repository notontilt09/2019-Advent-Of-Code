let min = 372304;
let max = 847060;

const hasGoodDouble = str => {
  const seq = {};
  for (let digit of str) {
    if (seq[digit]) {
      seq[digit]++
    } else {
      seq[digit] = 1
    }
  }
  
  let twoOccurences = [];
  for (let dig in seq) {
    if (seq[dig] === 2) {
      twoOccurences.push(dig)
    }
  }

  let pass = false;
  
  for (let occurence of twoOccurences) {
    for (let i = 0; i < str.length - 1; i++) {
      if (str[i] === occurence && str[i+1] === occurence) {
        pass = true;
      }
    }

  }

  return pass;
}

const noDecrease = str => {
  return str === str.split('').sort((a, b) => a - b).join('');
}

let count = 0;

for (let i = min; i <= max; i++) {
  let str = i.toString();
  if (hasGoodDouble(str) && noDecrease(str)) {
    count++;
  }
}

console.log(count);