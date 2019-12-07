const fs = require('fs')
const Combinatorics = require('js-combinatorics');



let data = fs.readFileSync('input.txt').toString().split(',').map(num => parseInt(num));

// console.log(data);

// we'll need to check every permutation of this array
let phaseSettings = [0, 1, 2, 3, 4];
const cmb = Combinatorics.permutation(phaseSettings);

const possibleAnswers = [];

// throw all logic inside the FOR ...  OF to run program with each permutation
for (let perm of cmb.toArray()) {
  // boolean to let us know whether to use phase input, or previous output
  let usePhase = true;
  // array to keep track of all amp outputs, most recent is at last index.  starting output is 0
  let ampOutputs = [0]
  // run program for each amp
  for (let i = 0; i < 5; i++) {
    console.log(`In amp ${i + 1}`)
    console.log(ampOutputs);
    // reset the memory
    let input = [...data];
    let pc = 0
    // main INTCODE computer loop
    while (input[pc] !== 99) {
      // convert instruction to string to slice off opCode and operand modes
      let opString = input[pc].toString();
    
      // grab opCode
      let opCode = parseInt(opString.slice(opString.length - 2));
      
      // determine mode of parameter, 3rd parameter mode always 0
      let modeParam1 = opString.length > 2 ? parseInt(opString[opString.length - 3]) : 0;
      let modeParam2 = opString.length > 3 ? parseInt(opString[opString.length - 4]) : 0;
    
      // determine parameters based on their mode
      let operandA = modeParam1 ? input[pc + 1] : input[input[pc + 1]];
      let operandB = modeParam2 ? input[pc + 2] : input[input[pc + 2]];
      let operandC = input[pc + 3];
    
      // debug trace
      // console.log(`pc: ${pc}, input[pc], ${input[pc]}, opString: ${opString}, opCode: ${opCode}, mode1: ${modeParam1}, mode2: ${modeParam2}`)
    
      switch(opCode) {
        case 1:
          input[operandC] = operandA + operandB;
          pc += 4;
          break;
        case 2:
          input[operandC] = operandA * operandB;
          pc += 4;
          break;
        case 3:
          if (usePhase) {
            input[input[pc+1]] = perm[i];
            usePhase = false;
          } else {
            input[input[pc+1]] = ampOutputs[ampOutputs.length - 1]
            usePhase = true;
          }
          pc += 2;
          break;
        case 4:
          console.log('output', operandA)
          ampOutputs.push(operandA);
          pc += 2;
          break;
        case 5:
          pc = operandA !== 0 ? operandB : pc += 3;;
          break;
        case 6:
          pc = operandA === 0 ? operandB : pc += 3;
          break;
        case 7:
          input[operandC] = operandA < operandB ? 1 : 0
          pc += 4;
          break;
        case 8:
          input[operandC] = operandA === operandB ? 1 : 0;
          pc += 4;
        default:
          console.log(`Unhandled instruction ${input[pc]} at position ${pc}`)
          break;
      }
    }
  }
  // add this output to our possibleAnswers array
  possibleAnswers.push(ampOutputs[ampOutputs.length - 1])
}

console.log(possibleAnswers.sort((a, b) => b - a)[0])





