with open('input1.txt') as f:
  raw = f.readline()
  memory = [int(x) for x in raw.split(',')]



pc = 0
memory[1] = 12
memory[2] = 2


while memory[pc] != 99:
  instruction = memory[pc]
  operandA = memory[memory[pc + 1]]
  operandB = memory[memory[pc + 2]]
  operandC = memory[pc + 3]

  # debug
  print(f'pc: {pc}, memory[pc]: {memory[pc]}, opA: {operandA}, opB: {operandB}, opC: {operandC}')

  if instruction == 1:
    memory[operandC] = operandA + operandB
    pc += 4
  elif instruction == 2:
    memory[operandC] = operandA * operandB
    pc += 4
  else:
    print(f'Invalid instruction {memory[pc]}')

print(memory[0])




