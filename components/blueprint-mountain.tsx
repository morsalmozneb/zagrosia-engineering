"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

/* ── Interactive blueprint model: a mountain with a braced structural building on its shoulder.
   Pure canvas (no 3D library): a height-field wireframe drawn back-to-front so near ridges hide
   the far ones, in thin technical lines. Drag to rotate. ── */

const N = 54 // grid cells per side
const HS = 0.78 // vertical exaggeration
const INK = "34,48,66" // line colour (slate)
const BLUE = "0,82,165" // the only blue, kept to small accents

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}
function vnoise(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}
function ridged(x: number, y: number) {
  let amp = 0.5
  let f = 1
  let sum = 0
  for (let i = 0; i < 4; i++) {
    const n = 1 - Math.abs(vnoise(x * f, y * f) * 2 - 1)
    sum += n * n * amp
    amp *= 0.5
    f *= 2.1
  }
  return sum
}
function smooth(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

const PEAKS: [number, number, number, number][] = [
  [0, -0.1, 1.0, 0.36],
  [-0.48, 0.2, 0.62, 0.27],
  [0.5, -0.3, 0.55, 0.25],
  [-0.1, 0.56, 0.38, 0.23],
  [0.64, 0.46, 0.3, 0.2],
]
const PAD = { x: 0.4, z: 0.2, r: 0.23 }

function rawHeight(x: number, z: number) {
  let h = 0
  for (const [px, pz, a, s] of PEAKS) {
    const dx = x - px
    const dz = z - pz
    h += a * Math.exp(-(dx * dx + dz * dz) / (2 * s * s))
  }
  const mass = Math.min(1, h * 1.4)
  h += (ridged(x * 2.2 + 3.1, z * 2.2 + 1.7) - 0.35) * 0.34 * mass
  const edge = Math.max(Math.abs(x), Math.abs(z))
  return Math.max(0, h) * (1 - smooth(0.8, 1.0, edge))
}
const PAD_H = rawHeight(PAD.x, PAD.z)
function height(x: number, z: number) {
  const h = rawHeight(x, z)
  const d = Math.hypot(x - PAD.x, z - PAD.z)
  const t = 1 - smooth(PAD.r * 0.62, PAD.r, d)
  return (h * (1 - t) + PAD_H * t) * HS
}

type Model = {
  X: Float32Array
  Z: Float32Array
  H: Float32Array // (N+1)*(N+1)
  top: [number, number, number]
}
function buildModel(): Model {
  const X = new Float32Array(N + 1)
  const Z = new Float32Array(N + 1)
  for (let i = 0; i <= N; i++) {
    X[i] = -1 + (2 * i) / N
    Z[i] = -1 + (2 * i) / N
  }
  const H = new Float32Array((N + 1) * (N + 1))
  let top: [number, number, number] = [0, 0, 0]
  for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= N; j++) {
      const h = height(X[i], Z[j])
      H[i * (N + 1) + j] = h
      if (h > top[1]) top = [X[i], h, Z[j]]
    }
  }
  return { X, Z, H, top }
}

// Building: 6 storeys, 4 bays, X-bracing, rotated a little on its pad.
const B = { w: 0.22, d: 0.15, floors: 6, fh: 0.045, bays: 4, rot: 0.5 }

