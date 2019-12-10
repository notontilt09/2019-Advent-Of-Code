total = 0

def getFuel(start):
  if start < 9:
    return 0
  else:
    next_fuel = int(start) // 3 - 2
    return next_fuel + getFuel(next_fuel)

with open('input1.txt') as data:
  for line in data:
    total += getFuel(int(line))

print(total)


