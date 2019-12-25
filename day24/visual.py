from os import system
from time import sleep

input = ''

with open('input.txt') as data:
  for line in data:
    input += line


def getCounts(phaseStr):
  phase = phaseStr.split('\n')
  result = []
  for i in range(len(phase)):
    row = []
    for j in range(len(phase[0])):
      surrounding = 0
      # north
      if i > 0 and phase[i-1][j] == '#':
        surrounding += 1
      # south
      if i < len(phase) - 1 and phase[i+1][j] == '#':
        surrounding += 1
      # west
      if j > 0 and phase[i][j-1] == '#':
        surrounding += 1
      # east
      if j < len(phase[0]) - 1 and phase[i][j+1] == '#':
        surrounding += 1
      row.append(surrounding)
    result.append(row)

  return result


def getNextPhase(oldPhase):
  result = ''
  counts = getCounts(oldPhase)
  phase = oldPhase.split('\n')
  for i in range(len(counts)):
    for j in range(len(counts[0])):
      # if bug, dies unless surrounding is 1 bug
      if phase[i][j] == '#':
        if counts[i][j] == 1:
          result += '#'
        else:
          result += '.'
      else:
        # empty becomes bug if surrounding is 1 or 2 bugs
        if counts[i][j] == 1 or counts[i][j] == 2:
          result += '#'
        else:
          result += '.'
    if i < len(counts) - 1:
      result += '\n'

  return result


def getFirstRepeated(phase):
  system('clear')
  # set of all configuration we've seen, will stop lifecycles when we repeat
  seen = set()
  seen.add(phase)

  while True:
    print(phase)
    sleep(0.1)
    phase = getNextPhase(phase)
    system('clear')
    if phase in seen:
      return phase
    else:
      seen.add(phase)

print(getFirstRepeated(input))

def getBioRating(phase):
  phaseStr = ''.join(phase.split('\n'))
  result = 0
  for i in range(len(phaseStr)):
    if phaseStr[i] == '#':
      result += 2**i

  return result


def part1(inputPhase):
  return getBioRating(getFirstRepeated(input))

