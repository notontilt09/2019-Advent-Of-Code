const fs = require('fs')
const Combinatorics = require('js-combinatorics');



let data = fs.readFileSync('input.txt').toString().split(',').map(num => parseInt(num));

// console.log(data);

// we'll need to check every permutation of this array
let phaseSettings = [5, 6, 7, 8, 9];
const cmb = Combinatorics.permutation(phaseSettings);

const possibleAnswers = [];

const run = (input, pc, usePhase, phase, ampOutputs) => {
  // main INTCODE computer loop
  while (true) {
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
          input[input[pc+1]] = phase;
          usePhase = false;
        } else {
          input[input[pc+1]] = ampOutputs;
        }
        pc += 2;
        break;
      case 4:
        // console.log('output', operandA)
        pc += 2;
        return { output: operandA, ramOut: input, pcOut: pc }
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
        break;
      case 99:
        return { output: null, ramOut: input, pcOut: pc }
        break;
      default:
        console.log(`Unhandled instruction ${input[pc]} at position ${pc}`)
        break;
    }
  }
}

// throw all logic inside the FOR ...  OF to run program with each permutation
for (let perm of cmb.toArray()) {
  // boolean to let us know whether to use phase input, or previous output
  // array to keep track of all amp outputs, most recent is at last index.  starting output is 0
  let ampOutputs = [0]
  // each amp has it's own memory this time
  let rams = {
    0: [...data],
    1: [...data],
    2: [...data],
    3: [...data],
    4: [...data]
  }
  // each amp needs own program counter
  let pcs = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  }

  let feedback = true
  let usePhase = true
  // keep running this until we toggle feeback to false
  while(feedback) {
    // run program for each amp
    for (let i = 0; i < 5; i++) {
      // get correct ram and pc
      let input = rams[i];
      let pc = pcs[i];
      
      let { output, ramOut, pcOut } = run(input, pc, usePhase, perm[i], ampOutputs[ampOutputs.length - 1]);

      rams[i] = ramOut;
      pcs[i] = pcOut;

      if (!output) {
        feedback = false
      } else {
        ampOutputs.push(output);
      }
    }
    usePhase = false;
  }
  // add this output to our possibleAnswers array
  possibleAnswers.push(ampOutputs[ampOutputs.length - 1])
}

console.log(possibleAnswers);
console.log(possibleAnswers.sort((a, b) => b - a)[0])