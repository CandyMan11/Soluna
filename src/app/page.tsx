"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 text-gray-900">
      
      {/* Title */}
<h1 className="text-5xl md:text-6xl font-extrabold font-alfa">
  Welcome to Soluna
</h1>
      {/* Tagline */}
      <p className="font-croissant text-xl mb-12">whatever floats your boat</p>

      {/* Feeling Today clickable box */}
      <Link
        href="/mood"
        className="relative px-6 py-3 text-lg font-medium font-croissant text-gray-900 rounded-xl 
                   bg-transparent border border-transparent transition-all duration-300
                   hover:border-white hover:bg-white/10 hover:backdrop-blur-sm
                   no-underline"
      >
        How are you feeling today?
      </Link>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-3xl">
        <Link
          href="/chat"
          className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-md text-center transition-all hover:scale-105"
        >
          AI Therapy Chat
        </Link>
        <Link
          href="/journal"
          className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-md text-center transition-all hover:scale-105"
        >
          Journal
        </Link>
        <Link
          href="/meditation"
          className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-md text-center transition-all hover:scale-105"
        >
          Meditation
        </Link>
        <Link
          href="/dashboard"
          className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-md text-center transition-all hover:scale-105"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
