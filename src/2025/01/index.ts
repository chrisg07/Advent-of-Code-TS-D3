import { getInput } from "../../utils";

export function part1(input: string): unknown {
  let answer = 0;
  const lines = input.trim().split("\n");
  const dialOptions = 100;

  let dial = 50;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const instruction = line.charAt(0);
    const amount = [line.substring(1)].map(Number)[0];

    if (instruction == "L") {
      dial -= amount;
      if (dial < 0) dial = (dialOptions + dial) % 100;
    } else {
      dial += amount;
      if (dial >= dialOptions) dial = dial % dialOptions;
    }
    // console.log(line, instruction, amount, dial);

    if (dial == 0) answer++;
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
