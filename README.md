# Destructuring Field Guide

Olcan Askar  
Student number: 2024502180  
MIS 233, Fall 2026

Bonuses: none.

## Repository

https://github.com/olcanaskar/mis233-assignment4

The repository is public.

## Run

```
npm install
npm run all
npm run check
```

`output.txt` is the real output of `npm run all`.

## Data

My last ten films on Letterboxd (`letterboxd.com/olcan`), newest first:

Tokyo Godfathers (2003, 4), Primetime (2026, 3.5), Memories of Murder (2003,
4.5), The Worst Person in the World (2021, 4), The Lobster (2015, 3.5), Coyote
vs. Acme (2026, 3.5), Happy Together (1997, 3), The Working Class Goes to Heaven
(1971, 3), Punch-Drunk Love (2002, 3.5), Waves (2019, 4).

The list is in `js/data.mjs` and `ts/data.ts`. The TypeScript data only has
`id`, `title`, `year`, `director.name`, `genres` and `rating`.

## Field guide

All outputs are from `output.txt`.

### Form 1: values by position, `const [x, y] = f()`

**Syntax:** `const [oldest, newest] = yearRange(films)`

**Example** (`js/arrays.mjs`): `yearRange` returns `[Math.min(...years), Math.max(...years)]`, then I destructure it.

**Output:** `form 1: 1971 2026`

**Use it when:** a function returns several values in a fixed order.

**Watch out:** order is the only link. A missing item is `undefined`. In TS I
needed `: [number, number]`; otherwise the positions are `number | undefined`.

### Form 2: skip an item and collect the rest

**Syntax:** `const [, second, ...others] = ranked`

**Example** (`js/arrays.mjs`): I sort by rating descending, skip the first film, and take the second plus the rest.

**Output:** `form 2: Tokyo Godfathers + 8 more`

**Use it when:** the first item is not important but the rest are.

**Watch out:** the comma matters; `[second, ...others]` would take the first
film. In TS `second` is `Film | undefined`, so I used `second?.title`.

### Form 3: swap two variables

**Syntax:** `[a, b] = [b, a]`

**Example** (`js/arrays.mjs`): `let firstPick = ...; let secondPick = ...; [firstPick, secondPick] = [secondPick, firstPick]`

**Output:** `form 3: Primetime <-> Tokyo Godfathers`

**Use it when:** two values need to change places.

**Watch out:** use `let`, not `const`. The swap line starts with `;` because the
previous line ends with `]`. In TS I checked that both films exist first.

### Form 4: default values in an array

**Syntax:** `const [firstYear = 2003, secondYear = 2026] = emptyYears`

**Example** (`js/arrays.mjs`): `const emptyYears = []` then the line above.

**Output:** `form 4: 2003 2026`

**Use it when:** an item may be missing and there is a fallback.

**Watch out:** the default only runs for `undefined`, not `null`.

### Form 5: properties by name

**Syntax:** `const { title, year } = filmAt(0)`

**Example** (`js/objects.mjs`): `const { title, year } = filmAt(0)`

**Output:** `form 5: Tokyo Godfathers 2003`

**Use it when:** the property names are the names you want.

**Watch out:** a typo gives `undefined` in JS. If the value is `undefined` or
`null`, the line throws.

### Form 6: rename while you take it

**Syntax:** `const { title: filmTitle, year: releaseYear } = filmAt(1)`

**Example** (`js/objects.mjs`): `const { title: filmTitle, year: releaseYear } = filmAt(1)`

**Output:** `form 6: Primetime 2026`

**Use it when:** the property name clashes or is not clear.

**Watch out:** left of the colon is the property; right is the new variable.
After this line there is no `title` or `year` variable. In TS, `{ title: string }`
inside a pattern is also a rename, not a type.

### Form 7: default values in an object

**Syntax:** `const { rating = 0 } = unrated`

**Example** (`js/objects.mjs`): `const unrated = { ...filmAt(0), rating: undefined }`

**Output:** `form 7: 0`

**Use it when:** a field is optional.

**Watch out:** `null` does not trigger the default.

### Form 8: rest in an object

**Syntax:** `const { id, ...filmWithoutId } = filmAt(3)`

**Example** (`js/objects.mjs`): `const { id, ...filmWithoutId } = filmAt(3)`

**Output:** `form 8: the-worst-person-in-the-world title,year,director,genres,rating`

**Use it when:** one property must be removed.

**Watch out:** rest must be last, and the copy is shallow. Nested objects are
still shared.

### Form 9: nested patterns

**Syntax:** `const { director: { name: directorName }, genres: [mainGenre] } = filmAt(2)`

**Example** (`js/objects.mjs`): the line above.

**Output:** `form 9: Bong Joon-ho crime`

**Use it when:** you only need a deep piece of an object.

**Watch out:** every level must exist. `mainGenre` can be `undefined` if the
array is empty; TS types it as `string | undefined`.

### Form 10: a computed key

**Syntax:** `const key = 'year'; const { [key]: value } = filmAt(9)`

**Example** (`js/objects.mjs`): the line above.

