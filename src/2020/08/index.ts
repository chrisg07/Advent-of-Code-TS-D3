
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

export function parseInstructions(input: string): {command: string, value: number}[] {
	const lines = input.split('\n')
	const instructions = []
	for (const line of lines) {
		const parts = line.trim().split(" ")
		instructions.push({command: parts[0], value: [parts[1]].map(Number)[0]})
	}

	return instructions
}

export function part1(input: string): unknown {
	const instructions: {command: string, value: number, executionCount: number}[] = parseInstructions(input.trim()).map((instruction) => ({
		command: instruction.command,
		value: instruction.value,
		executionCount: 0
	}))

	let instructionIndex = 0
	let instruction =  instructions[instructionIndex]
	let accumulator = 0
	
	
	while (instruction.executionCount == 0) {
		instruction.executionCount++

		if (instruction.command == "nop") {
			instructionIndex++
			instruction = instructions[instructionIndex]
			continue

		}
		if (instruction.command == "acc") {
			accumulator += instruction.value
			instructionIndex++
			instruction = instructions[instructionIndex]
			continue
		}
		if (instruction.command == "jmp") {
			instructionIndex = instructionIndex + instruction.value
			instruction = instructions[instructionIndex]
			continue
		}
	}

	return accumulator;
}

export function part2(input: string): unknown {
	// assuming instructions should still only be executed a maximum of one time
	let instructions: {command: string, value: number, executionCount: number}[] = parseInstructions(input.trim()).map((instruction) => ({
		command: instruction.command,
		value: instruction.value,
		executionCount: 0
	}))

	let accumulator = 0

	// need to set all executionCount back to 0
	for (let i = 0; i < instructions.length; i++) {
		instructions = instructions.map(instruction => ({
			...instruction,
			executionCount: 0
		}))

		let command
		if (instructions[i].command == "jmp") {
			command = "nop"
		} else if (instructions[i].command == "nop") {
			command = "jmp"
		} else {
			continue
		}

		const editedInstruction = {
			command: command,
			value: instructions[i].value,
			executionCount: 0
		}
		let editedInstructions = [...instructions]
		editedInstructions[i] = editedInstruction

		let instructionIndex = 0
		let instruction =  editedInstructions[instructionIndex]
		let curAccumalator = 0
		
		while (instruction?.executionCount == 0) {
			instruction.executionCount++

			if (instruction.command == "nop") {
				instructionIndex++
				instruction = editedInstructions[instructionIndex]
				continue
			}
			if (instruction.command == "acc") {
				curAccumalator += instruction.value
				instructionIndex++
				instruction = editedInstructions[instructionIndex]
				continue
			}
			if (instruction.command == "jmp") {
				instructionIndex = instructionIndex + instruction.value
				instruction = editedInstructions[instructionIndex]
				continue
			}

		}
			
		if (instructionIndex == editedInstructions.length) {
			accumulator = curAccumalator
		}

	}

	return accumulator;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
