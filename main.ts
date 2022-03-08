import FungibleDice from "./FungibleDice.js"
import Report from "./Report.js"

const d4 = new FungibleDice('d4')
console.log(d4.toString())
console.log(d4.toJSON())
console.log(d4.diceRolls)
const d4Report = new Report(d4.diceRolls)
console.log(d4Report)

const doubleD4 = new FungibleDice('2d4')
console.log(doubleD4.toString())
console.log(doubleD4.toJSON())
console.log(doubleD4.diceRolls)
const doubleD4Report = new Report(doubleD4.diceRolls)
console.dir(doubleD4Report)

const largeDicePool = new FungibleDice('3d10')
console.log(largeDicePool.toString())
console.log(largeDicePool.toJSON())
console.log(largeDicePool.diceRolls)
const largeDicePoolReport = new Report(largeDicePool.diceRolls)
console.log(largeDicePoolReport)
