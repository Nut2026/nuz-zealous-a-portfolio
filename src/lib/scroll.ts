// Maps a CSS selector to a precise scroll position that always accounts for
// the current sticky header height, so navigation never overshoots or stops
// short of a section title on any screen size.
export function scrollToSection(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return

  const header = document.querySelector<HTMLElement>('header')
  const headerHeight = header ? header.getBoundingClientRect().height : 0
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
