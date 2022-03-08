interface Frequency {
	readonly numerator: number
	readonly accumulator: number
	readonly decumulator: number
}

export default class Report {
	readonly denominator: number
	readonly frequencies: Record<number, Frequency>

	constructor (diceRolls: Array<Array<number>>) {
		// The frequency denominator is the population size of this distribution.
		this.denominator = diceRolls.length

		// Reduce dice roll results into a heatmap/histogram for the results of the rolls.
		const histogram: Record<number, number> = {}
		diceRolls.forEach((diceRoll) => {
			const result = diceRoll.reduce((result, current) => result + current, 0)
			if (histogram[result] === undefined) histogram[result] = 0
			histogram[result] += 1
		})

		// Reduce histogram into frequency distribution table.
		this.frequencies = {}
		let accumulator: number = 0
		let decumulator: number = this.denominator
		Object
		.entries(histogram)
		.map(([resultStr, numerator]): [number, number] => ([parseInt(resultStr), numerator]))
		.sort(([resultA], [resultB]) => resultA - resultB)
		.forEach(([result, numerator]) => {
			// In this block, it's important these results are sorted in ascending order.
			// The accumulator/decumulator persists outside of this block's scope.
			accumulator += numerator
			// Write information into frequency distribution table.
			this.frequencies[result] = {
				numerator,
				accumulator,
				decumulator,
			}
			// To keep decumulator frequencies inclusive, subtract this AFTER setting.
			decumulator -= numerator
		})
	}

	entries () {
		return Object
		.entries(this.frequencies)
		.map(([resultStr, frequency]): [number, Frequency] => (
			[parseInt(resultStr), frequency]
		))
		.sort(([resultA], [resultB]) => resultA - resultB)
	}

	keys () {
		return this
		.entries()
		.map((entry) => entry[0])
	}

	values () {
		return this
		.entries()
		.map((entry) => entry[1])
	}

	population () {
		return this
		.entries()
		.flatMap(([result, { numerator }]) => (
			new Array(numerator).fill(result)
		))
	}
}
