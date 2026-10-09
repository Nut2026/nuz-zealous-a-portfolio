import { cn } from '../lib/utils'

const techStack = {
  Languages: ['Python', 'TypeScript', 'C#'],
  'Web Development': ['FastAPI', 'Next.js', 'React', 'Astro', 'Tailwind'],
  'Plugin Development': ['Anki', 'VS Code', 'Chrome', 'Excel'],
  'AI & Automation': ['PyTorch', 'Telethon', 'python-telegram-bot', 'discord.py'],
  Databases: ['PostgreSQL', 'SQLite', 'Supabase'],
  Deployment: ['Vercel', 'Railway'],
  Design: ['Inkscape', 'Blender', 'ibisPaint', 'Clipchamp'],
}

const hoverBlue = cn(
  'cursor-default text-dark transition-colors duration-200 hover:text-accent dark:text-light dark:hover:text-accent',
)

function HoverWord({ children }: { children: React.ReactNode }) {
  return <span className={cn('font-semibold', hoverBlue)}>{children}</span>
}

function HoverEm({ children }: { children: React.ReactNode }) {
  return <em className={cn('not-italic', hoverBlue)}>{children}</em>
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pt-2 pb-16 md:pt-10 md:pb-20">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight md:text-4xl">
            About Me
          </h2>
          <blockquote className="font-sans text-base leading-relaxed text-muted md:text-lg">
            I specialise in transforming ideas into <HoverWord>polished software</HoverWord>. My{' '}
            <HoverWord>ability</HoverWord> and <HoverWord>passion</HoverWord> for building scalable programs from
            scratch led me into <HoverWord>full-stack development</HoverWord>. Beyond the code, you can find me{' '}
            <HoverEm>writing</HoverEm> or spending <HoverEm>quality time with family</HoverEm>. I believe great
            technology is built through <HoverWord>empathy</HoverWord> and <HoverWord>perseverance</HoverWord>.
          </blockquote>
        </div>

        <div>
          <h3 className="mb-6 font-sans font-semibold tracking-tight text-[24px]">Tech Stack</h3>
          <div className="space-y-6">
            {Object.entries(techStack).map(([category, items]) => (
              <div key={category}>
                <h4 className="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-muted">
                  {category}
                </h4>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
