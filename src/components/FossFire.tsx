import { useEffect, useLayoutEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ExternalLink, MessageSquare } from 'lucide-react'
import RoundedScrollbar from './RoundedScrollbar'
import { useLanguage } from '../i18n/LanguageContext'

interface FossPr {
  title: string
  url: string
  number: number
  repo: string
  created_at: string
  merged_at: string | null
  comments: number
}

const REPOS = ['vscode-icons/vscode-icons', 'h0tp-ftw/ankimon'] as const

// Custom repo artwork instead of the generic GitHub mark. object-contain keeps
// every image's own aspect ratio so nothing is distorted.
const REPO_LOGOS: Record<(typeof REPOS)[number], string> = {
  'h0tp-ftw/ankimon': '/h0tp-ftw.png',
  'vscode-icons/vscode-icons': '/vscode-icons.png',
}

function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''))
}

interface TooltipAnchor {
  pr: FossPr
  anchorX: number
  anchorY: number
}

// e.g. 2026-09-24T01:51:46Z -> "24/9/26"
function formatShortDate(iso: string): string {
  const date = new Date(iso)
  return `${date.getDate()}/${date.getMonth() + 1}/${String(date.getFullYear()).slice(-2)}`
}

// localStorage keeps the last successful fetch so a failed /prs.json request
// still shows recent data instead of an empty section.
const PRS_CACHE_KEY = 'nuz_foss_prs_cache'

function readPrsCache(): FossPr[] | null {
  try {
    const raw = window.localStorage.getItem(PRS_CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw)
    if (!Array.isArray(cached)) return null
    const valid = cached.filter(
      (pr): pr is FossPr =>
        pr != null &&
        typeof pr.title === 'string' &&
        typeof pr.url === 'string' &&
        typeof pr.number === 'number' &&
        typeof pr.repo === 'string' &&
        typeof pr.created_at === 'string' &&
        typeof pr.comments === 'number',
    )
    return valid.length > 0 ? valid : null
  } catch {
    return null
  }
}

function writePrsCache(prs: FossPr[]): void {
  try {
    // Store only the fields the UI needs, in case upstream adds extras later.
    const slim = prs.map((pr) => ({
      title: pr.title,
      url: pr.url,
      number: pr.number,
      repo: pr.repo,
      created_at: pr.created_at,
      merged_at: pr.merged_at ?? null,
      comments: pr.comments,
    }))
    window.localStorage.setItem(PRS_CACHE_KEY, JSON.stringify(slim))
  } catch {
    // Storage can be unavailable (private mode, quota); the section stays live-only.
  }
}

// --- Mini Markdown (bold, italic, code, links, line breaks) for descriptions ---

const INLINE_TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^()\s]+\))/g

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE_TOKEN).map((token, i) => {
    if (!token) return null
    const key = `${keyPrefix}-${i}`
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={key} className="font-semibold text-dark dark:text-light">
          {token.slice(2, -2)}
        </strong>
      )
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return (
        <em key={key} className="italic">
          {token.slice(1, -1)}
        </em>
      )
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={key} className="rounded bg-dark/5 px-1 font-mono text-[10px] dark:bg-light/10">
          {token.slice(1, -1)}
        </code>
      )
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
    if (link) {
      return (
        <a key={key} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
          {link[1]}
        </a>
      )
    }
    return token
  })
}

function renderMarkdown(text: string): ReactNode {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => (
      <p key={i} className={i === 0 ? 'mt-0' : 'mt-1.5'}>
        {renderInline(line, `md${i}`)}
      </p>
    ))
}

