const fs = require('fs');

class Queue {
  constructor() {
    this.storage = []
  }

  enqueue(element) {
    this.storage.push(element)
  }

  dequeue() {
    if (!this.storage.length) {
      return 'Empty Queue'
    } else {
      return this.storage.shift();
    }
  }
}

// data now an array of length 2 arrays.  arr[0] is the orbitee, arr[1] orbiter
let data = fs.readFileSync('input.txt').toString().split('\n').map(item => [item.split(')')[0], item.split(')')[1]]);

// build graph of network.  Answer will be the sum of the shortest paths from 'COM' to each node
const graph = {};

for (let item of data) {
  graph[item[0]] = [];
}

// build the graph
for (let i = 0; i < data.length; i++) {
  let orbitee = data[i][1];
  let orbiter = data[i][0];
  graph[orbiter].push(orbitee)
}

// bfs algo to find length of shortest path between two points
const bfs = (start, end) => {
  const visited = new Set();

  const q = new Queue();

  q.enqueue([start]);

  while(q.storage.length) {
    let v = q.dequeue()
    let node = v[v.length - 1]
    // console.log(node);
    if (!visited.has(node) && graph[node]) {
      for (let neighbor of graph[node]) {
        let path = [...v]
        path.push(neighbor)
        q.enqueue(path)
        if (neighbor === end) {
          // return length of path from start to end
          return path.length - 1
        }
      }
      visited.add(node)
    }
  }
}

let allObjects = new Set();

for (let item of data) {
  if (item !== 'COM') {
    allObjects.add(item[0])
    allObjects.add(item[1])
  }
}

let count = 0

for (let object of allObjects) {
  if (object !== 'COM') {
    count += bfs('COM', object);
  }
}

// part1 answer
console.log(count);






