// Olcan Askar, student number: 2024502180
// Forms 11 and 12 in TypeScript, and the typing rules for patterns in parameters.

import { filmAt, films, type Film } from './data.js'

console.log('--- params.ts ---')

// Form 11: the type goes after the whole pattern.
// All fields are optional, so the whole parameter can default to {}.
type FilmInput = {
  title?: string
  year?: number
  rating?: number
}

function createFilm({ title = 'Untitled', year = 0, rating = 0 }: FilmInput = {}) {
  return { title, year, rating }
}
console.log('form 11:', createFilm({ title: 'Waves', year: 2019 }))
console.log('form 11 empty:', createFilm())

// Form 11b: an array pattern in a parameter list.
function describePair([first, second]: [Film, Film]): string {
  return `${first.title} / ${second.title}`
}
console.log('form 11b:', describePair([filmAt(0), filmAt(1)]))

// Form 12: destructuring in a loop over Object.entries.
const byId: Record<string, Film> = Object.fromEntries(films.map((film) => [film.id, film]))
for (const [id, film] of Object.entries(byId)) {
  console.log('form 12:', id, '=>', film.title)
}

// Form 12b: the same idea with a Map.
// The tuple return annotation keeps Map<string, number> instead of a union key/value type.
const yearsByTitle = new Map<string, number>(
  films.slice(0, 3).map((film): [string, number] => [film.title, film.year])
)
for (const [title, year] of yearsByTitle) {
  console.log('form 12 map:', title, year)
}
