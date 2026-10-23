import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { scrollToSection } from '../lib/scroll'
import { cn } from '../lib/utils'

// Name variants the hero types and deletes in an endless loop. Even mid-typing
// every rendered slice keeps the same hover-blue highlight treatment.
const NAME_VARIANTS = ['Nuz Zealous', 'Nut2026', 'Nuzealous']

function TypingName() {
  const [variantIndex, setVariantIndex] = useState(0)
  const [rendered, setRendered] = useState(NAME_VARIANTS[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = NAME_VARIANTS[variantIndex]
    let delay: number
    let next: () => void

    if (!deleting) {
      if (rendered.length < current.length) {
        delay = 85
        next = () => setRendered(current.slice(0, rendered.length + 1))
      } else {
        // Hold the finished name, then start deleting it.
        delay = 1500
        next = () => setDeleting(true)
      }
    } else if (rendered.length > 0) {
      delay = 45
      next = () => setRendered(current.slice(0, rendered.length - 1))
    } else {
      delay = 350
      next = () => {
        setDeleting(false)
        setVariantIndex((v) => (v + 1) % NAME_VARIANTS.length)
      }
    }

    const timer = window.setTimeout(next, delay)
    return () => window.clearTimeout(timer)
  }, [rendered, deleting, variantIndex])

  return (
    <span className={cn('inline-flex items-baseline', hoverBlue)}>
      <span>{rendered || NAME_VARIANTS[variantIndex].slice(0, 1)}</span>
      <span className="animate-caret-blink mb-0.5 ml-1 inline-block h-[0.85em] w-[3px] self-center rounded-full bg-current opacity-60" />
    </span>
  )
}

const hoverBlue = cn(
  'cursor-default text-dark transition-colors duration-200 hover:text-accent dark:text-light dark:hover:text-accent',
)

function HoverWord({ children }: { children: React.ReactNode }) {
  return <span className={cn(hoverBlue, 'font-semibold')}>{children}</span>
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="flex min-h-screen flex-col items-center justify-center px-6 pt-28">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 font-sans text-5xl font-bold tracking-tight md:text-7xl">
          {t.hero.hiPrefix}
          <TypingName />
          {t.hero.hiSuffix}
        </h1>
        <h2 className="mx-auto mb-6 max-w-2xl font-sans text-xl font-medium leading-relaxed text-muted md:text-2xl">
          {t.hero.tagline.map((seg, i) =>
            seg.style === 'hl' || seg.style === 'hl-em' ? (
              <HoverWord key={i}>{seg.text}</HoverWord>
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
        </h2>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollToSection('#foss')}
            className="flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-sans text-sm font-semibold text-dark transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
          >
            {t.hero.viewWork}
            <ArrowDown size={16} />
          </button>
          <button
            onClick={() => scrollToSection('#about')}
            className="flex items-center gap-2 rounded-full border border-dark/20 px-8 py-3 font-sans text-sm font-medium text-dark transition-all duration-200 hover:border-accent hover:text-accent dark:border-light/20 dark:text-light dark:hover:border-accent dark:hover:text-accent"
          >
            {t.hero.knowMe}
            <ArrowDown size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