**Output:** `form 10: year 2019`

**Use it when:** the property name is chosen at runtime.

**Watch out:** the brackets are required. In TS a plain `string` key gives
`TS2537`; use a literal or `keyof Film`.

### Form 11: patterns in parameters

**Syntax:** `function createFilm({ title = 'Untitled', year = 0, rating = 0 } = {})`

**Example** (`js/params.mjs`): `createFilm({ title: 'Waves', year: 2019 })` and `createFilm()`.

**Output:** `form 11: { title: 'Waves', year: 2019, rating: 0 }` and `form 11 empty: { title: 'Untitled', year: 0, rating: 0 }`

**Use it when:** a function takes an options object with defaults.

**Watch out:** `= {}` is a separate default. In TS the type goes after the
pattern; if the type has required fields, `= {}` does not compile. `null`
throws.

**Form 11b:** `describePair([first, second])` with two films gives
`form 11b: Tokyo Godfathers / Primetime`.

### Form 12: patterns in loops

**Syntax:** `for (const [id, film] of Object.entries(byId))`

**Example** (`js/params.mjs`): I build `byId` with `Object.fromEntries`, then loop. I also loop over a `Map` with `[title, year]`.

**Output:** `form 12: tokyo-godfathers => Tokyo Godfathers` and
`form 12 map: Tokyo Godfathers 2003` (full list in `output.txt`).

**Use it when:** you need both key and value in a loop.

**Watch out:** `Object.entries` gives a string key. In TS a `Map` needs the
tuple type `[string, number]`. `for...in` gives keys only.

## Pitfalls

### 1. Destructuring `undefined` or `null`

`const { title } = undefined` gives
`TypeError: Cannot destructure property 'title' of 'undefined' as it is undefined.`
`null` gives the same error. **Why:** they have no properties.

### 2. Default is only for `undefined`

`const { rating = 5 } = { rating: null }` prints `null`. **Why:** `null` is a
real value, not a missing one.

### 3. Assignment without `const`/`let` needs parentheses

`{ title } = film` gives `SyntaxError: Unexpected token '='`; `({ title } = film)`
works. **Why:** a line starting with `{` is read as a block.

### 4. Destructuring is a shallow copy

`const { director } = film; director.name = 'X'` changes the original film too.
**Why:** the nested object is shared by reference.

### 5. Array order matters, object order does not

`[a, b] = ['A', 'B']` changes if you swap the array. `{ first, second }` from
`{ second: 'B', first: 'A' }` still gives the same values. **Why:** arrays use
position, objects use names.

## TypeScript topics

### T1: `{ a: string }` is a rename, not a type

`const { title: string } = filmAt(0)` prints `T1 rename: Tokyo Godfathers`. It
creates a variable named `string`. The type goes after the pattern:
`const { title: filmTitle }: Film = filmAt(0)`.

### T2: tuple and `as const`

`const pair: [number, string] = [2003, 'Tokyo Godfathers']` prints
`T2 tuple: 2003 Tokyo Godfathers`. `const years = [2003, 2026, 1997] as const`
prints `T2 as const: 2003 2026`. Without the tuple type the positions are
`number | undefined`.

### T3: `noUncheckedIndexedAccess`

`const [firstFilm] = films` makes `firstFilm` a `Film | undefined`. `firstFilm.title`
alone gives `error TS18048: 'firstFilm' is possibly 'undefined'.` I used `?.`,
an `if` check, or a default.

### T4: optional fields and defaults

`rating?: number` is `number | undefined`. `const { rating = 0 }` makes it
`number`. `rating?: number | null` with a default stays `number | null`.
Outputs: `T4 optional: 4.5`, `T4 empty: undefined 0`, `T4 null: null`.

### T5: a compile error caused by destructuring

`const { rating }: { rating: number } = filmAt(0)` fails because `rating` is
optional:

```
error TS2322: Type 'Film' is not assignable to type '{ rating: number; }'.
  Types of property 'rating' are incompatible.
    Type 'number | undefined' is not assignable to type 'number'.
      Type 'undefined' is not assignable to type 'number'.
```

The fixed line is `const { rating: safeRating = 0 }: { rating?: number } = filmAt(0)`.
Output: `T5 suppressed: 4` and `T5 fixed: 4`. I used `@ts-expect-error` only on
the failing line.

## Props and children

A component gets one object, `props`. Content between the tags is the
`children` field.

### P1: props is one object

`function FilmCardA(props)` and `function FilmCardB({ film: { title }, children })`
render the same thing:

```
P1 A: <article><h2>Tokyo Godfathers</h2>same text</article>
P1 B: <article><h2>Tokyo Godfathers</h2>same text</article>
```

The second one uses form 11, form 9 and form 5.

### P2: children is only a prop

`<FilmCardB film={filmAt(1)}>Primetime note</FilmCardB>` and
`<FilmCardB film={filmAt(1)} children="Primetime note" />` both give:

```
P2 tag: <article><h2>Primetime</h2>Primetime note</article>
P2 prop: <article><h2>Primetime</h2>Primetime note</article>
```

