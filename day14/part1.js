const fs = require('fs');

let data = fs.readFileSync('test3.txt').toString().split('\n');

console.log(data);

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

let need = {}

const produce = (name, amount) => {
  if (name === 'ORE') {
    return
  }

  let key = Object.keys(graph).find(key => key.split(' ')[1] === name);

  let formula = graph[key];
  // console.log('formula', formula);
  for (let item in formula) {
    // console.log(`key: ${key}, keyAmount: ${keyAmount}`)
    if (need[item]) {
      need[item] += formula[item] * amount
    } else {
      need[item] = formula[item] * amount
    }
    // console.log('need', need);
    produce(item, formula[item]);
  }
}

produce('FUEL', 1);
console.log(need);

let ore = 0;

for (let item in need) {
  for (let key of Object.keys(graph)) {
    if (key.includes(item) && graph[key]['ORE']) {
      let amount = need[item];
      let keyAmount = parseInt(key.split(' ')[0])
      let oreAmount = graph[key]['ORE'];
      console.log(item, amount, keyAmount, oreAmount)
      ore += Math.ceil(amount / keyAmount) * oreAmount
    }
  }
}

console.log(ore);
