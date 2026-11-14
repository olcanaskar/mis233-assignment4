// Olcan Askar, student number: 2024502180
// The same four array forms as js/arrays.mjs, now typed. Run with `npx tsx ts/arrays.ts`.

import { films, type Film } from './data.js'

console.log('--- arrays.ts ---')

// Form 1: the return type of the function is a tuple.
// Without the tuple annotation, TypeScript would infer number[].
function yearRange(list: Film[]): [number, number] {
  const years = list.map((film) => film.year)
  return [Math.min(...years), Math.max(...years)]
}
const [oldest, newest] = yearRange(films)
console.log('form 1:', oldest, newest)

// Form 2: noUncheckedIndexedAccess means ranked[1] may be undefined.
const ranked = [...films].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
const [, second, ...others] = ranked
console.log('form 2:', second?.title, '+', others.length, 'more')

// Form 3: films[0] is Film | undefined, so I guard before using it.
const [firstFilm, secondFilm] = films
if (!firstFilm || !secondFilm) {
  throw new Error('Need at least two films to swap')
}
let firstPick = firstFilm.title
let secondPick = secondFilm.title
;[firstPick, secondPick] = [secondPick, firstPick]
console.log('form 3:', firstPick, '<->', secondPick)

// Form 4: defaults work on an explicitly typed empty array.
const emptyYears: number[] = []
const [firstYear = 2003, secondYear = 2026] = emptyYears
console.log('form 4:', firstYear, secondYear)
