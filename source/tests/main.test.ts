import 'mocha'
import { expect } from 'chai'
import FungibleDice from "../classes/FungibleDice.js"
import Report from "../classes/Report.js"

let lonelyD4: FungibleDice
let doubleD6: FungibleDice
let largerDice: FungibleDice

describe('Fungible Dice', () => {
	it('Should make new FungibleDice classes', () => {
		lonelyD4 = new FungibleDice('d4')
		doubleD6 = new FungibleDice('2d6')
		largerDice = new FungibleDice('3D12')
	})

	it('Should be able to convert dice to strings', () => {
		expect(lonelyD4.toString()).to.equal('1d4')
		expect(doubleD6.toString()).to.equal('2d6')
		expect(largerDice.toString()).to.equal('3d12')
	})

	it('Should be able to produce dice roll permutations', () => {
		expect(lonelyD4.diceRolls).to.eql([[1], [2], [3], [4]])
		expect(doubleD6.diceRolls).to.eql([
			[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
			[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
			[3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
			[4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
			[5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
			[6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
		])
		expect(largerDice.diceRolls.length).to.equal(12 * 12 * 12)
	})
})

let lonelyD4Report: Report
let doubleD6Report: Report
let largerDiceReport: Report

describe('Dice Report', () => {
	it('Should make new Report classes', () => {
		lonelyD4Report = new Report(lonelyD4.diceRolls)
		doubleD6Report = new Report(doubleD6.diceRolls)
		largerDiceReport = new Report(largerDice.diceRolls)
	})

	it('Should produce correct statistics', () => {
		expect(lonelyD4Report.mean).to.equal(2.5)
		expect(lonelyD4Report.median).to.equal(2.5)
		expect(lonelyD4Report.mode).to.equal(2.5)
		expect(lonelyD4Report.range).to.equal(3)
		expect(lonelyD4Report.minimum).to.equal(1)
		expect(lonelyD4Report.maximum).to.equal(4)
	})
})