export default function FossFire() {
  const { t } = useLanguage()
  const [prs, setPrs] = useState<FossPr[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [tooltip, setTooltip] = useState<TooltipAnchor | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  const hideTooltip = useCallback(() => setTooltip(null), [])

  const showTooltip = useCallback((pr: FossPr, element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    setTooltip({
      pr,
      // Anchor just to the right of the item, vertically centered on it.
      anchorX: rect.right + 10,
      anchorY: rect.top + rect.height / 2,
    })
  }, [])

  useEffect(() => {
    let cancelled = false

    // Show cached data immediately while the fresh fetch is in flight.
    const cache = readPrsCache()
    if (cache) setPrs(cache)

    fetch('/prs.json')
      .then((res) => {
        if (!res.ok) throw new Error(`prs.json responded ${res.status}`)
        return res.json() as Promise<unknown>
      })
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return
        const fresh = data as FossPr[]
        setPrs(fresh)
        writePrsCache(fresh)
      })
      .catch(() => {
        if (cancelled) return
        if (!cache) setFailed(true) // nothing cached either — show the empty note
        // Otherwise the cached list stays on screen; nothing else to do.
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!tooltip) return

    // The modal dies with the highlight it belongs to...
    // ...and any click anywhere (links included) closes it too.
    const onDocMouseDown = () => setTooltip(null)
    window.addEventListener('mousedown', onDocMouseDown)
    window.addEventListener('scroll', hideTooltip, { passive: true })
    window.addEventListener('resize', hideTooltip)
    return () => {
      window.removeEventListener('mousedown', onDocMouseDown)
      window.removeEventListener('scroll', hideTooltip)
      window.removeEventListener('resize', hideTooltip)
    }
  }, [tooltip, hideTooltip])

  const sortedPrs = prs
    ? [...prs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    : null

  return (
    <section id="foss" ref={sectionRef} className="mx-auto max-w-7xl px-4 pt-16 pb-2 md:pb-6">
      <div className="mb-6 px-2 md:px-8">
        <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight md:text-4xl">{t.foss.title}</h2>

        <p className="font-sans text-sm md:text-base text-muted">{t.foss.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {REPOS.map((repo) => (
          <RepoCard
            key={repo}
            repo={repo}
            prs={sortedPrs}
            failed={failed}
            onItemEnter={showTooltip}
            onItemLeave={hideTooltip}
            onScrollScrollable={hideTooltip}
          />
        ))}
      </div>

      {tooltip && createPortal(<PrTooltip anchor={tooltip} />, document.body)}
      {createPortal(<FossSparkLayer sectionRef={sectionRef} />, document.body)}
    </section>
  )
}

interface RepoCardProps {
  repo: (typeof REPOS)[number]
  prs: FossPr[] | null
  failed: boolean
  onItemEnter: (pr: FossPr, element: HTMLElement) => void
  onItemLeave: () => void
  onScrollScrollable: () => void
}

function RepoCard({ repo, prs, failed, onItemEnter, onItemLeave, onScrollScrollable }: RepoCardProps) {
  const { t } = useLanguage()
  const repoPrs = prs ? prs.filter((pr) => pr.repo === repo) : null

  return (
    <div className="foss-ember-border flex h-[460px] flex-col overflow-hidden rounded-2xl border-2 bg-white transition-colors duration-300 dark:bg-dark/95">
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 border-b border-dark/10 px-4 py-3 transition-colors hover:bg-dark/[0.03] dark:border-light/10 dark:hover:bg-light/[0.04]"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <img
            src={REPO_LOGOS[repo]}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 shrink-0 object-contain"
          />
          <span className="truncate font-mono text-sm font-semibold text-dark dark:text-light">{repo}</span>
        </span>
        {repoPrs && (
          <span
            className="group/badge shrink-0 cursor-default rounded-full bg-emerald-600/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-emerald-700/80 transition-colors hover:bg-emerald-500/15 dark:bg-emerald-400/10 dark:text-emerald-300/80"
            title={t.foss.merged.replace('{count}', String(repoPrs.length))}
          >
            {fmt(t.foss.merged, { count: repoPrs.length })}
            {/* Pulsing light that appears on badge hover — shows the feed is live. */}
            <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 opacity-0 shadow-[0_0_6px_rgba(16,185,129,0.9)] transition-opacity duration-200 group-hover/badge:animate-live-dot group-hover/badge:opacity-100 dark:bg-emerald-300" />
          </span>
        )}
      </a>

      {/* Why I joined / the challenge / what I learned — mini-Markdown. */}
      <div className="border-b border-dark/10 px-4 py-3 font-sans text-xs leading-relaxed text-muted dark:border-light/10">
        {renderMarkdown(t.foss.descriptions[repo])}
      </div>

      <RoundedScrollbar
        className="flex-1 rounded-b-2xl"
        scrollRef={undefined}
        onScroll={onScrollScrollable}
        onMouseLeave={onItemLeave}
      >
        <div className="px-2.5 py-2">
          {repoPrs === null ? (
            failed ? (
              <EmptyNote>{t.foss.unavailable}</EmptyNote>
            ) : (
              <SkeletonList />
            )
          ) : repoPrs.length === 0 ? (
            <EmptyNote>{t.foss.noPrs}</EmptyNote>
          ) : (
            repoPrs.map((pr) => (
              <PrRow
                key={`${repo}-${pr.number}`}
                pr={pr}
                onEnter={onItemEnter}
                onLeave={onItemLeave}
              />
            ))
          )}
        </div>
      </RoundedScrollbar>
    </div>
  )
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number // 0..1 remaining
  decaySpeed: number
  length: number
}

// Flat short embers that live for the whole time the pointer is inside #foss.
// The canvas is a full-viewport portal sitting ABOVE the PR hover modal, so
// sparks can never be hidden behind it.
function FossSparkLayer({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const activeRef = useRef(false) // pointer currently inside the #foss section
  const lastSpawnRef = useRef(0)
  const lastFrameRef = useRef(0)
  // Counter bumped on unmount to permanently stop the loop.
  const genRef = useRef(0)
  const queuedRef = useRef(false)

  const spawnAt = useCallback((x: number, y: number) => {
    const sparks = sparksRef.current
    if (sparks.length > 140) return // cap for perf
    const angle = Math.random() * Math.PI * 2
    const speed = 1.4 + Math.random() * 2.6
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decaySpeed: 0.045 + Math.random() * 0.05,
      length: 5 + Math.random() * 5,
    })
  }, [])

  // One self-rescheduling loop that lives for the component's whole life. It
  // never parks itself (a parked loop is how a throttled/dropped rAF used to
  // leave the sparks dead), and a watchdog keeps it alive even if rAF fired
  // zero times in a while — e.g. when the tab is throttled by the browser.
  const drawLoop = useCallback(() => {
    queuedRef.current = false
    const generation = genRef.current
    if (generation === 0) return // unmounted
    lastFrameRef.current = performance.now()

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    // Always-live field: while the pointer is inside #foss, keep emitting at
    // the cursor even when it is perfectly still.
    const now = performance.now()
    const mouse = mouseRef.current
    if (activeRef.current && mouse && now - lastSpawnRef.current > 80) {
      lastSpawnRef.current = now
      spawnAt(mouse.x, mouse.y)
      if (Math.random() < 0.6) spawnAt(mouse.x, mouse.y)
    }

    const sparks = sparksRef.current
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i]
      s.life -= s.decaySpeed
      if (s.life <= 0) {
        sparks.splice(i, 1)
        continue
      }
      s.x += s.vx
      s.y += s.vy
      s.vx *= 0.92
      s.vy *= 0.92
      // Flat short line drawn along its travel direction.
      const speed = Math.hypot(s.vx, s.vy) || 1
      const ux = s.vx / speed
      const uy = s.vy / speed
      ctx.strokeStyle = `rgba(255, 92, 46, ${Math.min(0.75, s.life * 0.75)})`
      ctx.lineWidth = 1.4
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(s.x - ux * s.length, s.y - uy * s.length)
      ctx.lineTo(s.x, s.y)
      ctx.stroke()
    }

    }

    if (genRef.current === generation) {
      queuedRef.current = true
      requestAnimationFrame(drawLoop)
    }
  }, [spawnAt])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => {
      ro.disconnect()
      genRef.current = 0 // stops the loop permanently on unmount
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Start (or revive) the loop. `queuedRef` prevents double-pumping when both
    // the rAF chain and the watchdog want a frame.
    const pump = () => {
      if (genRef.current === 0) {
        // First run: adopt the current generation and go.
        genRef.current = 1
      }
      if (!queuedRef.current) {
        queuedRef.current = true
        requestAnimationFrame(drawLoop)
      }
    }

    // Watchdog: if rAF is throttled (occluded tab, hidden window),setTimeout
    // still fires and drives the loop at a reduced rate.
    const watchdog = setInterval(() => {
      if (genRef.current === 0) return
      if (performance.now() - lastFrameRef.current > 80) pump()
    }, 45)

    const onEnter = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      activeRef.current = true
      pump()
    }
    const onMove = (e: MouseEvent) => {
      // Fixed full-viewport canvas: client coords are canvas coords.
      mouseRef.current = { x: e.clientX, y: e.clientY }
      // Bursts while the pointer sweeps across the section.
      spawnAt(e.clientX, e.clientY)
      spawnAt(e.clientX, e.clientY)
      pump()
    }
    const onLeave = () => {
      activeRef.current = false
    }

    pump()
    section.addEventListener('mouseenter', onEnter)
    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      clearInterval(watchdog)
      section.removeEventListener('mouseenter', onEnter)
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      activeRef.current = false
    }
  }, [sectionRef, drawLoop, spawnAt])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[10050] h-full w-full"
    />
  )
}

