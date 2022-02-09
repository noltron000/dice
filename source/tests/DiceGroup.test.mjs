import diceStrings from './data/diceStrings.mjs'
import {DiceGroup} from '../library/classes/DiceGroup.mjs'

const jsonify = (data) => JSON.parse(JSON.stringify(data))

Object.entries(jsonify(diceStrings)).forEach(([title, diceStrings]) => {
	console.info()
	console.info(title)
	console.info('-'.repeat(title.length))

	diceStrings.forEach(diceString => {
		console.log(diceString)
		const dice = new DiceGroup(diceString)
		console.log(dice.export())
	})
})
