import { ArrowDown } from 'lucide-react'
import { cn } from '../lib/utils'

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const hoverBlue = cn(
    'cursor-default text-dark transition-colors duration-200 hover:text-accent dark:text-light dark:hover:text-accent',
  )

  const boldHoverBlue = cn(
    'cursor-default font-semibold text-dark transition-colors duration-200 hover:text-accent dark:text-light dark:hover:text-accent',
  )

  return (
    <section id="hero" className="flex min-h-screen flex-col items-center justify-center px-6 pt-28">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 font-sans text-5xl font-bold tracking-tight md:text-7xl">
          Hi, it's{' '}
          <span className={hoverBlue}>Nuz Zealous</span>
          !
        </h1>
        <h2 className="mx-auto mb-6 max-w-2xl font-sans text-xl font-medium leading-relaxed text-muted md:text-2xl">
          🌟 I'm a{' '}
          <span className={boldHoverBlue}>full-stack developer</span>{' '}
          who turns a{' '}
          <span className={boldHoverBlue}>single-line pitch</span>{' '}
          into a{' '}
          <span className={boldHoverBlue}>standout product</span>
          .
        </h2>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => handleScrollTo('#work')}
            className="flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-sans text-sm font-semibold text-dark transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
          >
            View My Work
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => handleScrollTo('#about')}
            className="flex items-center gap-2 rounded-full border border-dark/20 px-8 py-3 font-sans text-sm font-medium text-dark transition-all duration-200 hover:border-accent hover:text-accent dark:border-light/20 dark:text-light dark:hover:border-accent dark:hover:text-accent"
          >
            Get to Know Me
            <ArrowDown size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
