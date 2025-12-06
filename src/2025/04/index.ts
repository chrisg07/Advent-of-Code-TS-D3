import { getInput, GridHelper } from "../../utils";

export function part1(input: string): unknown {
  const width = input.split("\n")[0].length;

  let answer = 0;
  const grid = new GridHelper(input, width);
  for (const cell of grid.cells) {
    const rollsOfPaper = cell.neighbors.filter((value) => value == "@");
    if (cell.value == "@" && rollsOfPaper.length < 4) answer++;
  }
  return answer;
}

function replaceRolls(input: string, width: number): [number, string] {
  let answer = 0;
  const lines = input.trim().split("\n");
  const line = lines.join("");

  let updatedLine = "";
  for (let i = 0; i < line.length; i++) {
    const west = i % width != 0 ? i - 1 : -1;
    const east = (i + 1) % width != 0 ? i + 1 : -1;
    const north = i - width;
    const south = i + width;
    const northWest = i % width != 0 ? i - width - 1 : -1;
    const northEast = (i + 1) % width != 0 ? i - width + 1 : -1;
    const southWest = i % width != 0 ? i + width - 1 : -1;
    const southEast = (i + 1) % width != 0 ? i + width + 1 : -1;

    const neighbors = [
      west,
      east,
      north,
      south,
      northWest,
      northEast,
      southWest,
      southEast,
    ];

    const validNeighbors = neighbors.filter(
      (index) => index >= 0 && index <= line.length
    );
    const neighborSymbols = validNeighbors.map((index) => line.charAt(index));
    const rollsOfPaperNearby = neighborSymbols.filter(
      (symbol) => symbol == "@"
    );
    if (line.charAt(i) == "@" && rollsOfPaperNearby.length < 4) {
      answer++;
      updatedLine += ".";
    } else {
      updatedLine += line.charAt(i);
    }
  }

  return [answer, updatedLine];
}

export function part2(input: string): unknown {
  let total = 0;
  const width = input.split("\n")[0].length;
  const results = replaceRolls(input, width);
  let amountReplaced = results[0];
  let nextMap = results[1];

  while (amountReplaced > 0) {
    total += amountReplaced;
    const nextResults = replaceRolls(nextMap, width);
    amountReplaced = nextResults[0];
    nextMap = nextResults[1];
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
