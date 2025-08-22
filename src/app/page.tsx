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

export default function HomePage() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const targetRef = useRef({ x: 50, y: 50 });
  const [visible, setVisible] = useState(false);

  // Smooth motion so shine glides after mouse
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

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
    if (!visible) setVisible(true);
  };

  const handleLeave = () => setVisible(false);

  return (
    <main className="bg-forest-fade min-h-screen w-full flex flex-col items-center justify-center p-8">
      {/* Title */}
      <h1 className="text-[var(--color-apple-900)] text-6xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg text-center">
        Welcome to Soluna
      </h1>

      {/* Tagline */}
      <p
        className={`${croissant.className} text-[var(--color-apple-800)] text-xl mt-2 mb-10 drop-shadow`}
      >
        whatever floats your boat
      </p>

      {/* Shiny rectangle */}
      <div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative group mt-2"
      >
        <Link
          href="/mood"
          className="relative font-bold text-[var(--color-olive-drab-600)]
                     text-xl md:text-2xl no-underline px-12 py-6 rounded-xl select-none"
        >
          How are you feeling today?
        </Link>

        {/* Shine Layer */}
        <span
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            padding: "2px",
            borderRadius: "0.75rem",
            // 👇 This radial gradient controls the shine
            background: `radial-gradient(
              400px circle at ${pos.x}% ${pos.y}%,    /* <<< RADIUS = 700px */
              rgba(255,255,255,0.45) 0%,
              rgba(255,255,255,0.15) 40%,
              transparent 80%
            )`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        />
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-3xl">
        <Link
          href="/chat"
          className="font-extrabold p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-md 
                     text-[var(--color-apple-800)] text-center drop-shadow-lg 
                     transition-all duration-300 hover:scale-105 hover:bg-transparent"
        >
          AI Therapy Chat
        </Link>
        <Link
          href="/journal"
          className="font-extrabold p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-md 
                     text-[var(--color-apple-800)] text-center drop-shadow-lg 
                     transition-all duration-300 hover:scale-105 hover:bg-transparent"
        >
          Journal
        </Link>
        <Link
          href="/well-being"
          className="font-extrabold p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-md 
                     text-[var(--color-apple-800)] text-center drop-shadow-lg 
                     transition-all duration-300 hover:scale-105 hover:bg-transparent"
        >
          Well-Being
        </Link>
        <Link
          href="/dashboard"
          className="font-extrabold p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-md 
                     text-[var(--color-apple-800)] text-center drop-shadow-lg 
                     transition-all duration-300 hover:scale-105 hover:bg-transparent"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
