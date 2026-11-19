"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence, useAnimation } from "framer-motion"

import { isHiddenHref, HIDE_AI_LAB_ACADEMY_BLOG } from "@/lib/hidden-sections"

const allItems = [
  { label: "HOME",     href: "/",         icon: "/icons/icon-home.svg"     },
  { label: "ABOUT",    href: "/about",    icon: "/icons/icon-about.svg"    },
  { label: "SERVICES", href: "/services", icon: "/icons/icon-services.svg" },
  { label: "PROJECTS", href: "/projects", icon: "/icons/icon-projects.svg" },
  { label: "AI LAB",   href: "/ai-lab",   icon: "/icons/icon-ailab.svg"    },
  { label: "ACADEMY",  href: "/academy",  icon: "/icons/icon-academy.svg"  },
  { label: "BLOG",     href: "/blog",     icon: "/icons/icon-blog.svg"     },
  { label: "CONTACT",  href: "/contact",  icon: "/icons/icon-contact.svg"  },
].filter((item) => !isHiddenHref(item.href))

const railItems = allItems
const navItems = allItems.filter((i) => i.href !== "/contact")
const contactItem = allItems.find((i) => i.href === "/contact")

// Shared look: identical to the mobile header box
const glass = {
  borderRadius: 14,
  backgroundColor: "rgba(184,190,200,0.82)",
  boxShadow: "0 4px 24px rgba(13,44,96,0.14)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as const

const ease = { duration: 0.3, ease: "easeOut" } as const
const SCROLL_AT = 40

const COLLAPSED_W = 45
const EXPANDED_W  = 162
const SIDEBAR_H   = 470
const OPEN_ROW_W  = 148

const panelEase = [0.22, 1, 0.36, 1] as const
const panelT = { duration: 0.5, ease: panelEase }

// The panel is always laid out at its full (open) width and only a flat "window" onto it
// is animated (clip-path). Nothing is re-laid-out while it opens or closes, so it stays smooth.
function SideRail({ onOpenTop, hidden = false }: { onOpenTop: () => void; hidden?: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const [tooltip,  setTooltip]  = useState<{ label: string; x: number; y: number } | null>(null)
  const pathname        = usePathname()
  const shimmerControls = useAnimation()

  // always start closed when the side bar comes back
  useEffect(() => {
    if (hidden) { setExpanded(false); setTooltip(null) }
  }, [hidden])

  useEffect(() => {
    if (expanded) {
      shimmerControls.set({ x: "-100%" })
      shimmerControls.start({
        x: "260%",
        transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
      })
    }
  }, [expanded, shimmerControls])

  const clipClosed = `inset(0px ${EXPANDED_W - COLLAPSED_W}px 0px 0px round 14px)`
  const clipOpen = "inset(0px 0px 0px 0px round 14px)"
  const panelHeight = HIDE_AI_LAB_ACADEMY_BLOG ? "auto" : SIDEBAR_H

  return (
    <>
      {/* ── Outer anchor ── */}
      <div
        className="pointer-events-none hidden lg:block"
        style={{ position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)", zIndex: 9999, visibility: hidden ? "hidden" : "visible" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hidden ? 0 : 1 }}
          transition={{ duration: hidden ? 0 : 0.3, ease: "easeOut" }}
        >
          <div style={{ position: "relative", width: EXPANDED_W }}>
            {/* Shadow: its own empty layer, so the panel never repaints a shadow */}
            <motion.div
              aria-hidden
              className="absolute left-0 top-0 h-full"
              style={{ borderRadius: 14, boxShadow: "0 4px 24px rgba(13,44,96,0.14)" }}
              initial={false}
              animate={{ width: expanded ? EXPANDED_W : COLLAPSED_W }}
              transition={panelT}
            />

            {/* ── Panel ── */}
            <motion.div
              id="zag-rail-panel"
              initial={false}
              animate={{ clipPath: expanded ? clipOpen : clipClosed }}
              transition={panelT}
              onClick={(e) => { if (!(e.target as HTMLElement).closest("a, button")) onOpenTop() }}
              className="pointer-events-auto relative flex flex-col items-start rounded-[14px] backdrop-blur-md py-4 overflow-hidden transition-colors duration-300"
              style={{
                width: EXPANDED_W,
                height: panelHeight,
                paddingBottom: HIDE_AI_LAB_ACADEMY_BLOG ? 18 : undefined,
                backgroundColor: expanded ? "rgba(184,190,200,0.94)" : "rgba(184,190,200,0.82)",
                willChange: "clip-path",
              }}
            >
              {/* Shimmer sweep */}
              <motion.div
                animate={shimmerControls}
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.38) 50%, transparent 75%)",
                  borderRadius: 20,
                }}
              />

              {/* ── Logo (both versions stacked, cross-faded) ── */}
              <div className="relative z-20 mb-3 w-full" style={{ minHeight: 24 }}>
                <div
                  className="absolute flex items-center justify-center transition-opacity duration-300"
                  style={{ left: 0, width: COLLAPSED_W, top: "50%", transform: "translateY(-50%)", opacity: expanded ? 0 : 1, pointerEvents: expanded ? "none" : "auto" }}
                >
                  <Link href="/" aria-label="Go to homepage" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) } }}>
                    <Image src="/images/Sidebar-Logo-Closed.png" alt="Zagrosia" width={30} height={24} className="h-auto" priority />
                  </Link>
                </div>
                <div
                  className="absolute transition-opacity duration-300"
                  style={{ left: 7, top: "50%", transform: "translateY(-50%)", opacity: expanded ? 1 : 0, pointerEvents: expanded ? "auto" : "none" }}
                >
                  <Link href="/" aria-label="Go to homepage" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) } }}>
                    <Image src="/images/Sidebar-Logo-Open.png" alt="Zagrosia Engineering" width={115} height={30} className="h-auto" priority />
                  </Link>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-2" style={{ marginLeft: expanded ? 7 : 8, width: expanded ? EXPANDED_W - 14 : COLLAPSED_W - 16, transition: "width .5s cubic-bezier(.22,1,.36,1), margin .5s cubic-bezier(.22,1,.36,1)" }}>
                <div className="h-px bg-[#0D2C60]/15" />
              </div>

              {/* ── Nav ── */}
              <nav className="relative z-20 flex w-full flex-col items-start gap-[14px] pt-3" style={{ paddingLeft: 5 }}>
                {railItems.map((item, index) => {
                  const isActive  = pathname === item.href
                  const itemDelay = expanded ? index * 0.055 : 0

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-label={item.label}
                      className={`rounded-[10px] transition-colors duration-150 overflow-hidden ${
                        expanded
                          ? isActive ? "bg-[#0052A5]/15" : "hover:bg-[#0052A5]/10"
                          : ""
                      }`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "35px 1fr",
                        alignItems: "center",
                        gap: 10,
                        height: 35,
                        width: EXPANDED_W - 10,
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      onClick={() => setTooltip(null)}
                    >
                      {/* Icon wrapper — fixed 35×35 */}
                      <div
                        className={`flex items-center justify-center rounded-[8px] transition-all duration-200 ease-out ${
                          !expanded
                            ? isActive
                              ? "bg-[#0052A5]/15 opacity-100"
                              : "hover:bg-[#0052A5]/15 opacity-70 hover:opacity-100"
                            : ""
                        }`}
                        style={{ width: 35, height: 35, flexShrink: 0 }}
                        onMouseEnter={(e) => {
                          if (!expanded) {
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                            setTooltip({ label: item.label, x: rect.right + 14, y: rect.top + rect.height / 2 })
                          }
                        }}
                      >
                        <motion.div
                          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                          animate={
                            expanded
                              ? { scale: [1, 1.12, 0.96, 1], y: [0, -2, 0] }
                              : { scale: 1, y: 0 }
                          }
                          transition={
                            expanded
                              ? { delay: itemDelay, duration: 0.5, ease: "easeOut" }
                              : { duration: 0.25 }
                          }
                        >
                          <Image src={item.icon} alt={item.label} width={19} height={19} />
                        </motion.div>
                      </div>

                      {/* Label — fades in with the panel */}
                      <motion.span
                        initial={false}
                        animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -8 }}
                        transition={{ duration: 0.22, ease: "easeOut", delay: expanded ? itemDelay + 0.08 : 0 }}
                        style={{ whiteSpace: "nowrap" }}
                        className={`text-[9.5px] font-semibold tracking-[0.16em] ${
                          isActive ? "text-[#0D2C60]" : "text-[#0D2C60]/75"
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  )
                })}
              </nav>
            </motion.div>

            {/* ── Toggle ── */}
            <motion.button
              onClick={() => { setExpanded((v) => !v); setTooltip(null) }}
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.88 }}
              initial={false}
              animate={{ x: expanded ? EXPANDED_W - COLLAPSED_W : 0 }}
              transition={{ x: panelT, scale: { type: "spring", stiffness: 500, damping: 22 } }}
              style={{ position: "absolute", left: COLLAPSED_W - 9, top: 36, zIndex: 10, cursor: "pointer" }}
              className="pointer-events-auto flex h-[22px] w-[22px] items-center justify-center rounded-[10px] bg-white/90 shadow-md hover:bg-white"
            >
              <motion.svg
                width="7" height="7" viewBox="0 0 10 10" fill="none"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <path d="M3 2L7 5L3 8" stroke="#0D2C60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── Tooltip ── */}
      <AnimatePresence>
        {tooltip && !expanded && (
          <motion.div
            key={tooltip.label}
            initial={{ opacity: 0, x: -6,  y: "-50%" }}
            animate={{ opacity: 1, x: 0,   y: "-50%" }}
            exit={{    opacity: 0, x: -4,   y: "-50%" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="hidden lg:flex items-center gap-1.5 pointer-events-none"
            style={{
              position: "fixed",
              left: tooltip.x,
              top: tooltip.y,
              zIndex: 10000,
            }}
          >
            <div
              className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-[#0052A5]"
              style={{ alignSelf: "center" }}
            />
            <div
              className="rounded-[8px] bg-[#0052A5] px-3 shadow-lg"
              style={{ display: "flex", alignItems: "center", height: 28 }}
            >
              <span
                className="text-[9px] tracking-[0.18em] text-white whitespace-nowrap"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, lineHeight: 1 }}
              >
                {tooltip.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const MORPH_MS = 1250

type Box = { left: number; top: number; width: number; height: number }

// Top bar <-> side bar. Forward: the top bar shrinks to the logo, slides left and grows into the
// side bar. Reverse: the side bar slides right and unfolds into the top bar.
// Only a flat layer is reshaped (clip-path) and moved (transform): no layout, no blur.
function MorphGhost({ from, to, reverse, onDone }: { from: Box; to: Box; reverse: boolean; onDone: () => void }) {
  const PILL_W = 172
  const bar = reverse ? to : from
  const rail = reverse ? from : to
  // bounding box that contains every shape of the animation
  const U = {
    left: Math.min(bar.left, rail.left),
    top: Math.min(bar.top, rail.top),
    right: Math.max(bar.left + bar.width, rail.left + rail.width),
    bottom: Math.max(bar.top + bar.height, rail.top + rail.height),
  }
  const W = U.right - U.left
  const H = U.bottom - U.top
  const inset = (b: Box) =>
    `inset(${b.top - U.top}px ${U.right - (b.left + b.width)}px ${U.bottom - (b.top + b.height)}px ${b.left - U.left}px round 14px)`
  const shapes: Box[] = [
    bar,
    { left: bar.left, top: bar.top, width: PILL_W, height: bar.height },
    { left: rail.left, top: bar.top, width: PILL_W, height: bar.height },
    rail,
  ]
  if (reverse) shapes.reverse()
  const dur = MORPH_MS / 1000
  const times = [0, 0.26, 0.62, 1]
  const e = [[0.65, 0, 0.35, 1], [0.65, 0, 0.35, 1], [0.65, 0, 0.35, 1]] as any
  const slideX = rail.left - bar.left
  const R = (a: number[]) => (reverse ? [...a].reverse() : a)
  const rt = (t: number[]) => (reverse ? t.map((v) => 1 - v).reverse() : t)

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[9999] hidden lg:block"
      style={{
        left: U.left, top: U.top, width: W, height: H,
        backgroundColor: "rgba(184,190,200,0.9)",
        willChange: "clip-path, opacity",
      }}
      animate={{
        clipPath: shapes.map(inset),
        opacity: [1, 1, 1, 0],
      }}
      transition={{
        clipPath: { duration: dur, times, ease: e },
        opacity: { duration: dur, times: reverse ? [0, 0.86, 0.95, 1] : [0, 0.78, 0.9, 1], ease: "linear" },
      }}
      onAnimationComplete={onDone}
    >
      {/* Items: fade out while the bar shrinks (forward only; the real bar brings its own in reverse) */}
      {!reverse && (
        <motion.div
          className="absolute flex items-center gap-1"
          style={{ right: U.right - (bar.left + bar.width) + 5, top: bar.top - U.top, height: bar.height }}
          animate={{ opacity: [1, 0, 0] }}
          transition={{ duration: dur, times: [0, 0.14, 1], ease: "linear" }}
        >
          {[...navItems, ...(contactItem ? [contactItem] : [])].map((item) => (
            <span key={item.href} className="flex items-center" style={{ gap: 8, height: 35, paddingRight: 12 }}>
              <span className="flex items-center justify-center" style={{ width: 35, height: 35 }}>
                <Image src={item.icon} alt="" width={19} height={19} />
              </span>
              <span className="whitespace-nowrap text-[9.5px] font-semibold tracking-[0.16em] text-[#0D2C60]/75">{item.label}</span>
            </span>
          ))}
        </motion.div>
      )}
      {/* Reverse only: the side bar's icons fade out as it starts to move */}
      {reverse && (
        <motion.div
          className="absolute"
          style={{ left: rail.left - U.left + 5, top: rail.top - U.top + 73 }}
          animate={{ opacity: [1, 0, 0] }}
          transition={{ duration: dur, times: [0, 0.16, 1], ease: "linear" }}
        >
          {railItems.map((item, i) => (
            <span key={item.href} className="flex items-center justify-center" style={{ width: 35, height: 35, marginTop: i === 0 ? 0 : 14 }}>
              <Image src={item.icon} alt="" width={19} height={19} style={{ opacity: 0.7 }} />
            </span>
          ))}
        </motion.div>
      )}
      {/* Full logo travels with the pill; small logo lives in the side bar */}
      <motion.div
        className="absolute flex items-center"
        style={{ left: bar.left - U.left + 16, top: bar.top - U.top, height: bar.height, willChange: "transform, opacity" }}
        animate={{ x: R([0, 0, slideX, slideX]), opacity: R([1, 1, 0, 0]) }}
        transition={{
          x: { duration: dur, times, ease: e },
          opacity: { duration: dur, times: rt([0, 0.6, 0.82, 1]), ease: "linear" },
        }}
      >
        <Image src="/images/zagrosia-logo.svg" alt="" width={148} height={36} className="h-auto w-[136px]" />
      </motion.div>
      <motion.div
        className="absolute flex justify-center"
        style={{ left: rail.left - U.left, width: COLLAPSED_W, top: rail.top - U.top + 16 }}
        initial={{ opacity: reverse ? 1 : 0 }}
        animate={{ opacity: reverse ? [1, 1, 0] : [0, 0, 1] }}
        transition={{ duration: dur, times: reverse ? [0, 0.18, 0.4] : [0, 0.6, 0.82], ease: "linear" }}
      >
        <Image src="/images/Sidebar-Logo-Closed.png" alt="" width={30} height={24} className="h-auto" />
      </motion.div>
    </motion.div>
  )
}

export function Sidebar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false) // top bar re-opened from the side rail
  const [hovered, setHovered] = useState<string | null>(null)
  const pathname = usePathname()
  const wrapRef = useRef<HTMLDivElement>(null)
  const lastRect = useRef<{ left: number; top: number; width: number; height: number } | null>(null)
  const [morph, setMorph] = useState<null | { from: Box; to: Box | null; reverse: boolean }>(null)
  const [railReady, setRailReady] = useState(false)
  const [navReady, setNavReady] = useState(true)
  const [navFromMorph, setNavFromMorph] = useState(false)
  const mountedAt = useRef(Date.now())

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > SCROLL_AT
      setScrolled(s)
      setOpen(false) // scrolling again tucks it back to the side
    }
    setScrolled(window.scrollY > SCROLL_AT)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setScrolled(window.scrollY > SCROLL_AT)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const showTop = !scrolled || open
  const showRail = scrolled && !open

  // remember where the top bar is, so the morph can start exactly there
  useLayoutEffect(() => {
    if (showTop && wrapRef.current) {
      const r = wrapRef.current.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) lastRect.current = { left: r.left, top: r.top, width: r.width, height: r.height }
    }
  })

  // Start the morph (desktop only). Done during render so the bars switch on their very first frame.
  const [prevTop, setPrevTop] = useState(true)
  if (prevTop !== showTop) {
    setPrevTop(showTop)
    const desktop = typeof window !== "undefined" && window.innerWidth >= 1024 && Date.now() - mountedAt.current > 1000
    if (!showTop) {
      // top bar -> side bar
      setNavReady(true)
      setNavFromMorph(false)
      if (lastRect.current && desktop) {
        setRailReady(false)
        setMorph({ from: lastRect.current, to: null, reverse: false })
      } else {
        setMorph(null)
      }
    } else {
      // side bar -> top bar
      const el = typeof document !== "undefined" ? document.getElementById("zag-rail-panel") : null
      if (el && lastRect.current && desktop) {
        const r = el.getBoundingClientRect()
        setNavReady(false)
        setNavFromMorph(true)
        setMorph({ from: { left: r.left, top: r.top, width: COLLAPSED_W, height: r.height }, to: lastRect.current, reverse: true })
      } else {
        setNavReady(true)
        setMorph(null)
      }
    }
  }

  // forward morph: once the (hidden) side bar is mounted, measure where it sits
  useLayoutEffect(() => {
    if (morph && !morph.to && !morph.reverse) {
      const el = document.getElementById("zag-rail-panel")
      if (el) {
        const r = el.getBoundingClientRect()
        setMorph({ from: morph.from, to: { left: r.left, top: r.top, width: COLLAPSED_W, height: r.height }, reverse: false })
      } else {
        setMorph(null)
      }
    }
  }, [morph])

  // reveal the real bar a moment before the ghost finishes, so they cross-fade
  useEffect(() => {
    if (!morph?.to) return
    const reverse = morph.reverse
    const t = setTimeout(() => (reverse ? setNavReady(true) : setRailReady(true)), MORPH_MS * (reverse ? 0.84 : 0.82))
    return () => clearTimeout(t)
  }, [morph?.to, morph?.reverse])

  return (
    <>
      {/* Pre-decode the side bar logos so the first morph never stalls */}
      <div aria-hidden style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
        <Image src="/images/Sidebar-Logo-Closed.png" alt="" width={30} height={24} priority />
        <Image src="/images/Sidebar-Logo-Open.png" alt="" width={115} height={30} priority />
      </div>

      {/* ── Click-away layer while the top bar is re-opened ── */}
      {open && (
        <div
          className="fixed inset-0 z-[9998] hidden lg:block"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* ── TOP BAR ── */}
      <div
        ref={wrapRef}
        className="pointer-events-none fixed top-[40px] z-[9999] hidden lg:flex"
        // spans exactly the content column (same left/right edges as the page content);
        // on narrower screens it never gets smaller than 760px
        style={{
          left: "min(var(--desktop-grid-content-start, 216px), max(24px, calc((100vw - 760px) / 2)))",
          right: "min(var(--desktop-grid-content-start, 216px), max(24px, calc((100vw - 760px) / 2)))",
        }}
      >
        <AnimatePresence>
          {showTop && navReady && (
            <motion.nav
              key="top"
              aria-label="Main navigation"
              initial={navFromMorph ? { opacity: 0 } : { y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={ease}
              onMouseLeave={() => setHovered(null)}
              className="pointer-events-auto flex w-full items-center justify-between pl-[16px] pr-[5px]"
              style={{ height: 45, ...glass }}
            >
              {/* Logo lives inside the bar */}
              <Link href="/" aria-label="Go to homepage" onClick={() => setOpen(false)} className="flex shrink-0 items-center">
                <Image src="/images/zagrosia-logo.svg" alt="Zagrosia Engineering Inc." width={148} height={36} className="h-auto w-[136px]" priority />
              </Link>
              <div className="flex items-center gap-1">
              {[...navItems, ...(contactItem ? [contactItem] : [])].map((item) => {
                const isActive = pathname === item.href
                const isHover = hovered === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    onClick={() => setOpen(false)}
                    className="relative overflow-hidden transition-colors duration-150"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      height: 35,
                      paddingRight: 12,
                      borderRadius: 10,
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0"
                        style={{ borderRadius: 10, backgroundColor: "rgba(0,82,165,0.15)" }}
                        transition={ease}
                      />
                    )}
                    {isHover && !isActive && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0"
                        style={{ borderRadius: 10, backgroundColor: "rgba(0,82,165,0.10)" }}
                        transition={ease}
                      />
                    )}
                    {/* Icon tile — 35×35 like the side bar */}
                    <span
                      className="relative flex items-center justify-center"
                      style={{ width: 35, height: 35, flexShrink: 0 }}
                    >
                      <Image src={item.icon} alt="" width={19} height={19} />
                    </span>
                    <span
                      className={`relative whitespace-nowrap text-[9.5px] font-semibold tracking-[0.16em] ${
                        isActive ? "text-[#0D2C60]" : "text-[#0D2C60]/75"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* ── SIDE BAR (the original left sidebar, shown once the page is scrolled) ── */}
      {/* always mounted (invisible while the top bar is showing) so nothing heavy happens at scroll time */}
      <SideRail
        onOpenTop={() => setOpen(true)}
        hidden={!showRail || (!!morph && !morph.reverse && !railReady)}
      />
      {morph?.to && (
        <MorphGhost from={morph.from} to={morph.to} reverse={morph.reverse} onDone={() => { setRailReady(true); setNavReady(true); setMorph(null) }} />
      )}
    </>
  )
}
