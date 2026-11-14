// Olcan Askar, student number: 0000000000
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.

import { films } from './data.mjs'

console.log('--- arrays.mjs ---')

// Form 1: take values out of an array by position.
// yearRange returns [oldest year, newest year], so the caller knows the order.
function yearRange(list) {
  const years = list.map((film) => film.year)
  return [Math.min(...years), Math.max(...years)]
}
const [oldest, newest] = yearRange(films)
console.log('form 1:', oldest, newest)

// Form 2: skip an item and collect the rest.
// ranked[0] is the best-rated film; ranked[1] is the runner-up.
const ranked = [...films].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
const [, second, ...others] = ranked
console.log('form 2:', second.title, '+', others.length, 'more')

// Form 3: swap two variables without a temporary.
let firstPick = films[0].title
let secondPick = films[1].title
;[firstPick, secondPick] = [secondPick, firstPick]
console.log('form 3:', firstPick, '<->', secondPick)

// Form 4: default values when the array is empty.
const emptyYears = []
const [firstYear = 2003, secondYear = 2026] = emptyYears
console.log('form 4:', firstYear, secondYear)
