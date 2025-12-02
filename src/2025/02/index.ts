import { getInput, parseNumbersFromString } from "../../utils";

export function part1(input: string): unknown {
  const ids = parseNumbersFromString(input).map((id) => id.toString());
  const invalidIds = [];

  for (let i = 0; i < ids.length; i += 2) {
    const left = Number(ids[i]);
    const right = Number(ids[i + 1]);

    for (let id = left; id <= right; id++) {
      const invalidId = isInvalid(id.toString());
      if (invalidId) {
        invalidIds.push(id);
      }
    }
  }

  return invalidIds.map(Number).reduce((acc, val) => acc + val);
}

function isInvalid(id: string): boolean {
  if (id.length % 2 != 0) return false;

  const midpoint = Math.floor(id.length / 2);
  const left = id.substring(0, midpoint);
  const right = id.substring(midpoint);

  return left == right;
}

function isInvalidPart2(id: string): boolean {
  for (let i = 0; i < id.length; i++) {
    if (id.length % i === 0) {
      const sequence = id.substring(0, i);
      let hadValidSubsection = false;
      for (let j = i; j < id.length; j += i) {
        const toMatch = id.substring(j, j + i);
        if (sequence == toMatch) {
          continue;
        } else {
          hadValidSubsection = true;
          break;
        }
      }

      if (!hadValidSubsection) return true;
    }
  }

  return false;
}

export function part2(input: string): unknown {
  const ids = parseNumbersFromString(input).map((id) => id.toString());
  const invalidIds = [];

  for (let i = 0; i < ids.length; i += 2) {
    const left = Number(ids[i]);
    const right = Number(ids[i + 1]);

    for (let id = left; id <= right; id++) {
      const invalidId = isInvalidPart2(id.toString());
      if (invalidId) {
        invalidIds.push(id);
      }
    }
  }

  return invalidIds.map(Number).reduce((acc, val) => acc + val);
}

// Only run this block in Node.js
if (
  typeof process !== "undefined" &&
  process.release &&
  process.release.name === "node" &&
  typeof require !== "undefined" &&
  require.main === module
) {
  (async () => {
    const { resolve } = await import("node:path");
    const input = await getInput(import.meta.url);
    console.log("Part 1:", part1(input));
    console.log("Part 2:", part2(input));
  })();
}
