import { profile } from "node:console";
import { getInput, parseNumbersFromString } from "../../utils";

export function part1(input: string): unknown {
  // TODO: Implement Part 1 solution
  let answer = 0;
  const numbers = parseNumbersFromString(input);
  let columns: bigint[][] = [];
  const lines = input.split("\n");
  const numColumns = lines[0].split(" ").filter((str) => str != "").length;
  const lastLine = lines[lines.length - 2];
  const operations = lastLine
    .split(" ")
    .map((str) => str.trim())
    .filter((str) => str != "");
  for (let i = 0; i < numColumns; i++) {
    columns.push([]);
  }
  for (let i = 0; i < numbers.length; i += numColumns) {
    for (let j = 0; j < numColumns; j++) {
      columns[j].push(BigInt(numbers[i + j]));
    }
  }
  let result: bigint = BigInt(0);

  for (let j = 0; j < numColumns; j++) {
    const column = columns[j];
    const operation = operations[j];
    if (operation == "*") {
      const product = column.reduce((acc, val) => {
        return acc * val;
      });
      const updatedResult = result + product;
      result = updatedResult;
    } else if (operation == "+") {
      const sum = column.reduce((acc, val) => {
        return acc + val;
      });
      const updatedResult = result + sum;
      result = updatedResult;
    }
  }

  return result;
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
