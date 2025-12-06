import { getInput } from "../../utils/utils";
import { GridHelper } from "src/utils/GridHelper";

export function part1(input: string): unknown {
  let answer = 0;
  const grid = new GridHelper(input, 1);
  for (const cell of grid.cells) {
    const rollsOfPaper = cell.neighbors.filter((value) => value == "@");
    if (cell.value == "@" && rollsOfPaper.length < 4) answer++;
  }
  return answer;
}

export function part2(input: string): unknown {
  let total = 0;

  let grid = new GridHelper(input, 1);
  let prevRollCount = 0
  let nextRollCount = grid.getCount("@");

  while (prevRollCount != nextRollCount) {
    prevRollCount = nextRollCount;
    grid = new GridHelper(grid.getGrid(), 1);
    for (const cell of grid.cells) {
      const rollsOfPaper = cell.neighbors.filter((value) => value == "@");
      if (cell.value == "@" && rollsOfPaper.length < 4) {
        cell.value = ".";
        total++;
      }
    }

    nextRollCount = grid.getCount("@");
  }

  return total;
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
