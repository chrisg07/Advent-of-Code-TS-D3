import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';

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

class FerryContext {
	public state!: State;
	public x: number = 0
	public y: number = 0
	public direction: string = "east"

	constructor() {}

	setState(state: State): void {
		this.state = state
	}
}

abstract class State {
	public context!: FerryContext

	public abstract handleInstruction(amount: number): void
}

class ForwardState extends State {
	constructor(context: FerryContext) {
		super()
		this.context = context
	}

	public handleInstruction(amount: number): void {
		switch(this.context.direction) {
			case "east": 
				this.context.x += amount
				break
			case "west":
				this.context.x -= amount
				break
			case "north":
				this.context.y += amount
				break
			case "south":
				this.context.y -= amount
				break
		}
	}
}

class EastState extends State {
	constructor(context: FerryContext) {
		super()
		this.context = context
	}

	public handleInstruction(amount: number): void {
		this.context.x += amount
	}
}

class WestState extends State {
	constructor(context: FerryContext) {
		super()
		this.context = context
	}

	public handleInstruction(amount: number): void {
		this.context.x -= amount
	}
}

class NorthState extends State {
	constructor(context: FerryContext) {
		super()
		this.context = context
	}

	public handleInstruction(amount: number): void {
		this.context.y += amount
	}
}

class SouthState extends State {
	constructor(context: FerryContext) {
		super()
		this.context = context
	}

	public handleInstruction(amount: number): void {
		this.context.y -= amount
	}
}

class RightState extends State {
	constructor(context: FerryContext) {
		super()
		this.context = context
	}

	public handleInstruction(amount: number): void {
		switch (amount) {
			case 90:
				switch (this.context.direction) {
					case "west":
						this.context.direction = "north"
						break;
					case "north":
						this.context.direction = "east"
						break;
					case "east":
						this.context.direction = "south"
						break;
					case "south":
						this.context.direction = "west"
						break;
				}
				break;
			case 180:
				switch (this.context.direction) {
					case "west":
						this.context.direction = "east"
						break;
					case "north":
						this.context.direction = "south"
						break;
					case "east":
						this.context.direction = "west"
						break;
					case "south":
						this.context.direction = "north"
						break;
				}
				break;					
			case 270:
				switch (this.context.direction) {
					case "west":
						this.context.direction = "south"
						break;
					case "north":
						this.context.direction = "west"
						break;
					case "east":
						this.context.direction = "north"
						break;
					case "south":
						this.context.direction = "east"
						break;
				}
				break;
			default:
				break;
		}
	}
}

class LeftState extends State {
	constructor(context: FerryContext) {
		super()
		this.context = context
	}

	public handleInstruction(amount: number): void {
		switch (amount) {
			case 90:
				switch (this.context.direction) {
					case "west":
						this.context.direction = "south"
						break;
					case "north":
						this.context.direction = "west"
						break;
					case "east":
						this.context.direction = "north"
						break;
					case "south":
						this.context.direction = "east"
						break;
				}
				break;
			case 180:
				switch (this.context.direction) {
					case "west":
						this.context.direction = "east"
						break;
					case "north":
						this.context.direction = "south"
						break;
					case "east":
						this.context.direction = "west"
						break;
					case "south":
						this.context.direction = "north"
						break;
				}
				break;					
			case 270:
				switch (this.context.direction) {
					case "west":
						this.context.direction = "north"
						break;
					case "north":
						this.context.direction = "east"
						break;
					case "east":
						this.context.direction = "south"
						break;
					case "south":
						this.context.direction = "west"
						break;
				}
				break;
			default:
				break;
		}
	}
}

export function part1(input: string): unknown {
	const instructions = input.trim().split("\n")
	
	const ferry = new FerryContext()
	ferry.setState(new EastState(ferry))
	ferry.state.handleInstruction(0)

	for (const instruction of instructions) {
		const command = instruction.substring(0, 1)
		const amount =  [instruction.substring(1)].map(Number)[0]

		switch (command) {
			case "E":
				ferry.setState(new EastState(ferry))
				break;
			case "F":
				ferry.setState(new ForwardState(ferry))
				break;
			case "N":
				ferry.setState(new NorthState(ferry))
				break
			case "R":
				ferry.setState(new RightState(ferry))
				break
			case "W":
				ferry.setState(new WestState(ferry))
				break
			case "S":
				ferry.setState(new SouthState(ferry))
				break
			case "L":
				ferry.setState(new LeftState(ferry))
				break
			default:
				console.log("Instruction not implemented yet: ", command);
				break;
		}
		
		ferry.state.handleInstruction(amount)
	}
	return Math.abs(ferry.x) + Math.abs(ferry.y);
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
