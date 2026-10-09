import { useState, useRef, useEffect, useCallback } from 'react'
import { ExternalLink, Github, BookOpen } from 'lucide-react'
import CaseStudyModal from './CaseStudyModal'
import { projects, type Project } from '../data/projects'
import { cn } from '../lib/utils'

const LEFT_TITLES = ['00', 'Ready, set', 'Kickoff', 'Once upon a time...']
const RIGHT_TITLES = ['Fin', '∞', "Something's brewing!", 'The code and beyond']

export default function FeaturedWork() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null)
  const [leftTitle] = useState(() => LEFT_TITLES[Math.floor(Math.random() * LEFT_TITLES.length)])
  const [rightTitle] = useState(() => RIGHT_TITLES[Math.floor(Math.random() * RIGHT_TITLES.length)])

  const starredIndex = projects.findIndex((p) => p.featured ?? false)
  const fallbackIndex = starredIndex === -1 ? projects.length - 1 : starredIndex

  const MIN_GLIDE = -1
  const MAX_GLIDE = projects.length

  const [glidePosition, setGlidePosition] = useState(() => {
    const saved = sessionStorage.getItem('nuz_featured_glide')
    if (saved) {
      const val = Number(saved)
      if (Number.isFinite(val)) return val
    }
    return fallbackIndex
  })

  const [isDragging, setIsDragging] = useState(false)
  const isPointerDown = useRef(false)
  const isDragGesture = useRef(false)
  const dragStartX = useRef(0)
  const dragStartGlide = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderTrackRef = useRef<HTMLDivElement>(null)
  const isSliderDragging = useRef(false)

  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    sessionStorage.setItem('nuz_featured_glide', String(glidePosition))
  }, [glidePosition])

  const isMobile = viewportWidth < 768
  const cardWidth = isMobile
    ? Math.min(330, Math.max(250, viewportWidth * 0.72))
    : Math.min(640, Math.max(340, viewportWidth * 0.62))
  const cardGap = isMobile ? 14 : 32
  const step = cardWidth + cardGap

  const glideTo = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(MIN_GLIDE, Math.min(MAX_GLIDE, targetIndex))
      setGlidePosition(clamped)
    },
    [MIN_GLIDE, MAX_GLIDE],
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('a') || target.closest('[data-interactive="true"]')) return

    isPointerDown.current = true
    isDragGesture.current = false
    dragStartX.current = e.clientX
    dragStartGlide.current = glidePosition
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return
    const deltaX = e.clientX - dragStartX.current

    if (!isDragGesture.current && Math.abs(deltaX) > 6) {
      isDragGesture.current = true
      setIsDragging(true)
      ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    }

    if (isDragGesture.current) {
      const sensitivity = cardWidth * 0.4
      const nextGlide = dragStartGlide.current - deltaX / sensitivity
      const boundedGlide = Math.max(MIN_GLIDE - 0.2, Math.min(MAX_GLIDE + 0.2, nextGlide))
      setGlidePosition(boundedGlide)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return
    isPointerDown.current = false

    if (isDragGesture.current) {
      setIsDragging(false)
      try {
        ;(e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId)
      } catch {
        // ignore
      }
      const nearest = Math.round(glidePosition)
      const clamped = Math.max(MIN_GLIDE, Math.min(MAX_GLIDE, nearest))
      setGlidePosition(clamped)
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
      e.preventDefault()
      const change = (e.deltaX / step) * 0.65
      const next = Math.max(MIN_GLIDE, Math.min(MAX_GLIDE, glidePosition + change))
      setGlidePosition(next)
    }
  }

  const sliderRatio = Math.max(0, Math.min(1, (glidePosition - MIN_GLIDE) / (MAX_GLIDE - MIN_GLIDE)))
  const thumbWidthPercent = 24
  const thumbLeftPercent = sliderRatio * (100 - thumbWidthPercent)

  const calculateGlideFromSlider = (clientX: number) => {
    if (!sliderTrackRef.current) return glidePosition
    const rect = sliderTrackRef.current.getBoundingClientRect()
    const clickX = clientX - rect.left
    const ratio = Math.max(0, Math.min(1, clickX / rect.width))
    return MIN_GLIDE + ratio * (MAX_GLIDE - MIN_GLIDE)
  }

  const handleSliderPointerDown = (e: React.PointerEvent) => {
    isSliderDragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
    const nextGlide = calculateGlideFromSlider(e.clientX)
    setGlidePosition(nextGlide)
  }

  const handleSliderPointerMove = (e: React.PointerEvent) => {
    if (!isSliderDragging.current) return
    const nextGlide = calculateGlideFromSlider(e.clientX)
    setGlidePosition(nextGlide)
  }

  const handleSliderPointerUp = (e: React.PointerEvent) => {
    if (!isSliderDragging.current) return
    isSliderDragging.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId)
    } catch {
      // ignore
    }
    const snapped = Math.round(glidePosition)
    setGlidePosition(Math.max(MIN_GLIDE, Math.min(MAX_GLIDE, snapped)))
  }

  const handleCardClick = (project: Project, index: number, isMiddle: boolean, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isDragGesture.current) return

    if (isMiddle) {
      setSelectedCaseStudy(project)
    } else {
      glideTo(index)
    }
  }

  const lastProject = projects[projects.length - 1]
  const lastProjectTitle = lastProject?.title ?? 'Nuz Zealous - A Portfolio'
  const lastProjectMonth = lastProject?.month ?? 'September 2026'

  const cardStyle = (dist: number) => ({
    width: `${cardWidth}px`,
    transform: `translateX(${dist * step}px) translateY(${Math.min(60, Math.pow(dist, 2) * 16)}px) rotateZ(${dist * 2.2}deg) scale(${Math.max(0.78, 1 - Math.abs(dist) * 0.12)})`,
    opacity: dist === 0 ? 1 : Math.max(0.3, 1 - Math.abs(dist) * 0.48),
    zIndex: Math.max(1, Math.round(100 - Math.abs(dist) * 30)),
    transition: isDragging ? 'none' : 'transform 260ms ease-out, opacity 260ms ease-out',
  })

  return (
    <section id="work" className="mx-auto max-w-7xl px-4 pt-16 pb-2 md:pb-6 select-none">
      <div className="mb-6 px-2 md:px-8">
        <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight md:text-4xl">Featured Programs</h2>

        <div className="flex flex-wrap items-center gap-3">
          <p className="font-sans text-sm md:text-base text-muted">Meet my monthly builds!</p>

          <div
            ref={sliderTrackRef}
            onPointerDown={handleSliderPointerDown}
            onPointerMove={handleSliderPointerMove}
            onPointerUp={handleSliderPointerUp}
            onPointerCancel={handleSliderPointerUp}
            className="relative flex h-2 w-24 cursor-pointer touch-none sliderBar"
          >
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-muted" />
            <div
              className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-accent shadow transition-transform duration-150"
              style={{
                left: `calc(${thumbLeftPercent}% - ${thumbWidthPercent / 2}%)`,
                transform: 'translateY(-50%)',
              }}
            />
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative h-[470px] md:h-[630px] w-full cursor-grab overflow-hidden active:cursor-grabbing touch-pan-y"
        style={{ perspective: 1200 }}
      >
        <div className="relative flex h-full w-full items-start justify-center pt-2 pb-6 md:pb-12" style={{ transform: 'translateZ(0)' }}>
          {renderPlaceholder(
            -1,
            glidePosition,
            step,
            isDragging,
            isDragGesture,
            glideTo,
            cardWidth,
            leftTitle,
            'Slide to first build',
            'arrow-moving-right',
            'M5 12h14M12 5l7 7-7 7',
          )}

          {projects.map((project, idx) => {
            const dist = idx - glidePosition
            if (Math.abs(dist) >= 2.5) return null

            const isMiddle = Math.abs(dist) < 0.4
            const isFeatured = project.featured ?? false

            return (
              <div
                key={project.id}
                onClick={(e) => handleCardClick(project, idx, isMiddle, e)}
                className={cn('absolute shrink-0 cursor-pointer pointer-events-auto', isMiddle ? 'cursor-pointer' : 'cursor-pointer hover:opacity-75')}
                style={cardStyle(dist)}
              >
                <div
                  className={cn(
                    'group rounded-2xl bg-white transition-all duration-300 dark:bg-dark/95',
                    isFeatured ? 'starred-gold-border border-2' : 'border border-dark/10 dark:border-light/10 hover:shadow-xl hover:shadow-dark/20 dark:hover:shadow-light/20',
                  )}
                >
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div
                      className={cn(
                        'absolute bottom-0 left-0 right-0 h-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100',
                        isFeatured ? 'bg-amber-400 dark:bg-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-accent',
                      )}
                    />
                    {isFeatured && (
                      <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3 rounded-full bg-amber-500/90 px-2.5 py-0.5 md:px-3 md:py-1 font-mono text-[10px] md:text-xs font-bold text-dark shadow-md backdrop-blur-sm dark:bg-amber-400/90">
                        ⭐ Starred Build
                      </div>
                    )}
                  </div>

                  <div className="p-4 md:p-6">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-dark/5 px-2.5 py-0.5 font-mono text-[10px] md:text-xs font-medium text-dark dark:bg-light/10 dark:text-light"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-[11px] md:text-xs font-semibold text-muted">{project.month}</span>
                    </div>

                    <h3 className="mb-1.5 font-sans text-lg md:text-2xl font-bold tracking-tight">{project.title}</h3>
                    <p className="mb-4 line-clamp-2 md:line-clamp-3 font-sans text-xs md:text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>

                    <div className={cn('flex flex-wrap gap-2 md:gap-3', isMiddle ? 'pointer-events-auto' : 'pointer-events-none opacity-60')}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-30 flex items-center gap-1.5 rounded-full bg-accent px-3 md:px-4 py-1.5 text-xs font-semibold text-dark transition-transform duration-200 hover:scale-105"
                          data-interactive="true"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={13} />
                          Visit Live
                        </a>
                      )}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-30 flex items-center gap-1.5 rounded-full border border-dark/20 px-3 md:px-4 py-1.5 text-xs font-medium text-dark transition-all duration-200 hover:border-accent hover:text-accent dark:border-light/20 dark:text-light dark:hover:border-accent dark:hover:text-accent"
                        data-interactive="true"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={13} />
                        Repo
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCaseStudy(project)
                        }}
                        className="relative z-30 flex items-center gap-1.5 rounded-full border border-dark/20 px-3 md:px-4 py-1.5 text-xs font-medium text-dark transition-all duration-200 hover:border-accent hover:text-accent dark:border-light/20 dark:text-light dark:hover:border-accent dark:hover:text-accent"
                        data-interactive="true"
                      >
                        <BookOpen size={13} />
                        Case Study
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {renderPlaceholder(
            projects.length,
            glidePosition,
            step,
            isDragging,
            isDragGesture,
            glideTo,
            cardWidth,
            rightTitle,
            'Slide to latest build',
            'arrow-moving-left',
            'M19 12H5M12 19l-7-7 7-7',
            lastProjectTitle,
            lastProjectMonth,
          )}
        </div>
      </div>
      <CaseStudyModal
        open={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        project={selectedCaseStudy}
      />
    </section>
  )
}

