
export async function getInput() {
	// @ts-ignore
	if (typeof window !== 'undefined' && typeof fetch === 'function') {
		// Browser: fetch input.txt from same directory
		const res = await fetch('./input.txt');
		return res.text();
	} else {
		// Node.js: use fs/promises
		const { readFile } = await import('fs/promises');
		const path = await import('node:path');
		const inputPath = path.resolve(__dirname, 'input.txt');
		return readFile(inputPath, 'utf-8');
	}
}

export function calculateRow(spec: string): number {
	let minRow = 0
	let maxRow = 127
	for (let i = 0; i < spec.length; i++) {
		if (spec.charAt(i) == "F") {
			maxRow = maxRow - ((maxRow - minRow + 1) / 2)
		} else if (spec.charAt(i) == "B") {
			minRow = minRow + ((maxRow - minRow + 1) / 2)
		}
	}
	return minRow
}

export function calculateColumn(spec: string): number {
	let minCol = 0
	let maxCol = 7
	for (let i = 0; i < spec.length; i++) {
		if (spec.charAt(i) == "L") {
			maxCol = maxCol - ((maxCol - minCol + 1) / 2)
		} else if (spec.charAt(i) == "R") {
			minCol = minCol + ((maxCol - minCol + 1) / 2)
		}
	}
	return minCol
}

export function calculateBoardingPass(pass: string): {row: number, column: number, seatID: number} {
	const rowSpec = pass.substring(0, 7)
	const colSpec = pass.substring(7)
	
	const row = calculateRow(rowSpec);
	const col = calculateColumn(colSpec);
	return {
		row: row, 
		column: col,
		seatID: row * 8 + col
	}
}

export function part1(input: string): unknown {
	input = input.trim()
	const passes = input.split('\n').map(line => line.trim())
	const boardingPasses = passes.map(pass => calculateBoardingPass(pass));
	const seatIDs = boardingPasses.map(pass => pass.seatID)
	const highestSeatID = seatIDs.sort((a, b) => b - a)[0]
	
	return highestSeatID;
}

export function part2(input: string): unknown {
	// TODO: Implement Part 2 solution
	return input.length;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
