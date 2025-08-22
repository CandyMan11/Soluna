// soluna_mark3\src\app\page.tsx

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

type Firefly = { top: string; left: string; duration: string; delay: string };

export default function HomePage() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const targetRef = useRef({ x: 50, y: 50 });
  const [visible, setVisible] = useState(false);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

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

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
    if (!visible) setVisible(true);
  };

  const handleLeave = () => setVisible(false);

  // Generate fireflies only on client
  useEffect(() => {
    const newFireflies = Array.from({ length: 11 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${12 + Math.random() * 8}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setFireflies(newFireflies);
  }, []);

  return (
    <main className="bg-forest-fade min-h-screen w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Fireflies Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {fireflies.map((f, i) => (
          <span
            key={i}
            className="absolute w-[0.4rem] h-[0.4rem] rounded-full animate-firefly"
            style={{
              backgroundColor: "#f8f38d", // yellowish glow
              top: f.top,
              left: f.left,
              animationDuration: f.duration,
              animationDelay: f.delay,
              filter: "blur(1px)",
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

      {/* Shiny rectangle */}
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

        {/* Shine Layer */}
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
