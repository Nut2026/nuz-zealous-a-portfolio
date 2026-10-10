import { useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { cn } from '../lib/utils'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const activeSection = useActiveSection(['hero', 'work', 'about', 'contact'])

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (!el) return

    const isMobile = window.innerWidth < 768
    const offset = isMobile ? 140 : 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({ top, behavior: 'smooth' })
  }

  const linkClass = (href: string) =>
    cn(
      'group relative font-sans text-sm font-medium transition-colors duration-200',
      activeSection === href.slice(1) ? 'text-dark dark:text-light' : 'text-muted hover:text-dark dark:hover:text-light',
    )

  const ringBorder = cn(
    'absolute inset-0 z-0 rounded-full border-2 border-[var(--ring)] transition-transform duration-300',
    activeSection === 'contact' ? 'scale-100' : 'scale-0',
  )

  const underline = (href: string) =>
    cn(
      'absolute -bottom-1 left-0 h-0.5 w-full origin-center transform bg-accent transition-transform duration-300',
      activeSection === href.slice(1) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(link.href)
              }}
              className={linkClass(link.href)}
            >
              {link.label}
              <span className={underline(link.href)} />
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
            <span className="relative z-10">Contact</span>
            <span className={ringBorder} />
          </a>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-muted transition-colors hover:bg-dark/5 hover:text-dark dark:hover:bg-light/10 dark:hover:text-light"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-muted transition-colors hover:bg-dark/5 dark:hover:bg-light/10"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
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
            {navLinks.map((link) => (
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
                {link.label}
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
              <span className="relative z-10">Contact</span>
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
