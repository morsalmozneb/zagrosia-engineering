"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const menuItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "PROJECTS", href: "/projects" },
  { label: "AI LAB", href: "/ai-lab" },
  { label: "ACADEMY", href: "/academy" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact", active: true },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header className="absolute top-0 left-0 right-0 z-50 px-6 py-5 lg:py-8" style={{ paddingLeft: "calc(var(--desktop-grid-content-start, 0px) + 4px)" }}>
      <div className={`${isOpen ? "invisible" : "flex"} items-center justify-between`}>
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

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 flex flex-col gap-[6px] lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <span className="text-[#2D2D2D] text-2xl font-light">&times;</span>
          ) : (
            <>
              <span className="w-7 h-[2px] bg-[#FCFCFC]" />
              <span className="w-7 h-[2px] bg-[#FCFCFC]" />
            </>
          )}
        </button>
      </div>

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

          <nav className="flex flex-1 items-start justify-center px-8 pt-24">
            <ul className="flex flex-col items-center gap-8">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`zag-heading text-[16px] leading-none ${
                      item.active ? "text-[#0052A5]" : "text-[#2D2D2D]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
