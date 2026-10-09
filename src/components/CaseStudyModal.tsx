import { X, ExternalLink, Github } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { projects, type Project } from '../data/projects'
interface CaseStudyModalProps {
  open: boolean
  onClose: () => void
  project?: Project | null
}

export default function CaseStudyModal({ open, onClose, project }: CaseStudyModalProps) {
  const activeProject = project ?? projects.find((p) => p.featured) ?? projects[0]
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isNearTop, setIsNearTop] = useState(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      scrollRef.current?.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, activeProject])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || !open) return

    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 1000)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setIsNearTop(e.clientY - rect.top < 120)
    }

    const handleMouseLeave = () => setIsNearTop(false)

    el.addEventListener('scroll', handleScroll)
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [open, activeProject])

  if (!open || !activeProject || typeof document === 'undefined') return null

  const showClose = isScrolling || isNearTop

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-light shadow-[0_0_50px_rgba(0,0,0,0.35)] dark:bg-dark dark:shadow-[0_0_50px_rgba(255,255,255,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={scrollRef} className="custom-scrollbar relative max-h-[88vh] overflow-y-auto">
          <button
            onClick={onClose}
            className={`sticky top-2 right-2 z-10 float-right m-2 rounded-full bg-light/90 p-2 text-muted shadow-sm backdrop-blur-sm transition-all hover:bg-dark/5 hover:text-dark dark:bg-dark/90 dark:hover:bg-light/10 dark:hover:text-light ${showClose ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Close case study"
            style={{ transitionDuration: showClose ? '300ms' : '1000ms' }}
          >
            <X size={20} />
          </button>

          <div className="p-6 md:p-10">
            <div className="mb-6">
              <h2 className="font-sans text-3xl font-bold tracking-tight">{activeProject.title}</h2>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl bg-dark/5 p-4 font-mono text-xs dark:bg-light/10 md:grid-cols-4">
              <div>
                <span className="text-muted">Role</span>
                <p className="mt-1 font-semibold text-dark dark:text-light">{activeProject.caseStudy.role}</p>
              </div>
              <div>
                <span className="text-muted">Timeline</span>
                <p className="mt-1 font-semibold text-dark dark:text-light">{activeProject.caseStudy.timeline}</p>
              </div>
              <div>
                <span className="text-muted">Live Website</span>
                {activeProject.liveUrl ? (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-1 font-semibold text-accent hover:underline"
                  >
                    Open <ExternalLink size={10} />
                  </a>
                ) : (
                  <p className="mt-1 text-muted">In Progress</p>
                )}
              </div>
              <div>
                <span className="text-muted">GitHub</span>
                <a
                  href={activeProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1 font-semibold text-accent hover:underline"
                >
                  Repo <Github size={10} />
                </a>
              </div>
            </div>

            <div className="space-y-8 font-sans text-sm leading-relaxed text-dark/90 dark:text-light/90 md:text-base">
              <section>
                <h3 className="mb-2 text-lg font-bold">The Problem</h3>
                <p className="text-muted">{activeProject.caseStudy.problem}</p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-bold">The Approach</h3>
                <p className="text-muted">{activeProject.caseStudy.approach}</p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-bold">Technical Solution</h3>
                <ul className="list-disc space-y-2 pl-5 text-muted">
                  {activeProject.caseStudy.technicalSolution.map((solution, i) => (
                    <li key={i}>{solution}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-bold">Features</h3>
                <div className="space-y-3 text-muted">
                  {activeProject.caseStudy.features.map((feature, i) => (
                    <p key={i}>
                      <strong>{feature.title}:</strong> {feature.description}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-bold">Challenges Overcome</h3>
                <ul className="list-disc space-y-2 pl-5 text-muted">
                  {activeProject.caseStudy.challenges.map((challenge, i) => (
                    <li key={i}>{challenge}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-bold">Key Takeaway</h3>
                <p className="text-muted">{activeProject.caseStudy.takeaway}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
