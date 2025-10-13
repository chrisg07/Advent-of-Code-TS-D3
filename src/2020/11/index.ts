
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

export function calculateRoundPart2(model: string, width: number): string {
	let updatedModel = ""

	for (let i = 0; i < model.length; i++) {
		const seat = model.charAt(i);

		const isOnLeftEdge = i % width === 0
		const isOnRightEdge = i % width === width - 1

		let westernVisibleSeat = !isOnLeftEdge ? i - 1 : -1;
		while (!isSeatAtIndex(model, westernVisibleSeat) && westernVisibleSeat != -1) {
			const onLeftEdge = westernVisibleSeat % width === 0
			westernVisibleSeat = !onLeftEdge ? westernVisibleSeat - 1 : -1;
		}

		let easternVisibleSeat = !isOnRightEdge ? i + 1 : -1;
		while (!isSeatAtIndex(model, easternVisibleSeat) && easternVisibleSeat != -1) {
			const onRightEdge = easternVisibleSeat % width === width - 1
			easternVisibleSeat = !onRightEdge ? easternVisibleSeat + 1 : -1;
		}

		let northernVisibleSeat = i - width;
		while (!isSeatAtIndex(model, northernVisibleSeat) && northernVisibleSeat != -1) {
			const onNorthEdge = northernVisibleSeat < 0
			northernVisibleSeat = !onNorthEdge ? northernVisibleSeat - width : -1;
		}

		// I think this is okay
		let northwesternVisibleSeat = !isOnLeftEdge ? i - width - 1 : -1;
		while (!isSeatAtIndex(model, northwesternVisibleSeat) && northwesternVisibleSeat != -1) {
			const onNorthEdge = northwesternVisibleSeat < 0
			const onLeftEdge = northwesternVisibleSeat % width === 0
			northwesternVisibleSeat = !onNorthEdge && !onLeftEdge ? northwesternVisibleSeat - width - 1 : -1;
		}

		let northeasternVisibleSeat = !isOnRightEdge ? i - width + 1 : -1;
		while (!isSeatAtIndex(model, northeasternVisibleSeat) && northeasternVisibleSeat != -1) {
			const onNorthEdge = northeasternVisibleSeat < 0
			const onRightEdge = northeasternVisibleSeat % width === width - 1
			northeasternVisibleSeat = !onNorthEdge && !onRightEdge ? northeasternVisibleSeat - width + 1 : -1;
		}

		let southernVisibleSeat = i + width;
		while (!isSeatAtIndex(model, southernVisibleSeat) && southernVisibleSeat != -1) {
			const onSouthEdge = southernVisibleSeat > model.length
			southernVisibleSeat = !onSouthEdge ? southernVisibleSeat + width : -1;
		}

		let southwesternVisibleSeat = !isOnLeftEdge ? i + width - 1 : -1;
		while (!isSeatAtIndex(model, southwesternVisibleSeat) && southwesternVisibleSeat != -1) {
			const onSouthEdge = southwesternVisibleSeat > model.length
			const onLeftEdge = southwesternVisibleSeat % width === 0
			southwesternVisibleSeat = !onSouthEdge && !onLeftEdge ? southwesternVisibleSeat + width - 1 : -1;
		}
		
		let southeasternVisibleSeat = !isOnRightEdge ? i + width + 1 : -1;
		while (!isSeatAtIndex(model, southeasternVisibleSeat) && southeasternVisibleSeat != -1) {
			const onSouthEdge = southeasternVisibleSeat > model.length
			const onRightEdge = southeasternVisibleSeat % width === width - 1
			southeasternVisibleSeat = !onSouthEdge && !onRightEdge ? southeasternVisibleSeat + width + 1 : -1;
		}

		const neighborIndices = [
			westernVisibleSeat, // western (unless on left edge of grid)
			easternVisibleSeat, // eastern (unless on right edge of grid)
			northernVisibleSeat, // northern
			northwesternVisibleSeat, // northwestern (unless on left edge of grid)
			northeasternVisibleSeat, // northeastern (unless on right edge of grid)
			southernVisibleSeat, // southern
			southwesternVisibleSeat, // southerwestern (unless on left edge of grid)
			southeasternVisibleSeat, // southeastern (unless on right edge of grid)
		]

		const visibleNeighborIndices = neighborIndices.filter(index => {
			return index >= 0 && index <= model.length - 1
		})

		let occupiedNeighbors = 0
		let emptyNeighbors = 0
		visibleNeighborIndices.forEach(index => {
			if (model.charAt(index) === "#") {
				occupiedNeighbors++
			}
		})
		if (seat === "L" && occupiedNeighbors === 0) {
			updatedModel += "#"
		} else if (seat === "#" && occupiedNeighbors >= 5) {
			updatedModel += "L"
		} else {
			updatedModel += seat
		}
	}

	return updatedModel
}

function isSeatAtIndex(model: string, westernVisibleSeat: number) {
	return model.charAt(westernVisibleSeat) == "#" || model.charAt(westernVisibleSeat) == "L";
}

export function part2(input: string): unknown {
	const lines = input.trim().split("\n")
	const width = lines[0].length
	let startingModel = lines.join("")
	
	let nextRoundModel = calculateRoundPart2(startingModel, width)
	
	while (nextRoundModel != startingModel) {
		startingModel = nextRoundModel
		nextRoundModel = calculateRoundPart2(nextRoundModel, width)
	}

	const occupiedSeats = nextRoundModel.split("").filter(seat => seat === "#").length 
	return occupiedSeats
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
