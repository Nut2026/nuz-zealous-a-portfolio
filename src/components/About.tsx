import { useLanguage } from '../i18n/LanguageContext'
import { cn } from '../lib/utils'

// Category keys map into the translated category labels; the item names stay
// as product names across every language.
const techStack = {
  languages: ['Python', 'TypeScript'],
  web: ['FastAPI', 'React', 'Astro', 'Tailwind'],
  plugin: ['Anki', 'VS Code', 'Inkscape', 'Google Sheets'],
  ai: ['Telethon', 'python-telegram-bot', 'discord.py'],
  databases: ['PostgreSQL', 'SQLite', 'Supabase'],
  deployment: ['Vercel', 'Railway', 'Cloudflare'],
  design: ['ibisPaint', 'Clipchamp'],
} as const

const hoverBlue = cn(
  'cursor-default text-dark transition-colors duration-200 hover:text-accent dark:text-light dark:hover:text-accent',
)

function HoverWord({ children, em = false }: { children: React.ReactNode; em?: boolean }) {
  return em ? (
    <em className={cn('not-italic font-semibold', hoverBlue)}>{children}</em>
  ) : (
    <span className={cn('font-semibold', hoverBlue)}>{children}</span>
  )
}

function Tags({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md bg-dark/5 px-3 py-1.5 font-mono text-xs font-medium text-dark transition-colors hover:bg-accent/20 dark:bg-light/10 dark:text-light dark:hover:bg-accent/20"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function Categories() {
  const { t } = useLanguage()
  const labels = {
    languages: t.about.categories.languages,
    web: t.about.categories.web,
    plugin: t.about.categories.plugin,
    ai: t.about.categories.ai,
    databases: t.about.categories.databases,
    deployment: t.about.categories.deployment,
    design: t.about.categories.design,
  }
  return (
    <>
      {Object.entries(techStack).map(([category, items]) => (
        <div key={category}>
          <h4 className="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-muted">
            {labels[category as keyof typeof labels]}
          </h4>
          <Tags items={items} />
        </div>
      ))}
    </>
  )
}

export default function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pt-2 pb-16 md:pt-10 md:pb-20">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight md:text-4xl">
            {t.about.title}
          </h2>
          <blockquote className="font-sans text-base leading-relaxed text-muted md:text-lg">
            {t.about.bio.map((seg, i) =>
              seg.style === 'hl' ? (
                <HoverWord key={i}>{seg.text}</HoverWord>
              ) : seg.style === 'hl-em' ? (
                <HoverWord key={i} em>
                  {seg.text}
                </HoverWord>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )}
          </blockquote>
        </div>

        <div>
          <h3 className="mb-6 font-sans font-semibold tracking-tight text-[24px]">{t.about.techStack}</h3>
          <div className="space-y-6">
            <Categories />
          </div>
        </div>
      </div>
    </section>
  )
}
