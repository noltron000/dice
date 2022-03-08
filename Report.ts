interface Frequency {
	readonly numerator: number
	readonly accumulator: number
	readonly decumulator: number
}

export default class Report {
	readonly denominator: number
	readonly frequencies: Record<number, Frequency>
	readonly mean: number
	readonly minimum: number
	readonly maximum: number
	readonly range: number
	readonly medians: [number] | [number, number]
	readonly modes: Array<number>

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

		// Calculate statistical attributes
		this.mean = this
		.entries()
		.map(([result, { numerator }]) => result * numerator)
		.reduce((total, current) => total + current)
		/ this.denominator

		this.minimum = Math.min(...this.keys())
		this.maximum = Math.max(...this.keys())
		this.range = this.maximum - this.minimum

		// Find the middle one or two values by searching for their index.
		const lowerMiddleOrdinal = Math.floor((this.denominator + 1) / 2)
		const lowerMedianIndex = this
		.values()
		.findIndex(({ accumulator }) => accumulator >= lowerMiddleOrdinal)

		const upperMiddleOrdinal = Math.ceil((this.denominator + 1) / 2)
		const upperMedianIndex = this
		.values()
		.findIndex(({ accumulator }) => accumulator >= upperMiddleOrdinal)

		const lowerMedian = this.keys()[lowerMedianIndex]
		const upperMedian = this.keys()[upperMedianIndex]
		// If there is only one middle value, it is the median.
		if (lowerMedian === upperMedian) this.medians = [lowerMedian]
		else this.medians = [lowerMedian, upperMedian]

		// Find the highest frequency value
		const maxFrequency = Math.max(
			...this
			.values()
			.map(({ numerator }) => numerator)
		)
		// Find results of this high frequency
		this.modes = this
		.entries()
		.filter(([result, { numerator }]) => (
			numerator === maxFrequency
		))
		.map(([result]) => result)
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
