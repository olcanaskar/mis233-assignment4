// Abdullah Olcan Askar, student number: 2024502180
// The ten films I watched most recently on Letterboxd (letterboxd.com/olcan).
// The TypeScript data stays deliberately small: no runtime, country,
// rewatch, watchedOn, tags or letterboxdUrl fields.

export type Film = {
  id: string
  title: string
  year: number
  director: { name: string }
  genres: string[]
  rating?: number
}

export const films: Film[] = [
  {
    id: 'tokyo-godfathers',
    title: 'Tokyo Godfathers',
    year: 2003,
    director: { name: 'Satoshi Kon' },
    genres: ['animation', 'comedy', 'drama'],
    rating: 4
  },
  {
    id: 'primetime-2026',
    title: 'Primetime',
    year: 2026,
    director: { name: 'Lance Oppenheim' },
    genres: ['crime', 'drama', 'thriller'],
    rating: 3.5
  },
  {
    id: 'memories-of-murder',
    title: 'Memories of Murder',
    year: 2003,
    director: { name: 'Bong Joon-ho' },
    genres: ['crime', 'drama', 'mystery'],
    rating: 4.5
  },
  {
    id: 'the-worst-person-in-the-world',
    title: 'The Worst Person in the World',
    year: 2021,
    director: { name: 'Joachim Trier' },
    genres: ['comedy', 'drama', 'romance'],
    rating: 4
  },
  {
    id: 'the-lobster',
    title: 'The Lobster',
    year: 2015,
    director: { name: 'Yorgos Lanthimos' },
    genres: ['comedy', 'drama', 'romance', 'sci-fi'],
    rating: 3.5
  },
  {
    id: 'coyote-vs-acme',
    title: 'Coyote vs. Acme',
    year: 2026,
    director: { name: 'Dave Green' },
    genres: ['adventure', 'animation', 'comedy', 'family'],
    rating: 3.5
  },
  {
    id: 'happy-together-1997',
    title: 'Happy Together',
    year: 1997,
    director: { name: 'Wong Kar-wai' },
    genres: ['drama', 'romance'],
    rating: 3
  },
  {
    id: 'the-working-class-goes-to-heaven',
    title: 'The Working Class Goes to Heaven',
    year: 1971,
    director: { name: 'Elio Petri' },
    genres: ['drama'],
    rating: 3
  },
  {
    id: 'punch-drunk-love',
    title: 'Punch-Drunk Love',
    year: 2002,
    director: { name: 'Paul Thomas Anderson' },
    genres: ['comedy', 'drama', 'romance'],
    rating: 3.5
  },
  {
    id: 'waves-2019',
    title: 'Waves',
    year: 2019,
    director: { name: 'Trey Edward Shults' },
    genres: ['drama', 'romance'],
    rating: 4
  }
]

export function filmAt(index: number): Film {
  const film = films[index]
  if (!film) {
    throw new Error(`No film at index ${index}`)
  }
  return film
}
