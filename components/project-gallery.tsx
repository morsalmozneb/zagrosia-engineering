"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"

/**
 * Photo gallery for a project page. Click a photo to open it larger;
 * use the arrows or the keyboard (← → Esc) to move through the set.
 */
export function ProjectGallery({ photos, title }: { photos: string[]; title: string }) {
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
    <section className="bg-[#FCFCFC] pb-[60px]">
      <div className="sidebar-content zag-desktop-content-pad px-5">
        <div className="mx-auto max-w-[860px]">
          <div className="mb-[40px] h-px w-full bg-[#2D2D2D]/10" />
          <h2 className="zag-heading mb-8 text-[30px] leading-none tracking-[0.12em] text-[#2D2D2D]">SITE PHOTOS</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open photo ${i + 1} of ${photos.length}`}
                className="zag-card-outline group relative aspect-[4/3] overflow-hidden rounded-[14px] bg-[#E8EDF4]"
              >
                <Image
                  src={src}
                  alt={`${title} — photo ${i + 2}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
          <p className="mt-4 text-[11px] tracking-[0.12em] text-[#2D2D2D]/55">
            Anonymized site photographs. Click a photo to enlarge.
          </p>
        </div>
      </div>

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
    </section>
  )
}
