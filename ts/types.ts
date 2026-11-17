// Abdullah Olcan Askar, student number: 2024502180
// What only TypeScript adds (topics T1 to T5). See the handout.

import { filmAt, films, type Film } from './data.js'

console.log('--- types.ts ---')

// T1: inside a pattern, `title: string` is a RENAME, not a type.
// It creates a variable named `string`; it does not annotate the title.
{
  const { title: string } = filmAt(0)
  console.log('T1 rename:', string)
}

// The type belongs after the whole pattern.
const { title: filmTitle }: Film = filmAt(0)
console.log('T1 typed:', filmTitle)

// T2: a tuple return type fixes the type of each position.
const pair: [number, string] = [2003, 'Tokyo Godfathers']
const [pairYear, pairTitle] = pair
console.log('T2 tuple:', pairYear, pairTitle)

// `as const` makes the array a readonly tuple of literal types.
const years = [2003, 2026, 1997] as const
const [firstYear, secondYear] = years
console.log('T2 as const:', firstYear, secondYear)

// T3: noUncheckedIndexedAccess makes firstFilm Film | undefined.
const [firstFilm] = films
console.log('T3 first:', firstFilm?.title)
if (!firstFilm) {
  throw new Error('No first film')
}
console.log('T3 safe:', firstFilm.title)

// A default can remove the undefined from the type.
const [fallbackFilm = filmAt(0)] = [] as Film[]
console.log('T3 default:', fallbackFilm.title)

// T4: optional field, optional field with default, and optional nullable field.
type OptionalRating = { rating?: number }
const rated: OptionalRating = { rating: 4.5 }
const { rating } = rated
console.log('T4 optional:', rating)

const { rating: defaultRating = 0 } = rated
console.log('T4 default:', defaultRating)

const empty: OptionalRating = {}
const { rating: emptyRating } = empty
const { rating: emptyDefault = 0 } = empty
console.log('T4 empty:', emptyRating, emptyDefault)

const nullable: { rating?: number | null } = { rating: null }
const { rating: nullRating = 0 } = nullable
console.log('T4 null:', nullRating)

// T5: a compile error caused by destructuring.
// The annotation says rating is required, but Film says it is optional.
// @ts-expect-error - Type 'Film' is not assignable to type '{ rating: number; }'
const { rating: requiredRating }: { rating: number } = filmAt(0)
console.log('T5 suppressed:', requiredRating)

// The fix is to keep the optional marker, or provide a default.
const { rating: safeRating = 0 }: { rating?: number } = filmAt(0)
console.log('T5 fixed:', safeRating)
