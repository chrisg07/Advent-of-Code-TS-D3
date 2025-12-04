import { getInput } from "../../utils";

export function part1(input: string): unknown {
  let answer = 0;
  const lines = input.trim().split("\n");
  const width = lines[0].length;
  const line = lines.join("");

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
      (symbol) => symbol == "@" || symbol == "x"
    );
    if (line.charAt(i) == "@" && rollsOfPaperNearby.length < 4) {
      answer++;
    }
  }

  return answer;
}

export function part2(input: string): unknown {
  // TODO: Implement Part 2 solution
  let answer = 0;
  const lines = input.trim().split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
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
