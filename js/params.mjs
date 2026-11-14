// Olcan Askar, student number: 2024502180
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

import { filmAt, films } from './data.mjs'

console.log('--- params.mjs ---')

// Form 11: an options object in the parameter list, with defaults.
function createFilm({ title = 'Untitled', year = 0, rating = 0 } = {}) {
  return { title, year, rating }
}
console.log('form 11:', createFilm({ title: 'Waves', year: 2019 }))
console.log('form 11 empty:', createFilm())

// Form 11b: an array pattern in a parameter list.
function describePair([first, second]) {
  return `${first.title} / ${second.title}`
}
console.log('form 11b:', describePair([filmAt(0), filmAt(1)]))

// Form 12: destructuring in a loop over Object.entries.
const byId = Object.fromEntries(films.map((film) => [film.id, film]))
for (const [id, film] of Object.entries(byId)) {
  console.log('form 12:', id, '=>', film.title)
}

// Form 12b: the same idea with a Map.
const yearsByTitle = new Map(films.slice(0, 3).map((film) => [film.title, film.year]))
for (const [title, year] of yearsByTitle) {
  console.log('form 12 map:', title, year)
}