function PrRow({
  pr,
  onEnter,
  onLeave,
}: {
  pr: FossPr
  onEnter: (pr: FossPr, el: HTMLElement) => void
  onLeave: () => void
}) {
  return (
    <a
      href={pr.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={(e) => onEnter(pr, e.currentTarget)}
      onMouseLeave={onLeave}
      className="group/row flex items-start gap-2 rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-[#ff5c4614] focus-visible:bg-[#ff5c4614] dark:hover:bg-[#ff5c4620]"
    >
      <span className="shrink-0 pt-px font-mono text-[11px] font-medium text-muted">#{pr.number}</span>
      <span className="line-clamp-2 text-sm leading-snug text-dark/85 transition-colors duration-150 group-hover/row:text-dark dark:text-light/85 dark:group-hover/row:text-light">
        {pr.title}
      </span>
    </a>
  )
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 text-center font-sans text-sm text-muted">{children}</p>
}

function SkeletonList() {
  return (
    <div className="animate-pulse space-y-3 px-2 py-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded-full bg-dark/5 dark:bg-light/10"
          style={{ width: `${60 + ((i * 13) % 30)}%` }}
        />
      ))}
    </div>
  )
}

function PrTooltip({ anchor }: { anchor: TooltipAnchor }) {
  const { t } = useLanguage()
  const { pr, anchorX, anchorY } = anchor
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)

  // Measure once rendered, then clamp/flip so the tooltip never goes off-screen.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const width = el.offsetWidth
    const height = el.offsetHeight
    const margin = 8
    const gap = 10

    let left = anchorX
    if (left + width > window.innerWidth - margin) {
      // Not enough room on the right: flip to the left of the item.
      left = anchorX - gap * 2 - width
    }
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin))

    const top = Math.max(margin, Math.min(anchorY - height / 2, window.innerHeight - height - margin))

    setPos({ left, top })
  }, [anchorX, anchorY])

  return (
    <div
      ref={ref}
      style={{
        left: pos?.left ?? anchorX,
        top: pos?.top ?? anchorY,
        visibility: pos ? 'visible' : 'hidden',
      }}
      className="pointer-events-none fixed z-[9999] w-56 rounded-xl border border-dark/10 bg-light p-3 shadow-lg shadow-dark/15 backdrop-blur-sm transition-opacity duration-150 dark:border-light/10 dark:bg-dark dark:shadow-light/10"
    >
      <p className="mb-2 line-clamp-2 pt-0.5 text-xs font-semibold leading-snug text-dark dark:text-light">
        {pr.title}
      </p>
      <div className="space-y-1 font-mono text-[11px] text-muted">
        <p>
          {fmt(t.foss.opened, { date: formatShortDate(pr.created_at) })}
        </p>
        {pr.merged_at && <p>{fmt(t.foss.mergedAt, { date: formatShortDate(pr.merged_at) })}</p>}
        {/* External-tab affordance sits on the same line as the comments. */}
        <p className="relative flex items-center gap-1.5">
          <MessageSquare size={12} className="text-muted" />
          {pr.comments}{' '}
          {pr.comments === 1 ? t.foss.commentOne : t.foss.commentsMany}
          <ExternalLink
            size={13}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-muted/70 dark:text-light/50"
          />
        </p>
      </div>
    </div>
  )
}
