"use client";

import { useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";

export interface GravityStarsProps {
  children?: ReactNode;
  className?: string;
  color?: string;
  connect?: boolean;
  connectDistance?: number;
  count?: number;
  drag?: number;
  glow?: number;
  gravity?: number;
  paused?: boolean;
  speed?: number;
  starSize?: number;
  tint?: number;
  twinkle?: number;
}

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  driftX: number;
  driftY: number;
  depth: number;
  phase: number;
  size: number;
  hue: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

function resolveColor(value: string): string {
  if (!value.trim().startsWith("var(")) return value;
  const probe = document.createElement("span");
  probe.style.color = value;
  document.body.append(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved || "#e8e9ee";
}

export function GravityStars({
  children,
  className = "",
  color = "#e8e9ee",
  connect = true,
  connectDistance = 130,
  count = 110,
  drag = 0.035,
  glow = 4,
  gravity = 0.45,
  paused = false,
  speed = 0.4,
  starSize = 1.2,
  tint = 0.42,
  twinkle = 0.38,
}: GravityStarsProps) {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!host || !canvas || !context) return;

    let width = 1;
    let height = 1;
    let frame = 0;
    let running = false;
    let pointerActive = false;
    let pointerX = 0;
    let pointerY = 0;
    let lastTime = 0;
    let seeded = false;
    const amount = clamp(Math.round(count), 8, 260);
    const stars: Star[] = [];
    const baseColor = resolveColor(color);

    for (let i = 0; i < amount; i++) {
      const depth = Math.random();
      const angle = Math.random() * Math.PI * 2;
      const drift = 4 + depth * 7;
      stars.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0,
        vy: 0,
        driftX: Math.cos(angle) * drift,
        driftY: Math.sin(angle) * drift,
        depth,
        phase: Math.random() * Math.PI * 2,
        size: starSize * (0.55 + depth * 1.25),
        hue: Math.random(),
      });
    }

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const previousWidth = width;
      const previousHeight = height;
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      for (const star of stars) {
        if (seeded) {
          star.x *= width / previousWidth;
          star.y *= height / previousHeight;
        } else {
          star.x *= width;
          star.y *= height;
        }
      }
      seeded = true;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      if (connect) {
        for (let i = 0; i < stars.length; i++) {
          const a = stars[i];
          for (let j = i + 1; j < stars.length; j++) {
            const b = stars[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.hypot(dx, dy);
            if (distance > connectDistance) continue;
            context.globalAlpha = (1 - distance / connectDistance) * 0.32;
            context.strokeStyle = baseColor;
            context.lineWidth = 0.6;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      for (const star of stars) {
        const pulse = 1 - twinkle * (0.5 + 0.5 * Math.sin(time * 0.001 + star.phase));
        const alpha = 0.28 + star.depth * 0.52;
        const warmth = star.hue > 0.82 && tint > 0.15;
        context.globalAlpha = alpha * pulse;
        context.fillStyle = warmth ? "#f1dfbf" : baseColor;
        context.shadowColor = context.fillStyle;
        context.shadowBlur = Math.max(0, glow * (0.25 + star.depth * 0.35));
        context.beginPath();
        context.arc(star.x, star.y, Math.max(0.35, star.size), 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      context.shadowBlur = 0;
    };

    const tick = (time: number) => {
      if (!running) return;
      const delta = Math.min((time - (lastTime || time)) / 1000, 0.04);
      lastTime = time;
      for (const star of stars) {
        if (pointerActive && gravity > 0) {
          const dx = pointerX - star.x;
          const dy = pointerY - star.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < 260 * 260 && distanceSq > 16) {
            const pull = (gravity * 150 * (1 - Math.sqrt(distanceSq) / 260)) / distanceSq;
            star.vx += dx * pull * delta;
            star.vy += dy * pull * delta;
          }
        }
        const damping = (1 - clamp(drag, 0, 1)) ** (delta * 60);
        star.vx *= damping;
        star.vy *= damping;
        star.x += (star.vx + star.driftX * speed) * delta;
        star.y += (star.vy + star.driftY * speed) * delta;
        if (star.x < 0) star.x += width;
        if (star.x > width) star.x -= width;
        if (star.y < 0) star.y += height;
        if (star.y > height) star.y -= height;
      }
      draw(time);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || paused || reduceMotion) return;
      running = true;
      lastTime = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
      draw(performance.now());
    };
    const handlePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerActive =
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom;
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibilityObserver.observe(host);
    resize();
    draw(0);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [color, connect, connectDistance, count, drag, glow, gravity, paused, reduceMotion, speed, starSize, tint, twinkle]);

  return (
    <div
      className={`gravity-stars ${className}`.trim()}
      ref={hostRef}
      aria-hidden={children ? undefined : true}
    >
      <canvas className="gravity-stars-canvas" ref={canvasRef} aria-hidden="true" />
      {children && <div className="gravity-stars-content">{children}</div>}
    </div>
  );
}

export default GravityStars;
