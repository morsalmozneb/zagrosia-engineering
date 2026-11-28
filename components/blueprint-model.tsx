"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

/* Interactive 3D model of the Zagrosia mountain city (a GLB file), shown as a light blueprint hologram.
   Drag to turn it around. The look is drawn in code, so the file itself carries no colours. */

const MODEL_URL = "/models/zagrosia-city.glb"

export function BlueprintModel({ className = "", look = "hologram" }: { className?: string; look?: "hologram" | "blueprint" }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
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

      const holo = look === "hologram"
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
        uniform float uHolo;
        void main(){
          vec3 n = normalize(vN);
          float fres = pow(1.0 - abs(dot(n, normalize(vV))), 2.2);
          float lit = 0.62 + 0.38 * clamp(dot(n, normalize(vec3(-0.4, 0.8, 0.5))), 0.0, 1.0);
          float c = abs(fract(vY * 38.0) - 0.5);
          float contour = 1.0 - smoothstep(0.0, 0.05, c);
          vec3 ink = vec3(0.13, 0.19, 0.27);
          vec3 blue = vec3(0.0, 0.32, 0.65);
          if (uHolo > 0.5) {
            vec3 base = mix(vec3(0.80, 0.88, 0.98), vec3(0.30, 0.56, 0.90), fres);
            vec3 col = base * (0.80 + 0.2 * lit);
            col = mix(col, blue, contour * 0.55);
            float a = 0.42 + 0.30 * fres + 0.22 * contour;
            gl_FragColor = vec4(col, a);
          } else {
            vec3 col = vec3(1.0) * lit;
            col = mix(col, ink, contour * 0.30);
            gl_FragColor = vec4(col, 1.0);
          }
        }`
      const mat = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: { uHolo: { value: holo ? 1 : 0 } },
        transparent: holo,
        depthWrite: true,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
        side: THREE.DoubleSide,
      })
      const edgeMat = new THREE.LineBasicMaterial({ color: holo ? 0x2f6fc0 : 0x223044, transparent: true, opacity: holo ? 0.5 : 0.55 })

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

      const st = { yaw: 0.55, elev: 0.55, vYaw: 0, dragging: false, lx: 0, ly: 0, last: -1e9 }
      const target = new THREE.Vector3(0, height * 0.38, 0)
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
        dist = Math.max(7.6 / (th * Math.min(camera.aspect, 1.8)), (height * 0.5 + 3.2) / th)
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
  }, [reduced, look])

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div ref={stageRef} className="absolute inset-x-0 top-0 bottom-8" />
      <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[12px] font-bold uppercase tracking-[0.24em] text-[#2D2D2D]/45">
        <span aria-hidden>‹ </span>Drag to rotate<span aria-hidden> ›</span>
      </p>
    </div>
  )
}
