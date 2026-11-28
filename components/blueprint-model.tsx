"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

/* Interactive 3D model of the Zagrosia mountain city (a GLB file), shown as a light blueprint hologram.
   Drag to turn it around. The look is drawn in code, so the file itself carries no colours. */

const MODEL_URL = "/models/zagrosia-city.glb"

type Look = "blueprint" | "solid"
type Ctl = { setLook: (l: Look) => void; reset: () => void }

export function BlueprintModel({ className = "" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const ctl = useRef<Ctl | null>(null)
  const [look, setLookState] = useState<Look>("blueprint")
  const reduced = useReducedMotion()
  const pick = useCallback((l: Look) => {
    setLookState(l)
    ctl.current?.setLook(l)
  }, [])

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
        uniform float uSolid;
        void main(){
          vec3 n = normalize(vN);
          float lit = 0.62 + 0.38 * clamp(dot(n, normalize(vec3(-0.4, 0.8, 0.5))), 0.0, 1.0);
          float c = abs(fract(vY * 38.0) - 0.5);
          float contour = 1.0 - smoothstep(0.0, 0.05, c);
          vec3 col;
          if (uSolid < 0.5) {
            // blueprint: solid soft blue, lit from the upper left
            float l = clamp(dot(n, normalize(vec3(-0.45, 0.85, 0.5))), 0.0, 1.0);
            col = mix(vec3(0.25, 0.40, 0.68), vec3(0.57, 0.72, 0.93), 0.25 + 0.75 * l);
            col = mix(col, vec3(0.16, 0.30, 0.56), contour * 0.22);
          } else {
            // solid: white clay with fine ink contours
            col = vec3(1.0) * lit;
            col = mix(col, vec3(0.13, 0.19, 0.27), contour * 0.30);
          }
          gl_FragColor = vec4(col, 1.0);
        }`
      const mat = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: { uSolid: { value: 0 } },
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

      const st = { yaw: 0.55, elev: 0.46, vYaw: 0, dragging: false, lx: 0, ly: 0, last: -1e9 }
      const target = new THREE.Vector3(0, height * 0.36, 0)
      let dist = 24
      const place = () => {
        const ce = Math.cos(st.elev)
        camera.position.set(target.x + dist * ce * Math.sin(st.yaw), target.y + dist * Math.sin(st.elev), target.z + dist * ce * Math.cos(st.yaw))
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
        if (!st.dragging) return
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
        place()
        renderer.render(scene, camera)
      }
      raf = requestAnimationFrame(frame)
      place()
      renderer.render(scene, camera)
      canvas.style.opacity = "1"
      ;(window as unknown as { __bc?: typeof st }).__bc = st
      ctl.current = {
        setLook: (l) => {
          mat.uniforms.uSolid.value = l === "solid" ? 1 : 0
          edgeMat.color.set(l === "solid" ? 0x223044 : 0x1f4a8a)
          edgeMat.opacity = l === "solid" ? 0.55 : 0.32
        },
        reset: () => {
          st.yaw = 0.55
          st.elev = 0.46
          st.vYaw = 0
          st.last = performance.now()
        },
      }

      cleanup = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
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

  const seg = (l: Look, label: string, icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => pick(l)}
      aria-pressed={look === l}
      className={`flex items-center gap-2 rounded-full px-[18px] py-[9px] text-[14px] font-semibold transition-colors ${
        look === l ? "bg-[#1E4A94] text-white shadow-[0_2px_8px_rgba(30,74,148,0.35)]" : "text-[#1E4A94] hover:bg-[#1E4A94]/8"
      }`}
    >
      {icon}
      {label}
    </button>
  )
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div ref={stageRef} className="relative -mt-8 h-[clamp(430px,80vh,780px)] w-full" />
      <div className="relative -mt-[70px] flex items-center gap-5">
        <div role="group" aria-label="Model style" className="flex items-center gap-1 rounded-full border border-[#1E4A94]/15 bg-[#EEF3FA] p-[4px]">
          {seg(
            "blueprint",
            "Blueprint",
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="2" y="2" width="12" height="12" rx="1.5" />
              <path d="M8 2v12M2 8h12" />
            </svg>,
          )}
          {seg(
            "solid",
            "Solid",
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
              <path d="M8 1.8 13.6 5v6L8 14.2 2.4 11V5z" />
              <path d="M2.4 5 8 8.2 13.6 5M8 8.2v6" />
            </svg>,
          )}
        </div>
        <button type="button" onClick={() => ctl.current?.reset()} className="text-[14px] font-semibold text-[#1E4A94] transition-opacity hover:opacity-70">
          Reset view
        </button>
      </div>
      <p className="mt-[6px] text-[13px] text-[#2D2D2D]/60">Drag to rotate.</p>
    </div>
  )
}
