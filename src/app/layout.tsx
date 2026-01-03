import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { FloatingOrbs, GridPattern, NoiseTexture } from "@/components/ui/floating-elements"

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
        <ScrollProgress />
        <FloatingOrbs />
        <GridPattern />
        <NoiseTexture />
        <NavBar />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
