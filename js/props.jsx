// Olcan Askar, student number: 2024502180
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'
import { filmAt } from './data.mjs'

console.log('--- props.jsx ---')

// P1: props is ONE object. CardA reads props.film, CardB destructures it.
function FilmCardA(props) {
  return (
    <article>
      <h2>{props.film.title}</h2>
      {props.children}
    </article>
  )
}

function FilmCardB({ film: { title }, children }) {
  return (
    <article>
      <h2>{title}</h2>
      {children}
    </article>
  )
}

console.log('P1 A:', renderToStaticMarkup(<FilmCardA film={filmAt(0)}>same text</FilmCardA>))
console.log('P1 B:', renderToStaticMarkup(<FilmCardB film={filmAt(0)}>same text</FilmCardB>))

// P2: children is only a prop. These two lines render the same thing.
console.log('P2 tag:', renderToStaticMarkup(<FilmCardB film={filmAt(1)}>Primetime note</FilmCardB>))
console.log('P2 prop:', renderToStaticMarkup(<FilmCardB film={filmAt(1)} children="Primetime note" />))

// What if both are supplied? Try it instead of guessing.
try {
  const html = renderToStaticMarkup(
    <FilmCardB film={filmAt(1)} children="from prop">
      from tag
    </FilmCardB>
  )
  console.log('P2 both:', html)
} catch (error) {
  console.log('P2 both error:', error.constructor.name, '-', error.message)
}

// P3: what children can be. Each case is rendered and printed as a JSON string
// so that an empty result is visible as an empty string, not as nothing.
const p3Cases = [
  ['string', 'a review'],
  ['number', 42],
  ['one element', <strong>important</strong>],
  ['several elements', [<span key="a">A</span>, <span key="b">B</span>]],
  ['undefined', undefined],
  ['null', null],
  ['false', false]
]

for (const [label, child] of p3Cases) {
  const html = renderToStaticMarkup(<FilmCardB film={filmAt(0)}>{child}</FilmCardB>)
  console.log(`P3 ${label}:`, JSON.stringify(html))
}

try {
  const html = renderToStaticMarkup(<FilmCardB film={filmAt(0)}>{() => 'ignored'}</FilmCardB>)
  console.log('P3 function:', JSON.stringify(html))
} catch (error) {
  console.log('P3 function error:', error.constructor.name, '-', error.message)
}

// P4: separate children from the other props, then spread the rest on a DOM element.
function FilmSection({ film, children, ...rest }) {
  return (
    <section {...rest}>
      <h2>{film.title}</h2>
      {children}
    </section>
  )
}

console.log(
  'P4 rest:',
  renderToStaticMarkup(
    <FilmSection film={filmAt(0)} className="card" id="tokyo">
      text
    </FilmSection>
  )
)

// The order decides who wins when the same prop is written twice.
function SpreadFirst({ film, children, ...rest }) {
  return (
    <section {...rest} className="explicit">
      <h2>{film.title}</h2>
      {children}
    </section>
  )
}

function SpreadLast({ film, children, ...rest }) {
  return (
    <section className="explicit" {...rest}>
      <h2>{film.title}</h2>
      {children}
    </section>
  )
}

console.log(
  'P4 explicit wins:',
  renderToStaticMarkup(
    <SpreadFirst film={filmAt(0)} className="from-rest">
      x
    </SpreadFirst>
  )
)
console.log(
  'P4 rest wins:',
  renderToStaticMarkup(
    <SpreadLast film={filmAt(0)} className="from-rest">
      x
    </SpreadLast>
  )
)

// P5: the same card with header/footer props and with children only.
function SlotCard({ film, header, footer }) {
  return (
    <article>
      <header>{header}</header>
      <h2>{film.title}</h2>
      <footer>{footer}</footer>
    </article>
  )
}

function ChildrenCard({ film, children }) {
  return (
    <article>
      <h2>{film.title}</h2>
      {children}
    </article>
  )
}

console.log(
  'P5 slots:',
  renderToStaticMarkup(
    <SlotCard
      film={filmAt(3)}
      header={<span>Header</span>}
      footer={<span>Footer</span>}
    />
  )
)
console.log(
  'P5 children:',
  renderToStaticMarkup(
    <ChildrenCard film={filmAt(3)}>
      <span>Header</span>
      <span>Footer</span>
    </ChildrenCard>
  )
)

// P6: undefined triggers the default, null does not.
function Rating({ value = 0 }) {
  return <span>{value ?? 'no rating'}</span>
}

console.log('P6 default:', renderToStaticMarkup(<Rating />))
console.log('P6 undefined:', renderToStaticMarkup(<Rating value={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<Rating value={null} />))

// P7: JavaScript has no compiler, so the type rules live in ts/props.tsx.
// Here is the runtime part: rest props are forwarded to a real button.
function FancyButton({ children, ...rest }) {
  return <button {...rest}>{children}</button>
}

console.log(
  'P7 button:',
  renderToStaticMarkup(
    <FancyButton type="button" disabled>
      Save
    </FancyButton>
  )
)

// A key is not a normal prop: React takes it out before the component runs.
function KeyProbe(props) {
  return <span>{String(props.key)}</span>
}
console.log('P7 key probe:', renderToStaticMarkup(<KeyProbe key="secret" />))
