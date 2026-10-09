import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-dark/10 px-6 py-8 dark:border-light/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center font-mono text-xs text-muted">© 2026 Nuz Zealous. Built at night on a brainwave.</p>
        <a
          href="https://github.com/Nut2026/nuz-zealous-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-dark/20 text-muted transition-colors hover:border-accent hover:text-accent dark:border-light/20 dark:hover:border-accent dark:hover:text-accent"
          aria-label="GitHub repository"
        >
          <Github size={16} />
        </a>
      </div>
    </footer>
  )
}
