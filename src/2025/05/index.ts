import { getInput } from '../../utils';

export function part1(input: string): unknown {
    let answer = 0
	const splitInput = input.trim().split('\n\n')
	
	const rangeStrings = splitInput[0].split('\n')
	const rangesList = rangeStrings.map(range => range.split('-'))
	const ranges = rangesList.map(ranges => ranges.map(Number))
	const leftRanges = ranges.map(range => range[0])
	const rightRanges = ranges.map(range => range[1])

	const ids = splitInput[1].split('\n').map(Number)

	for (let i = 0; i < ids.length; i++) {
		const id = ids[i];

		for (let j = 0; j < leftRanges.length; j++) {
			const left = leftRanges[j]
			const right = rightRanges[j]

			if (id >= left && id <= right) {
				answer++
				break
			}
		}
	}
	return answer;
}

function updateRanges(leftRanges: number[], rightRanges: number[]) {
	for (let i = 0; i < leftRanges.length; i++) {
		const left = leftRanges[i];
		const right = rightRanges[i];

		for (let j = 0; j < leftRanges.length; j++) {
			if (i != j && (leftRanges[i] != 0 && rightRanges[i] != 0 && (leftRanges[j] != 0 && rightRanges[j] != 0))) {
				const leftNestedRange = leftRanges[j];
				const rightNestedRange = rightRanges[j];
				// 443_507_857_187_033
				// 100_000_000_000_000
				if (Math.abs(right - leftNestedRange) < 500_000_000 || Math.abs(left - rightNestedRange) < 500_000_000) {
					// console.log("Comparing ", left, " ", right, " to ", leftNestedRange, " ", rightNestedRange);
				}
				if (left >= leftNestedRange && right <= rightNestedRange) {
					// console.log("1 - Reset range: ", left, right, " to: 0-0");
					leftRanges[i] = 0;
					rightRanges[i] = 0;
				} else if (left <= rightNestedRange && rightNestedRange >= left && leftNestedRange <= right && left >= leftNestedRange) {
					// console.log("2 - Reset range: ", left, right, " to: ", leftNestedRange, right);
					leftRanges[i] = leftNestedRange;
				} else if (right >= leftNestedRange && leftNestedRange <= right && rightNestedRange >= left && right <= rightNestedRange) {
					// console.log("3 - Reset range: ", left, right, " to: ", left, rightNestedRange);
					rightRanges[i] = rightNestedRange;
				} else if (left == rightNestedRange || right == leftNestedRange && rightNestedRange == leftNestedRange) {
					// console.log("4 - Reset range: ", left, right, " to: 0-0");
					leftRanges[i] = 0;
					rightRanges[i] = 0;
				} 
			}
		}
	}
}

export function part2(input: string): unknown {
    let answer = 0
	const splitInput = input.trim().split('\n\n')
	
	const rangeStrings = splitInput[0].split('\n')
	const rangesList = rangeStrings.map(range => range.split('-'))
	const ranges = rangesList.map(ranges => ranges.map(Number))
	const leftRanges = ranges.map(range => range[0])
	const rightRanges = ranges.map(range => range[1])

	let previousSum = calculateSumOfRanges(leftRanges, rightRanges)
	updateRanges(leftRanges, rightRanges)
	updateRanges(leftRanges, rightRanges)

	while (calculateSumOfRanges(leftRanges, rightRanges) != previousSum) {
		previousSum = calculateSumOfRanges(leftRanges, rightRanges)
		updateRanges(leftRanges, rightRanges)
		updateRanges(leftRanges, rightRanges)
	}

	let pairs: [left: number, right: number][] = []
	for (let i = 0; i < leftRanges.length; i++) {
		if (leftRanges[i] != 0 && rightRanges[i] != 0) {
			pairs.push([leftRanges[i], rightRanges[i]])
		}
	}
	
	pairs.sort((a, b) => a[0] - b[0])
	// console.log(leftRanges, rightRanges);
	// console.log(pairs);
	
	answer = calculateSumOfRanges(leftRanges, rightRanges);

	return answer;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const { resolve } = await import('node:path');
	const input = await getInput(import.meta.url);
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}


function calculateSumOfRanges(leftRanges: number[], rightRanges: number[]) {
	let sum = 0
	for (let i = 0; i < leftRanges.length; i++) {
		const left = leftRanges[i];
		const right = rightRanges[i];

		if (right - left != 0) {
			const delta = (right - left) + 1;
			// console.log("adding to asnwer: ", delta);
			sum += delta;
		} else if (right - left == 0 && (right != 0 && left != 0)) sum++
	}
	return sum;
}

