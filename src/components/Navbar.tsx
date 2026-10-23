import { useState, useEffect, useRef } from 'react'
import { Menu, X, Sun, Moon, Languages, Check } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { useLanguage } from '../i18n/LanguageContext'
import { scrollToSection } from '../lib/scroll'
import { cn } from '../lib/utils'

const navIds = [
  { key: 'work', href: '#foss' },
  { key: 'about', href: '#about' },
] as const

const languages = [
  { id: 'ms', native: 'Bahasa Melayu', code: 'MS' },
  { id: 'en', native: 'English', code: 'EN' },
  { id: 'zh', native: '中文', code: '中' },
] as const

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()
  const activeSection = useActiveSection(['hero', 'foss', 'programs', 'about', 'contact'])
  const { lang, setLang, t } = useLanguage()

  const handleNavClick = (href: string) => {
    // Close the mobile menu first so the header height is measured after it
    // collapses; the util reads the live header size on every call.
    if (mobileOpen) {
      setMobileOpen(false)
      window.setTimeout(() => scrollToSection(href), 120)
    } else {
      scrollToSection(href)
    }
    setLangOpen(false)
  }

  // Close the language dropdown on outside click / Escape.
  useEffect(() => {
    if (!langOpen) return
    const onMouseDown = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false)
    }
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [langOpen])

  const linkClass = (id: string) =>
    cn(
      'group relative font-sans text-sm font-medium transition-colors duration-200',
      activeSection === id ? 'text-dark dark:text-light' : 'text-muted hover:text-dark dark:hover:text-light',
    )

  const ringBorder = cn(
    'absolute inset-0 z-0 rounded-full border-2 border-[var(--ring)] transition-transform duration-300',
    activeSection === 'contact' ? 'scale-100' : 'scale-0',
  )

  const underline = (id: string) =>
    cn(
      'absolute -bottom-1 left-0 h-0.5 w-full origin-center transform bg-accent transition-transform duration-300',
      activeSection === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
    )

  const langButtonClass =
    'rounded-full p-2 text-muted transition-colors hover:bg-dark/5 hover:text-dark dark:hover:bg-light/10 dark:hover:text-light'

  const langDropdown = (
    <div
      ref={langMenuRef}
      className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-dark/10 bg-light p-1.5 shadow-lg shadow-dark/10 backdrop-blur-sm dark:border-light/10 dark:bg-dark dark:shadow-light/10"
    >
      {languages.map((option) => (
        <button
          key={option.id}
          onClick={() => {
            setLang(option.id)
            setLangOpen(false)
          }}
          className="group/item flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-dark/5 dark:hover:bg-light/10"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-dark/5 font-mono text-[11px] font-semibold text-muted transition-colors group-hover/item:bg-accent/40 group-hover/item:text-dark dark:bg-light/10 dark:text-muted dark:group-hover/item:text-dark">
            {option.code}
          </span>
          <span className="flex-1 truncate text-sm text-dark dark:text-light">{option.native}</span>
          {lang === option.id && <Check size={14} className="shrink-0 text-accent" />}
        </button>
      ))}
    </div>
  )

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-light/80 backdrop-blur-md transition-colors duration-300 dark:bg-dark/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#hero')
          }}
          className="flex items-center gap-3"
        >
          <img
            src="/nuz.png"
            alt="Nuz Zealous logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-sans text-lg font-semibold tracking-tight">Nuz Zealous</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navIds.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(link.href)
              }}
              className={linkClass(link.href.slice(1))}
            >
              {t.nav[link.key]}
              <span className={underline(link.href.slice(1))} />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#contact')
            }}
            className="group relative overflow-hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-dark transition-transform duration-200 hover:scale-105"
          >
            <span className="relative z-10">{t.nav.contact}</span>
            <span className={ringBorder} />
          </a>
          <div className="relative">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={langButtonClass}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setLangOpen((open) => !open)}
              aria-label="Change language"
              aria-expanded={langOpen}
              className={cn(langButtonClass, langOpen && 'text-dark dark:text-light')}
            >
              <Languages size={18} />
            </button>
            {langOpen && langDropdown}
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-muted transition-colors hover:bg-dark/5 dark:hover:bg-light/10"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="relative">
            <button
              onClick={() => setLangOpen((open) => !open)}
              aria-label="Change language"
              aria-expanded={langOpen}
              className={cn(
                'rounded-full p-2 text-muted transition-colors hover:bg-dark/5 dark:hover:bg-light/10',
                langOpen && 'text-dark dark:text-light',
              )}
            >
              <Languages size={18} />
            </button>
            {langOpen && langDropdown}
          </div>
          <button
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            className="rounded-full p-2 text-muted transition-colors hover:bg-dark/5 dark:hover:bg-light/10"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-dark/10 bg-light/95 px-6 pb-5 pt-4 backdrop-blur-md dark:border-light/10 dark:bg-dark/95 md:hidden">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {navIds.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={cn(
                  'group relative font-sans text-sm font-medium',
                  activeSection === link.href.slice(1) ? 'text-dark dark:text-light' : 'text-muted',
                )}
              >
                {t.nav[link.key]}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-0.5 w-full origin-center transform bg-accent transition-transform duration-300',
                    activeSection === link.href.slice(1) ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#contact')
              }}
              className="group relative overflow-hidden rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-dark"
            >
              <span className="relative z-10">{t.nav.contact}</span>
              <span
                className={cn(
                  'absolute inset-0 z-0 rounded-full border-2 border-[var(--ring)] transition-transform duration-300',
                  activeSection === 'contact' ? 'scale-100' : 'scale-0',
                )}
              />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
