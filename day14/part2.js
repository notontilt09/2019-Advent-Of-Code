const fs = require('fs');

let data = fs.readFileSync('input.txt').toString().split('\n');

// console.log(data);

let graph = {};

for (let reaction of data) {
  let input = reaction.trim().split(' => ')[0]
  let output = reaction.trim().split(' => ')[1]
  graph[output] = {};
  for (let item of input.split(', ')) {
    let amount = item.split(' ')[0]
    let mineral = item.split(' ')[1]
    graph[output][mineral] = parseInt(amount)
  }
}

console.log(graph);

let keyAmounts = {};

for (let key of Object.keys(graph)) {
  keyAmounts[key.split(' ')[1]] = Number(key.split(' ')[0])
}

// console.log(keyAmounts);


let inventory = {}

const produce = (name, amount) => {
  let ore = 0;
  let key = Object.keys(graph).find(key => key.split(' ')[1] === name);
  let formula = graph[key];
  let ratio = Math.ceil(amount / keyAmounts[name])

  for (let item in formula) {
    let qty = formula[item] * ratio;

    if (item === 'ORE') {
      ore += qty;
    } else {
      inventory[item] = inventory[item] || 0;
      if (inventory[item] < qty) {
        ore += produce(item, qty - inventory[item])
      }

      inventory[item] = inventory[item] - qty
    }
  }

  inventory[name] = (inventory[name] || 0) + (ratio * keyAmounts[name])
  // console.log(ore);
  return ore;
}



// binary search the right amount of fuel produced by 1e12 ORE
let low = 0
let high = 1<<30
let currOre;


while (low < high) {
  console.log(low, high);
  let mid = Math.floor((low + high) / 2);
  currOre = produce('FUEL', mid)
  console.log('currOre', currOre)
  if (currOre < 1e12) {
    low = mid + 1;
  } else {
    high = mid - 1;
  }
  console.log('new low', low, 'new high', high);
}

console.log(low)

