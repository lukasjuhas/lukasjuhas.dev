import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"
import PageGradient from "./components/PageGradient"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"

const quicksand = Quicksand({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lukas Juhas",
  description: "Citizen of the world",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased min-h-screen h-full relative`}
      >
        <PageGradient />
        <AppHeader />
        <main className="relative z-10 min-h-screen flex items-center p-4 pt-14">
          {children}
        </main>
        <AppFooter />
        <GoogleAnalytics gaId="UA-85525050-1" />
      </body>
    </html>
  )
}
