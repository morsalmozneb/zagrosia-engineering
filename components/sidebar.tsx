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

const panelSpring = { type: "spring" as const, stiffness: 160, damping: 38, mass: 1.2 }

function SideRail({ onOpenTop, fromMorph = false, hidden = false }: { onOpenTop: () => void; fromMorph?: boolean; hidden?: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const [tooltip,  setTooltip]  = useState<{ label: string; x: number; y: number } | null>(null)
  const [slideKey, setSlideKey] = useState(0)
  const pathname        = usePathname()
  const shimmerControls = useAnimation()

  useEffect(() => {
    setSlideKey((k) => k + 1)
  }, [pathname])

  useEffect(() => {
    if (expanded) {
      shimmerControls.set({ x: "-100%" })
      shimmerControls.start({
        x: "260%",
        transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
      })
    }
  }, [expanded, shimmerControls])

  return (
    <>
      {/* ── Outer anchor ── */}
      <div
        className="hidden lg:block"
        style={{ position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)", zIndex: 9999, visibility: hidden ? "hidden" : "visible" }}
      >
        <motion.div
          key={slideKey}
          initial={fromMorph ? { opacity: 0 } : { x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={fromMorph ? { duration: 0.3, ease: "easeOut" } : { type: "tween", duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* ── Panel ── */}
          <motion.div
            id="zag-rail-panel"
            animate={{
              width: expanded ? EXPANDED_W : COLLAPSED_W,
              boxShadow: expanded
                ? "0 12px 48px rgba(13,44,96,0.26), 0 2px 10px rgba(13,44,96,0.12)"
                : "0 4px 24px rgba(13,44,96,0.14)",
              backgroundColor: expanded
                ? "rgba(184,190,200,0.94)"
                : "rgba(184,190,200,0.82)",
            }}
            transition={panelSpring}
            onClick={(e) => { if (!(e.target as HTMLElement).closest("a, button")) onOpenTop() }}
            className="relative flex flex-col items-center rounded-[14px] backdrop-blur-md py-4 overflow-hidden"
            style={{ height: HIDE_AI_LAB_ACADEMY_BLOG ? "auto" : SIDEBAR_H, paddingBottom: HIDE_AI_LAB_ACADEMY_BLOG ? 18 : undefined }}
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

            {/* ── Logo ── */}
            <div
              className={`relative z-20 mb-3 flex w-full items-center px-1 ${expanded ? "justify-start" : "justify-center"}`}
              style={
                expanded
                  ? { minHeight: 24, paddingLeft: 7, paddingRight: 7 }
                  : { minHeight: 24 }
              }
            >
              <AnimatePresence mode="wait">
                {expanded ? (
                  <motion.div
                    key="logo-open"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <Link href="/" aria-label="Go to homepage" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) } }}>
                      <Image src="/images/Sidebar-Logo-Open.png" alt="Zagrosia Engineering" width={115} height={30} className="h-auto" priority />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key="logo-closed"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <Link href="/" aria-label="Go to homepage" onClick={(e) => { if (pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) } }}>
                      <Image src="/images/Sidebar-Logo-Closed.png" alt="Zagrosia" width={30} height={24} className="h-auto" priority />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div
              className="mb-2 w-full"
              style={expanded ? { paddingLeft: 7, paddingRight: 7 } : { paddingLeft: 8, paddingRight: 8 }}
            >
              <div className="h-px bg-[#0D2C60]/15" />
            </div>

            {/* ── Nav ── */}
            <nav className="relative z-20 flex w-full flex-col items-center gap-[14px] px-0 pt-3">
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
                    style={
                      expanded
                        ? {
                            display: "grid",
                            gridTemplateColumns: "35px 1fr",
                            alignItems: "center",
                            gap: 10,
                            height: 35,
                            width: OPEN_ROW_W,
                            marginInline: "auto",
                          }
                        : {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 35,
                            height: 35,
                          }
                    }
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

                    {/* Label — expanded mode only */}
                    <AnimatePresence>
                      {expanded && (
                        <motion.span
                          key={`lbl-${item.label}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.22, ease: "easeOut", delay: itemDelay + 0.08 }}
                          style={{ whiteSpace: "nowrap" }}
                          className={`text-[9.5px] font-semibold tracking-[0.16em] ${
                            isActive ? "text-[#0D2C60]" : "text-[#0D2C60]/75"
                          }`}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
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
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            style={{ position: "absolute", right: -13, top: 36, zIndex: 10, cursor: "pointer" }}
            className="flex h-[22px] w-[22px] items-center justify-center rounded-[10px] bg-white/90 shadow-md hover:bg-white"
          >
            <motion.svg
              width="7" height="7" viewBox="0 0 10 10" fill="none"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <path d="M3 2L7 5L3 8" stroke="#0D2C60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.button>

        </motion.div>
      </div>

      {/* ── Tooltip ── */}
      {/* top = icon vertical center; y:"-50%" centers the whole tooltip on that point.  */}
      {/* y is passed to Framer Motion (not CSS style) so it composes correctly with x. */}
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
              top: tooltip.y,   // icon's exact vertical center
              zIndex: 10000,
            }}
          >
            {/* Arrow — alignSelf:center pins it to the tooltip container's midline */}
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

const MORPH_MS = 1100

// The top bar shrinks down to the logo, slides to the left and grows into the side bar.
function MorphGhost({
  from, to, onDone,
}: {
  from: { left: number; top: number; width: number; height: number }
  to: { left: number; top: number; width: number; height: number }
  onDone: () => void
}) {
  const times = [0, 0.3, 1]
  const move = { duration: MORPH_MS / 1000, times, ease: "easeInOut" as const }
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[9999] hidden overflow-hidden lg:block"
      style={{ ...glass, left: from.left, top: from.top, width: from.width, height: from.height }}
      initial={false}
      animate={{
        left: [from.left, from.left, to.left],
        top: [from.top, from.top, to.top],
        width: [from.width, 150, to.width],
        height: [from.height, from.height, to.height],
        opacity: [1, 1, 1, 0],
      }}
      transition={{
        left: move, top: move, width: move, height: move,
        opacity: { duration: MORPH_MS / 1000, times: [0, 0.7, 0.88, 1] },
      }}
      onAnimationComplete={onDone}
    >
      {/* Items fade out first */}
      <motion.div
        className="absolute right-[5px] top-0 flex h-full items-center gap-1"
        animate={{ opacity: [1, 0, 0] }}
        transition={{ duration: MORPH_MS / 1000, times: [0, 0.18, 1] }}
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
      {/* Full logo -> small logo */}
      <motion.div
        className="absolute left-[18px] top-0 flex h-full items-center"
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: MORPH_MS / 1000, times: [0, 0.4, 0.6] }}
      >
        <Image src="/images/zagrosia-logo.svg" alt="" width={148} height={36} className="h-auto w-[112px]" />
      </motion.div>
      <motion.div
        className="absolute left-0 right-0 top-4 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: MORPH_MS / 1000, times: [0, 0.55, 0.8] }}
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
  const [morph, setMorph] = useState<null | { from: { left: number; top: number; width: number; height: number }; to: { left: number; top: number; width: number; height: number } | null }>(null)
  const [railReady, setRailReady] = useState(false)
  const prevShowTop = useRef(true)
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

  // top bar -> side bar: start the morph (desktop only)
  useEffect(() => {
    const wasTop = prevShowTop.current
    prevShowTop.current = showTop
    if (wasTop && !showTop && lastRect.current && window.innerWidth >= 1024 && Date.now() - mountedAt.current > 1000) {
      setRailReady(false)
      setMorph({ from: lastRect.current, to: null })
    }
    if (showTop) setMorph(null)
  }, [showTop])

  // once the (hidden) side bar is mounted, measure where it sits
  useLayoutEffect(() => {
    if (morph && !morph.to) {
      const el = document.getElementById("zag-rail-panel")
      if (el) {
        const r = el.getBoundingClientRect()
        setMorph({ from: morph.from, to: { left: r.left, top: r.top, width: r.width, height: r.height } })
      } else {
        setMorph(null)
      }
    }
  }, [morph])

  useEffect(() => {
    if (!morph?.to) return
    const t = setTimeout(() => setRailReady(true), MORPH_MS * 0.82)
    return () => clearTimeout(t)
  }, [morph?.to])

  return (
    <>
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
          {showTop && (
            <motion.nav
              key="top"
              aria-label="Main navigation"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={ease}
              onMouseLeave={() => setHovered(null)}
              className="pointer-events-auto flex w-full items-center justify-between pl-[18px] pr-[5px]"
              style={{ height: 45, ...glass }}
            >
              {/* Logo lives inside the bar */}
              <Link href="/" aria-label="Go to homepage" onClick={() => setOpen(false)} className="flex shrink-0 items-center">
                <Image src="/images/zagrosia-logo.svg" alt="Zagrosia Engineering Inc." width={148} height={36} className="h-auto w-[112px]" priority />
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
      {showRail && (
        <SideRail
          onOpenTop={() => setOpen(true)}
          fromMorph={!!morph}
          hidden={!!morph && !railReady}
        />
      )}
      {morph?.to && (
        <MorphGhost from={morph.from} to={morph.to} onDone={() => { setRailReady(true); setMorph(null) }} />
      )}
    </>
  )
}
