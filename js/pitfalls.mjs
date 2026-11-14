// Olcan Askar, student number: 2024502180
// Things that surprise people. Run with `node js/pitfalls.mjs`.

import { filmAt } from './data.mjs'

console.log('--- pitfalls.mjs ---')

// Pitfall 1: destructuring undefined or null throws before any default can help.
try {
  const { title } = undefined
  console.log(title)
} catch (error) {
  console.log('pitfall 1 undefined:', error.constructor.name, '-', error.message)
}

try {
  const { title } = null
  console.log(title)
} catch (error) {
  console.log('pitfall 1 null:', error.constructor.name, '-', error.message)
}

// Pitfall 2: a default only applies to undefined, not to null.
const { rating = 5 } = { rating: null }
console.log('pitfall 2:', rating, '(the default did not run)')

// Pitfall 3: assigning without const/let needs parentheses.
// The string is compiled with new Function so the syntax error is catchable
// and the rest of this file still runs.
try {
  new Function('let title; { title } = { title: "Juno" }')
} catch (error) {
  console.log('pitfall 3:', error.constructor.name, '-', error.message)
}
let assignedTitle
;({ title: assignedTitle } = filmAt(0))
console.log('pitfall 3 fixed:', assignedTitle)

// Pitfall 4: destructuring copies references, not deep copies.
const original = { title: 'Memories of Murder', director: { name: 'Bong Joon-ho' } }
const { director } = original
director.name = 'Someone Else'
console.log('pitfall 4:', original.director.name, '(the original changed)')

// Pitfall 5: array order matters, object property order does not.
const [arrayFirst, arraySecond] = ['Tokyo Godfathers', 'Primetime']
const [swappedFirst, swappedSecond] = ['Primetime', 'Tokyo Godfathers']
const { first: objectFirst, second: objectSecond } = {
  second: 'Primetime',
  first: 'Tokyo Godfathers'
}
console.log(
  'pitfall 5:',
  arrayFirst,
  arraySecond,
  '|',
  swappedFirst,
  swappedSecond,
  '|',
  objectFirst,
  objectSecond
)
