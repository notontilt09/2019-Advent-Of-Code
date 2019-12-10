with open('input1.txt') as f:
  data = f.read()
  wire1, wire2 = data.split('\n')
  wire1, wire2 = [w.split(',') for w in [wire1, wire2]]


def getAllPoints(wire):
  wirePoints = set()
  wireCurrent = [0, 0]

  for move in wire:
    direction = move[0:1]
    amount = int(move[1:])

    if direction == 'R':
      for i in range(amount + 1):
        wirePoints.add((wireCurrent[0] + i, wireCurrent[1]))
      wireCurrent = [wireCurrent[0] + amount, wireCurrent[1]]

    if direction == 'L':
      for i in range(amount + 1):
        wirePoints.add((wireCurrent[0] - i, wireCurrent[1]))
      wireCurrent = [wireCurrent[0] - amount, wireCurrent[1]]

    if direction == 'U':
      for i in range(amount + 1):
        wirePoints.add((wireCurrent[0], wireCurrent[1] + i))
      wireCurrent = [wireCurrent[0], wireCurrent[1] + amount]

    if direction == 'D':
      for i in range(amount + 1):
        wirePoints.add((wireCurrent[0], wireCurrent[1] - i))
      wireCurrent = [wireCurrent[0], wireCurrent[1] - amount]

  return wirePoints

wire1Points = getAllPoints(wire1)
wire2Points = getAllPoints(wire2)


intersection = wire1Points.intersection(wire2Points)

distances = [abs(point[0]) + abs(point[1]) for point in intersection if point]

print(sorted(distances)[1])





