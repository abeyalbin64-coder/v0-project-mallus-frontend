"use client"

import { useEffect, useRef } from "react"

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrame: number
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      canvas.width = canvas.offsetWidth * DPR
      canvas.height = canvas.offsetHeight * DPR
      ctx.scale(DPR, DPR)
    }

    const stars = Array.from({ length: 150 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.5,
      v: Math.random() * 0.2 + 0.05,
      a: Math.random() * Math.PI * 2,
    }))

    function draw() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // faint space glow
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.2)
      grad.addColorStop(0, "rgba(12, 20, 40, 0.4)")
      grad.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      stars.forEach((s) => {
        s.a += s.v * 0.01
        const twinkle = 0.6 + Math.sin(s.a * 3) * 0.4
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.r * twinkle, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(150, 200, 255, 0.9)"
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      resize()
    }
    resize()
    draw()
    window.addEventListener("resize", handleResize)
    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  )
}