In JS, giving both makes the tag content win. TS rejects it with
`TS2710: 'children' are specified twice`.

### P3: what children can be

| children | result |
|---|---|
| string, number, element, array | rendered |
| `undefined`, `null`, `false` | nothing |
| function | warning, nothing |

For example: `P3 string: "<article><h2>Tokyo Godfathers</h2>a review</article>"`
and `P3 undefined: "<article><h2>Tokyo Godfathers</h2></article>"`. A function
produces `Functions are not valid as a React child.` `ReactNode` does not
include functions.

### P4: children vs other props

`({ film, children, ...rest })` removes `film` and `children`; `rest` has
`className` and `id`. `<section {...rest}>` gives:

```
P4 rest: <section class="card" id="tokyo"><h2>Tokyo Godfathers</h2>text</section>
```

Spread order decides the winner: `<section {...rest} className="explicit">` keeps
`explicit`; `<section className="explicit" {...rest}>` keeps the rest value.

### P5: props or children?

`SlotCard` takes `header` and `footer`; `ChildrenCard` takes children only.
Outputs:

```
P5 slots: <article><header><span>Header</span></header><h2>The Worst Person in the World</h2><footer><span>Footer</span></footer></article>
P5 children: <article><h2>The Worst Person in the World</h2><span>Header</span><span>Footer</span></article>
```

Use slots when the layout is fixed and each part has a job. Use children when
the caller should decide the content and order.

### P6: defaults, `undefined` and `null`

```
P6 default: <span>0</span>
P6 undefined: <span>0</span>
P6 null: <span>no rating</span>
```

`undefined` triggers the default; `null` does not. `??` shows null as
`no rating`.

### P7: types for props and children

`children?: ReactNode` accepts strings, numbers, elements, arrays, `null`,
`undefined` and `false`; it rejects functions. `PropsWithChildren<{ film: Film }>`
adds optional children. `ComponentProps<'button'>` gives all button props
(`type`, `disabled`, `onClick`, `children`).

Outputs:

```
P7 PropsWithChildren: <article><h2>Tokyo Godfathers</h2>child</article>
P7 ComponentProps button: <button type="button" disabled="">Save</button>
P7 key probe: <span>undefined</span>
```

The compiler rejects:

```
<FilmCard film="Tokyo Godfathers" />  -> Type 'string' is not assignable to type 'Film'.
<FilmCard film={filmAt(0)} title="x" /> -> Property 'title' does not exist.
<FilmCard film={filmAt(0)}>{() => 'x'}</FilmCard> -> Type '() => string' is not assignable to type 'ReactNode'.
<FancyButton variant="ghost" /> -> Property 'variant' does not exist.
```

`key` is not a prop: `props.key` is `undefined` and React warns about it.

## JavaScript vs TypeScript

| Form | Same in both | TypeScript adds | Error if wrong |
|---|---|---|---|
| 1. array by position | `const [a, b] = f()` | `: [number, number]` | `TS18048` if a position is used as a number. |
| 2. skip and rest | `const [, second, ...others] = ranked` | nothing | `second.title` gives `TS18048`. |
| 3. swap | `[a, b] = [b, a]` | `let` plus a check | `films[0]` gives `TS18048` if used directly. |
| 6. rename | `const { a: alpha } = t` | nothing | `{ a: string }` is a rename, not a type. |
| 7. object default | `const { a = 1 } = t` | `a?: number` | Required `{ a: number }` gives `TS2322`. |
| 9. nested pattern | `const { p: { x } } = t` | nothing | Array element is `T \| undefined`. |
| 10. computed key | `const { [key]: value } = t` | literal or `keyof Film` | Plain `string` gives `TS2537`. |
| 11. parameter pattern | `function f({ a = 1 } = {})` | type after the pattern | Required fields make `= {}` invalid. |
| 12. loop pattern | `for (const [k, v] of Object.entries(o))` | tuple type for `Map` | `Map` infers a union without it. |
| props and children | `<Card>text</Card>` | `children?: ReactNode` | Function child gives `TS2322`; duplicate children give `TS2710`. |

## My own log

1. **TS2710.** I put both `children="from prop"` and tag content in `ts/props.tsx`.
   `npm run check` said: `error TS2710: 'children' are specified twice.` I removed
   it from TS; JS still runs it and the tag content wins.

2. **Function child.** I passed `() => 'ignored'` as children. React printed
   `Functions are not valid as a React child.` and rendered nothing. I learned
   that `ReactNode` does not include functions.

3. **`key` is not a prop.** I read `props.key` and got `undefined`, plus a warning
   saying `key` is not a prop. React removes it before the component runs.

4. **Optional rating.** I annotated `{ rating: number }` although `Film` has
   `rating?: number`. The error was
   `Type 'Film' is not assignable to type '{ rating: number; }'`. I kept the `?`
   or added a default.

5. **Array index.** `const [firstFilm] = films; firstFilm.title` gave
   `error TS18048: 'firstFilm' is possibly 'undefined'.` I used `?.`, an `if`
   check, or a default.
