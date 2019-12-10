with open('input1.txt') as f:
  raw = f.readline()
  memory = [int(x) for x in raw.split(',')]

def reset():
  with open('input1.txt') as f:
    raw = f.readline()
    return [int(x) for x in raw.split(',')]

for i in range(100):
  for j in range(100):
    memory = reset()
    pc = 0
    memory[1] = i
    memory[2] = j


    while memory[pc] != 99:
      instruction = memory[pc]
      operandA = memory[memory[pc + 1]]
      operandB = memory[memory[pc + 2]]
      operandC = memory[pc + 3]

      # debug
      # print(f'pc: {pc}, memory[pc]: {memory[pc]}, opA: {operandA}, opB: {operandB}, opC: {operandC}')

      if instruction == 1:
        memory[operandC] = operandA + operandB
        pc += 4
      elif instruction == 2:
        memory[operandC] = operandA * operandB
        pc += 4
      else:
        print(f'Invalid instruction {memory[pc]}')
    
    if memory[0] == 19690720:
      print(100 * i + j)
