import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";

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
  title: "ECESS Audition 2025 - Register for ECESS Auditions | NIT Durgapur",
  description: "ECESS Audition 2025 is an exclusive audition registration platform for first-year students at NIT Durgapur, organized by the Electronics and Communication Engineering Students Society.",
  keywords: "ECESS Audition 2025, NIT Durgapur, ECE, Electronics and Communication Engineering, ECESS, Audition Registration, Student Society, Performance, Creative Arts, Technical Skills",
  openGraph: {
    title: "ECESS Audition 2025 - Register for ECESS Auditions",
    description: "Join ECESS Audition 2025 at NIT Durgapur. Showcase your talents and skills in this exclusive audition organized by the Electronics and Communication Engineering Students Society.",
    url: "https://ecess-audition.vercel.app",
    siteName: "ECESS NIT Durgapur",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ECESS Audition 2025 - Register for ECESS Auditions",
    description: "Join ECESS Audition 2025 at NIT Durgapur. Showcase your talents and skills in this exclusive audition organized by the Electronics and Communication Engineering Students Society.",
  },
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
