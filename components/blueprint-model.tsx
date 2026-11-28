"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

/* Interactive 3D model of the Zagrosia mountain city (a GLB file), shown as a light blueprint hologram.
   Drag to turn it around. The look is drawn in code, so the file itself carries no colours. */

const MODEL_URL = "/models/zagrosia-city.glb"

type Ctl = { zoomBy: (f: number) => void; reset: () => void }

export function BlueprintModel({ className = "" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const ctl = useRef<Ctl | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const wrap = stageRef.current
    if (!wrap) return
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const THREE = await import("three")
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js")
      if (disposed || !wrap) return

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
      renderer.setClearColor(0x000000, 0)
      const canvas = renderer.domElement
      canvas.setAttribute("role", "img")
      canvas.setAttribute("aria-label", "Interactive 3D model of a mountain city built into terraced slopes. Drag to rotate.")
      canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:none;cursor:grab;opacity:0;transition:opacity .9s ease"
      wrap.appendChild(canvas)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 200)
      scene.add(camera)
      const root = new THREE.Group()
      scene.add(root)

            const vert = `
        varying vec3 vN; varying vec3 vV; varying float vY;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position,1.0);
          vN = normalize(normalMatrix * normal);
          vV = normalize(-mv.xyz);
          vY = position.y;
          gl_Position = projectionMatrix * mv;
        }`
      const frag = `
        varying vec3 vN; varying vec3 vV; varying float vY;
        void main(){
          vec3 n = normalize(vN);
          float c = abs(fract(vY * 38.0) - 0.5);
          float contour = 1.0 - smoothstep(0.0, 0.05, c);
          // solid soft blue, lit from the upper left, with faint contour lines
          float l = clamp(dot(n, normalize(vec3(-0.45, 0.85, 0.5))), 0.0, 1.0);
          vec3 col = mix(vec3(0.25, 0.40, 0.68), vec3(0.57, 0.72, 0.93), 0.25 + 0.75 * l);
          col = mix(col, vec3(0.16, 0.30, 0.56), contour * 0.22);
          gl_FragColor = vec4(col, 1.0);
        }`
      const mat = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: false,
        depthWrite: true,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        side: THREE.DoubleSide,
      })
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x1f4a8a, transparent: true, opacity: 0.32 })

      const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js")
      const loader = new GLTFLoader()
      loader.setMeshoptDecoder(MeshoptDecoder)
      const gltf = await loader.loadAsync(MODEL_URL)
      if (disposed) return
      gltf.scene.updateMatrixWorld(true)
      let g: import("three").BufferGeometry | null = null
      gltf.scene.traverse((o) => {
        const m = o as import("three").Mesh
        if (!g && m.isMesh) {
          g = m.geometry.clone()
          // quantized (int16) positions must become floats before any transform
          const pa = g.getAttribute("position")
          const f = new Float32Array(pa.count * 3)
          for (let i = 0; i < pa.count; i++) {
            f[i * 3] = pa.getX(i)
            f[i * 3 + 1] = pa.getY(i)
            f[i * 3 + 2] = pa.getZ(i)
          }
          g.setAttribute("position", new THREE.BufferAttribute(f, 3))
          g.applyMatrix4(m.matrixWorld)
        }
      })
      if (!g) return
      const geom = g as import("three").BufferGeometry
      g = geom
      geom.computeBoundingBox()
      const bb = geom.boundingBox!
      const size = new THREE.Vector3()
      bb.getSize(size)
      const k = 10 / Math.max(size.x, size.z)
      const cen = new THREE.Vector3()
      bb.getCenter(cen)
      geom.translate(-cen.x, -bb.min.y, -cen.z)
      geom.scale(k, k, k)
      geom.computeVertexNormals()
      const mesh = new THREE.Mesh(geom, mat)
      root.add(mesh)
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom, 34), edgeMat)
      root.add(edges)
      const height = size.y * k

      const st = { yaw: 0.55, elev: 0.46, vYaw: 0, zoom: 1, zt: 1, dragging: false, lx: 0, ly: 0, last: -1e9 }
      const target = new THREE.Vector3(0, height * 0.36, 0)
      let dist = 24
      const place = () => {
        const ce = Math.cos(st.elev)
        const d = dist / st.zoom
        camera.position.set(target.x + d * ce * Math.sin(st.yaw), target.y + d * Math.sin(st.elev), target.z + d * ce * Math.cos(st.yaw))
        camera.lookAt(target)
      }
      const resize = () => {
        const r = wrap.getBoundingClientRect()
        const w = Math.max(10, r.width)
        const h = Math.max(10, r.height)
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        const th = Math.tan((camera.fov * Math.PI) / 360)
        dist = Math.max(5.0 / (th * Math.min(camera.aspect, 1.8)), (height * 0.5 + 2.2) / th)
        camera.updateProjectionMatrix()
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(wrap)
      let visible = true
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
      io.observe(wrap)

      const down = (e: PointerEvent) => {
        st.dragging = true
        st.lx = e.clientX
        st.ly = e.clientY
        st.vYaw = 0
        st.last = performance.now()
        canvas.setPointerCapture(e.pointerId)
        canvas.style.cursor = "grabbing"
      }
      const move = (e: PointerEvent) => {
        if (!st.dragging || pts.size > 1) return
        const dx = e.clientX - st.lx
        const dy = e.clientY - st.ly
        st.lx = e.clientX
        st.ly = e.clientY
        st.yaw -= dx * 0.008
        st.elev = Math.min(1.3, Math.max(0.12, st.elev + dy * 0.005))
        st.vYaw = -dx * 0.008 * 0.35
        st.last = performance.now()
      }
      const up = (e: PointerEvent) => {
        st.dragging = false
        st.last = performance.now()
        canvas.style.cursor = "grab"
        try {
          canvas.releasePointerCapture(e.pointerId)
        } catch {}
      }
      // zoom: trackpad pinch / Ctrl or ⌘ + scroll (plain scroll still scrolls the page), two-finger pinch on touch screens
      const wheel = (e: WheelEvent) => {
        if (!e.ctrlKey && !e.metaKey) return
        e.preventDefault()
        st.zt = Math.min(2.4, Math.max(0.85, st.zt * Math.exp(-e.deltaY * 0.012)))
      }
      const pts = new Map<number, { x: number; y: number }>()
      let pinch0 = 0
      let zt0 = 1
      const ptrDown = (e: PointerEvent) => {
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
        if (pts.size === 2) {
          const [a, b] = [...pts.values()]
          pinch0 = Math.hypot(a.x - b.x, a.y - b.y)
          zt0 = st.zt
          st.dragging = false
        }
      }
      const ptrMove = (e: PointerEvent) => {
        if (!pts.has(e.pointerId)) return
        pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
        if (pts.size === 2 && pinch0 > 0) {
          const [a, b] = [...pts.values()]
          st.zt = Math.min(2.4, Math.max(0.85, (zt0 * Math.hypot(a.x - b.x, a.y - b.y)) / pinch0))
        }
      }
      const ptrUp = (e: PointerEvent) => {
        pts.delete(e.pointerId)
      }
      canvas.addEventListener("wheel", wheel, { passive: false })
      canvas.addEventListener("pointerdown", ptrDown)
      canvas.addEventListener("pointermove", ptrMove)
      canvas.addEventListener("pointerup", ptrUp)
      canvas.addEventListener("pointercancel", ptrUp)
      canvas.addEventListener("pointerdown", down)
      canvas.addEventListener("pointermove", move)
      canvas.addEventListener("pointerup", up)
      canvas.addEventListener("pointercancel", up)

      let raf = 0
      let prev = performance.now()
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame)
        const dt = Math.min(0.05, (now - prev) / 1000)
        prev = now
        if (!visible) return
        if (!st.dragging) {
          st.yaw += st.vYaw * dt * 60
          st.vYaw *= 0.93
          if (!reduced && now - st.last > 2200) st.yaw += 0.0035 * dt * 60
        }
        st.zoom += (st.zt - st.zoom) * Math.min(1, dt * 9)
        place()
        renderer.render(scene, camera)
      }
      raf = requestAnimationFrame(frame)
      place()
      renderer.render(scene, camera)
      canvas.style.opacity = "1"
      ;(window as unknown as { __bc?: typeof st }).__bc = st
      ctl.current = {
        zoomBy: (f) => {
          st.zt = Math.min(2.4, Math.max(0.85, st.zt * f))
        },
        reset: () => {
          st.yaw = 0.55
          st.elev = 0.46
          st.vYaw = 0
          st.zt = 1
          st.last = performance.now()
        },
      }

      cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
        canvas.removeEventListener("wheel", wheel)
        canvas.removeEventListener("pointerdown", ptrDown)
        canvas.removeEventListener("pointermove", ptrMove)
        canvas.removeEventListener("pointerup", ptrUp)
        canvas.removeEventListener("pointercancel", ptrUp)
        canvas.removeEventListener("pointerdown", down)
        canvas.removeEventListener("pointermove", move)
        canvas.removeEventListener("pointerup", up)
        canvas.removeEventListener("pointercancel", up)
        geom.dispose()
        edges.geometry.dispose()
        mat.dispose()
        edgeMat.dispose()
        renderer.dispose()
        canvas.remove()
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [reduced])

  const btn = "flex h-[38px] w-[38px] items-center justify-center rounded-full text-[#1E4A94] transition-colors hover:bg-[#1E4A94]/10"
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div ref={stageRef} className="relative -mt-8 h-[clamp(430px,80vh,780px)] w-full" />
      <div className="relative -mt-[70px] flex items-center gap-5">
        <div role="group" aria-label="Zoom" className="flex items-center gap-1 rounded-full border border-[#1E4A94]/15 bg-[#EEF3FA] p-[4px]">
          <button type="button" aria-label="Zoom out" onClick={() => ctl.current?.zoomBy(1 / 1.3)} className={btn}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M3.5 8h9" />
            </svg>
          </button>
          <span className="h-[18px] w-px bg-[#1E4A94]/15" aria-hidden />
          <button type="button" aria-label="Zoom in" onClick={() => ctl.current?.zoomBy(1.3)} className={btn}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M3.5 8h9M8 3.5v9" />
            </svg>
          </button>
        </div>
        <button type="button" onClick={() => ctl.current?.reset()} className="rounded-full border border-[#1E4A94]/15 bg-[#EEF3FA] px-4 py-[11px] text-[14px] font-semibold leading-none text-[#1E4A94] transition-opacity hover:opacity-70">
          Reset view
        </button>
      </div>
      <p className="mt-[6px] text-[13px] text-[#2D2D2D]/60">Drag to rotate. Pinch or use + / − to zoom.</p>
    </div>
  )
}
