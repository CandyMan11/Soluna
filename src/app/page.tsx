"use client";

import Link from "next/link";
import {
  useState,
  useRef,
  useEffect,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Croissant_One } from "next/font/google";

const croissant = Croissant_One({ subsets: ["latin"], weight: "400" });

type Firefly = { x: number; y: number; vx: number; vy: number; glow: number };

export default function HomePage() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const targetRef = useRef({ x: 50, y: 50 });
  const [visible, setVisible] = useState(false);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  // Smooth motion for shine
  useEffect(() => {
    let raf: number;
    const tick = () => {
      setPos((p) => {
        const dx = targetRef.current.x - p.x;
        const dy = targetRef.current.y - p.y;
        return { x: p.x + dx * 0.08, y: p.y + dy * 0.08 };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ✅ Track mouse globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
    if (!visible) setVisible(true);
  };

  const handleLeave = () => setVisible(false);

  // Generate fireflies
  useEffect(() => {
    const newFireflies = Array.from({ length: 17 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      glow: 1,
    }));
    setFireflies(newFireflies);
  }, []);

  // Animate fireflies
  // Animate fireflies
useEffect(() => {
  let raf: number;
  const animate = () => {
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const margin = 5;

    setFireflies((flies) =>
      flies.map((f) => {
        let { x, y, vx, vy, glow } = f;

        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;

        // repel if mouse is close
        if (dist < 50) {
          vx += (dx / dist) * 0.05;
          vy += (dy / dist) * 0.05;
          glow = Math.min(1.8, glow + 0.05);
        } else {
          glow = Math.max(1, glow - 0.02);
        }

        // update position
        x += vx;
        y += vy;

        // add gentle random drifting so they never clump
        vx += (Math.random() - 0.5) * 0.01;
        vy += (Math.random() - 0.5) * 0.01;

        // keep them slow and floaty
        const maxSpeed = 0.25;
        vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
        vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy));

        // bounce off edges
        if (x < margin) {
          x = margin;
          vx *= -1;
        } else if (x > width - margin) {
          x = width - margin;
          vx *= -1;
        }
        if (y < margin) {
          y = margin;
          vy *= -1;
        } else if (y > height - margin) {
          y = height - margin;
          vy *= -1;
        }

        return { x, y, vx, vy, glow };
      })
    );

    raf = requestAnimationFrame(animate);
  };
  raf = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(raf);
}, []);


  return (
    <main className="bg-forest-fade min-h-screen w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Fireflies */}
      <div className="absolute inset-0 pointer-events-none">
        {fireflies.map((f, i) => (
          <span
            key={i}
            className="absolute w-[0.7rem] h-[0.7rem] rounded-full"
            style={{
              backgroundColor: "#f8f38d",
              top: f.y,
              left: f.x,
              filter: "blur(1px)",
              opacity: Math.max(0.3, Math.min(1, 0.8 * f.glow)),
              boxShadow: `0 0 ${6 * f.glow}px ${3 * f.glow}px rgba(248,243,141,0.6)`,
              transition: "opacity 0.2s, box-shadow 0.2s",
            }}
          />
        ))}
      </div>

      {/* Title */}
      <h1 className="text-[var(--color-apple-900)] text-6xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg text-center relative z-10">
        Welcome to Soluna
      </h1>

      {/* Tagline */}
      <p
        className={`${croissant.className} text-[var(--color-apple-800)] text-xl mt-2 mb-10 drop-shadow relative z-10`}
      >
        whatever floats your boat
      </p>

      {/* Shiny Rectangle */}
      <div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative group mt-2 z-10"
      >
        <Link
          href="/mood"
          className="relative font-bold text-[var(--color-sky-blue-700)]
                     text-xl md:text-2xl no-underline px-12 py-6 rounded-xl select-none"
        >
          How are you feeling today?
        </Link>

        <span
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            borderRadius: "0.75rem",
            background: `radial-gradient(
              circle 250px at ${pos.x}% ${pos.y}%,
              rgba(255,255,255,0.35) 0%,
              rgba(255,255,255,0.15) 40%,
              rgba(255,255,255,0.05) 70%,
              transparent 100%
            )`,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-12 w-full max-w-3xl relative z-10">
        <Link
          href="/chat"
          className="font-extrabold p-8 rounded-2xl bg-white/40 backdrop-blur-md shadow-md 
                     text-[var(--color-apple-800)] text-xl text-center drop-shadow-lg 
                     transition-all duration-300 ease-in-out 
                     hover:bg-white/10 hover:text-white"
        >
          AI Therapy Chat
        </Link>
        <Link
          href="/journal"
          className="font-extrabold p-8 rounded-2xl bg-white/40 backdrop-blur-md shadow-md 
                     text-[var(--color-apple-800)] text-xl text-center drop-shadow-lg 
                     transition-all duration-300 ease-in-out 
                     hover:bg-white/10 hover:text-white"
        >
          Journal
        </Link>
        <Link
          href="/well-being"
          className="font-extrabold p-8 rounded-2xl bg-white/40 backdrop-blur-md shadow-md 
                     text-[var(--color-apple-800)] text-xl text-center drop-shadow-lg 
                     transition-all duration-300 ease-in-out 
                     hover:bg-white/10 hover:text-white"
        >
          Well-Being
        </Link>
        <Link
          href="/dashboard"
          className="font-extrabold p-8 rounded-2xl bg-white/40 backdrop-blur-md shadow-md 
                     text-[var(--color-apple-800)] text-xl text-center drop-shadow-lg 
                     transition-all duration-300 ease-in-out 
                     hover:bg-white/10 hover:text-white"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
