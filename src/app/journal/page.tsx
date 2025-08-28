// src/app/journal/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Croissant_One, Cookie, Arbutus_Slab } from "next/font/google";
import { Search, List } from "lucide-react";

const cookie = Cookie({ subsets: ["latin"], weight: "400" });
const arbutus = Arbutus_Slab({ subsets: ["latin"], weight: "400" });

// Sample mock data for now
const mockNotes = [
  {
    id: 1,
    title: "Salad",
    content: "- rice\n- beans\n- lettuce\n- chicken*",
    color: "bg-yellow-200",
  },
  {
    id: 2,
    title: "The last of her kind",
    content:
      "I met her, dark under the winter sky\nShe was the last of her kind.",
    color: "bg-purple-200",
  },
  {
    id: 3,
    title: "Love",
    content: "You asked me how my day was\nIt was sweet just like you...",
    color: "bg-pink-200",
  },
];

export default function JournalPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <aside className="w-48 bg-neutral-950 p-4 flex flex-col gap-4 text-gray-300">
        <button className="hover:text-white text-left">Notes</button>
        <button className="hover:text-white text-left">Archive</button>
        <button className="hover:text-white text-left">Trash</button>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-4 border-b border-neutral-800">
          <h1 className={`${arbutus.className} text-2xl`}>Journal</h1>

          {/* Search bar & list icon */}
          <div className="flex items-center w-1/2 max-w-lg">
            <div className="flex items-center bg-neutral-800 rounded-lg px-3 py-2 w-full">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search journal..."
                className="bg-transparent outline-none flex-1 text-sm text-gray-200"
              />
            </div>
            <button className="ml-3 p-2 rounded-lg hover:bg-neutral-800">
              <List size={20} />
            </button>
          </div>

          <Link href="/" className={`${cookie.className} text-xl`}>
            Soluna
          </Link>
        </header>

        {/* Notes grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mockNotes.map((note) => (
            <div
              key={note.id}
              onClick={() =>
                setExpanded(expanded === note.id ? null : note.id)
              }
              className={`${note.color} rounded-xl p-4 cursor-pointer transition-all ${
                expanded === note.id ? "col-span-3 text-center scale-105" : ""
              }`}
            >
              <h2 className="font-bold text-lg mb-2">{note.title}</h2>
              <p className={`${arbutus.className} whitespace-pre-line`}>
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
