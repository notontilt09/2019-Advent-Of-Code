total = 0

with open('input1.txt') as data:
  for line in data:
    total += int(line) // 3 - 2

print(total)