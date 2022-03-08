import FungibleDice from "./FungibleDice.js"

const d4 = new FungibleDice('d4')
console.log(d4.toString())
console.log(d4.toJSON())
console.log(d4.diceRolls)

const doubleD4 = new FungibleDice('2d4')
console.log(doubleD4.toString())
console.log(doubleD4.toJSON())
console.log(doubleD4.diceRolls)
