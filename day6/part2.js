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

// need distance of shortest path from '5RP' to '88Q', the planets santa and we are orbiting

// data now an array of length 2 arrays.  arr[0] is the orbitee, arr[1] orbiter
let data = fs.readFileSync('input.txt').toString().split('\n').map(item => [item.split(')')[0], item.split(')')[1]]);

// build graph of network.  This time graph is non-directional
const graph = {};

for (let item of data) {
  if (!graph[item[0]]) {
    graph[item[0]] = new Set();
  }
  if (!graph[item[1]]) {
    graph[item[1]] = new Set();
  }
}

// build the graph
for (let i = 0; i < data.length; i++) {
  let orbitee = data[i][1];
  let orbiter = data[i][0];
  graph[orbitee].add(orbiter)
  graph[orbiter].add(orbitee);
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

// part2 answer
console.log(bfs('5RP', '88Q'))