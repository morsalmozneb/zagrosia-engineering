"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { isHiddenHref } from "@/lib/hidden-sections"

const allItems = [
  { label: "Home",     href: "/",         icon: "/icons/icon-home.svg"     },
  { label: "About",    href: "/about",    icon: "/icons/icon-about.svg"    },
  { label: "Services", href: "/services", icon: "/icons/icon-services.svg" },
  { label: "Projects", href: "/projects", icon: "/icons/icon-projects.svg" },
  { label: "AI Lab",   href: "/ai-lab",   icon: "/icons/icon-ailab.svg"    },
  { label: "Academy",  href: "/academy",  icon: "/icons/icon-academy.svg"  },
  { label: "Blog",     href: "/blog",     icon: "/icons/icon-blog.svg"     },
  { label: "Contact",  href: "/contact",  icon: "/icons/icon-contact.svg"  },
].filter((item) => !isHiddenHref(item.href))

const navItems = allItems.filter((i) => i.href !== "/contact")
const contactItem = allItems.find((i) => i.href === "/contact")

const whiteIcon = { filter: "brightness(0) invert(1)" } as const

export function Sidebar() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [slideKey, setSlideKey] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setSlideKey((k) => k + 1)
  }, [pathname])

  const goHome = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[9999] hidden justify-center lg:flex"
    >
      <motion.nav
        key={slideKey}
        aria-label="Main navigation"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setHovered(null)}
        className="pointer-events-auto relative flex items-center gap-1 rounded-full p-[7px] backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(9, 20, 42, 0.82)",
          boxShadow:
            "0 18px 50px rgba(5,14,32,0.38), 0 2px 10px rgba(5,14,32,0.25), inset 0 0 0 1px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      >
        {/* Brand mark */}
        <Link
          href="/"
          aria-label="Go to homepage"
          onClick={goHome}
          className="mr-1 flex h-10 w-12 items-center justify-center rounded-full transition-opacity hover:opacity-80"
        >
          <Image
            src="/images/Sidebar-Logo-Closed.png"
            alt="Zagrosia"
            width={28}
            height={22}
            className="h-auto"
            style={whiteIcon}
            priority
          />
        </Link>

        <span aria-hidden className="mr-1 h-6 w-px bg-white/15" />

        {/* Nav links */}
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const isHover = hovered === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              className="relative flex h-10 items-center gap-2 rounded-full px-4 text-[13.5px] font-medium tracking-[0.01em]"
              style={{
                color: isActive || isHover ? "#ffffff" : "rgba(255,255,255,0.68)",
                transition: "color 150ms ease",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full bg-white/[0.16]"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {isHover && !isActive && (
                <motion.span
                  layoutId="dock-hover"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Image
                src={item.icon}
                alt=""
                width={16}
                height={16}
                className="relative"
                style={{ ...whiteIcon, opacity: isActive || isHover ? 1 : 0.7, transition: "opacity 150ms ease" }}
              />
              <span className="relative">{item.label}</span>
            </Link>
          )
        })}

        {/* Contact call-to-action */}
        {contactItem && (
          <Link
            href={contactItem.href}
            className="group ml-1 flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13.5px] font-semibold text-[#0D2C60] transition-transform duration-200 hover:scale-[1.04] active:scale-95"
          >
            {contactItem.label}
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
            >
              <path d="M3.5 10.5L10.5 3.5M5 3.5H10.5V9" stroke="#0D2C60" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </motion.nav>
    </div>
  )
}
