// Abdullah Olcan Askar, student number: 2024502180
// Bonus 2: an array pattern does not require an array; it requires an iterable.
// Run with `node js/depth.mjs`.

console.log('--- depth.mjs ---')

// A string is iterable, so its characters can be destructured.
const [firstLetter, secondLetter] = 'Film'
console.log('depth string:', firstLetter, secondLetter)

// A Set is iterable. It keeps insertion order and removes duplicates.
const [firstGenre, secondGenre] = new Set(['drama', 'comedy', 'drama', 'mystery'])
console.log('depth set:', firstGenre, secondGenre)

// A Map is iterable too, but each item is a [key, value] pair.
const filmMap = new Map([
  ['Tokyo Godfathers', 2003],
  ['Primetime', 2026]
])
const [[firstTitle, firstYear], [secondTitle, secondYear]] = filmMap
console.log('depth map:', firstTitle, firstYear, '|', secondTitle, secondYear)

// A generator is iterable without being an array.
function* pair() {
  yield 'Tokyo Godfathers'
  yield 2003
}
const [generatorTitle, generatorYear] = pair()
console.log('depth generator:', generatorTitle, generatorYear)

// A custom iterable only needs a Symbol.iterator method.
const filmIterable = {
  [Symbol.iterator]() {
    const values = ['Memories of Murder', 2003]
    let index = 0
    return {
      next() {
        if (index < values.length) {
          return { value: values[index++], done: false }
        }
        return { value: undefined, done: true }
      }
    }
  }
}
const [customTitle, customYear] = filmIterable
console.log('depth custom:', customTitle, customYear)

// Rest also reads from the iterator, not from array indexes.
function* numbers() {
  yield 1
  yield 2
  yield 3
}
const [one, ...rest] = numbers()
console.log('depth rest:', one, rest.join(','))

// A plain object has no default iterator, so an array pattern cannot use it.
const plainObject = { title: 'The Lobster' }
try {
  const [nothing] = plainObject
  console.log(nothing)
} catch (error) {
  console.log('depth object:', error.constructor.name, '-', error.message)
}
