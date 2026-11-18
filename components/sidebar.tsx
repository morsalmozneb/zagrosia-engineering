"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { isHiddenHref } from "@/lib/hidden-sections"

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

const navItems = allItems.filter((i) => i.href !== "/contact")
const contactItem = allItems.find((i) => i.href === "/contact")

// Same blue tint the mobile menu uses for the active icon
const ACTIVE_ICON_FILTER =
  "brightness(0) saturate(100%) invert(21%) sepia(94%) saturate(1200%) hue-rotate(202deg) brightness(90%)"

export function Sidebar() {
  const [hovered, setHovered] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[26px] z-[9999] hidden justify-center lg:flex">
      <motion.nav
        aria-label="Main navigation"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseLeave={() => setHovered(null)}
        className="pointer-events-auto flex items-center gap-1 px-[6px]"
        style={{
          height: 45,
          borderRadius: 14,
          backgroundColor: "rgba(148,184,220,0.5)",
          boxShadow: "0px 4px 19.6px 0px rgba(148,184,220,0.34)",
          backdropFilter: "blur(61.5px)",
          WebkitBackdropFilter: "blur(61.5px)",
        }}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const isHover = hovered === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              className={`zag-heading relative flex items-center gap-2 text-[11.5px] leading-none tracking-[0.04em] transition-colors duration-300 ease-out ${
                isActive ? "text-[#0052A5]" : "text-[#2D2D2D]"
              }`}
              style={{
                height: 33,
                padding: "0 12px",
                borderRadius: 10,
                fontWeight: isActive ? 850 : 600,
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "rgba(0,82,165,0.09)",
                    boxShadow: "inset 0 0 0 1px rgba(0,82,165,0.18)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
              {isHover && !isActive && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0"
                  style={{ borderRadius: 10, backgroundColor: "rgba(0,82,165,0.06)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.icon}
                alt=""
                className="relative hidden xl:block"
                style={{
                  width: isActive ? 19 : 17,
                  height: isActive ? 19 : 17,
                  objectFit: "contain",
                  filter: isActive ? ACTIVE_ICON_FILTER : "none",
                  transition: "all 300ms ease-out",
                }}
              />
              <span className="relative">{item.label}</span>
            </Link>
          )
        })}

        {contactItem && (
          <Link
            href={contactItem.href}
            className="zag-heading group ml-1 flex items-center gap-2 text-[11.5px] leading-none tracking-[0.04em] text-white transition-all duration-300 ease-out hover:brightness-110"
            style={{
              height: 33,
              padding: "0 14px",
              borderRadius: 10,
              fontWeight: 850,
              backgroundColor: "#0052A5",
            }}
          >
            {contactItem.label}
            <svg
              width="11"
              height="11"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 ease-out group-hover:-translate-y-px group-hover:translate-x-px"
            >
              <path d="M3.5 10.5L10.5 3.5M5 3.5H10.5V9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </motion.nav>
    </div>
  )
}
