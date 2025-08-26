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
  title: "ECESS Audition 2025 - Register for Electronics & Communication Engineering Auditions | NIT Durgapur",
  description: "Join ECESS Audition 2025 at NIT Durgapur! Register now for the Electronics and Communication Engineering Students Society auditions. Open to all ECE students.",
  keywords: "ECESS Audition 2025, NIT Durgapur, ECE Auditions, Electronics Engineering Auditions, Communication Engineering, Student Society Auditions, College Auditions, Technical Events, Alumni Events, ECE Technical Society, ECESS NIT Durgapur",
  authors: [{ name: "ECESS NIT Durgapur" }],
  creator: "ECESS NIT Durgapur",
  publisher: "ECESS NIT Durgapur",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ecess-audition.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ECESS Audition 2025 - Register for ECE Auditions | NIT Durgapur",
    description: "Join ECESS Audition 2025 at NIT Durgapur! Register now for the Electronics and Communication Engineering Students Society auditions",
    url: "https://ecess-audition.vercel.app",
    siteName: "ECESS NIT Durgapur",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ECESS Audition 2025 - NIT Durgapur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECESS Audition 2025 - Register for ECE Auditions | NIT Durgapur",
    description: "Join ECESS Audition 2025 at NIT Durgapur! Register now for the Electronics and Communication Engineering Students Society auditions.",
    images: ["/og-image.jpg"],
    creator: "@ECESS_NITD",
    site: "@ECESS_NITD",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Education",
  classification: "Student Society Event",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "ECESS Audition 2025",
              "description": "Join ECESS Audition 2025 at NIT Durgapur! Register now for the Electronics and Communication Engineering Students Society auditions. Open to all ECE students.",
              "startDate": "2025-01-01",
              "endDate": "2025-12-31",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "organizer": {
                "@type": "Organization",
                "name": "ECESS NIT Durgapur",
                "url": "https://ecess-audition.vercel.app"
              },
              "location": {
                "@type": "Place",
                "name": "NIT Durgapur",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Durgapur",
                  "addressRegion": "West Bengal",
                  "addressCountry": "IN"
                }
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "0",
                "priceCurrency": "INR",
                "validFrom": "2025-01-01"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Engineering Students"
              },
              "category": "Technical Student Society Event",
              "keywords": "ECE Auditions, Engineering Auditions, Technical Skills, Electronics Events, Communication Engineering"
            })
          }}
        />
      </head>
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
