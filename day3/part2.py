with open('input1.txt') as f:
  data = f.read()
  wire1, wire2 = data.split('\n')
  wire1, wire2 = [w.split(',') for w in [wire1, wire2]]


def getAllPointsAndSteps(wire):
  wirePoints = {}
  wireCurrent = [0, 0]
  steps = 0

  for move in wire:
    direction = move[0:1]
    amount = int(move[1:])

    if direction == 'R':
      for i in range(1, amount + 1):
        steps += 1
        wirePoints[(wireCurrent[0] + i, wireCurrent[1])] = steps
      wireCurrent = [wireCurrent[0] + amount, wireCurrent[1]]

    if direction == 'L':
      for i in range(1, amount + 1):
        steps += 1
        wirePoints[(wireCurrent[0] - i, wireCurrent[1])] = steps
      wireCurrent = [wireCurrent[0] - amount, wireCurrent[1]]

    if direction == 'U':
      for i in range(1, amount + 1):
        steps += 1
        wirePoints[(wireCurrent[0], wireCurrent[1] + i)] = steps
      wireCurrent = [wireCurrent[0], wireCurrent[1] + amount]

    if direction == 'D':
      for i in range(1, amount + 1):
        steps += 1
        wirePoints[(wireCurrent[0], wireCurrent[1] - i)] = steps
      wireCurrent = [wireCurrent[0], wireCurrent[1] - amount]


  return wirePoints

wire1Points = getAllPointsAndSteps(wire1)
wire2Points = getAllPointsAndSteps(wire2)

closest = 1000000000000

intersection = [point for point in wire1Points if point in wire2Points]

for point in intersection:
  if wire1Points[point] + wire2Points[point] < closest:
    closest = wire1Points[point] + wire2Points[point]

print(closest)
