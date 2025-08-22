// soluna_mark3\src\app\layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Soluna",
  description: "Calm-inspired mental wellness app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Set Bodoni globally with the real .className from next/font */}
      <body className={bodoni.className}>{children}</body>
    </html>
  );
}
