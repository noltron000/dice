import {
	mean,
	median,
	mode,
	min,
	max,
	std,
	variance,
} from 'mathjs'

interface Frequency {
	readonly numerator: number
	readonly accumulator: number
	readonly decumulator: number
}

export default class Report {
	readonly population: Array<number>
	readonly denominator: number
	readonly frequencies: Record<number, Frequency>
	readonly variance: number
	readonly deviation: number
	readonly mean: number
	readonly median: number
	readonly mode: number
	readonly minimum: number
	readonly maximum: number
	readonly range: number

	constructor (diceRolls: Array<Array<number>>) {
		// The population is a list of all dice roll results.
		this.population = diceRolls
		.map((diceRoll)=> (
			diceRoll.reduce((result, current) => (
				result + current
			), 0)
		))
		.sort((a, b) => a - b)

		// The frequency denominator is the population size of this distribution.
		this.denominator = this.population.length

		// Reduce dice roll results into a heatmap/histogram for the results of the rolls.
		const histogram: Record<number, number> = {}
		this.population.forEach((result) => {
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

		// Calculate statistical attributes.
		this.variance  =  variance(...this.population)
		this.deviation =       std(...this.population)
		this.mean      =      mean(...this.population)
		this.median    =    median(...this.population)
		this.mode      = mean(mode(...this.population))
		this.minimum   =       min(...this.population)
		this.maximum   =       max(...this.population)
		this.range     =   this.maximum - this.minimum
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
}
