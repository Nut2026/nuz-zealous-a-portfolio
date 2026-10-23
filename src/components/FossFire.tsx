import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Github, MessageSquare } from 'lucide-react'

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

export default function FossFire() {
  const [prs, setPrs] = useState<FossPr[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [tooltip, setTooltip] = useState<TooltipAnchor | null>(null)

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

  // The tooltip is anchored to the item's on-screen rect, so hide it whenever
  // that rect moves (page scroll, window resize) instead of leaving it stale.
  useEffect(() => {
    if (!tooltip) return

    window.addEventListener('scroll', hideTooltip, { passive: true })
    window.addEventListener('resize', hideTooltip)
    return () => {
      window.removeEventListener('scroll', hideTooltip)
      window.removeEventListener('resize', hideTooltip)
    }
  }, [tooltip, hideTooltip])

  const sortedPrs = prs
    ? [...prs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    : null

  return (
    <section id="foss" className="mx-auto max-w-7xl px-4 pt-16 pb-2 md:pb-6">
      <div className="mb-6 px-2 md:px-8">
        <h2 className="mb-3 font-sans text-3xl font-bold tracking-tight md:text-4xl">My FOSS Fire</h2>

        <p className="font-sans text-sm md:text-base text-muted">
          Merged pull requests across the open-source projects I contribute to — still burning.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {REPOS.map((repo) => (
          <RepoCard
            key={repo}
            repo={repo}
            prs={sortedPrs}
            failed={failed}
            onItemEnter={showTooltip}
            onScrollScrollable={hideTooltip}
          />
        ))}
      </div>

      {tooltip && createPortal(<PrTooltip anchor={tooltip} />, document.body)}
    </section>
  )
}

interface RepoCardProps {
  repo: string
  prs: FossPr[] | null
  failed: boolean
  onItemEnter: (pr: FossPr, element: HTMLElement) => void
  onScrollScrollable: () => void
}

function RepoCard({ repo, prs, failed, onItemEnter, onScrollScrollable }: RepoCardProps) {
  const repoPrs = prs ? prs.filter((pr) => pr.repo === repo) : null

  return (
    <div className="flex h-[400px] flex-col overflow-hidden rounded-2xl border border-dark/10 bg-white transition-colors duration-300 dark:border-light/10 dark:bg-dark/95">
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 border-b border-dark/10 px-4 py-3 transition-colors hover:bg-dark/[0.03] dark:border-light/10 dark:hover:bg-light/[0.04]"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <Github size={18} className="shrink-0 text-dark dark:text-light" />
          <span className="truncate font-mono text-sm font-semibold text-dark dark:text-light">{repo}</span>
        </span>
        {repoPrs && (
          <span className="shrink-0 rounded-full bg-dark/5 px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted dark:bg-light/10">
            {repoPrs.length} merged
          </span>
        )}
      </a>

      <div className="custom-scrollbar flex-1 overflow-y-auto px-2.5 py-2">
        {repoPrs === null ? (
          failed ? (
            <EmptyNote>PR data is unavailable right now.</EmptyNote>
          ) : (
            <SkeletonList />
          )
        ) : repoPrs.length === 0 ? (
          <EmptyNote>No merged pull requests yet.</EmptyNote>
        ) : (
          repoPrs.map((pr) => (
            <a
              key={`${repo}-${pr.number}`}
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => onItemEnter(pr, e.currentTarget)}
              onMouseLeave={onScrollScrollable}
              className="group/row flex items-start gap-2 rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-[#5dc8ff26] focus-visible:bg-[#5dc8ff26]"
            >
              <span className="shrink-0 pt-px font-mono text-[11px] font-medium text-muted">#{pr.number}</span>
              <span className="line-clamp-2 text-sm leading-snug text-dark/85 transition-colors duration-150 group-hover/row:text-dark dark:text-light/85 dark:group-hover/row:text-light">
                {pr.title}
              </span>
            </a>
          ))
        )}
      </div>
    </div>
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
          Opened {formatShortDate(pr.created_at)}
        </p>
        {pr.merged_at && <p>Merged {formatShortDate(pr.merged_at)}</p>}
        <p className="flex items-center gap-1.5">
          <MessageSquare size={12} className="text-muted" />
          {pr.comments} {pr.comments === 1 ? 'comment' : 'comments'}
        </p>
      </div>
    </div>
  )
}
