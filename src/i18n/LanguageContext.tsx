import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { UiStrings } from './ui'
import { ui } from './ui'
import type { Project } from '../data/projects'
import { getProjects } from './projects-i18n'

export type Lang = 'en' | 'ms' | 'zh' | 'hi'

export const LANGUAGES: { id: Lang; native: string; code: string }[] = [
  { id: 'en', native: 'English', code: 'EN' },
  { id: 'ms', native: 'Bahasa Melayu', code: 'MS' },
  { id: 'zh', native: '中文', code: '中' },
  { id: 'hi', native: 'हिन्दी', code: 'हिं' },
]

export const LANG_STORAGE_KEY = 'nuz_lang'

const LANG_TAGS: Record<Lang, string> = {
  en: 'en',
  ms: 'ms',
  zh: 'zh-CN',
  hi: 'hi',
}

function isLang(value: string | null): value is Lang {
  return value === 'en' || value === 'ms' || value === 'zh' || value === 'hi'
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
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
    return isLang(stored) ? stored : 'en'
  })

  useEffect(() => {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang)
    document.documentElement.lang = LANG_TAGS[lang]
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
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
