"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d");
    } catch { return; }
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const isDark = document.documentElement.classList.contains("dark");

    // ── Particles ──────────────────────────────────────────────
    type Particle = {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      r: number; color: string;
    };

    const PARTICLE_COUNT = 120;
    const particles: Particle[] = [];

    const cyanColor   = isDark ? "6,182,212"   : "8,145,178";
    const indigoColor = isDark ? "99,102,241"  : "79,70,229";
    const slateColor  = isDark ? "148,163,184" : "100,116,139";

    const colorPool = [cyanColor, cyanColor, indigoColor, cyanColor, slateColor];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * 600 + 100,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 1.2,
        r: Math.random() * 2.5 + 1,
        color: colorPool[Math.floor(Math.random() * colorPool.length)],
      });
    }

    // ── Orbs ───────────────────────────────────────────────────
    const orbs = [
      { cx: W * 0.15, cy: H * 0.25, r: 300, color: cyanColor,   alpha: isDark ? 0.12 : 0.08, angle: 0,   speed: 0.0005 },
      { cx: W * 0.85, cy: H * 0.65, r: 350, color: indigoColor, alpha: isDark ? 0.10 : 0.07, angle: 2,   speed: 0.0004 },
      { cx: W * 0.5,  cy: H * 0.5,  r: 250, color: cyanColor,   alpha: isDark ? 0.08 : 0.05, angle: 4,   speed: 0.0007 },
    ];

    let mouse = { x: -999, y: -999 };
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    const MAX_DIST = 150;
    const FOV = 500;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // ── Draw orbs ──
      orbs.forEach(orb => {
        orb.angle += orb.speed;
        const ox = orb.cx + Math.cos(orb.angle) * 80;
        const oy = orb.cy + Math.sin(orb.angle * 0.6) * 50;

        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        g.addColorStop(0,   `rgba(${orb.color},${orb.alpha})`);
        g.addColorStop(0.4, `rgba(${orb.color},${orb.alpha * 0.5})`);
        g.addColorStop(1,   `rgba(${orb.color},0)`);
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // ── Project particles ──
      const proj = particles.map(p => {
        const scale = FOV / (FOV + p.z);
        return {
          px: (p.x - W / 2) * scale + W / 2,
          py: (p.y - H / 2) * scale + H / 2,
          scale,
          p,
        };
      });

      // ── Draw connection lines ──
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i], b = proj[j];
          const dx = a.px - b.px;
          const dy = a.py - b.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * (isDark ? 0.25 : 0.15) * Math.min(a.scale, b.scale) * 2;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.strokeStyle = `rgba(${cyanColor},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ── Draw particles ──
      proj.forEach(({ px, py, scale, p }) => {
        const r = Math.max(p.r * scale * 1.5, 1);
        const alpha = isDark ? 0.7 * scale + 0.1 : 0.5 * scale + 0.1;

        // Glow halo
        const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 4);
        glow.addColorStop(0,   `rgba(${p.color},${alpha * 0.5})`);
        glow.addColorStop(0.5, `rgba(${p.color},${alpha * 0.15})`);
        glow.addColorStop(1,   `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(px, py, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${alpha})`;
        ctx.fill();

        // Mouse repulsion
        const mdx = px - mouse.x;
        const mdy = py - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 120 && mdist > 0) {
          const force = (120 - mdist) / 120;
          p.vx += (mdx / mdist) * force * 0.5;
          p.vy += (mdy / mdist) * force * 0.5;
        }

        // Update
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        if (p.z < 50)  p.z = 700;
        if (p.z > 700) p.z = 50;
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted]);

  if (!mounted) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
