import cartesianProduct from "fast-cartesian"

export default class FungibleDice {
	readonly numDice: number
	readonly numSides: number
	#diceRolls: Array<Array<number>> | undefined

	constructor (diceString: string) {
		[this.numDice, this.numSides] = FungibleDice.parseString(diceString)
	}

	get diceRolls (): Array<Array<number>> {
		if (this.#diceRolls === undefined) {
			this.#diceRolls = FungibleDice.generateDiceRolls(this.numDice, this.numSides)
		}
		return this.#diceRolls
	}

	toString () {
		return `${this.numDice}d${this.numSides}`
	}

	toJSON () {
		return {
			numDice: this.numDice,
			numSides: this.numSides,
		}
	}

	/*
		Takes in a standard dice string (1d6, 3d20, d100, etc).
		Returns the number of dice and the number of sides per dice.
	*/
	static parseString (diceString: string): [numDice: number, numSides: number] {
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

	/*
		Given a number of fungible dice and their size,
			this gives all possible rolls for those dice.
	*/
	static generateDiceRolls (numDice: number, numSides: number): Array<Array<number>> {
		// Spread the possible rolls of a single fungible die into an array.
		// Ex. d6 = [1,2,3,4,5,6]
		const singleDieRolls = new Array<number | void>(numSides)
		.fill(undefined)
		.map((_, index) => index + 1)

		// Repeat those rolls N times within another array,
		// 	where N is the number of dice.
		const allSingleDieRolls = new Array<Array<number>>(numDice)
		.fill(singleDieRolls)

		// Taking the cartesian product here produces all possible rolls for these dice.
		// This accounts for the order in which the dice were rolled as well.
		const diceRolls = cartesianProduct(allSingleDieRolls)
		return diceRolls
	}
}
