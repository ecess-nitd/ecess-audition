import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500"]
});

export const metadata = {
  title: "Exordium 2025",
  description: "Join EXORDIUM, an exclusive event for first-year ECE students! Explore AI, IoT, robotics, and digital systems while engaging with faculty and peers driving innovation. Unlock limitless opportunities and embark on a transformative journey in Electronics & Communication Engineering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased bg-black`}
      >
        {children}
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
