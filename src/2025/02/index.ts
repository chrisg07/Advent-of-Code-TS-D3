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

export function part2(input: string): unknown {
  // TODO: Implement Part 2 solution
  let answer = 0;
  const ids = parseNumbersFromString(input);

  for (let i = 0; i < ids.length; i += 2) {
    const left = ids[i];
    const right = ids[i + 1];
  }
  return answer;
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
