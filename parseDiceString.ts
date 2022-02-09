/*
	Takes in a standard dice string (1d6, 3d20, d100, etc).
	Returns the number of dice and the number of sides per dice.
*/
const parseDiceString = (diceString: string) => {
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

	return [
		numDice,
		numSides,
	]
}

export { parseDiceString }
