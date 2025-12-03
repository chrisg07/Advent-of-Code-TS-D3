import { getInput } from "../../utils";

export function part1(input: string): unknown {
  let answer = 0;
  const lines = input.trim().split("\n");
  const banks = lines.map((line) => line.split("").map(Number));
  const bankTotals: number[][] = [];

  for (let index = 0; index < banks.length; index++) {
    const bank = banks[index];
    bankTotals[index] = [];
    for (let i = 0; i < bank.length - 1; i++) {
      const leftBattery = bank[i];
      for (let j = i + 1; j < bank.length; j++) {
        const rightBattery = bank[j];
        const total = [leftBattery + "" + rightBattery + ""].map(Number)[0];
        bankTotals[index].push(total);
      }
    }
  }
  const maxTotals = bankTotals
    .map((totals) => totals.sort((a, b) => b - a))
    .map((totals) => totals[0]);
  answer = maxTotals.reduce((acc, val) => acc + val);

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
