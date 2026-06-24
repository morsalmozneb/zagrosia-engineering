"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const WAVE_COLOR = "#C5DEF5"

const menuItems = [
  { label: "HOME",     href: "/",         icon: "/icons/icon-home.svg"     },
  { label: "ABOUT",    href: "/about",    icon: "/icons/icon-about.svg"    },
  { label: "SERVICES", href: "/services", icon: "/icons/icon-services.svg" },
  { label: "PROJECTS", href: "/projects", icon: "/icons/icon-projects.svg" },
  { label: "AI LAB",   href: "/ai-lab",   icon: "/icons/icon-ailab.svg"    },
  { label: "ACADEMY",  href: "/academy",  icon: "/icons/icon-academy.svg"  },
  { label: "BLOG",     href: "/blog",     icon: "/icons/icon-blog.svg"     },
  { label: "CONTACT",  href: "/contact",  icon: "/icons/icon-contact.svg"  },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header className="fixed top-3 z-50 lg:absolute lg:top-0 lg:left-0 lg:right-0" style={{ left: "23px", right: "23px" }}>

      {/* ── MOBILE: floating box ── */}
      <div
        className="lg:hidden"
        style={{
          borderRadius: "20px",
          backgroundColor: "rgba(148,184,220,0.5)",
          boxShadow: "0px 4px 19.6px 0px rgba(148,184,220,0.34)",
          backdropFilter: "blur(61.5px)",
          WebkitBackdropFilter: "blur(61.5px)",
        }}
      >
        <div
          className={`${isOpen ? "invisible" : "flex"} items-center justify-between px-5`}
          style={{ height: "45px" }}
        >
          <Link href="/" aria-label="Go to homepage" className="flex items-center">
            <Image
              src="/images/zagrosia-logo.svg"
              alt="Zagrosia Engineering Inc."
              width={148}
              height={36}
              className="h-auto w-[136px]" style={{ marginTop: "10px" }}
              priority
            />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center justify-center gap-[5px] p-1"
            aria-label="Toggle menu"
          >
            <span className="h-[1.5px] w-6 rounded-full bg-[#0052A5]" />
            <span className="h-[1.5px] w-6 rounded-full bg-[#0052A5]" />
            <span className="h-[1.5px] w-6 rounded-full bg-[#0052A5]" />
          </button>
        </div>
      </div>

      {/* ── DESKTOP: original transparent absolute header ── */}
      <div
        className="hidden lg:flex items-center justify-between px-6 py-8"
        style={{ paddingLeft: "max(20px, calc(var(--desktop-grid-content-start, 0px) + 4px))" }}
      >
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/images/zagrosia-logo.svg"
            alt="Zagrosia Engineering Inc."
            width={148}
            height={36}
            className="h-auto w-[136px] drop-shadow-lg"
            priority
          />
        </Link>
      </div>

      {/* ── Menu overlay ── */}
      <div
        className={`fixed left-0 top-0 z-[100] h-screen w-screen bg-[#FCFCFC] transition-all duration-300 ease-out ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`mx-auto flex h-full w-full max-w-[390px] flex-col transition-all duration-300 ease-out ${
            isOpen ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          <div className="relative z-10 flex w-full items-start justify-between px-8 pt-10">
            <Link href="/" onClick={() => setIsOpen(false)} aria-label="Go to homepage" className="block">
              <Image
                src="/images/zagrosia-logo.svg"
                alt="Zagrosia Engineering Inc."
                width={176}
                height={42}
                className="h-auto w-[152px]"
                priority
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="px-1 py-0 text-[36px] font-light leading-none text-[#2D2D2D]"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-1 items-start justify-center px-8 pt-20">
            <ul className="flex flex-col gap-7">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`zag-heading flex items-center gap-4 text-[16px] leading-none transition-all ${
                        isActive ? "text-[#0052A5]" : "text-[#2D2D2D]"
                      }`}
                      style={isActive ? {
                        backgroundColor: "rgba(0,82,165,0.09)",
                        borderRadius: "10px",
                        padding: "8px 16px 8px 12px",
                        boxShadow: "inset 0 0 0 1px rgba(0,82,165,0.18)",
                        fontWeight: 850,
                      } : { padding: "8px 16px 8px 12px" }}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center justify-center" style={{ width: 20, height: 20, flexShrink: 0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.icon} alt="" style={{ width: isActive ? 22 : 20, height: isActive ? 22 : 20, objectFit: "contain", filter: isActive ? "brightness(0) saturate(100%) invert(21%) sepia(94%) saturate(1200%) hue-rotate(202deg) brightness(90%)" : "none" }} />
                      </span>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
