// Olcan Askar, student number: 2024502180
// The same six object forms as js/objects.mjs, now typed.

import { filmAt, type Film } from './data.js'

console.log('--- objects.ts ---')

// Form 5: take properties out of an object by name.
const { title, year } = filmAt(0)
console.log('form 5:', title, year)

// Form 6: rename while you take it. The type stays string, string, number.
const { title: filmTitle, year: releaseYear } = filmAt(1)
console.log('form 6:', filmTitle, releaseYear)

// Form 7: a default fills in a missing rating, but only for undefined.
const unrated: Film = { ...filmAt(0), rating: undefined }
const { rating = 0 } = unrated
console.log('form 7:', rating)

// Form 8: rest collects every property except id.
const { id, ...filmWithoutId } = filmAt(3)
console.log('form 8:', id, Object.keys(filmWithoutId).join(','))

// Form 9: nested object pattern and an array pattern inside it.
// mainGenre is string | undefined because the array could be empty.
const { director: { name: directorName }, genres: [mainGenre] } = filmAt(2)
console.log('form 9:', directorName, mainGenre)

// Form 10: a computed key decides which property is read.
const key = 'year'
const { [key]: value } = filmAt(9)
console.log('form 10:', key, value)
