
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

export function calculateRound(model: string, width: number): string {
	let updatedModel = ""

	for (let i = 0; i < model.length; i++) {
		const seat = model.charAt(i);

		const isOnLeftEdge = i % width === 0
		const isOnRightEdge = i % width === width - 1
		const neighborIndices = [
			!isOnLeftEdge ? i - 1 : -1, // western (unless on left edge of grid)
			!isOnRightEdge ? i + 1 : -1, // eastern (unless on right edge of grid)
			i - width, // northern
			!isOnLeftEdge ? i - width - 1 : -1, // northwestern (unless on left edge of grid)
			!isOnRightEdge ? i - width + 1 : -1, // northeastern (unless on right edge of grid)
			i + width, // southern
			!isOnLeftEdge ? i + width - 1 : -1, // southerwestern (unless on left edge of grid)
			!isOnRightEdge ? i + width + 1 : -1, // southeastern (unless on right edge of grid)
		]
		const validNeighborIndices = neighborIndices.filter(index => {
			return index >= 0 && index <= model.length - 1
		})

		let occupiedNeighbors = 0
		let emptyNeighbors = 0
		validNeighborIndices.forEach(index => {
			if (model.charAt(index) === "#") {
				occupiedNeighbors++
			}
		})
		if (seat === "L" && occupiedNeighbors === 0) {
			updatedModel += "#"
		} else if (seat === "#" && occupiedNeighbors >= 4) {
			updatedModel += "L"
		} else {
			updatedModel += seat
		}
	}

	return updatedModel
}

export function part1(input: string): unknown {
	const lines = input.trim().split("\n")
	const width = lines[0].length
	let startingModel = lines.join("")
	
	let nextRoundModel = calculateRound(startingModel, width)
	
	while (nextRoundModel != startingModel) {
		startingModel = nextRoundModel
		nextRoundModel = calculateRound(nextRoundModel, width)
	}

	const occupiedSeats = nextRoundModel.split("").filter(seat => seat === "#").length 
	return occupiedSeats
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
