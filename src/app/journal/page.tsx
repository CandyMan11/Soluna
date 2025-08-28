// src/app/journal/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie, Arbutus_Slab } from "next/font/google";
import { Search, List } from "lucide-react";

const cookie = Cookie({ subsets: ["latin"], weight: "400" });
const arbutus = Arbutus_Slab({ subsets: ["latin"], weight: "400" });

// Mock notes
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
  {
    id: 4,
    title: "You",
    content:
      "I never thought this would be\nBut now it's over\nLike tides on a wave\nMy boat is sinking, but it's okay",
    color: "bg-red-200",
  },
  {
    id: 5,
    title: "Summer",
    content:
      "Summer days, you're so warm babe\nButterflies, I'd never want to hurt you\nLook at the sky, all the blues and whites\nThe grass is greener on my side",
    color: "bg-green-200",
  },
];

export default function JournalPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [active, setActive] = useState("Notes");

  return (
    <div
      className="flex flex-col min-h-screen text-black"
      style={{ backgroundColor: "var(--color-black-200)" }}
    >
      {/* Top Bar */}
      <header
        className="flex items-center justify-between p-4 sticky top-0 z-20"
        style={{ backgroundColor: "var(--color-black-400)" }}
      >
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <h1 className={`${arbutus.className} text-2xl`}>Journal</h1>

          {/* Search bar & list icon */}
          <div className="flex items-center w-80 max-w-lg">
            <div
              className="flex items-center rounded-lg px-3 py-2 w-full"
              style={{ backgroundColor: "var(--color-black-300)" }}
            >
              <Search size={18} className="text-gray-700 mr-2" />
              <input
                type="text"
                placeholder="Search journal..."
                className="bg-transparent outline-none flex-1 text-sm text-black placeholder-gray-700"
              />
            </div>
            <button
              className="ml-3 p-2 rounded-lg"
              style={{ backgroundColor: "var(--color-black-300)" }}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <Link href="/" className={`${cookie.className} text-3xl`}>
          Soluna
        </Link>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className="w-56 pt-6 flex flex-col gap-2 text-sm"
          style={{ backgroundColor: "var(--color-black-200)" }}
        >
          {[
            { name: "Notes", icon: "sticky_note_2" },
            { name: "Archive", icon: "archive" },
            { name: "Trash", icon: "delete" },
          ].map((item) => {
            const isActive = active === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className="flex items-center gap-3 py-2 transition-all"
                style={{
                  paddingLeft: "1rem", // 4-space gap
                  backgroundColor: isActive
                    ? "var(--color-saddle-500)"
                    : "transparent",
                  color: isActive ? "white" : "black",
                  borderTopRightRadius: "9999px",
                  borderBottomRightRadius: "9999px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-saddle-300)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: isActive ? "white" : "black" }}
                >
                  {item.icon}
                </span>
                {item.name}
              </button>
            );
          })}
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col p-6">
          {/* Sticky "Take a note" box */}
          <div
            className="sticky top-16 z-10 rounded-lg px-4 py-3 text-gray-700 cursor-text"
            style={{
              backgroundColor: "var(--color-black-300)",
              width: "60%",
              margin: "24px auto",
            }}
          >
            Take a note...
          </div>

          {/* Masonry Notes (Pinterest-style) */}
          <div
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6"
            style={{
              maxWidth: "80%",
              margin: "24px auto 0",
            }}
          >
            {mockNotes.map((note) => (
              <div
                key={note.id}
                onClick={() =>
                  setExpanded(expanded === note.id ? null : note.id)
                }
                className={`${note.color} rounded-xl p-4 mb-6 cursor-pointer transition-transform duration-200 hover:scale-[1.02] break-words`}
                style={{
                  display: "inline-block", // Important for columns
                  width: "100%",
                  lineHeight: "1.6",
                  paddingBottom: "1.5rem", // ~2 extra lines
                }}
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
    </div>
  );
}
