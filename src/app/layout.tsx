import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/ui/tubelight-navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
})

export const metadata: Metadata = {
  title: "ARKO | Luxury Real Estate & Architecture",
  description: "Redefining residential living through innovative architecture and functional design. Luxury real estate development.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-background to-card antialiased">
        <NavBar />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}
