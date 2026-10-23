import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { UiStrings } from './ui'
import { ui } from './ui'
import type { Project } from '../data/projects'
import { getProjects } from './projects-i18n'
export type Lang = 'en' | 'ms' | 'zh'
export const LANGUAGES: { id: Lang; native: string; code: string }[] = [
  { id: 'en', native: 'English', code: 'EN' },
  { id: 'ms', native: 'Bahasa Melayu', code: 'MS' },
  { id: 'zh', native: '中文', code: '中' },
]

const LANG_TAGS: Record<Lang, string> = {
  en: 'en',
  ms: 'ms',
  zh: 'zh-CN',
}

function langFromPath(pathname: string): Lang {
  if (pathname.startsWith('/en')) return 'en'
  if (pathname.startsWith('/ms')) return 'ms'
  if (pathname.startsWith('/zh')) return 'zh'
  return 'en'
}

function pathWithLang(lang: Lang): string {
  const rest = window.location.pathname.replace(/^\/?(en|ms|zh)\b\/?/, '')
  return `/${lang}${rest}`
}

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: UiStrings
  projects: Project[]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en'
    return langFromPath(window.location.pathname)
  })

  useEffect(() => {
    document.documentElement.lang = LANG_TAGS[lang]
  }, [lang])

  const setLangBound = useMemo(
    () => (lang: Lang) => {
      setLangState(lang)
      const newPath = pathWithLang(lang)
      if (window.location.pathname !== newPath) {
        window.history.replaceState(null, '', newPath)
      }
    },
    [],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangBound,
      t: ui[lang],
      projects: getProjects(lang),
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
