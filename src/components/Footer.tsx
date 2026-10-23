import { Github } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-dark/10 px-6 py-8 dark:border-light/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center font-mono text-xs text-muted">{t.footer.line}</p>
        <a
          href="https://github.com/Nut2026/nuz-zealous-a-portfolio"
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
