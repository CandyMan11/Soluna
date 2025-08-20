import "./globals.css";
import { Croissant_One } from "next/font/google";

const croissant = Croissant_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-croissant",
});

export const metadata = {
  title: "Soluna",
  description: "Calm-inspired mental wellness app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={croissant.variable}>
      <body>{children}</body>
    </html>
  );
}
