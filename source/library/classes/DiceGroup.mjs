export class DiceGroup {
	constructor (diceString) {
		diceString = diceString.toLowerCase()

		// Determine if dice string is valid
		const diceRegExp = /^\d*d\d+$/gi
		const isValidDiceString = diceRegExp.test(diceString)
		if (!isValidDiceString) throw new Error('Invalid Dice string')
		this.diceString = diceString

		// Get number of dice
		const numDiceRegExp = /^\d*(?=d)/gi
		const numDiceResult = [...diceString.matchAll(numDiceRegExp)]
		if (numDiceResult.length !== 1) throw new Error('Invalid Dice string')
		else if (numDiceResult[0][0] === '') this.numDice = 1
		else this.numDice = parseInt(numDiceResult[0][0])

		// Get size of dice
		const numSidesRegExp = /(?<=d)\d+$/gi
		const numSidesResult = [...diceString.matchAll(numSidesRegExp)]
		if (numSidesResult.length !== 1) throw new Error('Invalid Dice string')
		else this.numSides = parseInt(numSidesResult[0][0])
	}

	roll () {
		let results = 0
		for (let i = 0; i < this.numDice; i++) {
			results += Math.floor(this.numSides * this.random()) + 1
		}
		return results
	}

	export () {
		let results = {}
		for (let i = 0; i < this.numSides; i++) {
			const side = i + 1
			results[side] = 1
		}
		return results
	}

	random () {
		return Math.random()
	}
}
