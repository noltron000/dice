let random = Math.random
const setRandomFx = (newRandom: () => number) => {
	random = newRandom
}

export {
	random,
	setRandomFx,
}