export function BlueprintMountain({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const model = buildModel()
    const { X, Z, H } = model
    const cells = N * N
    const depth = new Float32Array(cells)
    const order = new Uint32Array(cells)
    const idx = (i: number, j: number) => i * (N + 1) + j
    const padY = height(PAD.x, PAD.z)
    const Hb = B.floors * B.fh

    const st = { yaw: 0.65, pitch: 0.62, vYaw: 0, vPitch: 0, dragging: false, lastX: 0, lastY: 0, lastInteract: -1e9 }
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let visible = true
    let last = performance.now()

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = Math.max(10, r.width)
      h = Math.max(10, r.height)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(wrap)

    // ── projection (set per frame) ──
    let cyaw = 1
    let syaw = 0
    let cp = 1
    let sp = 0
    let scale = 1
    let cx = 0
    let cy = 0
    const D = 4.2
    const out = { x: 0, y: 0, z: 0 }
    const proj = (x: number, y: number, z: number) => {
      const xr = x * cyaw - z * syaw
      const zr = x * syaw + z * cyaw
      const y2 = y * cp + zr * sp
      const z2 = zr * cp - y * sp
      const s = D / (D + z2)
      out.x = cx + xr * scale * s
      out.y = cy - y2 * scale * s
      out.z = z2
    }

    // terrain colour buckets
    const BUCKETS = 10
    const fills: string[] = []
    const strokes: string[] = []
    for (let b = 0; b < BUCKETS; b++) {
      const t = b / (BUCKETS - 1)
      const g = Math.round(255 - t * 9)
      const bl = Math.round(255 - t * 3)
      fills.push(`rgb(${g},${Math.round(255 - t * 6)},${bl})`)
      strokes.push(`rgba(${INK},${(0.18 + t * 0.34).toFixed(3)})`)
    }

    // building geometry in world space
    const cr = Math.cos(B.rot)
    const sr = Math.sin(B.rot)
    const bw = (lx: number, lz: number): [number, number] => [PAD.x + lx * cr - lz * sr, PAD.z + lx * sr + lz * cr]
    const hw = B.w / 2
    const hd = B.d / 2
    const corners: [number, number][] = [bw(-hw, -hd), bw(hw, -hd), bw(hw, hd), bw(-hw, hd)]
    // wall k runs from corner k to corner k+1
    const walls = [0, 1, 2, 3].map((k) => {
      const a = corners[k]
      const b = corners[(k + 1) % 4]
      const ex = b[0] - a[0]
      const ez = b[1] - a[1]
      const len = Math.hypot(ex, ez)
      // outward normal (polygon is counter-clockwise in x,z → outward = (ez, -ex))
      return { a, b, nx: ez / len, nz: -ex / len }
    })

    const line = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) => {
      proj(x1, y1, z1)
      const ax = out.x
      const ay = out.y
      proj(x2, y2, z2)
      ctx.moveTo(ax, ay)
      ctx.lineTo(out.x, out.y)
    }

    const drawWall = (k: number) => {
      const { a, b } = walls[k]
      const y0 = padY
      const y1 = padY + Hb
      proj(a[0], y0, a[1])
      const p0x = out.x
      const p0y = out.y
      proj(b[0], y0, b[1])
      const p1x = out.x
      const p1y = out.y
      proj(b[0], y1, b[1])
      const p2x = out.x
      const p2y = out.y
      proj(a[0], y1, a[1])
      const p3x = out.x
      const p3y = out.y
      ctx.beginPath()
      ctx.moveTo(p0x, p0y)
      ctx.lineTo(p1x, p1y)
      ctx.lineTo(p2x, p2y)
      ctx.lineTo(p3x, p3y)
      ctx.closePath()
      ctx.fillStyle = "#FFFFFF"
      ctx.fill()
      ctx.lineWidth = 1.1
      ctx.strokeStyle = `rgba(${INK},0.85)`
      ctx.stroke()

      const at = (u: number, v: number): [number, number, number] => [a[0] + (b[0] - a[0]) * u, padY + v * Hb, a[1] + (b[1] - a[1]) * u]
      // floor lines + columns
      ctx.beginPath()
      for (let f = 1; f < B.floors; f++) {
        const p = at(0, f / B.floors)
        const q = at(1, f / B.floors)
        line(p[0], p[1], p[2], q[0], q[1], q[2])
      }
      for (let c = 1; c < B.bays; c++) {
        const p = at(c / B.bays, 0)
        const q = at(c / B.bays, 1)
        line(p[0], p[1], p[2], q[0], q[1], q[2])
      }
      ctx.lineWidth = 0.7
      ctx.strokeStyle = `rgba(${INK},0.4)`
      ctx.stroke()
      // X bracing in two bays (the blue accent)
      ctx.beginPath()
      for (let f = 0; f < B.floors; f++) {
        for (const c of [1, 2]) {
          const p00 = at(c / B.bays, f / B.floors)
          const p11 = at((c + 1) / B.bays, (f + 1) / B.floors)
          const p10 = at((c + 1) / B.bays, f / B.floors)
          const p01 = at(c / B.bays, (f + 1) / B.floors)
          line(p00[0], p00[1], p00[2], p11[0], p11[1], p11[2])
          line(p10[0], p10[1], p10[2], p01[0], p01[1], p01[2])
        }
      }
      ctx.lineWidth = 0.8
      ctx.strokeStyle = `rgba(${BLUE},0.7)`
      ctx.stroke()
    }

    const drawBuilding = () => {
      // walls facing the camera, far-to-near, then roof + mast
      const vis: { k: number; d: number }[] = []
      for (let k = 0; k < 4; k++) {
        const wl = walls[k]
        const nzr = wl.nx * syaw + wl.nz * cyaw // depth component of the normal
        if (nzr < 0.02) {
          const mx = (wl.a[0] + wl.b[0]) / 2
          const mz = (wl.a[1] + wl.b[1]) / 2
          proj(mx, padY + Hb / 2, mz)
          vis.push({ k, d: out.z })
        }
      }
      vis.sort((p, q) => q.d - p.d)
      for (const v of vis) drawWall(v.k)
      // roof
      const yr = padY + Hb
      ctx.beginPath()
      corners.forEach((c, i) => {
        proj(c[0], yr, c[1])
        if (i === 0) ctx.moveTo(out.x, out.y)
        else ctx.lineTo(out.x, out.y)
      })
      ctx.closePath()
      ctx.fillStyle = "#F3F6FA"
      ctx.fill()
      ctx.lineWidth = 1.1
      ctx.strokeStyle = `rgba(${INK},0.85)`
      ctx.stroke()
      // roof grid + mast
      ctx.beginPath()
      const m = bw(0, 0)
      line(m[0], yr, m[1], m[0], yr + 0.1, m[1])
      ctx.lineWidth = 1.1
      ctx.strokeStyle = `rgba(${BLUE},0.9)`
      ctx.stroke()
      proj(m[0], yr + 0.1, m[1])
      ctx.beginPath()
      ctx.arc(out.x, out.y, 2.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${BLUE})`
      ctx.fill()
    }

    const drawFrame = () => {
      // drawing-sheet frame around the model: corner ticks and a light ground grid
      const e = 1.14
      ctx.beginPath()
      const g = 8
      for (let i = 0; i <= g; i++) {
        const t = -e + (2 * e * i) / g
        line(t, 0, -e, t, 0, e)
        line(-e, 0, t, e, 0, t)
      }
      ctx.lineWidth = 0.5
      ctx.strokeStyle = `rgba(${INK},0.08)`
      ctx.stroke()
      ctx.beginPath()
      line(-e, 0, -e, e, 0, -e)
      line(e, 0, -e, e, 0, e)
      line(e, 0, e, -e, 0, e)
      line(-e, 0, e, -e, 0, -e)
      ctx.lineWidth = 0.9
      ctx.strokeStyle = `rgba(${INK},0.3)`
      ctx.stroke()
      // corner crosshairs
      ctx.beginPath()
      for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        line(sx * e - sx * 0.07, 0, sz * e, sx * e + sx * 0.07, 0, sz * e)
        line(sx * e, 0, sz * e - sz * 0.07, sx * e, 0, sz * e + sz * 0.07)
      }
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${INK},0.55)`
      ctx.stroke()
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) {
        last = now
        return
      }
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      // motion: inertia after a drag, then a slow turn when idle
      if (!st.dragging) {
        st.yaw += st.vYaw * dt * 60
        st.pitch = Math.min(1.15, Math.max(0.14, st.pitch + st.vPitch * dt * 60))
        st.vYaw *= 0.93
        st.vPitch *= 0.9
        if (!reduced && now - st.lastInteract > 2500) st.yaw += 0.0016 * dt * 60 * 3
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      cyaw = Math.cos(st.yaw)
      syaw = Math.sin(st.yaw)
      cp = Math.cos(st.pitch)
      sp = Math.sin(st.pitch)
      scale = Math.min(w / 2.7, h / 1.35)
      cx = w / 2
      cy = h * (0.58 + st.pitch * 0.07)
      ctx.lineJoin = "round"
      ctx.lineCap = "round"

      drawFrame()

      // painter's order for terrain cells, far to near
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const c = i * N + j
          const mx = (X[i] + X[i + 1]) / 2
          const mz = (Z[j] + Z[j + 1]) / 2
          const my = (H[idx(i, j)] + H[idx(i + 1, j + 1)]) / 2
          const zr = mx * syaw + mz * cyaw
          depth[c] = zr * cp - my * sp
          order[c] = c
        }
      }
      const sorted = Array.from(order).sort((a, b) => depth[b] - depth[a])

      // building sits at the depth of its centre; drawn once, in sequence with the terrain
      proj(PAD.x, padY + Hb / 2, PAD.z)
      const bDepth = out.z - 0.02
      let buildingDone = false

      let lastBucket = -1
      ctx.lineWidth = 0.6
      for (let n = 0; n < sorted.length; n++) {
        const c = sorted[n]
        if (!buildingDone && depth[c] < bDepth) {
          drawBuilding()
          buildingDone = true
          lastBucket = -1
          ctx.lineWidth = 0.6
        }
        const i = Math.floor(c / N)
        const j = c % N
        const h00 = H[idx(i, j)]
        const h10 = H[idx(i + 1, j)]
        const h11 = H[idx(i + 1, j + 1)]
        const h01 = H[idx(i, j + 1)]
        const avg = (h00 + h10 + h11 + h01) / 4
        const b = Math.min(BUCKETS - 1, Math.floor((avg / (HS * 1.1)) * BUCKETS))
        if (b !== lastBucket) {
          ctx.fillStyle = fills[b]
          ctx.strokeStyle = strokes[b]
          lastBucket = b
        }
        ctx.beginPath()
        proj(X[i], h00, Z[j])
        ctx.moveTo(out.x, out.y)
        proj(X[i + 1], h10, Z[j])
        ctx.lineTo(out.x, out.y)
        proj(X[i + 1], h11, Z[j + 1])
        ctx.lineTo(out.x, out.y)
        proj(X[i], h01, Z[j + 1])
        ctx.lineTo(out.x, out.y)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
      if (!buildingDone) drawBuilding()

      // summit callout: ring, leader and a short tick
      proj(model.top[0], model.top[1], model.top[2])
      const sx = out.x
      const sy = out.y
      ctx.beginPath()
      ctx.arc(sx, sy, 4.5, 0, Math.PI * 2)
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${BLUE},0.9)`
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(sx, sy, 1.6, 0, Math.PI * 2)
      ctx.fillStyle = `rgb(${BLUE})`
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(sx + 3, sy - 3)
      ctx.lineTo(sx + 26, sy - 26)
      ctx.lineTo(sx + 26 + Math.min(120, w * 0.14), sy - 26)
      ctx.lineWidth = 0.9
      ctx.strokeStyle = `rgba(${BLUE},0.7)`
      ctx.stroke()
    }
    raf = requestAnimationFrame(frame)

    // ── drag to rotate (mouse, touch, pen) ──
    const down = (e: PointerEvent) => {
      st.dragging = true
      st.lastX = e.clientX
      st.lastY = e.clientY
      st.vYaw = 0
      st.vPitch = 0
      st.lastInteract = performance.now()
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = "grabbing"
    }
    const move = (e: PointerEvent) => {
      if (!st.dragging) return
      const dx = e.clientX - st.lastX
      const dy = e.clientY - st.lastY
      st.lastX = e.clientX
      st.lastY = e.clientY
      st.yaw -= dx * 0.009
      st.pitch = Math.min(1.15, Math.max(0.14, st.pitch + dy * 0.006))
      st.vYaw = -dx * 0.009 * 0.35
      st.vPitch = 0
      st.lastInteract = performance.now()
    }
    const up = (e: PointerEvent) => {
      st.dragging = false
      st.lastInteract = performance.now()
      canvas.style.cursor = "grab"
      try {
        canvas.releasePointerCapture(e.pointerId)
      } catch {}
    }
    canvas.addEventListener("pointerdown", down)
    canvas.addEventListener("pointermove", move)
    canvas.addEventListener("pointerup", up)
    canvas.addEventListener("pointercancel", up)
    canvas.style.cursor = "grab"
    canvas.style.touchAction = "none"

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener("pointerdown", down)
      canvas.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerup", up)
      canvas.removeEventListener("pointercancel", up)
    }
  }, [reduced])

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <canvas ref={canvasRef} className="block select-none" aria-label="Interactive blueprint model of a mountain with a structural building. Drag to rotate." role="img" />
      <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]/45">
        <span aria-hidden>‹ </span>Drag to rotate<span aria-hidden> ›</span>
      </p>
    </div>
  )
}
