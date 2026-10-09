import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const ratios: Record<string, number> = {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[entry.target.id] = entry.intersectionRatio
        })

        const sorted = Object.entries(ratios).sort((a, b) => b[1] - a[1])
        const mostVisible = sorted.find(([, ratio]) => ratio > 0)
        if (mostVisible) {
          setActiveSection(mostVisible[0])
        } else {
          setActiveSection('hero')
        }
      },
      { rootMargin: '0px 0px -20% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        ratios[id] = 0
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