function renderPlaceholder(
  index: number,
  glidePosition: number,
  step: number,
  isDragging: boolean,
  isDragGesture: React.MutableRefObject<boolean>,
  glideTo: (targetIndex: number) => void,
  cardWidth: number,
  title: string,
  ariaLabel: string,
  arrowClass: string,
  arrowPath: string,
  subtitleExtra?: string,
  subtitleMonth?: string,
) {
  const dist = index - glidePosition
  if (Math.abs(dist) >= 2.5) return null

  const isMiddle = Math.abs(dist) < 0.4

  return (
    <div
      key={`placeholder-${index}`}
      onClick={(e) => {
        e.stopPropagation()
        if (!isDragGesture.current && !isMiddle) glideTo(index)
      }}
      className={cn('group absolute shrink-0', isMiddle ? 'pointer-events-auto cursor-default' : 'pointer-events-auto cursor-pointer')}
      style={{
        width: `${cardWidth}px`,
        transform: `translateX(${dist * step}px) translateY(${Math.min(60, Math.pow(dist, 2) * 16)}px) rotateZ(${dist * 2.2}deg) scale(${Math.max(0.76, 1 - Math.abs(dist) * 0.12)})`,
        opacity: isMiddle ? 1 : Math.max(0.3, 1 - Math.abs(dist) * 0.45),
        zIndex: Math.max(1, Math.round(50 - Math.abs(dist) * 20)),
        transition: isDragging ? 'none' : 'transform 260ms ease-out, opacity 260ms ease-out',
      }}
    >
      <div className="relative flex min-h-[380px] md:min-h-[470px] flex-col items-center justify-center rounded-2xl bg-dark/[0.02] p-6 md:p-8 text-center text-muted dark:bg-light/[0.02]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl text-dark/35 transition-colors group-hover:text-accent dark:text-light/35 dark:group-hover:text-accent"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            rx="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 8"
            className="transition-all group-hover:animate-marching-dashes"
          />
        </svg>

        <h4 className="relative z-10 font-sans text-xl md:text-2xl font-bold tracking-tight text-dark/80 dark:text-light/80">
          {title}
        </h4>

        <p className="relative z-10 mt-3 max-w-xs md:max-w-sm font-sans text-xs md:text-sm text-muted">
          {index === -1
            ? 'Welcome, Nuzzle (January 2026) is my first build!'
            : `${subtitleExtra} (${subtitleMonth}) is my latest build. More will come!`}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            glideTo(index === -1 ? 0 : projects.length - 1)
          }}
          className="group/btn relative z-20 mt-6 flex h-9 w-9 items-center justify-center rounded-full border border-dark/20 text-dark transition-all duration-200 hover:border-accent hover:text-accent active:scale-95 dark:border-light/20 dark:text-light dark:hover:border-accent dark:hover:text-accent"
          aria-label={ariaLabel}
        >
          <span className={`${arrowClass} inline-block transition-transform`}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={arrowPath} />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}
