import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono as GeistMono } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"

const geistMono = GeistMono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aeon Dialer",
  description: "A powerful call center dialer",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} bg-neutral-950 text-white antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
