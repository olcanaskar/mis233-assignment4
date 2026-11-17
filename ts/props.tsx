// Abdullah Olcan Askar, student number: 2024502180
// Props and children in TypeScript. Run with `npx tsx ts/props.tsx`.
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { filmAt, type Film } from './data.js'

console.log('--- props.tsx ---')

type FilmCardProps = {
  film: Film
  children?: ReactNode
}

// P1: props is one object. FilmCardB destructures it in the parameter list.
function FilmCardA(props: FilmCardProps) {
  return (
    <article>
      <h2>{props.film.title}</h2>
      {props.children}
    </article>
  )
}

function FilmCardB({ film: { title }, children }: FilmCardProps) {
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


// P3: ReactNode is the type that decides what children can be.
const p3Cases: Array<[string, ReactNode]> = [
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

// A function is not a ReactNode. The cast lets us test what React does at runtime;
// the compiler rejection is written down in the README.
const functionChild = (() => 'ignored') as unknown as ReactNode
try {
  const html = renderToStaticMarkup(<FilmCardB film={filmAt(0)}>{functionChild}</FilmCardB>)
  console.log('P3 function:', JSON.stringify(html))
} catch (error) {
  console.log('P3 function error:', (error as Error).name, '-', (error as Error).message)
}

// P4: separate children from the other props, then spread the rest on a DOM element.
type SectionProps = {
  film: Film
  children?: ReactNode
  className?: string
  id?: string
}

function FilmSection({ film, children, ...rest }: SectionProps) {
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

function SpreadFirst({ film, children, ...rest }: SectionProps) {
  return (
    <section {...rest} className="explicit">
      <h2>{film.title}</h2>
      {children}
    </section>
  )
}

function SpreadLast({ film, children, ...rest }: SectionProps) {
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
type SlotCardProps = {
  film: Film
  header: ReactNode
  footer: ReactNode
}

function SlotCard({ film, header, footer }: SlotCardProps) {
  return (
    <article>
      <header>{header}</header>
      <h2>{film.title}</h2>
      <footer>{footer}</footer>
    </article>
  )
}

function ChildrenCard({ film, children }: FilmCardProps) {
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
type RatingProps = {
  value?: number | null
}

function Rating({ value = 0 }: RatingProps) {
  return <span>{value ?? 'no rating'}</span>
}

console.log('P6 default:', renderToStaticMarkup(<Rating />))
console.log('P6 undefined:', renderToStaticMarkup(<Rating value={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<Rating value={null} />))

// P7: three ways to type the props of a component.
type CardWithChildrenProps = PropsWithChildren<{ film: Film }>

function CardWithChildrenView({ film, children }: CardWithChildrenProps) {
  return (
    <article>
      <h2>{film.title}</h2>
      {children}
    </article>
  )
}

console.log(
  'P7 PropsWithChildren:',
  renderToStaticMarkup(<CardWithChildrenView film={filmAt(0)}>child</CardWithChildrenView>)
)

type ButtonProps = ComponentProps<'button'>

function FancyButton({ children, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>
}

console.log(
  'P7 ComponentProps button:',
  renderToStaticMarkup(
    <FancyButton type="button" disabled>
      Save
    </FancyButton>
  )
)
