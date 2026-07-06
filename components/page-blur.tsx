"use client"

import dynamic from "next/dynamic"

const GradualBlur = dynamic(() => import("./GradualBlur"), { ssr: false })

export function PageBlur() {
  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="10rem"
      strength={3}
      divCount={10}
      curve="bezier"
      exponential={true}
      opacity={1}
      zIndex={9000}
    />
  )
}
