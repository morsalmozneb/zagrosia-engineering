"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Band, Block, EASE } from "@/components/case-study-parts"

/**
 * Photo gallery for a project page. Click a photo to open it larger;
 * use the arrows or the keyboard (← → Esc) to move through the set.
 */
export function ProjectGallery({ photos, title, dark = true }: { photos: string[]; title: string; dark?: boolean }) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close, prev, next])

  if (!photos.length) return null

  return (
    <>
      <Band dark={dark}>
        <Block dark={dark} eyebrow="From the site" title="Site photos">
          <div className="grid grid-cols-2 gap-[clamp(10px,1.6vw,18px)] lg:grid-cols-3">
            {photos.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open photo ${i + 1} of ${photos.length}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#0B1226] ring-1 ring-black/10"
                style={{ boxShadow: dark ? "0 18px 40px -16px rgba(0,0,0,0.7)" : "0 18px 40px -18px rgba(11,18,38,0.45)" }}
                initial={reduced ? false : { opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.1 + (i % 3) * 0.1, ease: EASE }}
                whileHover={reduced ? undefined : { y: -5 }}
              >
                <Image
                  src={src}
                  alt={`${title} — photo ${i + 2}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 340px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0B1226]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#5b9bf0] transition-transform duration-500 group-hover:scale-x-100" />
                <span aria-hidden className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white/90 text-[#0052A5] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 1.5h4v4M12.5 1.5L7.5 6.5M5.5 2.5h-3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </motion.button>
            ))}
          </div>
          <p className={`mt-4 text-[12px] font-bold uppercase tracking-[0.24em] ${dark ? "text-[#FCFCFC]/55" : "text-[#3a3a3a]/60"}`}>
            Anonymized site photographs. Click a photo to enlarge.
          </p>
        </Block>
      </Band>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo viewer`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1626]/92 p-4"
          onClick={close}
        >
          <div className="relative h-[80vh] w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[open]}
              alt={`${title} — photo ${open + 2}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/40 text-[18px] text-white transition-colors hover:bg-[#0052A5]"
          >
            ✕
          </button>
          {photos.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[10px] border border-white/40 text-[20px] text-white transition-colors hover:bg-[#0052A5]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[10px] border border-white/40 text-[20px] text-white transition-colors hover:bg-[#0052A5]"
              >
                →
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[12px] tracking-[0.14em] text-white/75">
                {open + 1} / {photos.length}
              </p>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
