const fs = require('fs');

let input = fs.readFileSync('input.txt').toString().split('\n');


// function to deal into new stack
function dealIntoNewStack(cards) {
  return cards.reverse();
}

function cut(cards, amount) {
  if (amount > 0) {
    return [...cards.slice(amount), ...cards.slice(0, amount)];
  } else if (amount < 0) {
    const distFromEnd = cards.length - Math.abs(amount);
    return [...cards.slice(distFromEnd), ...cards.slice(0, distFromEnd)]
  } else {
    return cards
  }
}

function dealIncrement(cards, n) {
  let base = Array(cards.length).fill(null);
  let position = 0;
  let i = 0;
  while (base.includes(null)) {
    while (position < base.length) {
      base[position] = cards[i];
      i++;
      position += n;
      if (position > base.length) {
        position = position - base.length
      }
    }
  } 
  return base;
}


let deck = Array(10007).fill(0);
for (let i = 0; i < deck.length; i++) {
  deck[i] = i
}

function handleInput(deck, str) {
  let cmd = str.split(' ')
  switch (cmd[0]) {
    case 'cut':
      return cut(deck, cmd[1]);
    case 'deal':
      if (cmd[1] === 'with') {
        return dealIncrement(deck, Number(cmd[3]))
      } else {
        return dealIntoNewStack(deck);
      }
  }
}

for (let j = 0; j < input.length; j++) {
  deck = handleInput(deck, input[j])
}

console.log(deck.indexOf(2019));









