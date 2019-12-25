const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().split('\n')

// console.log(input);


/**
 * find coordinates of both side of the portal given letters
 * 
 * @param {str} letters // i.e. ['A', 'B']
 *
 * 
 * return coordinates of both side of the portal
 */
function findPortalCoords(letters) {
  let first = letters[0];
  let second = letters[1];
  let result = [];

  for (let i = 0; i < input.length - 1; i++) {
    for (let j = 0; j < input[0].length - 1; j++) {
      // coordinate is the first letter
      if (input[i][j] === first) {
        // coordinate below is 2nd letter
        if (input[i+1][j] === second) {
          // if path below
          if (input[i+2] && input[i+2][j] === '.') {
            result.push(`${j},${i+2}`);
          // if path above
          } else if (input[i-1][j] === '.') {
            result.push(`${j},${i-1}`);
          }
        // coordinate to right is 2nd letter
        } else if (input[i][j+1] === second) {
          // if path to right
          if (input[i][j+2] && input[i][j+2] === '.') {
            result.push(`${j+2},${i}`);
          // if path to left
          } else if (input[i][j-1] === '.' ) {
            result.push(`${j-1},${i}`);
          }
        }
      }
    }
  }

  return result
}

// build the  graph 
let graph = {}
let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let portalPoints

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === '.') {
      graph[`${j},${i}`] = new Set()
      if (input[i+1][j] === '.') {
        graph[`${j},${i}`].add(`${j},${i+1}`)
      }
      // at outer bottom or inner top portal
      if (alphabet.includes(input[i+1][j])) {
        // find the portal points for this portal
        portalPoints = findPortalCoords([input[i+1][j], input[i+2][j]])
        // add the point that is not the one we're currently evaluting
        if (portalPoints.find(point => point !== `${j},${i}`)) {
          graph[`${j},${i}`].add(portalPoints.find(point => point !== `${j},${i}`))
        }
      }
      if (input[i-1][j] === '.') {
        graph[`${j},${i}`].add(`${j},${i-1}`)
      }
      // at outer top or inner bottom portal
      if (alphabet.includes(input[i-1][j])) {
        // find the portal points for this portal
        portalPoints = findPortalCoords([input[i-2][j], input[i-1][j]])
        // add the point that is not the one we're currently evaluting
        if (portalPoints.find(point => point !== `${j},${i}`)) {
          graph[`${j},${i}`].add(portalPoints.find(point => point !== `${j},${i}`))
        }
      }
      if (input[i][j+1] === '.') {
        graph[`${j},${i}`].add(`${j+1},${i}`)
      }
      // at outer right or inner left portal
      if (alphabet.includes(input[i][j+1])) {
        // find the portal points for this portal
        portalPoints = findPortalCoords([input[i][j+1], input[i][j+2]])
        // add the point that is not the one we're currently evaluting
        if (portalPoints.find(point => point !== `${j},${i}`)) {
          graph[`${j},${i}`].add(portalPoints.find(point => point !== `${j},${i}`))
        }
      }
      if (input[i][j-1] === '.') {
        graph[`${j},${i}`].add(`${j-1},${i}`)
      }
      // at outer left or inner right portal
      if (alphabet.includes(input[i][j-1])) {
        // find the portal points for this portal
        portalPoints = findPortalCoords([input[i][j-2], input[i][j-1]])
        // add the point that is not the one we're currently evaluting
        if (portalPoints.find(point => point !== `${j},${i}`)) {
          graph[`${j},${i}`].add(portalPoints.find(point => point !== `${j},${i}`))
        }
      }
    }
  }
}

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

/// now BFS from AA (67, 2) to ZZ (39,2)
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

console.log(bfs('67,2','39,2'))




