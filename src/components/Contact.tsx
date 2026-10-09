import { useState } from 'react'
import { Github, Mail, MessageCircle, Check } from 'lucide-react'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'nuzealouss@gmail.com'

  const handleCopyEmail = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h2 className="mb-4 font-sans text-4xl font-bold tracking-tight md:text-5xl">
        Let's Build Amazingz Together.
      </h2>
      <p className="mx-auto mb-10 max-w-lg font-sans text-[18px] text-muted">
        🟢 Currently available for freelance / part-time roles / open-source collaboration.
      </p>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href={`mailto:${email}`}
          onClick={handleCopyEmail}
          className="relative flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-sans text-sm font-semibold text-dark transition-all duration-200 hover:scale-105"
        >
          {copied ? <Check size={18} /> : <Mail size={18} />}
          <span>{copied ? 'Email copied!' : 'Copy my Email'}</span>
        </a>

        <a
          href="https://t.me/nutnotnuts"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center gap-2 rounded-full border border-dark/20 px-6 py-3 font-sans text-sm font-semibold text-dark transition-all duration-200 hover:scale-105 dark:border-light/20 dark:text-light"
        >
          <MessageCircle size={18} />
          <span>Talk on Telegram</span>
        </a>
      </div>

      <p className="font-sans text-sm text-muted">
        Or find me on{' '}
        <a
          href="https://github.com/Nut2026"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-medium text-dark underline underline-offset-2 transition-colors hover:text-accent dark:text-light dark:hover:text-accent"
        >
          <Github
            size={14}
            className="transition-colors group-hover:text-accent dark:group-hover:text-accent"
          />
          GitHub
        </a>{' '}
        and{' '}
        <a
          href="https://devpost.com/nuzealous"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-medium text-dark underline underline-offset-2 transition-colors hover:text-accent dark:text-light dark:hover:text-accent"
        >
          <DevpostIcon
            className="text-black transition-colors group-hover:text-accent dark:text-white dark:group-hover:text-accent"
          />
          Devpost
        </a>
      </p>
    </section>
  )
}

function DevpostIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="img"
      className={`h-3.5 w-3.5 fill-current ${className ?? ''}`}
    >
      <path d="M6.002 1.61 0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z" />
    </svg>
  )
}
