"use client"

import { useEffect, useRef } from "react"

// ── Shaders ────────────────────────────────────────────────────────────────

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec2  u_origin;
uniform vec3  u_color;
uniform float u_speed;
uniform float u_spread;
uniform float u_rayLen;
uniform float u_fade;
uniform float u_noise;
uniform float u_distort;
uniform float u_sat;
uniform float u_mouseInfl;
uniform float u_pulse;

#define PI 3.14159265359

float hash(float n) {
  return fract(sin(n * 127.1 + 311.7) * 43758.5453);
}
float snoise(float x) {
  float i = floor(x);
  float f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), f);
}

void main() {
  // Guard: skip if resolution is zero (before first resize fires)
  if (u_res.x < 1.0 || u_res.y < 1.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;

  // Effective origin: base + mouse influence
  vec2 origin = u_origin + (u_mouse - u_origin) * u_mouseInfl;

  vec2 delta = uv - origin;
  float dist  = length(vec2(delta.x * aspect, delta.y));

  if (dist < 0.001) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float angle = atan(delta.y, delta.x * aspect);

  // Direction from origin toward canvas centre
  vec2 toCenter     = vec2(0.5, 0.5) - origin;
  float centerAngle = atan(toCenter.y, toCenter.x * aspect);

  // Signed angular deviation from fan centre, wrapped to [-PI, PI]
  float angleDiff = angle - centerAngle;
  angleDiff = mod(angleDiff + PI, 2.0 * PI) - PI;

  // Angular mask — only render within the spread arc
  float halfSpread = u_spread * PI * 0.5;
  float spreadMask = smoothstep(halfSpread, halfSpread * 0.6, abs(angleDiff));
  if (spreadMask < 0.001) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // ── 8 ray beams ──────────────────────────────────────────────────────────
  float totalRays = 0.0;
  float t = u_time * u_speed;

  for (int i = 0; i < 8; i++) {
    float fi = float(i);

    // Evenly spaced angle within fan
    float rayAngle = (fi / 7.0 - 0.5) * halfSpread * 2.0;

    // Slow angular drift
    float drift = (snoise(fi * 1.73 + t * 0.12) - 0.5) * u_distort * halfSpread * 2.0;
    rayAngle += drift;

    float diff = abs(angleDiff - rayAngle);

    // Wider Gaussian beam — visible at distance
    float sigma = 0.06 + snoise(fi * 4.11) * 0.03;
    float beam  = exp(-(diff * diff) / (2.0 * sigma * sigma));

    // Intensity shimmer
    float shimmer = 0.5 + 0.5 * snoise(fi * 2.34 + t * 0.55);
    if (u_pulse > 0.5) shimmer *= 0.6 + 0.4 * sin(t * 1.3 + fi * 1.1);

    totalRays += beam * shimmer;
  }

  // No aggressive normalization — keep brightness up
  totalRays = clamp(totalRays, 0.0, 1.0);

  // Radial fade — linear (not quadratic) so it stays bright further out
  float fadeDist = u_rayLen * u_fade;
  float distFade = max(0.0, 1.0 - dist / fadeDist);

  // Subtle noise texture
  float nTex = 0.85 + 0.15 * snoise(dist * 10.0 + t * 0.3);
  totalRays *= nTex;

  // Final alpha — NO hard ceiling, let props control intensity
  float alpha = totalRays * spreadMask * distFade;

  // Saturation
  float lum = dot(u_color, vec3(0.299, 0.587, 0.114));
  vec3  col = mix(vec3(lum), u_color, u_sat);

  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
}
`

// ── Helpers ────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r
    ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255]
    : [1, 1, 1]
}

// CSS top-left = WebGL UV (0, 1) because gl_FragCoord y=0 is at canvas bottom
function originToUV(o: string): [number, number] {
  switch (o) {
    case "top-left":   return [0.0, 1.0]
    case "top-right":  return [1.0, 1.0]
    case "top-center": return [0.5, 1.0]
    case "center":     return [0.5, 0.5]
    default:           return [0.0, 1.0]
  }
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  src: string,
  label: string,
): WebGLShader | null {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(`[LightRays] ${label} shader compile error:`, gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

// ── Component ──────────────────────────────────────────────────────────────

export interface LightRaysProps {
  raysOrigin?:     "top-left" | "top-right" | "top-center" | "center"
  raysColor?:      string
  raysSpeed?:      number
  lightSpread?:    number
  rayLength?:      number
  pulsating?:      boolean
  fadeDistance?:   number
  saturation?:     number
  followMouse?:    boolean
  mouseInfluence?: number
  noiseAmount?:    number
  distortion?:     number
  className?:      string
  style?:          React.CSSProperties
}

export function LightRays({
  raysOrigin    = "top-left",
  raysColor     = "#A7D8FF",
  raysSpeed     = 0.35,
  lightSpread   = 0.65,
  rayLength     = 1.4,
  pulsating     = false,
  fadeDistance  = 0.8,
  saturation    = 0.8,
  followMouse   = true,
  mouseInfluence = 0.04,
  noiseAmount   = 0.02,
  distortion    = 0.015,
  className,
  style,
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // ── Reduced-motion check ─────────────────────────────────────────────
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    console.log("[LightRays] prefers-reduced-motion:", prefersReduced)
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) { console.error("[LightRays] canvas ref is null"); return }

    // ── Canvas dimensions at mount ───────────────────────────────────────
    const rect0 = canvas.getBoundingClientRect()
    console.log("[LightRays] canvas CSS size at mount:", rect0.width, "×", rect0.height)

    // ── WebGL context ────────────────────────────────────────────────────
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    })
    if (!gl) { console.error("[LightRays] WebGL not supported"); return }

    // ── Shaders ──────────────────────────────────────────────────────────
    const vs = compileShader(gl, gl.VERTEX_SHADER,   VERT, "vertex")
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG, "fragment")
    if (!vs || !fs) return

    const prg = gl.createProgram()!
    gl.attachShader(prg, vs)
    gl.attachShader(prg, fs)
    gl.linkProgram(prg)
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
      console.error("[LightRays] program link error:", gl.getProgramInfoLog(prg))
      return
    }
    gl.useProgram(prg)
    console.log("[LightRays] WebGL program linked OK")

    // ── Geometry: full-screen quad ───────────────────────────────────────
    const buf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prg, "a_pos")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    // ── Uniforms ─────────────────────────────────────────────────────────
    const uRes       = gl.getUniformLocation(prg, "u_res")
    const uTime      = gl.getUniformLocation(prg, "u_time")
    const uMouse     = gl.getUniformLocation(prg, "u_mouse")
    const uOrigin    = gl.getUniformLocation(prg, "u_origin")
    const uColor     = gl.getUniformLocation(prg, "u_color")
    const uSpeed     = gl.getUniformLocation(prg, "u_speed")
    const uSpread    = gl.getUniformLocation(prg, "u_spread")
    const uRayLen    = gl.getUniformLocation(prg, "u_rayLen")
    const uFade      = gl.getUniformLocation(prg, "u_fade")
    const uNoise     = gl.getUniformLocation(prg, "u_noise")
    const uDistort   = gl.getUniformLocation(prg, "u_distort")
    const uSat       = gl.getUniformLocation(prg, "u_sat")
    const uMouseInfl = gl.getUniformLocation(prg, "u_mouseInfl")
    const uPulse     = gl.getUniformLocation(prg, "u_pulse")

    const [r, g, b] = hexToRgb(raysColor)
    const [ox, oy]  = originToUV(raysOrigin)

    gl.uniform3f(uColor,     r, g, b)
    gl.uniform2f(uOrigin,    ox, oy)
    gl.uniform1f(uSpeed,     raysSpeed)
    gl.uniform1f(uSpread,    lightSpread)
    gl.uniform1f(uRayLen,    rayLength)
    gl.uniform1f(uFade,      fadeDistance)
    gl.uniform1f(uNoise,     noiseAmount)
    gl.uniform1f(uDistort,   distortion)
    gl.uniform1f(uSat,       saturation)
    gl.uniform1f(uMouseInfl, followMouse ? mouseInfluence : 0)
    gl.uniform1f(uPulse,     pulsating ? 1.0 : 0.0)
    // Set resolution to zero until resize fires — shader guards against it
    gl.uniform2f(uRes, 0, 0)

    // Straight-alpha blending (premultipliedAlpha: false on context)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // ── Mouse ────────────────────────────────────────────────────────────
    let mouseX = ox
    let mouseY = oy
    const onMouseMove = (e: MouseEvent) => {
      if (!followMouse) return
      const rc = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rc.left) / rc.width
      mouseY = 1.0 - (e.clientY - rc.top) / rc.height  // flip y for WebGL
    }
    document.addEventListener("mousemove", onMouseMove, { passive: true })

    // ── Resize ───────────────────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const { width, height } = canvas.getBoundingClientRect()
      if (width === 0 || height === 0) {
        console.warn("[LightRays] canvas has zero dimension, waiting for layout")
        return
      }
      canvas.width  = Math.round(width  * dpr)
      canvas.height = Math.round(height * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      console.log("[LightRays] canvas draw buffer:", canvas.width, "×", canvas.height)
    }
    // Call resize immediately, then observe future changes
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // ── Render loop ──────────────────────────────────────────────────────
    const start = performance.now()
    let raf = 0
    const render = () => {
      const t = (performance.now() - start) / 1000
      gl.uniform1f(uTime,  t)
      gl.uniform2f(uMouse, mouseX, mouseY)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener("mousemove", onMouseMove)
      ro.disconnect()
      gl.deleteProgram(prg)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
      aria-hidden="true"
    />
  )
}
