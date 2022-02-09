import cartesianProduct from "fast-cartesian"

export default class FungibleDice {
	readonly numDice: number
	readonly numSides: number

	constructor (diceString: string) {
		[this.numDice, this.numSides] = FungibleDice.parseString(diceString)
	}

	toString () {
		return `${this.numDice}d${this.numSides}`
	}

	toJSON () {
		return {
			numDice: this.numDice,
			numSides: this.numSides
		}
	}

	/*
		Takes in a standard dice string (1d6, 3d20, d100, etc).
		Returns the number of dice and the number of sides per dice.
	*/
	static parseString (diceString: string): [number, number] {
		// Determine if dice string is valid
		const diceRegExp = /^\d*d\d+$/gi
		const isValidDiceString = diceRegExp.test(diceString)
		if (!isValidDiceString) throw new Error('Invalid Dice string')

		// Get number of dice
		const numDiceRegExp = /^\d*(?=d)/gi
		const numDiceResult = [...diceString.matchAll(numDiceRegExp)]
		if (numDiceResult.length !== 1) throw new Error('Invalid Dice string')
		else if (numDiceResult[0][0] === '') var numDice = 1
		else var numDice = parseInt(numDiceResult[0][0])

		// Get size of dice
		const numSidesRegExp = /(?<=d)\d+$/gi
		const numSidesResult = [...diceString.matchAll(numSidesRegExp)]
		if (numSidesResult.length !== 1) throw new Error('Invalid Dice string')
		else var numSides = parseInt(numSidesResult[0][0])

		return [numDice, numSides]
	}

	generateDiceRolls (): Array<Array<number>> {
		const singleDieRolls = Array.from(new Array(this.numSides), (_, key) => key + 1)
		const allSingleDieRolls = new Array(this.numDice).fill(singleDieRolls)
		const diceRolls = cartesianProduct<Array<Array<number>>>(allSingleDieRolls)
		return diceRolls
	}
}
