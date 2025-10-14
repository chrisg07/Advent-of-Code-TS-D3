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
	public ferry!: FerryContext
	public waypoint!: WaypointContext
	
	constructor(ferry: FerryContext, waypoint?: WaypointContext) {
		this.ferry = ferry
		if (waypoint) {
			this.waypoint = waypoint
		}
	}

	public abstract handleInstruction(amount: number): void
}

class ForwardState extends State {
	constructor(ferry: FerryContext) {
		super(ferry)
	}

	public handleInstruction(amount: number): void {
		switch(this.ferry.direction) {
			case "east": 
				this.ferry.x += amount
				break
			case "west":
				this.ferry.x -= amount
				break
			case "north":
				this.ferry.y += amount
				break
			case "south":
				this.ferry.y -= amount
				break
		}
	}
}

class EastState extends State {
	constructor(ferry: FerryContext) {
		super(ferry)
	}

	public handleInstruction(amount: number): void {
		this.ferry.x += amount
	}
}

class WestState extends State {
	constructor(ferry: FerryContext) {
		super(ferry)
	}

	public handleInstruction(amount: number): void {
		this.ferry.x -= amount
	}
}

class NorthState extends State {
	constructor(ferry: FerryContext) {
		super(ferry)
	}

	public handleInstruction(amount: number): void {
		this.ferry.y += amount
	}
}

class SouthState extends State {
	constructor(ferry: FerryContext) {
		super(ferry)
	}

	public handleInstruction(amount: number): void {
		this.ferry.y -= amount
	}
}

class RightState extends State {
	constructor(ferry: FerryContext) {
		super(ferry)
	}

	public handleInstruction(amount: number): void {
		switch (amount) {
			case 270: this.turnRight()
			case 180: this.turnRight()
			case 90: this.turnRight()
		}
	}

	private turnRight() {
		switch (this.ferry.direction) {
			case "west":
				this.ferry.direction = "north";
				break;
			case "north":
				this.ferry.direction = "east";
				break;
			case "east":
				this.ferry.direction = "south";
				break;
			case "south":
				this.ferry.direction = "west";
				break;
		}
	}
}

class LeftState extends State {
	constructor(ferry: FerryContext) {
		super(ferry)
	}

	private turnLeft(): void {
		switch (this.ferry.direction) {
			case "west":
				this.ferry.direction = "south"
				break;
			case "north":
				this.ferry.direction = "west"
				break;
			case "east":
				this.ferry.direction = "north"
				break;
			case "south":
				this.ferry.direction = "east"
				break;
		}
	}

	public handleInstruction(amount: number): void {
		switch (amount) {
			case 270: this.turnLeft()
			case 180: this.turnLeft()
			case 90: this.turnLeft()
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

class WaypointContext {
	public state!: State;
	public x: number = 10
	public y: number = 1
	public directionRelativeToShip: string = "north"

	constructor() {}

	setState(state: State): void {
		this.state = state
	}
}

class WaypointNorthState extends State {
	public handleInstruction(amount: number): void {
		this.waypoint.y += amount
	}
}

class WaypointSouthState extends State {
	public handleInstruction(amount: number): void {
		this.waypoint.y -= amount
	}
}

class WaypointEastState extends State {
	public handleInstruction(amount: number): void {
		this.waypoint.x += amount
	}
}

class WaypointWestState extends State {
	public handleInstruction(amount: number): void {
		this.waypoint.x -= amount
	}
}

class RotateWaypointLeftState extends State {
	public handleInstruction(amount: number): void {
		switch (amount) {
			case 270: this.turnLeft()
			case 180: this.turnLeft()
			case 90: this.turnLeft()
		}
	}

	private turnLeft() {
		const tempX = this.waypoint.x;
		this.waypoint.x = this.waypoint.y * -1;
		this.waypoint.y = tempX;
	}
}

class RotateWaypointRightState extends State {
	public handleInstruction(amount: number): void {
		switch (amount) {
			case 270: this.turnRight()
			case 180: this.turnRight()
			case 90: this.turnRight()
		}
	}

	private turnRight() {
		const tempX = this.waypoint.x;
		this.waypoint.x = this.waypoint.y;
		this.waypoint.y = tempX * -1;
	}
}

class MoveFerryForwardState extends State {
	public handleInstruction(amount: number): void {
		for (let i = 0; i < amount; i++) {
			this.ferry.x += this.waypoint.x
			this.ferry.y += this.waypoint.y
		}
		console.log(`Moved forward to (${this.ferry.x}, ${this.ferry.y})`);
		
	}
}


export function part2(input: string): unknown {
	const instructions = input.trim().split("\n")
	
	const ferry = new FerryContext()
	ferry.setState(new EastState(ferry))
	ferry.state.handleInstruction(0)

	const waypoint = new WaypointContext()

	for (const instruction of instructions) {
		const command = instruction.substring(0, 1)
		const amount =  [instruction.substring(1)].map(Number)[0]

		switch (command) {
			case "E":
				ferry.setState(new WaypointEastState(ferry, waypoint))
				break;
			case "F":
				ferry.setState(new MoveFerryForwardState(ferry, waypoint))
				break;
			case "N":
				ferry.setState(new WaypointNorthState(ferry, waypoint))
				break
			case "R":
				ferry.setState(new RotateWaypointRightState(ferry, waypoint))
				break
			case "W":
				ferry.setState(new WaypointWestState(ferry, waypoint))
				break
			case "S":
				ferry.setState(new WaypointSouthState(ferry, waypoint))
				break
			case "L":
				ferry.setState(new RotateWaypointLeftState(ferry, waypoint))
				break
			default:
				console.log("Instruction not implemented yet: ", command);
				break;
		}
		
		ferry.state.handleInstruction(amount)
	}
	return Math.abs(ferry.x) + Math.abs(ferry.y);
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
