"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useAnimation } from "framer-motion"

const navItems = [
  { label: "HOME",     href: "/",         icon: "/icons/icon-home.svg"     },
  { label: "ABOUT",    href: "/about",    icon: "/icons/icon-about.svg"    },
  { label: "SERVICES", href: "/services", icon: "/icons/icon-services.svg" },
  { label: "PROJECTS", href: "/projects", icon: "/icons/icon-projects.svg" },
  { label: "AI LAB",   href: "/ai-lab",   icon: "/icons/icon-ailab.svg"    },
  { label: "ACADEMY",  href: "/academy",  icon: "/icons/icon-academy.svg"  },
  { label: "BLOG",     href: "/blog",     icon: "/icons/icon-blog.svg"     },
  { label: "CONTACT",  href: "/contact",  icon: "/icons/icon-contact.svg"  },
]

const COLLAPSED_W = 45
const EXPANDED_W  = 162
const SIDEBAR_H = 350
const OPEN_ROW_W = 148

const panelSpring = { type: "spring", stiffness: 160, damping: 38, mass: 1.2 }

export function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const [tooltip,  setTooltip]  = useState<{ label: string; x: number; y: number } | null>(null)
  const pathname        = usePathname()
  const shimmerControls = useAnimation()

  // Shimmer on open
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
        style={{ position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)", zIndex: 9999 }}
      >
        {/* ── Panel ── */}
        <motion.div
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
          className="relative flex flex-col items-center rounded-[20px] backdrop-blur-md py-2 overflow-hidden"
          style={{ height: SIDEBAR_H }}
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
            className={`relative z-20 mb-2 flex w-full items-center px-1 ${expanded ? "justify-start" : "justify-center"}`}
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
                  <Link href="/" aria-label="Go to homepage">
                    <Image
                      src="/images/Sidebar-Logo-Open.png"
                      alt="Zagrosia Engineering"
                      width={115}
                      height={30}
                      className="h-auto"
                      priority
                    />
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
                  <Link href="/" aria-label="Go to homepage">
                    <Image
                      src="/images/Sidebar-Logo-Closed.png"
                      alt="Zagrosia"
                      width={30}
                      height={24}
                      className="h-auto"
                      priority
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div
            className="mb-1 w-full"
            style={
              expanded
                ? { paddingLeft: 7, paddingRight: 7 }
                : { paddingLeft: 8, paddingRight: 8 }
            }
          >
            <div className="h-px bg-[#0D2C60]/15" />
          </div>

          {/* ── Nav ──
              items-center centers collapsed icon rows inside the narrow rail. */}
          <nav className="relative z-20 flex w-full flex-col items-center gap-px px-0 pt-1">
            {navItems.map((item, index) => {
              const isActive  = pathname === item.href
              const itemDelay = expanded ? index * 0.055 : 0

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-[10px] transition-colors duration-150 overflow-hidden ${
                    expanded
                      ? isActive ? "bg-[#0D2C60]/15" : "hover:bg-[#0D2C60]/10"
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
                >
                  {/* Icon wrapper — keeps the 19px icon centered inside the compact row */}
                  <div
                    className={`flex items-center justify-center rounded-[8px] transition-colors duration-150 ${
                      !expanded
                        ? isActive ? "bg-[#0D2C60]/15" : "hover:bg-[#0D2C60]/10"
                        : ""
                    }`}
                    style={{ width: 35, height: 35 }}
                    onMouseEnter={(e) => {
                      if (!expanded) {
                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                        setTooltip({
                          label: item.label,
                          x: rect.right + 14,
                          y: rect.top + rect.height / 2,
                        })
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

                  {/* Label — removed from DOM when collapsed so it never affects icon layout */}
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

        {/* ── Toggle — floats outside panel right edge ── */}
        <motion.button
          onClick={() => { setExpanded((v) => !v); setTooltip(null) }}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.88 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          style={{ position: "absolute", right: -13, top: 36, zIndex: 10, cursor: "pointer" }}
          className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white"
        >
          <motion.svg
            width="7"
            height="7"
            viewBox="0 0 10 10"
            fill="none"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <path
              d="M3 2L7 5L3 8"
              stroke="#0D2C60"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.button>
      </div>

      {/* ── Hover tooltip ── */}
      <AnimatePresence>
        {tooltip && !expanded && (
          <motion.div
            key={tooltip.label}
            initial={{ opacity: 0, x: -6, y: "-50%" }}
            animate={{ opacity: 1, x: 0,  y: "-50%" }}
            exit={{ opacity: 0, x: -4,    y: "-50%" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="hidden lg:flex items-center gap-1.5 pointer-events-none"
            style={{ position: "fixed", left: tooltip.x, top: tooltip.y, zIndex: 10000 }}
          >
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-[#0D2C60]" />
            <div className="flex items-center justify-center rounded-[8px] bg-[#0D2C60] px-3 py-1.5 shadow-lg">
              <span
                className="text-[9px] tracking-[0.18em] text-white whitespace-nowrap leading-none"
                style={{ fontFamily: "'Momo Trust Sans', 'Inter', sans-serif", fontWeight: 600 }}
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
