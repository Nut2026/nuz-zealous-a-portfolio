import { useCallback, useEffect, useRef, useState, type ReactNode, type MutableRefObject } from 'react'
import { cn } from '../lib/utils'

interface RoundedScrollbarProps {
  className?: string
  children: ReactNode
  /** Exposes the actual scrolling element to the parent for external control. */
  scrollRef?: MutableRefObject<HTMLDivElement | null>
  onScroll?: () => void
  onMouseLeave?: () => void
}

// A floating, fully rounded thumb overlay. The native scrollbar is hidden via
// CSS; this component handles thumb sizing, nod-while-scrolling, dragging and
// track clicks, so it stays consistent across browsers and screen sizes.
export default function RoundedScrollbar({ className, children, scrollRef, onScroll, onMouseLeave }: RoundedScrollbarProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<{ top: number; height: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [engaged, setEngaged] = useState(false) // visible while scrolling/hovering
  const engageTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const drag = useRef<{ startY: number; startScrollTop: number } | null>(null)

  const PAD = 6 // breathing room above/below the thumb inside the track

  const update = useCallback(() => {
    const el = innerRef.current
    if (!el) return
    onScroll?.()
    const { scrollTop, scrollHeight, clientHeight } = el
    if (scrollHeight <= clientHeight + 1) {
      setThumb(null)
      return
    }
    const track = clientHeight - PAD * 2
    const height = Math.max(36, (clientHeight / scrollHeight) * track)
    const range = track - height
    const top = PAD + (scrollTop / (scrollHeight - clientHeight)) * range
    setThumb({ top, height })
  }, [onScroll])

  const engage = useCallback(() => {
    setEngaged(true)
    if (engageTimeout.current) clearTimeout(engageTimeout.current)
    engageTimeout.current = setTimeout(() => setEngaged(false), 900)
  }, [])

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    // Content height can change after render (data fetches, translations).
    const ro = new ResizeObserver(update)
    ro.observe(el)
    const firstChild = el.firstElementChild
    if (firstChild) ro.observe(firstChild)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
      if (engageTimeout.current) clearTimeout(engageTimeout.current)
    }
  }, [update])

  const onThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const el = innerRef.current
    if (!el) return
    drag.current = { startY: e.clientY, startScrollTop: el.scrollTop }
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onThumbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = innerRef.current
    if (!drag.current || !el || !thumb) return
    const track = el.clientHeight - PAD * 2
    const range = track - thumb.height
    if (range <= 0) return
    const delta = e.clientY - drag.current.startY
    const scrollRange = el.scrollHeight - el.clientHeight
    el.scrollTop = drag.current.startScrollTop + (delta / range) * scrollRange
  }

  const onThumbPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = null
    setDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // pointer already released
    }
  }

  return (
    <div
      className={cn('relative min-h-0', className)}
      onMouseEnter={engage}
      onMouseMove={engage}
      onMouseLeave={() => {
        onMouseLeave?.()
        setEngaged(false)
      }}
    >
      <div
        ref={(node) => {
          ;(innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (scrollRef) scrollRef.current = node
        }}
        onScroll={engage}
        className="no-native-scrollbar h-full overflow-y-auto overscroll-contain"
      >
        {children}
      </div>

      {thumb && (
        <div className="pointer-events-none absolute right-0 top-0 h-full w-3.5">
          <div
            role="scrollbar"
            aria-orientation="vertical"
            onPointerDown={onThumbPointerDown}
            onPointerMove={onThumbPointerMove}
            onPointerUp={onThumbPointerUp}
            onPointerCancel={onThumbPointerUp}
            onWheel={(e) => e.stopPropagation()}
            className={cn(
              'pointer-events-auto absolute right-[3px] w-[6px] cursor-pointer rounded-full',
              'bg-accent/55 transition-[background-color,width,opacity] duration-200',
              'hover:w-[8px] hover:bg-accent/75',
              dragging && 'w-[8px] bg-accent',
              engaged || dragging ? 'opacity-100' : 'opacity-60',
            )}
            style={{ top: thumb.top, height: thumb.height }}
          />
        </div>
      )}
    </div>
  )
}
